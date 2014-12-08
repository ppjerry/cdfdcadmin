<?php
class LogModel extends Model 
{
  public function log_list($where="1=1")
  {
    $log_m = M('LoginLog');
    $logs = $log_m->order('id desc')->where($where)->page((isset($_GET['p']) ? $_GET['p'] : 0).',25')->select();
    import("ORG.Util.Page");// 导入分页类
    $count      = $log_m->where($where)->count();// 查询满足要求的总记录数
    $Page       = new Page($count,25);// 实例化分页类 传入总记录数和每页显示的记录数
    $show       = $Page->show();// 分页显示输出
    return array("data" => $logs, "page" => $show);
  }

  public function log_add($login_ip,$status,$type_id)
  {
    $M = M('LoginLog');
    $datas['account'] = trim($_POST['account']);
    $datas['type_id'] = $type_id;
    $datas['login_time'] = time();
    $datas['login_ip'] = $login_ip;
    $datas['status'] = $status;
    return $M->add($datas);
  }


}

?>
