<?php
/**
*  二手房数据库支付方式model
*/
class RegionModel extends UserCenterCommonModel {
  protected $tableName = 'pay_method';

  public function regionList( $where = array() ) {
    load("extend");
    $regions = $this->order("sort desc");
    if (!empty($where)) {
      $regions = $regions->where($where);
    }
    $regions = $regions->select();
    $list = list_to_tree($regions,'id','pid');
    $regions = array();
    tree_to_array($list,$regions);
    return $regions;
  }

}
