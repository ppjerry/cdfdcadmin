<?php
  /**
  *  楼盘Controller
  */
  class HouseAction extends CommonAction{
    protected $db, $intent_db, $activity_db, $position_db;
    function __construct() {
      parent::__construct();
      $this->db = D("House");
      $this->intent_db = D("Intent");
      $this->activity_db = D("Activity");
      $this->position_db = D("Position");
    }

    public function index() {
      $search = array();
      if (isset($_GET['search'])) {
        if($_GET['start_time'] && !is_numeric($_GET['start_time'])) {
          $search['inputtime'] = array('gt',strtotime($_GET['start_time']));
        }
        if($_GET['end_time'] && !is_numeric($_GET['end_time'])) {
          $search['inputtime'] = array('lt',strtotime($_GET['end_time']));
        }
        if ($_GET['posids'] != "") {
          $search['posids'] = intval($_GET['posids']);
        }
        if ($_GET['keyword']) {
          switch (intval($_GET['searchtype'])) {
            case 0:
            $search['title'] = array('like', "%".safe_replace($_GET['keyword'])."%");
            break;
            case 1:
            $search['description'] = array('like', "%".safe_replace($_GET['keyword'])."%");
            break;
            case 2:
            $search['username'] = safe_replace($_GET['keyword']);
            case 3:
            $search['id'] = intval($_GET['keyword']);
            break;
            default:
            break;
          }
        }
      }
      $data = $this->db->house_list($search, "listorder desc, id desc");
      $this->assign('houses',$data['data']);
      $this->assign('pages',$data['page']);
      $this->display();
    }

    public function add() {
      if (IS_POST) {
        $hash[C('TOKEN_NAME')] = $_POST[C('TOKEN_NAME')];
        if (!$this->db->autoCheckToken($hash)) {
          $this->error('令牌验证失败！');
        }
        $data = $_POST['info'];

        if (is_array($data['propertyid'])) {
          $data['propertyid'] = join(",", $data['propertyid']);
        }
        
        if (is_array($data['layerid'])) {
          $data['layerid'] = join(",", $data['layerid']);
        }

        if($_POST['inputtime'] && !is_numeric($_POST['inputtime'])) {
          $data['inputtime'] = strtotime($_POST['inputtime']);
        } else {
          $data['inputtime'] = time();
        }

        if($_POST['transferdate'] && !is_numeric($_POST['transferdate'])) {
          $data['transferdate'] = strtotime($_POST['transferdate']);
        } else {
          $data['transferdate'] = time();
        }

        if($_POST['opendate'] && !is_numeric($_POST['opendate'])) {
          $data['opendate'] = strtotime($_POST['opendate']);
        } else {
          $data['opendate'] = time();
        }

        $data['siteid'] = $this->siteid;
        if ($houseid = $this->db->add(trim_script($data))) {
          //更新URL地址
          if($data['islink']==1) {
            $url = trim_script($_POST['linkurl']);
            $url = str_replace(array('select ',')','\\','#',"'"),' ',$urls[0]);
          } else {
            $url = U( C("DEFAULT_GROUP") . '/Index/project','id='.$houseid);
          }
          $this->db->where("id = %d", $houseid)->save(array('url' => $url));
          // 发布到推荐位
          if (isset($data['posids']) && is_array($data['posids'])) {
            foreach ($data['posids'] as $key => $posid) {
              $position_data = array('id' => $houseid, 'posid' => $posid, 'module' => 'House', 'thumb' => $data['thumb'], 'siteid' => $data['siteid'], 'listorder' => $houseid, 'data' => var_export(array('title' => $data['title'], 'url' => $url, 'description' => $data['description'], 'inputtime' => $data['inputtime']), true));
              D('PositionData')->add($position_data);
              // echo D('PositionData')->getLastSql();
            }
            $this->db->where("id = %d", $houseid)->save(array('posids' => 1));
          }
          // END 发布到推荐位

          // 附表
          $data['relation'] = array2string($data['relation']);
          $content_data = array('id' => $houseid ,'content' => $data['content'], 'relation' => $data['relation'], 'copyfrom' => $data['copyfrom'], 'allow_comment' => $data['allow_comment']);
          D("HouseData")->add($content_data);

          if ($_POST['dosubmit_continue']) {
            $this->success('房源添加成功！');
          } else {
            $returnjs = 'function set_time() {$("#secondid").html(1);}setTimeout("set_time()", 500);setTimeout("window.close()", 1200);';
            $this->assign('closeWin', true);
            $this->assign('returnjs', $returnjs);
            $this->success('房源添加成功！，<span id="secondid">2</span>秒后关闭！');
          }
        } else {
          $this->error('房源添加失败！');
        }
      } else {
        import("ORG.Util.Form");
        // 载入推荐位 
        $position = $this->position_db->query("select pos.* from " . C("DB_PREFIX") .  "position as pos, " . C("DB_PREFIX") .  "model as model where model.controller = '".MODULE_NAME."' and model.typeid = pos.typeid order by pos.listorder desc");
        // echo $this->position_db->getLastSql();
        $array = array_translate($position);
        $posidstr = form::checkbox($array,'',"name='info[posids][]'",'',125);
        // END 推荐位载入
        $this->assign('posidstr', $posidstr);
        $area = M('Area')->where("siteid = %d", $this->siteid)->select();
        $trade = M('Trade')->where("siteid = %d", $this->siteid)->select();
        $property = M('Property')->where("siteid = %d", $this->siteid)->select();
        $sell = M('Sell')->where("siteid = %d", $this->siteid)->select();
        $decoration = M('Decoration')->where("siteid = %d", $this->siteid)->select();
        $layer = M('Layer')->where("siteid = %d", $this->siteid)->select();
        $this->assign('layer',array_translate($layer));
        $this->assign('decoration',array_translate($decoration));
        $this->assign('sell',array_translate($sell));
        $this->assign('property',array_translate($property));
        $this->assign('trade',array_translate($trade));
        $this->assign('area',array_translate($area));
        $this->display();
      }
    }

    public function edit() {
      if (IS_POST) {
        $hash[C('TOKEN_NAME')] = $_POST[C('TOKEN_NAME')];
        if (!$this->db->autoCheckToken($hash)) {
          $this->error('令牌验证失败！');
        }
        $data = $_POST['info'];

        if (is_array($data['propertyid'])) {
          $data['propertyid'] = join(",", $data['propertyid']);
        }
        
        if (is_array($data['layerid'])) {
          $data['layerid'] = join(",", $data['layerid']);
        }

        if($_POST['inputtime'] && !is_numeric($_POST['inputtime'])) {
          $data['inputtime'] = strtotime($_POST['inputtime']);
        } else {
          $data['inputtime'] = time();
        }

        if($_POST['transferdate'] && !is_numeric($_POST['transferdate'])) {
          $data['transferdate'] = strtotime($_POST['transferdate']);
        } else {
          $data['transferdate'] = time();
        }
        
        if($_POST['opendate'] && !is_numeric($_POST['opendate'])) {
          $data['opendate'] = strtotime($_POST['opendate']);
        } else {
          $data['opendate'] = time();
        }

        $data['siteid'] = $this->siteid;
        $houseid = $_POST['houseid'];
        if ($this->db->where('id = %d', $houseid)->save(trim_script($data)) !== false ) {
          //更新URL地址
          if($data['islink']==1) {
            $url = trim_script($_POST['linkurl']);
            $url = str_replace(array('select ',')','\\','#',"'"),' ',$urls[0]);
          } else {
            $url = U(C("DEFAULT_GROUP") . '/Index/project','id='.$houseid);
          }
          $this->db->where("id = %d", $houseid)->save(array('url' => $url));

          $position_model = D("PositionData");
          $position_model->where( array( "id" => $houseid, "module" => "House" ) )->delete();
          // 发布到推荐位
          if (isset($data['posids']) && is_array($data['posids'])) {

            foreach ($data['posids'] as $key => $posid) {
              $position_data = array('id' => $houseid, 'posid' => $posid, 'module' => 'House', 'thumb' => $data['thumb'], 'siteid' => $data['siteid'], 'listorder' => $houseid, 'data' => var_export(array('title' => $data['title'], 'url' => $url, 'description' => $data['description'], 'inputtime' => $data['inputtime']), true));
              $position_model->add($position_data);
              // echo $position_model->getLastSql();
            }
            $this->db->where("id = %d", $houseid)->save(array('posids' => 1));
          }
          // END 发布到推荐位

          // 附表
          $data['relation'] = array2string($data['relation']);
          $content_data = array('id' => $houseid ,'content' => $data['content'], 'relation' => $data['relation'], 'copyfrom' => $data['copyfrom'], 'allow_comment' => $data['allow_comment']);
          D("HouseData")->save($content_data);

          if ($_POST['dosubmit_continue']) {
            $this->success('更新成功！');
          } else {
            $returnjs = 'function set_time() {$("#secondid").html(1);}setTimeout("set_time()", 500);setTimeout("window.close()", 1200);';
            $this->assign('closeWin', true);
            $this->assign('returnjs', $returnjs);
            $this->success('更新成功！，<span id="secondid">2</span>秒后关闭！');
          }
        } else {
          $this->error('更新失败！');
        }
      } else {
        $model = D("Model")->where(array('controller' => "House"))->find();
        $houseid = $_GET['houseid'];
        if (!isset($houseid) || !$houseid) {
          $this->error("房源ID不合法！");
        }
        $house = $this->db->get_house($houseid);
        import("ORG.Util.Form");

        // 载入推荐位 
        $position = $this->position_db->query("select pos.* from " . C("DB_PREFIX") .  "position as pos, " . C("DB_PREFIX") .  "model as model where model.controller = '".MODULE_NAME."' and model.typeid = pos.typeid order by pos.listorder desc");
        // echo $this->position_db->getLastSql();
        $posids = array();
        $position_data = D('PositionData')->where( array('id' => $houseid, "module" => "House"))->field('posid')->group('posid')->select();

        $position_data_ids = array();
        foreach ($position_data as $key => $pos) {
          $position_data_ids[] = $pos['posid'];
        }
        $posids = implode(',', $position_data_ids);
        $array = array_translate($position);
        $posidstr = form::checkbox($array, $posids, "name='info[posids][]'" , '',125);
        // END 推荐位载入
        $this->assign('posidstr', $posidstr);

        $area = M('Area')->where("siteid = %d", $this->siteid)->select();
        $trade = M('Trade')->where("siteid = %d", $this->siteid)->select();
        $property = M('Property')->where("siteid = %d", $this->siteid)->select();
        $sell = M('Sell')->where("siteid = %d", $this->siteid)->select();
        $decoration = M('Decoration')->where("siteid = %d", $this->siteid)->select();
        $layer = M('Layer')->where("siteid = %d", $this->siteid)->select();
        $developers = D("Developer")->get_developer_for_house($house['developer']);
        $house['relation'] = string2array($house['relation']);
        $this->assign('house', $house);
        $this->assign('developers', $developers);
        $this->assign('layer',array_translate($layer));
        $this->assign('decoration',array_translate($decoration));
        $this->assign('sell',array_translate($sell));
        $this->assign('property',array_translate($property));
        $this->assign('trade',array_translate($trade));
        $this->assign('area',array_translate($area));
        $this->display();
      }
    }

    public function public_check_title() {
      if($_GET['data']=='') return '';
      $title = $_GET['data'];
      $r = $this->db->where(array('title'=>$title))->find();
      if($r) {
        exit('1');
      } else {
        exit('0');
      }
    }

    public function listorder() {
      if (isset($_POST['listorders']) && is_array($_POST['listorders'])) {
        $sort = $_POST['listorders'];
        foreach ($sort as $k => $v) {
          $this->db->where(array('id'=>$k))->save(array('listorder'=>$v));
        }
      }
      $this->success('排序成功');
    }

    public function delete() {
      if (IS_POST) {
        $ids = $_POST['ids'];
        if (empty($ids) && is_array($ids)) {
          if ($this->db->delete_house($ids)) {
            $this->success('删除成功！');
          } else {
            $this->error('删除失败！');
          }
        } else {
          $this->error("您没有勾选信息");
        }
      } else {
        if ($this->db->delete_house(intval($_GET['id']))) {
          $this->success('删除成功！');
        } else {
          $this->error('删除失败！');
        }
      }
    }


    public function show_relation() {
      $modelid = intval($_GET['modelid']);
      $categorys = D("Category")->where('siteid = %d',$this->siteid)->select();
      $categorys_reset_key = array();
      if (!empty($categorys) && is_array($categorys)) {
        foreach ($categorys as $key => $r) {
          $categorys_reset_key[$r['id']] = $r;
        }
      }
      $id = intval($_GET['id']);

      $r = D("HouseData")->where(array("id" => $id))->field("id, relation")->find();
      if( !empty($r['relation'])) {
        $relation = string2array($r['relation']);
        $relation_ids = explode( '|', $relation['ids'] );
        if ( empty($relation_ids) ) {
          exit( json_encode( array() ) );
        }
        $model = D("Content");
        if ( !empty($relation['cats']) ) {
          $relation_cats = explode( '|', $relation['cats'] );
          $datas = array();
          foreach ($relation_ids as $key => $value) {
            $model->set_model( $categorys_reset_key[$relation_cats[$key]]['modelid'] );
            $content = $model->get_content($value, true);
            if ( !empty($content) ) {
              $datas[] = $content;
            }
          }
        } else {
          $model->set_model($modelid);
          $where = "id IN(".join(',',$relation_ids).")";
          $datas = $model->where($where)->select();
        }

        $infos = array();
        foreach($datas as $_v) {
          $_v['sid'] = 'v'.$_v['catid'].$_v['id'];
          $infos[] = $_v;
        }
        exit(json_encode($infos));
      }
      exit( json_encode( array() ) );
    }

    public function public_developer() {
      if (isset($_GET['dosubmit'])) {
        $data = D("Developer")->developer_list(array("name" => array("like","%".$_GET['name']."%")));
      } else {
        $data = D("Developer")->developer_list();
      }
      $this->assign("developers", $data['data']);
      $this->assign("pages", $data['page']);
      $this->display();
    }

    public function public_album() {
      if (IS_POST) {
        $houseid = intval($_POST['houseid']);
        if (empty($houseid)) {
          $this->error("数据不合法！");
        }
        $house = $this->db->get_house($houseid);
        if ( empty($house) ) {
          $this->error("楼盘ID不存在！");
        } else {
          if ( D("HouseData")->where(array('id' => $houseid))->save( array( "album" => $_POST['albumids'] ) ) !== false ) {
            $this->assign('dialog','album');
            $this->success( "关联成功！" );
          } else {
            $this->error("更新失败！");
          }
        }
      } else {
        if (isset($_GET['dosubmit'])) {
          $data = D("Album")->album_list(array("title" => array("like","%".$_GET['title']."%")));
        } else {
          $data = D("Album")->album_list();
        }
        $albumids = trim_script($_GET['albumids']);
        $this->assign("houseid", intval($_GET['houseid']));
        $this->assign("albumids", $albumids);
        $this->assign("albums", $data['data']);
        $this->assign("pages", $data['page']);
        $this->display();
      }
    }

    public function public_huxing() {
      if (IS_POST) {
        $houseid = intval($_POST['houseid']);
        if (empty($houseid)) {
          $this->error("数据不合法！");
        }
        $house = $this->db->get_house($houseid);
        if ( empty($house) ) {
          $this->error("楼盘不存在！");
        } else {
          if ( D("HouseData")->where(array('id' => $houseid))->save( array( "huxing" => $_POST['huxingids'] ) ) !== false ) {
            $this->assign('dialog','huxing');
            $this->success( "关联成功！" );
          } else {
            $this->error("关联失败！");
          }
        }
      } else {
        if (isset($_GET['dosubmit'])) {
          $data = D("Huxing")->lists(array("title" => array("like","%".$_GET['title']."%")));
        } else {
          $data = D("Huxing")->lists();
        }
        $huxingids = trim_script($_GET['huxingids']);
        $this->assign("houseid", intval($_GET['houseid']));
        $this->assign("huxingids", $huxingids);
        $this->assign("huxing", $data['data']);
        $this->assign("pages", $data['page']);
        $this->display();
      }
    }

    public function baidumap() {
      $this->display();
    }
  }
  ?>