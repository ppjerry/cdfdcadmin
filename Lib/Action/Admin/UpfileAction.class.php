<?php
class UpfileAction extends Action {

  function index() {
    $this->display();
  }


  public function upload() {
    header('Content-Type:text/html;charset=utf-8'); 
    if (IS_POST) {
      import("ORG.Net.UploadFile");
      $savefolder = "Uploads/".date("Y/m/d")."/";
      $url = ROOT_PATH.$savefolder;
      // $url = C('SITE_URL')."Uploads/".date("Y/m/d")."/";
      $upload = new UploadFile();  // 实例化上传类
      $site_setting = get_site_setting(get_siteid());
      $upload->maxSize  = $site_setting['upload_maxsize']*1024; // 设置附件上传大小
      $upload->saveRule = "time";  // 文件名设置
      $upload->allowExts  = array_intersect(explode('|', $_POST['filetype_post']), explode('|', $site_setting['upload_allowext'])); // 设置附件上传类型
      $upload->uploadReplace = $overflow;
      if (!is_dir($url)) {
        mkdir($url,0777,true);
      }
      $data = array();
      $upload->savePath =  $url;// 设置附件上传目录
      if (isset($_FILES)) {
        if(!$upload->upload()) {// 上传错误提示错误信息
          $data['status'] = 'error';
          $data['error_info'] = $upload->getErrorMsg();
        } else{ // 上传成功 获取上传文件信息
          $info =  $upload->getUploadFileInfo();
          // 将附件插入附件表
          $attach_info = array('filename' => $info[0]["name"], 
            'filepath' => $savefolder.$info[0]["savename"],
            'filesize' => $info[0]['size'],
            'fileext'  => $info[0]['extension'],
            'uploadtime' => time(),
            'uploadip' => get_client_ip(),
            'siteid'   => get_siteid(),
            'status'   => 0
            );

          if (isset($_SESSION['user_info'])) {
            $attach_info['userid'] = $_SESSION['user_info']['id'];
          }

          if (in_array( $info[0]['extension'], array('jpg','gif','png','jpeg'))) {
            $attach_info['isimage'] = true;
          } else {
            $attach_info['isimage'] = false;
          }
          if($attachment_id = D("Attachment")->add($attach_info)){
            $data['attachment_id'] = $attachment_id;
          } else {
            // echo M()->getLastSql();
            $data['attachment_id'] = time();
          }
          $data['stutas'] = 'success';
          $info[0]['path'] = C('SITE_URL').$savefolder.$info[0]["savename"];
          $data['attachment_info'] = $info[0];
        }
      } else {
        $data['stutas'] = 'error';
        $data['error_info'] = '请先选择图片!';
      }
      sleep(1);
      if (isset($_GET['CKEditor'])) {
        $funcNum = $_GET['CKEditorFuncNum'];
        $url = $data['attachment_info']['path'];
        $message = isset($data['error_info']) ? $data['error_info'] : "";
        echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
      } else {
        echo json_encode($data);
      }
    } else {
      $args = $_GET['args'];
      $args = getswfinit($_GET['args']);
      $site_setting = get_site_setting(get_siteid());
      $file_size_limit = sizecount($site_setting['upload_maxsize']*1024);
      $this->assign('file_size_limit',$file_size_limit);
      $this->assign('args',$args);
      /*echo "<pre>";
      var_dump($args);
      echo "</pre>";*/
      $this->display();
    }
  }
}
?>

