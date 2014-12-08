<?php
  /**
  *  楼盘相册模型
  */
  class AlbumModel extends Model {
    public function album_list($where=array(), $order = "id desc") {
      $albums = $this->where(array_merge(array('siteid' => get_siteid()),$where))->order($order)->page((isset($_GET['p']) ? $_GET['p'] : 0).',20')->select();
      import("ORG.Util.Page");// 导入分页类
      $count      = $this->where(array_merge(array('siteid' => get_siteid()),$where))->count();// 查询满足要求的总记录数
      $Page       = new Page($count,20);// 实例化分页类 传入总记录数和每页显示的记录数
      $show       = $Page->show();// 分页显示输出
      return array("data" => $albums, "page" => $show);
    }

    public function get_album_for_house($albums) {
      $ids = explode("|", $albums);
      if ($ids) {
        $albums = $this->where(array('id' => array("in", $ids)))->select();
        return $albums;
      } else {
        return array();
      }
    }
  }

?>