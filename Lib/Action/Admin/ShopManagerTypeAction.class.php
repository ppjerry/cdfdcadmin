<?php
/**
*  商铺可经营类别
*/
class ShopManagerTypeAction extends CommonAction {
  protected $db;
  function __construct() {
    parent::__construct();
    $this->db = D('ShopManagerType');
  }

  public function index() {
    if (isset( $_GET['type'] )) {
      $categorys = $this->db->where( array( 'belong' => array( 'in' , array( 0, intval($_GET['type']) ) ) ) )->order("sort desc")->select();
    } else {
      $categorys = $this->db->where( array( 'belong' => 0 ) )->order("sort desc")->select();
    }
    $this->assign('categorys',$categorys);
    $this->assign('types', array( '1' => '新房', '2' => '二手房', '3' => '商铺', '4' => '写字楼', '5' => '别墅' ));
    $this->display();
  }

  public function add() {
    if (IS_POST) {
      $this->checkToken();
      $data = $_POST['info'];
      $data['siteid'] = $this->siteid;
      if ($id = $this->db->add($data)) {
        $this->success('添加成功', 'index');
      } else {
        $this->success('操作失败', 'index');
      }
    } else {
      $pid = isset( $_GET['pid'] ) ? intval($_GET['pid']) : 0;
      if ( !empty($pid) ) {
        $parent_category = $this->db->find($pid);
        $this->assign( 'parent_category', $parent_category );
      }
      $this->assign( 'type', isset($parent_category['belong']) ? $parent_category['belong'] : 0 );
      $this->assign('types', array( '1' => '新房', '2' => '二手房', '3' => '商铺', '4' => '写字楼', '5' => '别墅' ));
      $categorys = $this->db->where( array( 'pid' => 0 ) )->select();
      $this->assign( 'pid', $pid );
      $this->assign( 'categorys', $categorys );
      $this->display();
    }
  }

  public function edit() {
    if (IS_POST) {
      $this->checkToken();
      $data = $_POST['info'];
      if ($this->db->where("id = %d",$_POST['id'])->save($data) !== false) {
        $this->success("更新成功！");
      } else {
        $this->error("更新失败! ");
      }
    } else {
      $category = $this->db->find($_GET['id']);
      $categorys = $this->db->where( array( 'pid' => 0 ) )->select();
      $this->assign('categorys', $categorys);
      $this->assign('category', $category);
      $this->assign('types', array( '1' => '新房', '2' => '二手房', '3' => '商铺', '4' => '写字楼', '5' => '别墅' ));
      $this->display();
    }
  }

  public function listorder() {
    if (isset($_POST['listorders']) && is_array($_POST['listorders'])) {
      $sort = $_POST['listorders'];
      foreach ($sort as $k => $v) {
        $this->db->where(array('id'=>$k))->save(array('sort'=>$v));
      }
    }
    $this->success('排序成功');
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