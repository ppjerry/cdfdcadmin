<?php
/**
*  二手房数据库朝向model
*/
class DirectionModel extends UserCenterCommonModel {
  protected $tableName = 'direction';

  public function towardList( $where = array() ) {
    load("extend");
    $towards = $this->order("sort desc");
    if (!empty($where)) {
      $towards = $towards->where($where);
    }
    $towards = $towards->select();
    $list = list_to_tree($towards,'id','pid');
    $towards = array();
    tree_to_array($list,$towards);
    return $towards;
  }

}
