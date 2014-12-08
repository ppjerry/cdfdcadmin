<?php 
  /**
   *  附件模型类
   */
  class AttachmentModel extends Model{
    public static function attachment_type($type) {
      switch ($type) {
        case 'video':
        return array('mp3','flv','mp4');
        break;
        case 'swf':
        return array('swf');
        break;
        case 'image':
        default:
        return array('jpg', 'gif', 'png', 'jpeg');
        break;
      }
    }

    public function attachment_list($where=array(),$order='id desc',$limit=8) {
      $attachs = $this->where(array_merge(array('siteid' => get_siteid()),$where))->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).', '.$limit)->select();
      import("ORG.Util.Page");// 导入分页类
      $count      = $this->where(array_merge(array('siteid' => get_siteid()),$where))->count();// 查询满足要求的总记录数
      $Page       = new Page($count,$limit);// 实例化分页类 传入总记录数和每页显示的记录数
      $show       = $Page->show();// 分页显示输出
      return array("data" => $attachs, "pages" => $show);
    }
  }
  ?>