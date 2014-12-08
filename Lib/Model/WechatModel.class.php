<?php

  /**
  *  微信模型
  */
  class WechatModel extends Model {
    public function get_wechats($where=array(), $order = "id desc", $limit=20) {
      $sites = $this->where(array_merge(array('siteid' => get_siteid()),$where))->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).','.$limit)->select();
      import("ORG.Util.Page");
      $count      = $this->where(array_merge(array('siteid' => get_siteid()),$where))->count();
      $Page       = new Page($count,$limit);
      $show       = $Page->show();
      return array("data" => $sites, "page" => $show);
    }
  }

  ?>