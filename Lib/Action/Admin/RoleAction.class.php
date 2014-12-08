<?php
class RoleAction extends CommonAction {
  public function index() {
    $this->assign("roles", D("Role")->roleList());
    $this->display();
  }
  public function add() {	
    if(IS_POST) {
      $this->checkToken();
      if(D("Role")->addRole() > 0) {
        $this->success('操作成功！',__GROUP__.'/Role/index');
      } else {
        $this->error('操作失败！',__GROUP__.'/Role/index');
      }
    } else {   		    	
      $this->display();
    }
  }
  public function edit() {
    $nid = $_REQUEST['nid'];
    if(IS_POST) {
      $this->checkToken();
      if(D("Role")->editRole($nid) > 0) {
        $this->success('操作成功！',__GROUP__.'/Role/index');
      } else {
        $this->error('操作失败！',__GROUP__.'/Role/index');
      }
    } else {
      if(empty($nid)) {
        $this->error('异常操作！',__GROUP__.'/Role/index');
      }
      $this->assign('nid',$nid);
      $this->assign("role", D("Role")->getRole($nid));
      $this->display();
    }
  }
  public function del() {
    $nid = $_GET['nid'];
    if(empty($nid)) {
      $this->error('异常操作！',__GROUP__.'/Role/index');
    }
    $m = M('role_user');
    $count = $m->where("user_id = {$nid}")->count();
    if($count > 0) {
      $this->error('请先删除该角色下的管理员帐号！',__GROUP__.'/Role/index');
    }
    if(D("Role")->delRole($nid) > 0) {
      $this->success('操作成功！',__GROUP__.'/Role/index');
    } else {
      $this->error('操作失败！',__GROUP__.'/Role/index');
    }
  }
  public function limits() {
    $role_id = intval($_REQUEST['role_id']);
    if(IS_POST) {
      // 新版权限分配  ----  李
      $sql = "INSERT INTO ". C("DB_PREFIX") ."access (`role_id`,`node_id`) VALUES ";
      foreach ($_POST['menuid'] as $key => $value) {
        $sql .= "( {$role_id}, {$value} ),";
      }
      $sql .= "({$role_id}, 1),({$role_id}, 2);";
      $mod = D('Access');
      $mod->where("role_id = '{$role_id}'")->delete();
      $rs = $mod->query($sql);
      if ( $rs === false ) {
        $this->error("操作失败");
      } else {
        $this->success('操作成功！',__GROUP__."/Role/limits/role_id/$role_id");
      }
    } else {
      $menus = D("Menu")->nodeList();
      $authorized = array();
      $access_list = D("Access")->where("role_id = {$role_id}")->field("node_id")->select();
      foreach ($access_list as $key => $value) {
        $authorized[$value['node_id']] = true;
      }
      $this->assign('authorized',$authorized);
      $this->assign("menus", $menus);
      $this->assign("role_id", $role_id);
      $this->display();
    }
  }
}
?>