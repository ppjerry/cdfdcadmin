<?php
  /**
  * 系统站点管理
  */
  class SiteAction extends CommonAction {
    protected $db;
    function __construct() {
      parent::__construct();
      $this->db = D('Site');
    }

    public function index() {
      $sites = $this->db->select();
      $this->assign('sites',$sites);
      $this->display();
    }

    public function edit() {
      $siteid = isset($_GET['siteid']) && intval($_GET['siteid']) ? intval($_GET['siteid']) : $this->error(L('illegal_parameters'));
      if ($site = $this->db->where(array('id'=>$siteid))->find()) {
        if (IS_POST) {
          $this->checkToken();
          $data = $_POST['info'];
          $data['setting'] = array2string($_POST['setting']);
          if ($this->db->where(array('id'=> $siteid))->save($data) !== false) {
            $this->db->set_cache();
            $this->success(L('setting_succ'));
          } else {
            $this->error(L('operation_failure'));
          }
        } else {
          $template_list = template_list();
          $setting = string2array($site['setting']);
          $setting['watermark_img'] = str_replace('statics/images/water/','',$setting['watermark_img']);
          $this->assign('template_list',$template_list);
          $this->assign('setting',$setting);
          $this->assign('data',$site);
          $this->display();
        }
      } else {
        $this->error(L('notfound'));
      }
    }

    public function public_name() {
      $name = isset($_GET['name']) && trim($_GET['name']) ? trim($_GET['name']) : exit('0');
      $siteid = isset($_GET['siteid']) && intval($_GET['siteid']) ? intval($_GET['siteid']) : exit('0');
      if ($this->db->where(array('id'=> array('not in', $siteid), 'name' => $name))->find()) {
        exit('0');
      } else {
        exit('1');
      }
    }

    public function public_dirname() {
      $dirname = isset($_GET['dirname']) && trim($_GET['dirname']) ? trim($_GET['dirname']) : exit('0');
      $siteid = isset($_GET['siteid']) && intval($_GET['siteid']) ? intval($_GET['siteid']) : exit('0');
      if ($this->db->where(array('id'=> array('not in', $siteid), 'dirname' => $dirname))->find()) {
        exit('0');
      } else {
        exit('1');
      }
    }

  }
  ?>