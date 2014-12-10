<?php
/**
*  二手房数据库特色标签model
*/
class TagModel extends UserCenterCommonModel {
  protected $tableName = 'tag';

  public function specialList( $where = array() ) {
    load("extend");
    $specials = $this->order("sort desc");
    if (!empty($where)) {
      $specials = $specials->where($where);
    }
    $specials = $specials->select();
    $list = list_to_tree($specials,'id','pid');
    $specials = array();
    tree_to_array($list,$specials);
    return $specials;
  }

}
