<?php
  /**
  *  开发商
  */
  class DeveloperAction extends CommonAction {
    private $db;
    function __construct() {
      parent::__construct();
      $this->db = D("Developer");
    }

    public function index() {
      $data = $this->db->developer_list();
      $this->assign("developers", $data['data']);
      $this->assign("pages", $data['page']);
      $this->display();
    }

    public function add() {
      if (IS_POST) {
        $data = $_POST['info'];
        $data['siteid'] = $this->siteid;
        if ($this->db->add($data)) {
          $this->assign('dialog','add');
          $this->success("添加成功！");
        } else {
          $this->error("操作失败！");
        }
      } else {
        $this->display();
      }
    }


    public function edit() {
      if (IS_POST) {
        $data = $_POST['info'];
        if ($this->db->where(array("siteid" => $this->siteid, "id" => $_POST['id']))->save($data) !== false) {
          $this->assign('dialog','edit');
          $this->success("更新成功！");
        } else {
          $this->error("操作失败！");
        }
      } else {
        $id = intval($_GET['id']);
        $developer = $this->db->where(array("siteid" => $this->siteid, "id" => $id))->find();
        if ($developer) {
          $this->assign("developer", $developer);
          $this->display();
        } else {
          $this->error("你选择的开发商不存在！");
        }
      }
    }
    
    public function listorder() {
      if (isset($_POST['listorder']) && is_array($_POST['listorder'])) {
        $listorder = $_POST['listorder'];
        foreach ($listorder as $k => $v) {
          $this->db->where(array('id'=>$k))->save(array('listorder'=>$v));
        }
      }
      $this->success(L('operation_success'));
    }

    public function delete() {
      if (isset($_POST['ids']) && is_array($_POST['ids'])) {
        if ($this->db->where(array('id' => array('in', $_POST['ids'])))->delete() !== false) {
          $this->success('删除成功！');
        } else {
          $this->error('删除失败！');
        }
      } else {
        if ($this->db->where(array('id' => $_GET['id']))->delete() !== false) {
          $this->success('删除成功');
        } else {
          $this->error('删除失败');
        }
      }
    }
  }
?>