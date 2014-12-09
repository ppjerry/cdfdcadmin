<?php
/**
*  二手房数据库商铺铺面类型model
*/
class ShopTypeModel extends UserCenterCommonModel {
  protected $tableName = 'shop_face_type';

  public function shoptypeList( $where = array() ) {
    load("extend");
    $shoptypes = $this->order("sort desc");
    if (!empty($where)) {
      $shoptypes = $shoptypes->where($where);
    }
    $shoptypes = $shoptypes->select();
    $list = list_to_tree($shoptypes,'id','pid');
    $shoptypes = array();
    tree_to_array($list,$shoptypes);
    return $shoptypes;
  }

}
