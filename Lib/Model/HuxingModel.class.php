<?php
  /**
  *  户型模型
  */
  class HuxingModel extends Model {
    public function lists($where=array(), $order = "id desc") {
      $huxings = $this->where(array_merge(array('siteid' => get_siteid()),$where))->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).',20')->select();
      import("ORG.Util.Page");// 导入分页类
      $count      = $this->where(array_merge(array('siteid' => get_siteid()),$where))->count();// 查询满足要求的总记录数
      $Page       = new Page($count,20);// 实例化分页类 传入总记录数和每页显示的记录数
      $show       = $Page->show();// 分页显示输出
      return array("data" => $huxings, "page" => $show);
    }

    public function get_hx_for_house($huxing) {
      $ids = explode("|", $huxing);
      if ($ids) {
        $huxing = $this->where(array('id' => array("in", $ids)))->select();
        return $huxing;
      } else {
        return array();
      }
    }
  }
?>