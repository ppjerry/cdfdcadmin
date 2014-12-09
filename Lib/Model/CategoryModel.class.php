<?php
/**
*  二手房数据库商铺可经营类别model
*/
class CategoryModel extends UserCenterCommonModel {
  protected $tableName = 'shop_manager_type';

  public function categoryList( $where = array() ) {
    load("extend");
    $categorys = $this->order("sort desc");
    if (!empty($where)) {
      $categorys = $categorys->where($where);
    }
    $categorys = $categorys->select();
    $list = list_to_tree($categorys,'id','pid');
    $categorys = array();
    tree_to_array($list,$categorys);
    return $categorys;
  }

}
