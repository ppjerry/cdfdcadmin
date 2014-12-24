<?php
/**
*  商铺Controller
*/
class SaleShopAction extends CommonAction {
  protected $db;
  function __construct() {
    parent::__construct();
    $this->db = D('SaleShop');
  }

  public function index() {
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
    $this->assign('houses',$data['data']);
    $this->assign('pages',$data['page']);
    $this->display();
  }

  public function edit() {
    if (IS_POST) {
      $this->checkToken();
      $data = $_POST['info'];
      $data['room_structure'] = json_encode($data['room_structure']);
      $data['floor'] = json_encode($data['floor']);
      $data['shop_number'] = empty( $data['shop_number'] ) ? array('floor' => '', 'unit' => '', 'room' => '' ) : json_encode($data['shop_number']);
      $data['tag'] = empty( $data['tag'] ) ? array() : json_encode($data['tag']);
      $data['customer_tag'] = empty( $data['customer_tag'] ) ? array() : json_encode($data['customer_tag']);
      $data['supporting'] = empty( $data['supporting'] ) ? array() : json_encode($data['supporting']);
      $data['shop_manager_type'] = empty( $data['shop_manager_type'] ) ? array() : json_encode($data['shop_manager_type']);
      $data['room_images'] = empty( $data['room_images'] ) ? array() : json_encode($data['room_images']);
    
     // 更新缩略图
      if ( !empty( $data['room_images'] ) ) {
        $data['thumbnail'] = current($data['room_images'])['url'];
      }
      // 修改更新时间
      $data['updated_at'] = date("Y-m-d H:i:s");

      if ($this->db->where(array("id" => $_POST['id'], 'siteid' => $this->siteid))->save($data) !== false) {

        /* 更新房源公共表 */
        D("SaleCommon")->where( array( 'type' => 'house', 'foreign_id' => $_POST['id'] ) )->save($data);
        /* 更新房源公共表 END */

        // 推荐位处理
        $position_data_model = D('PositionData');
        $position_data_model->where( array( 'id' => $_POST['id'], 'module' => 'Sale', 'siteid' => $this->siteid, 'type' => 'house' ) )->delete();
        if ( !empty($data['posids']) && is_array($data['posids']) ) {
          foreach ($data['posids'] as $key => $value) {
            $position_data_model->add( array( 'id' => $_POST['id'], 'posid' => $value, 'module' => 'Sale', 'siteid' => $this->siteid, 'type' => 'house' ) );
            // echo $position_data_model->getLastSql();
          }
        }
        // 推荐位处理END
        $this->success("更新成功！");
      } else {
        $this->error("更新失败! ");
      }
    } else {
      $shopid = isset($_GET['id']) ? intval($_GET['id']) : 0;
      if ( empty($shopid) ) {
        $this->error("房源ID不合法！");
      }
      import("ORG.Util.Form");
      $shop = $this->db->find($shopid);
      /*$shop['room_structure'] = json_decode($shop['room_structure'], true);
      $shop['floor'] = json_decode($shop['floor'], true);
      */
      $shop['shop_number'] = empty( $shop['shop_number'] ) ? array('floor' => '', 'unit' => '', 'room' => '' ) : json_decode($shop['shop_number'], true);
      $shop['tag'] = empty( $shop['tag'] ) ? array() : json_decode($shop['tag'], true);

      $shop['customer_tag'] = empty( $shop['customer_tag'] ) ? array() : json_decode($shop['customer_tag'], true);

      $shop['supporting'] = empty( $shop['supporting'] ) ? array() : json_decode($shop['supporting'], true);

      $shop['shop_manager_type'] = empty( $shop['shop_manager_type'] ) ? array() : json_decode($shop['shop_manager_type'], true);

      $shop['room_images'] = empty( $shop['room_images'] ) ? array() : json_decode($shop['room_images'], true);

      // 区域一级
      $regions = D('Region')->where( array( 'belong' => array( 'in', array( 0, 3 ) ), 'pid' => 0 ) )->order('sort desc')->select();
      $regions = array_translate($regions);
      // 区域二级
      $areas = D('Region')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      $areas = array_key_translate($areas);
      // 朝向
      $directions = D('Direction')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      $directions = array_translate($directions);
      // 装修
      $decorations = D('Decoration')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      $decorations = array_translate($decorations);
      // 房屋配套
      $house_supportings = D('HouseSupporting')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      // 特色标签
      $tags = D('Tag')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      //商铺类型
      $genres = D('EsfType')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      $genres = array_translate($genres);
      //铺面类型
      $shoptypes = D('ShopFaceType')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();
      $shoptypes = array_translate($shoptypes);
      //可经营类别
      $categorys = D('ShopManagerType')->where( array( 'belong' => array( 'in', array( 0, 3 ) ) ) )->order('sort desc')->select();

       // 载入推荐位
      $positionstr = D('Position')->getPositionCheckbox( 'Sale', $shopid );
      $this->assign( 'positionstr', $positionstr );

      $this->assign( 'shop', $shop );
      $this->assign( 'regions', $regions );
      $this->assign( 'areas', $areas );
      $this->assign( 'directions', $directions );
      $this->assign( 'decorations', $decorations );
      $this->assign( 'genres', $genres );
      $this->assign( 'shoptypes', $shoptypes );
      $this->assign( 'house_supportings', $house_supportings );
      $this->assign( 'categorys', $categorys );
      $this->assign( 'tags', $tags );
      $this->display();
    }
  }

  public function delete() {
    if (IS_POST) {
      $ids = $_POST['ids'];
      if (!empty($ids) && is_array($ids)) {
        foreach ($ids as $key => $value) {
          $shop = $this->db->where( array( 'siteid' => $this->siteid, 'id' => $value ) )->find();
          if ($shop) {
            $member = D('FdcMember')->find( $shop['member_id'] );
            if ($member) {
              if ($member['rent_publish_num'] > 0) {
                $member['rent_publish_num']--;
              } else {
                $member['rent_publish_num'] = 0;
              }
              D('FdcMember')->where( array('id' => $shop['member_id'] ) )->save( array( 'rent_publish_num' => $member['rent_publish_num'] ) );
            }
            // 更新会员信息END
            if ( $this->db->where( array( 'siteid' => $this->siteid, 'id' => $value ) )->delete() ) {
              $sale_common = D("SaleCommon")->where( array( 'type' => 'house', 'foreign_id' => $value ) )->find();
              if ($sale_common) {
                // 更新公共表信息
                D("SaleCommon")->where( array( 'type' => 'house', 'foreign_id' => $value ) )->delete();
                // 删除推荐数据
                D('PositionData')->where( array( 'id' => $value, 'module' => 'Sale', 'siteid' => $this->siteid, 'type' => 'house' ) )->delete();
              }
            }
          }
        }
        $this->success('操作完成！');
      } else {
        $this->error("您没有勾选信息");
      }
    } else {
      $shop_id = intval($_GET['id']);
      $shop = $this->db->where( array( 'siteid' => $this->siteid, 'id' => $shop_id ) )->find();
      if ($shop) {
        $member = D('FdcMember')->find( $shop['member_id'] );
        if ($member) {
          if ($member['rent_publish_num'] > 0) {
            $member['rent_publish_num']--;
          } else {
            $member['rent_publish_num'] = 0;
          }
          D('FdcMember')->where( array('id' => $shop['member_id']) )->save( array( 'rent_publish_num' => $member['rent_publish_num'] ) );
        }
         if ( $this->db->where( array( 'siteid' => $this->siteid, 'id' => $house_id ) )->delete() ) {
          // 删除公共表信息
          D("SaleCommon")->where( array( 'type' => 'house', 'foreign_id' => $house_id ) )->delete();
          // 删除推荐数据
          D('PositionData')->where( array( 'id' => $house_id, 'module' => 'Sale', 'siteid' => $this->siteid, 'type' => 'house' ) )->delete();
          $this->success('删除成功！');
        } else {
          $this->error('删除失败！');
        }
      } else {
        $this->error('选择的房源不存在！');
      }
    }
  }

  public function check() {
    if ($this->db->where(array( "id" => $_GET['id'], 'siteid' => $this->siteid ))->save( array('status' => $_GET['status'] )) !== false) {
      $this->success("操作成功！");
    } else {
      $this->error("操作失败! ");
    }
  }

}