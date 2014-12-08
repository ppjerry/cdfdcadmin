<?php
/**
*  cdfdc_usercenter 数据库公共模型
*/
class UserCenterCommonModel extends Model {
  function __construct() {
    parent::__construct( C('esf.DB_NAME'), C('esf.DB_PREFIX'), C('esf') );
  }
}