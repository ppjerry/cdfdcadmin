<?php

  /**
  *  户型
  */
  class HxAction extends CommonAction {
    private $db;
    function __construct() {
      parent::__construct();
      $this->db = D("Huxing");
    }

    public function index() {

      $search = array();
      if (isset($_GET['search'])) {
        if($_GET['start_time'] && !is_numeric($_GET['start_time'])) {
          $search['inputtime'] = array('gt',strtotime($_GET['start_time']));
        }
        if($_GET['end_time'] && !is_numeric($_GET['end_time'])) {
          $search['inputtime'] = array('lt',strtotime($_GET['end_time']));
        }
        if ($_GET['keyword']) {
          switch (intval($_GET['searchtype'])) {
            case 0:
            $search['title'] = array('like', "%".safe_replace($_GET['keyword'])."%");
            break;
            case 1:
            $search['id'] = intval($_GET['keyword']);
            break;
            default:
            break;
          }
        }
      }
      $hxs = $this->db->lists($search, "listorder desc, id desc");
      $this->assign("hxs", $hxs['data']);
      $this->assign("pages", $hxs['page']);
      $this->display();
    }

    public function add() {
      if (IS_POST) {
        $data = $_POST['hx'];
        $data['siteid'] = $this->siteid;
        $data['housetype'] = join(",", $_POST['housetype']);
        $data['inputtime'] = $data['updatetime'] = time();
        if ($this->db->add($data)) {
          $this->success("添加成功！");
        } else {
          $this->error("操作失败！");
        }
      } else {
        $property = M('Property')->where("siteid = %d", $this->siteid)->select();
        $this->assign("property", array_translate($property));
        $this->display();
      }
    }

    public function edit() {
      if (IS_POST) {
        $data = $_POST['hx'];
        $data['housetype'] = join(",", $_POST['housetype']);
        $data['updatetime'] = time();
        if ($this->db->where(array("siteid" => $this->siteid, "id" => $_POST['id']))->save($data) !== false) {
          $this->assign('dialog','edit');
          $this->success("更新成功！");
        } else {
          $this->assign('dialog','edit');
          $this->error("操作失败！");
        }
      } else {
        $property = M('Property')->where("siteid = %d", $this->siteid)->select();
        $this->assign("property", array_translate($property));
        $hxid = intval($_GET['id']);
        $hx = $this->db->where(array("siteid" => $this->siteid, "id" => $hxid))->find();
        if ($hx) {
          $hx['housetype'] = explode(",", "");
          $this->assign("hx", $hx);
          $this->display();
        } else {
          $this->error("你查找的户型不存在！");
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
      if (isset($_POST['hxid']) && is_array($_POST['hxid'])) {
        if ($this->db->where(array('id' => array('in', $_POST['hxid'])))->delete() !== false) {
          $this->success('删除成功！');
        } else {
          $this->error('删除失败！');
        }
      } else {
        if ($this->db->where(array('id' => $_GET['hxid']))->delete() !== false) {
          $this->success('删除成功');
        } else {
          $this->error('删除失败');
        }
      }
    }


    public function photo() {
      if (IS_AJAX) {
        $id = $_POST['id'];
        if (!isset($id)) {
          exit(json_encode(array("status" => "error", "msg" => "ID不能为空")));
        }
        $album = $this->db->find($id);
        if ($album) {
          $urls = $_POST['urls'];
          $url_a = explode("|", $urls);
          $names = $_POST['names'];
          $name_a = explode("|", $names);
          if (!empty($album['photos'])) {
            $album['photos'] = string2array($album['photos']);
            $url_a = array_merge($url_a, $album['photos']['url']);
            $name_a = array_merge($name_a, $album['photos']['name']);
          }
          $photos = array("url" => $url_a, "name" =>$name_a);
          $data["photos"] = array2string($photos);
          if ($this->db->where(array("id" => $id))->save($data) !== false) {
            exit(json_encode(array("status" => "success")));
          } else {
            exit(json_encode(array("status" => "error", "msg" => "更新失败")));
          }
        } else {
          exit(json_encode(array("status" => "error", "msg" => "相册ID不合法")));
        }
      } else {
        $id = $_GET['id'];
        if (!isset($id)) {
          exit("ID不能为空");
        }
        $album = $this->db->find($id);
        if ($album) {
          $album['photos'] = string2array($album['photos']);
          $this->assign("id" , $id);
          $this->assign("album" , $album);
          $this->display();
        } else {
          exit("户型不存在！");
        }
      }
    }

    
    public function photodelete() {
      if (IS_AJAX) {
        $id = $_POST['id'];
        if (!isset($id)) {
          exit(json_encode(array("status" => "error", "msg" => "ID不能为空")));
        }
        $album = $this->db->find($id);
        if ($album) {
          $photos = string2array($album['photos']);
          $url = $_POST['url'];
          $name = $_POST['name'];
          foreach ($photos['url'] as $key => $value) {
            if ($value == $url) {
              unset($photos['url'][$key]);
              unset($photos['name'][$key]);
              break;
            }
          }
          $data['photos'] = array2string($photos);
          if ($this->db->where(array("id" => $id))->save($data) !== false) {
            exit(json_encode(array("status" => "success")));
          } else {
            exit(json_encode(array("status" => "error", "msg" => "删除失败")));
          }
        } else {
          exit(json_encode(array("status" => "error", "msg" => "户型不存在")));
        }
      }
    }

    public function photoedit() {
      if (IS_AJAX) {
        $id = $_POST['id'];
        if (!isset($id)) {
          exit(json_encode(array("status" => "error", "msg" => "ID不能为空")));
        }
        $album = $this->db->find($id);
        if ($album) {
          $photos = string2array($album['photos']);
          $url = $_POST['url'];
          $name = $_POST['name'];
          foreach ($photos['url'] as $key => $value) {
            if ($value == $url) {
              $photos['name'][$key] = $name;
              break;
            }
          }
          $data['photos'] = array2string($photos);
          if ($this->db->where(array("id" => $id))->save($data) !== false) {
            exit(json_encode(array("status" => "success")));
          } else {
            exit(json_encode(array("status" => "error", "msg" => "更新失败")));
          }
        } else {
          exit(json_encode(array("status" => "error", "msg" => "户型不存在")));
        }
      }
    }
  }
  ?>