<?php
/**
*  二手房数据库区域model
*/
class DecorationModel extends UserCenterCommonModel {
  protected $tableName = 'decoration';

  public function decorationList( $where = array() ) {
    load("extend");
    $decorations = $this->order("sort desc");
    if (!empty($where)) {
      $decorations = $decorations->where($where);
    }
    $decorations = $decorations->select();
    $list = list_to_tree($decorations,'id','pid');
    $decorations = array();
    tree_to_array($list,$decorations);
    return $decorations;
  }

}
