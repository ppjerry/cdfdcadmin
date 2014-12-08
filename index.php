<?php
// define("WEB_ROOT", dirname(__FILE__) . DIRECTORY_SEPARATOR);
define("ROOT_PATH", dirname(__FILE__) . DIRECTORY_SEPARATOR);
define('APP_DEBUG', true);
$sitelist = include ROOT_PATH."Conf" . DIRECTORY_SEPARATOR . "sitelist.php";
$url =  "http://".$_SERVER ['HTTP_HOST'].$_SERVER['PHP_SELF'];
if (is_array($sitelist)) {
  foreach ($sitelist as $key => $site) {
    if ( strpos($url, $site['domain'])) {
      define("SITEID", $site['siteid']);
      define("DEFAULT_STYLE", $site['default_style']);
      define("TEMPLATE", $site['template']);
      define('IS_SITE',true);
      break;
    }
  }
}
if (!defined("IS_SITE")) {
  define("SITEID", 1);
  define("DEFAULT_STYLE", $sitelist[SITEID]['default_style']);
  define("TEMPLATE", $sitelist[SITEID]['template']);
}
$subDomain  = strtolower(substr($_SERVER['HTTP_HOST'],0,strpos($_SERVER['HTTP_HOST'],'.')));
$subDomain = $subDomain ? $subDomain : 'www';
switch ($subDomain) {
  case '':
  break;
  case '':
  default:
  $siteid = 1;
  break;
}
require './Framework/ThinkPHP.php';
?>

