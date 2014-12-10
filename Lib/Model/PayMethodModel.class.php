<?php
/**
*  二手房数据库支付方式model
*/
class PayMethodModel extends UserCenterCommonModel {
  protected $tableName = 'pay_method';

  public function paymentList( $where = array() ) {
    load("extend");
    $payments = $this->order("sort desc");
    if (!empty($where)) {
      $payments = $payments->where($where);
    }
    $payments = $payments->select();
    $list = list_to_tree($payments,'id','pid');
    $payments = array();
    tree_to_array($list,$payments);
    return $payments;
  }

}
