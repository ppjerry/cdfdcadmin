<?php
class PublicModel extends Model {
  public function userInfo() {
    $table_prefix = C("DB_PREFIX");
    $datas = $_POST;
    $M = M('user');
    if ($M->where("`account`='" . $datas['account'] . "'")->count() >= 1)  {
      $sql = "SELECT a.*,b.name,c.* FROM {$table_prefix}user AS a, {$table_prefix}role AS b, {$table_prefix}role_user AS c WHERE a.id = c.user_id AND c.role_id = b.id AND a.account = '{$datas["account"]}'";
      $info = $M->query($sql);
      $_SESSION['user_info'] = $info[0];
    }
  }
  public function login_log($account,$status=1,$type_id=1)
  {
    $M = M('login_log');
    $data['account']   = $account;
    $data['login_ip']    = get_client_ip();
    $data['login_time']  = time();
    $data['status']    = $status;
    $data['type_id']     = $type_id;
    return $M->add($data);
  }
}
