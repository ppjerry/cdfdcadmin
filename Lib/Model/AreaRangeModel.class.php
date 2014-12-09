<?php
/**
*  二手房数据库区域model
*/
class AreaRangeModel extends UserCenterCommonModel {
  protected $tableName = 's_area';

  public function homeareaList( $where = array() ) {
    load("extend");
    $homeareas = $this->order("sort desc");
    if (!empty($where)) {
      $homeareas = $homeareas->where($where);
    }
    $homeareas = $homeareas->select();
    $list = list_to_tree($homeareas,'id','pid');
    $homeareas = array();
    tree_to_array($list,$homeareas);
    return $homeareas;
  }

}
