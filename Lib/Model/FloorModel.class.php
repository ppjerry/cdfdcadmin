<?php
/**
*  二手房数据库楼层model
*/
class FloorModel extends UserCenterCommonModel {
  protected $tableName = 'floor';

  public function layerList( $where = array() ) {
    load("extend");
    $layers = $this->order("sort desc");
    if (!empty($where)) {
      $layers = $layers->where($where);
    }
    $layers = $layers->select();
    $list = list_to_tree($layers,'id','pid');
    $layers = array();
    tree_to_array($list,$layers);
    return $layers;
  }

}
