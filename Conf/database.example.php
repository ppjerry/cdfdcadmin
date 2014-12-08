<?php
return array(
  'DB_TYPE'         => 'pdo', // 数据库类型
  'DB_PREFIX'       => 'xy_', // 数据库表前缀 
  'DB_PORT'         => 3306,
  // 普通配置
  'DB_USER'         => 'user', // 用户名
  'DB_PWD'          => 'pass', // 密码
  'DB_HOST'         => 'localhost',
  'DB_NAME'         =>'DB_NAME',
  // DNS 配置 采用DNS配置，必须也同时普通配置。
  'DB_DSN'          => 'mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;port=3306;dbname=DB_NAME;',
  );