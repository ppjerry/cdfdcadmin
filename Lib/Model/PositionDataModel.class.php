<?php
  /**
  * 推荐位数据管理
  */
  class PositionDataModel extends Model {
    // protected $tableName = 'position_data';
    public function dropByPosid( $posid ) {
      return $this->where(array( 'posid' => $posid ))->delete();
    }
  }
?>