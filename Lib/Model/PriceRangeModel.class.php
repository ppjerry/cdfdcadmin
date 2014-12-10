<?php
/**
*  二手房数据库前台价格区间model
*/
class PriceRangeModel extends UserCenterCommonModel {
  protected $tableName = 's_price';

  public function pricerangeList( $where = array() ) {
    load("extend");
    $priceranges = $this->order("sort desc");
    if (!empty($where)) {
      $priceranges = $priceranges->where($where);
    }
    $priceranges = $priceranges->select();
    $list = list_to_tree($priceranges,'id','pid');
    $priceranges = array();
    tree_to_array($list,$priceranges);
    return $priceranges;
  }

}
