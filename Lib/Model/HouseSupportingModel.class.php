<?php
/**
*  二手房数据库房屋配套model
*/
class HouseSupportingModel extends UserCenterCommonModel {
  protected $tableName = 'house_supporting';

  public function assortList( $where = array() ) {
    load("extend");
    $assorts = $this->order("sort desc");
    if (!empty($where)) {
      $assorts = $assorts->where($where);
    }
    $assorts = $assorts->select();
    $list = list_to_tree($assorts,'id','pid');
    $assorts = array();
    tree_to_array($list,$assorts);
    return $assorts;
  }

}
