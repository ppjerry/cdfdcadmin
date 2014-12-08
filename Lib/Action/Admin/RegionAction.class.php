<?php
/**
*  房源附属内容处理
*/
class RegionAction extends CommonAction {
  protected $db;
  function __construct() {
    parent::__construct();
    $this->db = D('Region');
  }

  public function index() {
    if (isset( $_GET['type'] )) {
      $regions = $this->db->regionList( array( 'belong' => array( 'in' , array( 0, intval($_GET['type']) ) ) ) );
    } else {
      $regions = $this->db->regionList( array( 'belong' => 0 ) );
    }
    $this->assign('regions',$regions);
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
        $parent_region = $this->db->find($pid);
        $this->assign( 'parent_region', $parent_region );
      }
      $this->assign( 'type', isset($parent_region['belong']) ? $parent_region['belong'] : 0 );
      $this->assign('types', array( '1' => '新房', '2' => '二手房', '3' => '商铺', '4' => '写字楼', '5' => '别墅' ));
      $regions = $this->db->where( array( 'pid' => 0 ) )->select();
      $this->assign( 'pid', $pid );
      $this->assign( 'regions', $regions );
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
      $region = $this->db->find($_GET['id']);
      $regions = $this->db->where( array( 'pid' => 0 ) )->select();
      $this->assign('regions', $regions);
      $this->assign('region', $region);
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