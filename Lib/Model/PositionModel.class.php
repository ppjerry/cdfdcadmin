<?php
  /**
  * 
  */
  class PositionModel extends Model
  {
    protected $autoCheckFields = false;

    public function get_position_data($posid, $order = "posdata.listorder desc, posdata.id desc", $field = "posdata.*", $limit=10) {

      $data = $this->table( array(C('DB_PREFIX')."position_data" => "posdata", C('DB_PREFIX')."position" => "pos") )->where("pos.id = posdata.posid and pos.id = %d", $posid)->order($order)->limit($limit)->field($field)->select();
      // echo $this->getLastSql();
      return $data;
      // return $this->query("select posdata.*, cat.catname from ". C('DB_PREFIX') . "position_data as posdata, ". C('DB_PREFIX') . "category as cat where posdata.catid = cat.id and posdata.posid = ".$posid);
    }
  }

?>