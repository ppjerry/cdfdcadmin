<?php
/**
*  二手房出售公共Controller
*/
class SaleAction extends CommonAction {
  protected $db;
  function __construct() {
    parent::__construct();
    $this->db = D('SaleCommon');
  }
}