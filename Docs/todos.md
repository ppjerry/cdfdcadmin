1、二手房相关枚举类型数据表
  区域（功能：子父级，排序，belong选择）
  *sl_area
  装修（功能：排序，belong选择）
  *sl_decoration
  朝向（功能：排序，belong选择）
  *sl_direction
  楼层(Layer)（功能：排序，belong选择）
  *sl_floor
  房屋配套（Assort）（功能：排序，belong选择）
  *sl_house_supporting
  支付方式(Payment)（功能：排序，belong选择）
  *sl_pay_method
  商铺铺面类型(ShopType)（功能：排序）
  *sl_shop_face_type
  商铺可经营类别(Category)（功能：排序）
  *sl_shop_manager_type
  特色标签(Special)（功能：排序，belong选择）
  *sl_tag
  类型(Genre)（功能：排序，belong选择）
  *sl_type

->order("sort desc")->select()

2、二手房前台搜索条件枚举类型数据表
  区域(HomeArea)（功能：排序，belong选择，区间填写）
  *sl_s_area
  *sl_s_price

3、二手房意见反馈功能开发

4、二手房后台审核功能开发

5、二手房后台添加功能开发

LayerModel.class.php
AssortModel.class.php
PaymentModel.class.php
ShopTypeModel.class.php
CategoryModel.class.php
SpecialModel.class.php
GenreModel.class.php
HomeAreaModel.class.php
