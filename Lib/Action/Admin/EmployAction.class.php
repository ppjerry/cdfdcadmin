<?php  
/**
*招聘
**/
class EmployAction extends CommonAction{
  protected $db;
  function __construct() {
    parent::__construct();
    $this->db = D('Employ');
  } 

  public function index(){
  	$search = array();
    if (isset($_GET['search'])) {
      if($_GET['start_time'] && !is_numeric($_GET['start_time'])) {
        $search['created_at'] = array( 'gt', $_GET['start_time'] );
      }
      if($_GET['end_time'] && !is_numeric($_GET['end_time'])) {
        $search['created_at'] = array( 'lt', $_GET['end_time'] );
      }
      /*if ($_GET['posids'] != "") {
        $search['posids'] = intval($_GET['posids']);
      }*/
      if ($_GET['is_broker'] != "") {
        $search['is_broker'] = intval($_GET['is_broker']);
      }
      if ($_GET['is_individual'] != "") {
        $search['is_individual'] = intval($_GET['is_individual']);
      }
      if ($_GET['type'] != "") {
        $search['type'] = intval($_GET['type']);
      }
      if ($_GET['keyword']) {
        switch (intval($_GET['searchtype'])) {
          case 0:
          $search['title'] = array( 'like', "%".safe_replace($_GET['keyword'])."%" );
          break;
          case 1:
          $search['community_name'] = array( 'like', "%".safe_replace($_GET['keyword'])."%" );
          break;
          case 2:
          $search['id'] = intval( $_GET['id'] );
          break;
          default:
          break;
        }
      }
    }
    $data = $this->db->lists( $search, "id desc" );
    $this->assign('employs',$data['data']);
    $this->assign('pages',$data['page']);
  	$this -> display();
  }

  public function edit(){
  	if (IS_POST) {
      $this->checkToken();
      $data = $_POST['info'];
      $data['welfare'] = empty( $data['welfare'] ) ? array() : json_encode($data['welfare']);
      $data['other_welfare'] = empty( $data['customer_tag'] ) ? array() : json_encode($data['customer_tag']);
      if ($this->db->where(array("id" => $_POST['id'], 'siteid' => $this->siteid))->save($data) !== false) {
        $this->success("更新成功！");
      } else {
        $this->error("更新失败! ");
      }
    } else {
      $employid = isset($_GET['id']) ? intval($_GET['id']) : 0;
      if ( empty($employid) ) {
        $this->error("房源ID不合法！");
      }
      import("ORG.Util.Form");
      $employ = $this->db->find($employid);

      $employ['welfare'] = empty( $employ['welfare'] ) ? array() : json_decode($employ['welfare'], true);

      $employ['other_welfare'] = empty( $employ['other_welfare'] ) ? array() : json_decode($employ['other_welfare'], true);
      // 学历要求
      $educations = D('Education')->order('sort desc')->select();
      $educations = array_translate($educations);
      //职位类型
      $categorys = D('Category')->order('sort desc')->select();
      $categorys = array_translate($categorys);
      //每月薪资
      $moneys = D('Money')->order('sort desc')->select();
      $moneys = array_translate($moneys);
      //工作年限
      $work_experiences = D('WorkExperience')->order('sort desc')->select();
      $work_experiences = array_translate($work_experiences);
      //公司福利
      $welfares = D('Welfare')->order('sort desc')->select();

      $this->assign( 'educations', $educations );
      $this->assign( 'categorys', $categorys );
      $this->assign( 'moneys', $moneys );
      $this->assign('work_experiences',$work_experiences);
      $this->assign('welfares',$welfares);
      $this->assign( 'employ', $employ );
  	  $this -> display();
  }
}

  public function delete(){
  	if (IS_POST) {
      $ids = $_POST['ids'];
      if (!empty($ids) && is_array($ids)) {
        foreach ($ids as $key => $value) {
          $employ = $this->db->where( array( 'siteid' => $this->siteid, 'id' => $value ) )->find();
          if ($employ) {
            $member = D('FdcMember')->find( $employ['member_id'] );
            if ($member) {
              if ($member['rent_publish_num'] > 0) {
                $member['rent_publish_num']--;
              } else {
                $member['rent_publish_num'] = 0;
              }
              D('FdcMember')->where( array('id' => $employ['member_id'] ) )->save( array( 'rent_publish_num' => $member['rent_publish_num'] ) );
            }
            $this->db->where( array( 'siteid' => $this->siteid, 'id' => $value ) )->delete();
          }
        }
        $this->success('操作完成！');
      } else {
        $this->error("您没有勾选信息");
      }
    } else {
      $employ_id = intval($_GET['id']);
      $employ = $this->db->where( array( 'siteid' => $this->siteid, 'id' => $employ_id ) )->find();
      if ($employ) {
        $member = D('FdcMember')->find( $employ['member_id'] );
        if ($member) {
          if ($member['rent_publish_num'] > 0) {
            $member['rent_publish_num']--;
          } else {
            $member['rent_publish_num'] = 0;
          }
          D('FdcMember')->where( array('id' => $employ['member_id']) )->save( array( 'rent_publish_num' => $member['rent_publish_num'] ) );
        }
        if ( $this->db->where( array( 'siteid' => $this->siteid, 'id' => $employ_id ) )->delete() ) {
          $this->success('删除成功！');
        } else {
          $this->error('删除失败！');
        }
      } else {
        $this->error('选择的房源不存在！');
      }
    }
  }

  public function check(){
  	if ($this->db->where(array( "id" => $_GET['id'], 'siteid' => $this->siteid ))->save( array('status' => $_GET['status'] )) !== false) {
      $this->success("操作成功！");
    } else {
      $this->error("操作失败! ");
    }
  }
}
?>