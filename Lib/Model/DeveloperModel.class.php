<?php
  /**
  * 开发商模型
  */
  class DeveloperModel extends Model {
    public function developer_list($where=array(), $order = "id desc") {
      $news = $this->where(array_merge(array('siteid' => get_siteid()),$where))->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).',20')->select();
      import("ORG.Util.Page");// 导入分页类
      $count      = $this->where(array_merge(array('siteid' => get_siteid()),$where))->count();// 查询满足要求的总记录数
      $Page       = new Page($count,20);// 实例化分页类 传入总记录数和每页显示的记录数
      $show       = $Page->show();// 分页显示输出
      return array("data" => $news, "page" => $show);
    }

    public function get_developer_for_house($developerids) {
      $ids = explode("|", $developerids);
      if ($ids) {
        $developers = $this->where(array('id' => array("in", $ids)))->select();
        return $developers;
      } else {
        return array();
      }
    }
  }
  ?>