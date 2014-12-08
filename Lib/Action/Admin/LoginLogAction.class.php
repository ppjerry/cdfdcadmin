<?php
class LoginLogAction extends CommonAction {
  public function index() {
    $page_data = D("Log")->log_list();
    $this->assign("list", $page_data["data"]);
    $this->assign("page", $page_data["page"]);
    $this->display();
  }

  public function search() {
    if (empty($_REQUEST["start_time"])) {
      $datas['start_time'] = 0;
    } else {
      $datas['start_time'] = strtotime($_REQUEST['start_time']);
    }
    if (empty($_REQUEST["end_time"])) {
      $datas['end_time'] = time();
    } else {
      $datas['end_time'] = strtotime($_REQUEST['end_time']);     
    }
    if (!empty($_REQUEST["account"])) {
      $datas['account'] = $_REQUEST['account'];
    }
    if (!empty($_REQUEST["login_ip"])) {
      $datas['login_ip'] = $_REQUEST['login_ip'];
    }
    if ($_REQUEST['status']!='all') {
      $datas['status'] = $_REQUEST['status'];
    }
    $datas['login_time'] = array('between',"{$datas['start_time']},{$datas['end_time']}");
    $page_data = D("Log")->log_list($datas);
    $this->assign("list", $page_data["data"]);
    $this->assign("page", $page_data["page"]);
    $this->display("LoginLog:index");
  }
}