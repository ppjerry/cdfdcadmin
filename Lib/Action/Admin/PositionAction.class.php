<?php
class PositionAction extends CommonAction {
  protected $db, $model_db, $data_db, $content_db, $type_db;
  function __construct() {
    parent::__construct();
    $this->db = D('Position');
    $this->data_db = D('PositionData');
    $this->content_db = D('Content');
    $this->model_db = D('Model');
    $this->type_db = D('ModelType');
  }

  public function index() {
    if (isset($_GET['typeid'])) {
      $positions = $this->db->where("(siteid = 0 or siteid = %d) and typeid = %d", $this->siteid, intval($_GET['typeid']))->order('listorder desc, id desc')->select();
    } else {
      $positions = $this->db->where("(siteid = 0 or siteid = %d) and typeid = %d", $this->siteid, 0)->order('listorder desc, id desc')->select();
    }
    
    //  此处需要判断站点权限 
    $types = $this->type_db->where("siteid = %d", $this->siteid)->select();
    $this->assign("types",$types);
    $this->assign('positions', $positions);
    $this->display();
  }

  public function add() {
    if (IS_POST) {
      $hash[C('TOKEN_NAME')] = $_POST[C('TOKEN_NAME')];
      if (!$this->db->autoCheckToken($hash)) {
        $this->error('令牌验证失败！');
      }
      if(!is_array($_POST['info']) || empty($_POST['info']['name'])){
        $this->error("操作失败！");
      }
      $_POST['info']['siteid'] = $this->siteid;
      if ($_POST['info']['typeid'] != 0) {
        $_POST['info']['modelid'] = $_POST['info']['catid'] = -1;
      }
      if ($this->db->add($_POST['info']) !== false) {
        $this->success('添加成功！', "index");
      } else {
        $this->error('添加失败！');
      }
    } else {
      $types = $this->type_db->where("siteid = %d", $this->siteid)->select();
      $this->assign("types",$types);
      // $models = $this->model_db->where(array('siteid' => $this->siteid))->select();
      // $this->assign('models', $models);
      $this->display();
    }
  }

  public function edit() {
    if (IS_POST) {
      $hash[C('TOKEN_NAME')] = $_POST[C('TOKEN_NAME')];
      if (!$this->db->autoCheckToken($hash)) {
        $this->error('令牌验证失败！');
      }
      if(!is_array($_POST['info']) || empty($_POST['info']['name'])){
        $this->error("操作失败！");
      }
      if ($_POST['info']['typeid'] != 0) {
        $_POST['info']['modelid'] = $_POST['info']['catid'] = -1;
      }
      if ($this->db->where(array('id' => intval($_POST['posid'])))->save($_POST['info']) !== false) {
        $this->success('更新成功！', "index");
      } else {
        $this->error('更新失败！');
      }
    } else {
      import('ORG.Util.Form');
      $position = $this->db->find(intval($_GET['posid']));
      $models = $this->model_db->where(array('siteid' => $this->siteid, 'typeid' => $position['typeid']))->select();
      foreach ($models as $key => $model) {
        $model_array[$model['id']] = $model['name'];
      }
      $types = $this->type_db->where("siteid = %d", $this->siteid)->select();
      $this->assign("types",$types);
      $this->assign('modelstr', form::select($model_array,$position['modelid'],'name="info[modelid]" onchange="category_load(this);"', '请选择模型'));
      $this->assign('position', $position);
      $this->display();
    }
  }

  public function delete() {
    if ($this->db->where("id = %d", $_GET['posid'])->delete() !== false) {
      $this->success('删除成功!');
    } else {
      $this->error('删除失败!');
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

  public function list_type() {
    $types = $this->type_db->where("siteid = ".$this->siteid)->order("listorder desc")->select();
    $this->assign('types',$types);
    $this->display();
  }

  public function add_type() {
    if (IS_POST) {
      $this->checkToken();
      $data = $_POST['type'];
      $data['siteid'] = (isset($this->siteid) ? $this->siteid : 1);
      if ($this->type_db->add($data)) {
        $this->success("添加成功!", $_POST['forward']);
      } else {
        // $this->error("更新失败! 最后执行SQL:".$this->db->getLastSql());
        $this->error("添加失败! ");
      }
    } else {
      $this->display();
    }
  }

  public function listorder_type() {
    if (isset($_POST['listorder']) && is_array($_POST['listorder'])) {
      $listorder = $_POST['listorder'];
      foreach ($listorder as $k => $v) {
        $this->type_db->where(array('id'=>$k))->save(array('listorder'=>$v));
      }
    }
    $this->success('排序成功');
  }

  public function edit_type() {
    if (IS_POST) {
      $this->checkToken();
      if ($this->type_db->where(array('siteid' => $this->siteid,'id' => $_POST['typeid']))->save($_POST['type']) !==false) {
        $this->assign('dialog','edit');
        $this->success("更新成功!", $_POST['forward']);
      } else {
        $this->assign('dialog','edit');
        // $this->error("更新失败! 最后执行SQL:".$this->db->getLastSql());
        $this->error("更新失败! ");
      }
    } else {
      $type = $this->type_db->where(array('siteid' => $this->siteid))->find($_GET['typeid']);
      $this->assign('type',$type);
      $this->display(); 
    }
  }

  public function delete_type() {
    if ($this->type_db->where(array('siteid' => $this->siteid,'id' => $_GET['typeid']))->delete() !== false) {
      $this->success('删除成功', $_POST['forward']);
    } else {
      $this->error('删除失败', $_POST['forward']);
    }
  }

  public function public_check_name() {
    if (!isset($_GET['type_name'])) echo "0";
    $where = array('name' => $_GET['type_name']);
    if (isset($_GET['typeid'])) {
      $where['id'] = array('NEQ',$_GET['typeid']);
    }
    if($this->type_db->where($where)->find()) {
      echo "0";
    } else {
      echo "1";
    }
  }


  /**
   * 推荐位文章列表
   */
  public function public_item() { 
    $posid = intval($_GET['posid']);
    /*$models = $this->model_db->where('siteid = %d', $this->siteid)->select(); 
    $models = array_key_translate($models);*/
    $pos_data = $this->data_db->where(array('posid' => $posid))->select();
    // $pos_data = $this->db->get_position_data($posid);
    // var_dump($pos_data);
    $infos = array();
    foreach ($pos_data as $_k => $_v) {
      $r = string2array($_v['data']);
      $r['catname'] = $_v['catname'];
      $r['modelid'] = $_v['modelid'];
      $r['posid'] = $_v['posid'];
      $r['id'] = $_v['id'];
      $r['listorder'] = $_v['listorder'];
      $r['catid'] = $_v['catid'];
      $key = $r['id'].'-'.$r['catid'].'-'.$r['modelid'];
      $infos[$key] = $r;
    }
    $this->assign('posid', $posid);
    $this->assign('infos', $infos);
    $this->display();
  }

  /**
   * 推荐位类别选择
   */

  public function public_types() {
    $this->display();
  }

  /**
   * 推荐位文章管理
   */
  public function public_item_manage() {
    
  }
  /**
   * 推荐位文章排序
   */
  public function public_item_listorder() {
    if (isset($_POST['posid']) && isset($_POST['listorders']) && is_array($_POST['listorders'])) {
      $listorders = $_POST['listorders'];
      foreach ($listorders as $_k => $v) {
        $pos = array();
        $pos = explode('-', $_k);
        $this->db->where(array('id'=>$pos[0],'catid'=>$pos[1],'posid'=>$_POST['posid']))->save(array('listorder'=>$v));
      }
    }
    $this->success('排序成功');
  }

  public function public_item_remove() {
    if(IS_POST) {
      $items = count($_POST['items']) > 0  ? $_POST['items'] : $this->error('请选择要移出的文章');
      if(is_array($items)) {
        $sql = array();
        foreach ($items as $item) {
          $_v = explode('-', $item);
          $sql['id'] = $_v[0];
          $sql['catid']= $_v[1];
          $sql['modelid']= $_v[2];
          $sql['posid'] = intval($_POST['posid']);
          $this->data_db->where($sql)->delete();
          $this->content_pos($sql['id'],$_v[1],$sql['modelid']);   
        }
      }
      $this->success('操作成功！');
    } else {
      $item = $_GET['item'];
      $_v = explode('-', $item);
      $sql = array('id' => $_v[0], 'catid' => $_v[1], 'modelid' => $_v[2]);
      $sql['posid'] = intval($_GET['posid']);
      $this->data_db->where($sql)->delete();
      // $this->data_db->getLastSql();
      $this->content_pos($sql['id'],$_v[1],$sql['modelid']);
      $this->success('操作成功！');
    }
  }

  /**
   * 推荐位添加栏目加载
   */
  public function public_category_load() {
    import('ORG.Util.Form');
    $modelid = intval($_GET['modelid']);
    $category = form::select_category('','','name="info[catid]"','≡ 作为一级栏目 ≡',$modelid);
    echo $category;
  }

  /**
   * 推荐位添加模型加载
   */
  public function public_model_load() {
    import('ORG.Util.Form');
    $typeid = intval($_GET['typeid']);
    $models = $this->model_db->where('typeid = %d', $typeid)->select();
    $modelstr = form::select(array_translate($models),'','name="info[modelid]" onchange="category_load(this);"','选择模型');
    echo $modelstr;
  }

  private function content_pos($id, $catid, $modelid) {
    // $model = $this->model_db->find($modelid);
    $this->content_db->set_model($modelid);
    $posids = $this->data_db->where(array('id'=>$id))->find() ? 1 : 0;
    return $this->content_db->where("id = %d", $id)->save(array('posids'=>$posids));
  }

}
?>
