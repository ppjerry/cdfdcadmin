<?php
class ModelModel extends Model {
  public function sql_execute($sql) {
    $sqls = $this->sql_split($sql);
    if(is_array($sqls)) {
      foreach($sqls as $sql) {
        if(trim($sql) != '') {
          $this->query($sql);
        }
      }
    } else {
      $this->query($sqls);
    }
    return true;
  }

  public function sql_split($sql) {
    if(mysql_get_server_info() > '4.1' && C('DB_CHARSET')) {
      $sql = preg_replace("/TYPE=(InnoDB|MyISAM|MEMORY)( DEFAULT CHARSET=[^; ]+)?/", "ENGINE=\\1 DEFAULT CHARSET=".C('DB_CHARSET'),$sql);
    }
    if(C('DB_PREFIX') != "tb_") $sql = str_replace("tb_", C('DB_PREFIX'), $sql);
    $sql = str_replace("\r", "\n", $sql);
    $ret = array();
    $num = 0;
    $queriesarray = explode(";\n", trim($sql));
    unset($sql);
    foreach($queriesarray as $query) {
      $ret[$num] = '';
      $queries = explode("\n", trim($query));
      $queries = array_filter($queries);
      foreach($queries as $query) {
        $str1 = substr($query, 0, 1);
        if($str1 != '#' && $str1 != '-') $ret[$num] .= $query;
      }
      $num++;
    }
    return($ret);
  }

  /**
   * 删除表
   * 
   */
  public function drop_table($tablename) {
    $tablename = C('DB_PREFIX').$tablename;
    return $this->query("DROP TABLE $tablename");
    /*$tablearr = $this->list_tables();
    if(in_array($tablename, $tablearr)) {
      return $this->query("DROP TABLE $tablename");
    } else {
      return false;
    }*/
  }
}
?>