<?php  
/**
*招聘
**/
class EmployModel extends UserCenterCommonModel {

  protected $tableName = 'employ';

  public function lists( $where=array(), $order = "id desc" ) {
    $employs = $this->where( array_merge( array('siteid' => get_siteid() ), $where ) )->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).',20')->select();
    import("ORG.Util.Page");
    $count = $this->where( array_merge( array('siteid' => get_siteid() ), $where ) )->count();
    $Page       = new Page($count,20);
    $show       = $Page->show();
    return array("data" => $employs, "page" => $show);
  }
}
?>