<?php
/**
*  二手房数据库类型model
*/
class GenreModel extends UserCenterCommonModel {
  protected $tableName = 'type';

  public function genreList( $where = array() ) {
    load("extend");
    $genres = $this->order("sort desc");
    if (!empty($where)) {
      $genres = $genres->where($where);
    }
    $genres = $genres->select();
    $list = list_to_tree($genres,'id','pid');
    $genres = array();
    tree_to_array($list,$genres);
    return $genres;
  }

}
