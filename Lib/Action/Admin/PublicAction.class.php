<?php
class PublicAction extends Action {
  public function index() {
    header("Location:".__GROUP__."/public/login");
  }

  //验证码
  public function verify() {
    $type    =   isset($_GET['type'])?$_GET['type']:'gif';
    import("ORG.Util.Image");
    Image::buildImageVerify(4,1,$type);
  }

  public function login() {
    if(!isset($_SESSION[C('USER_AUTH_KEY')])) {
      $this->display();
    }else{
      header("Location:".__GROUP__.'/Index');
    }
  }

  // 用户登出
  public function loginout() {
    if(isset($_SESSION[C('USER_AUTH_KEY')])) {
      unset($_SESSION[C('USER_AUTH_KEY')]);
      unset($_SESSION);
      session_destroy();
      $this->success('登出成功！',__URL__.'/login/');
    }else {
      $this->error('已经登出！');
    }
  }

  // 登录检测
  public function checkLogin() {
    if(empty($_POST['account'])) {
      $this->error('帐号错误！');
    }elseif (empty($_POST['password'])){
      $this->error('密码必须！');
    }elseif (empty($_POST['verify'])){
      $this->error('验证码必须！');
    }
        //生成认证条件
    $map            =   array();
        // 支持使用绑定帐号登录
    $map['account'] = $_POST['account'];
    $map["status"]  =   array('gt',0);

    if($_SESSION['verify'] != md5($_POST['verify'])) {
      D("Public")->login_log($map['account'],0,1);
      $this->error('验证码错误！');
    }
    import ('ORG.Util.RBAC');
    $authInfo = RBAC::authenticate($map);

        //使用用户名、密码和状态的方式进行认证
    if(false === $authInfo) {
      D("Public")->login_log($map['account'],0,1);
      $this->error('帐号不存在或已禁用！');
    }else {
      if($authInfo['password'] != md5($_POST['password'])) {
        D("Public")->login_log($map['account'],0,1);
        $this->error('密码错误！');
      }
      D("Public")->userInfo();
      $_SESSION[C('USER_AUTH_KEY')] = $authInfo['id'];
      $_SESSION['lastLoginTime'] = $authInfo['last_login_time'];

      // 站点ID设置
      $_SESSION['siteid'] = 1;
      if($authInfo['role_id']==1) {
        $_SESSION['administrator']      =   true;
      }
      //保存登录信息
      $User   =   M('User');
      $ip     =   get_client_ip();
      $time   =   time();
      $data = array();
      $data['id'] =   $authInfo['id'];
      $data['last_login_time']    =   $time;
      $data['last_login_ip']  =   $ip;
      $User->save($data);
      //保存日志
      D("Public")->login_log($map['account'],1,1);
      // 缓存访问权限
      RBAC::saveAccessList();
      $this->success('登录成功！',__GROUP__.'/Index');
    }
  }
}
?>