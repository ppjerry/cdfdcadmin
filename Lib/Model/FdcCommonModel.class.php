<?php
/**
*  fdc 数据库公共模型
*/
class FdcCommonModel extends Model {
  function __construct() {
    parent::__construct( C('fdc.DB_NAME'), C('fdc.DB_PREFIX'), C('fdc') );
  }
}