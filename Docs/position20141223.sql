-- phpMyAdmin SQL Dump
-- version 4.2.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014-12-23 03:38:37
-- 服务器版本： 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `xiaoyaocms`
--

-- --------------------------------------------------------

--
-- 表的结构 `xy_model`
--

CREATE TABLE IF NOT EXISTS `xy_model` (
`id` tinyint(3) unsigned NOT NULL,
  `siteid` smallint(5) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `tablename` varchar(50) NOT NULL DEFAULT '',
  `controller` varchar(255) NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT '',
  `typeid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `issystem` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `issearch` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `listfields` varchar(255) NOT NULL DEFAULT '',
  `setup` mediumtext NOT NULL,
  `listorder` smallint(3) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `postgroup` varchar(100) NOT NULL DEFAULT '',
  `ispost` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `xy_model`
--

INSERT INTO `xy_model` (`id`, `siteid`, `name`, `tablename`, `controller`, `description`, `typeid`, `issystem`, `issearch`, `listfields`, `setup`, `listorder`, `status`, `postgroup`, `ispost`) VALUES
(16, 1, '内容模型', 'news', 'Content', '新闻模型', 0, 0, 0, '', '', 0, 0, '', 0),
(17, 1, '楼盘模型', 'house', 'House', '', 1, 0, 0, '', '', 0, 0, '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `xy_model_field`
--

CREATE TABLE IF NOT EXISTS `xy_model_field` (
`fieldid` mediumint(8) unsigned NOT NULL,
  `modelid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `siteid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `field` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `tips` text NOT NULL,
  `css` varchar(30) NOT NULL,
  `minlength` int(10) unsigned NOT NULL DEFAULT '0',
  `maxlength` int(10) unsigned NOT NULL DEFAULT '0',
  `pattern` varchar(255) NOT NULL,
  `errortips` varchar(255) NOT NULL,
  `formtype` varchar(20) NOT NULL,
  `setting` mediumtext NOT NULL,
  `formattribute` varchar(255) NOT NULL,
  `unsetgroupids` varchar(255) NOT NULL,
  `unsetroleids` varchar(255) NOT NULL,
  `iscore` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `issystem` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isunique` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isbase` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `issearch` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isadd` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isfulltext` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isposition` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `listorder` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `disabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `isomnipotent` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=105 ;

--
-- 转存表中的数据 `xy_model_field`
--

INSERT INTO `xy_model_field` (`fieldid`, `modelid`, `siteid`, `field`, `name`, `tips`, `css`, `minlength`, `maxlength`, `pattern`, `errortips`, `formtype`, `setting`, `formattribute`, `unsetgroupids`, `unsetroleids`, `iscore`, `issystem`, `isunique`, `isbase`, `issearch`, `isadd`, `isfulltext`, `isposition`, `listorder`, `disabled`, `isomnipotent`) VALUES
(54, 16, 1, 'catid', '栏目', '', '', 1, 6, '/^[0-9]{1,6}$/', '请选择栏目', 'catid', 'array (\n  ''defaultvalue'' => '''',\n)', '', '-99', '-99', 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0),
(55, 16, 1, 'typeid', '类别', '', '', 0, 0, '', '', 'typeid', 'array (\n  ''minnumber'' => '''',\n  ''defaultvalue'' => '''',\n)', '', '', '', 0, 1, 0, 1, 1, 1, 0, 0, 2, 1, 0),
(56, 16, 1, 'title', '标题', '', 'inputtitle', 1, 80, '', '请输入标题', 'title', '', '', '', '', 0, 1, 0, 1, 1, 1, 1, 1, 4, 0, 0),
(57, 16, 1, 'keywords', '关键词', '多关键词之间用空格或者“,”隔开', '', 0, 40, '', '', 'keyword', 'array (\r\n  ''size'' => ''100'',\r\n  ''defaultvalue'' => '''',\r\n)', '', '-99', '-99', 0, 1, 0, 1, 1, 1, 1, 0, 7, 0, 0),
(58, 16, 1, 'description', '摘要', '', '', 0, 255, '', '', 'textarea', 'array (\r\n  ''width'' => ''98'',\r\n  ''height'' => ''46'',\r\n  ''defaultvalue'' => '''',\r\n  ''enablehtml'' => ''0'',\r\n)', '', '', '', 0, 1, 0, 1, 0, 1, 1, 1, 10, 0, 0),
(59, 16, 1, 'updatetime', '更新时间', '', '', 0, 0, '', '', 'datetime', 'array (\r\n  ''dateformat'' => ''int'',\r\n  ''format'' => ''Y-m-d H:i:s'',\r\n  ''defaulttype'' => ''1'',\r\n  ''defaultvalue'' => '''',\r\n)', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 12, 0, 0),
(60, 16, 1, 'content', '内容', '', '', 1, 999999, '', '内容不能为空', 'editor', 'array (\n  ''toolbar'' => ''full'',\n  ''defaultvalue'' => '''',\n  ''enablekeylink'' => ''1'',\n  ''replacenum'' => ''2'',\n  ''link_mode'' => ''0'',\n  ''enablesaveimage'' => ''1'',\n  ''height'' => '''',\n  ''disabled_page'' => ''0'',\n)', '', '', '', 0, 0, 0, 1, 0, 1, 1, 0, 13, 0, 0),
(61, 16, 1, 'thumb', '缩略图', '', '', 0, 100, '', '', 'image', 'array (\n  ''size'' => ''50'',\n  ''defaultvalue'' => '''',\n  ''show_type'' => ''1'',\n  ''upload_maxsize'' => ''1024'',\n  ''upload_allowext'' => ''jpg|jpeg|gif|png|bmp'',\n  ''watermark'' => ''0'',\n  ''isselectimage'' => ''1'',\n  ''images_width'' => '''',\n  ''images_height'' => '''',\n)', '', '', '', 0, 1, 0, 0, 0, 1, 0, 1, 14, 0, 0),
(62, 16, 1, 'relation', '相关文章', '', '', 0, 0, '', '', 'omnipotent', 'array (\n  ''formtext'' => ''<input type=\\''hidden\\'' name=\\''info[relation][ids]\\'' id=\\''relation\\'' value=\\''{FIELD_VALUE_IDS}\\'' style=\\''50\\'' >\r\n<input type=\\''hidden\\'' name=\\''info[relation][cats]\\'' id=\\''relation_cats\\'' \r\nvalue=\\''{FIELD_VALUE_CATS}\\'' style=\\''50\\'' >\r\n<input type=\\''hidden\\'' name=\\''info[relation][title]\\'' id=\\''relation_title\\'' value=\\''{FIELD_VALUE_TITLE}\\''>\r\n<ul class="list-dot" id="relation_text"></ul>\r\n<div>\r\n<input type=\\''button\\'' value="添加相关" onclick="omnipotent(\\''selectid\\'',\\''{URL_ADD_RELATION}?modelid={MODELID}\\'',\\''添加相关文章\\'',1)" class="button" style="width:66px;">\r\n<span class="edit_content">\r\n<input type=\\''button\\'' value="显示已有" onclick="show_relation(\\''{URL_SHOW_RELATION}\\'',{MODELID},{ID})" class="button" style="width:66px;">\r\n</span>\r\n</div>'',\n  ''fieldtype'' => ''text'',\n  ''minnumber'' => ''1'',\n)', '', '', '', 0, 0, 0, 0, 0, 0, 1, 0, 15, 0, 0),
(64, 16, 1, 'inputtime', '发布时间', '', '', 0, 0, '', '', 'datetime', 'array (\n  ''fieldtype'' => ''int'',\n  ''format'' => ''Y-m-d H:i:s'',\n  ''defaulttype'' => ''0'',\n)', '', '', '', 0, 1, 0, 0, 0, 0, 0, 1, 17, 0, 0),
(65, 16, 1, 'posids', '推荐位', '', '', 0, 0, '', '', 'posid', 'array (\n  ''cols'' => ''4'',\n  ''width'' => ''125'',\n)', '', '', '', 0, 1, 0, 1, 0, 0, 0, 0, 18, 0, 0),
(67, 16, 1, 'url', 'URL', '', '', 0, 100, '', '', 'text', 'array (\n  ''size'' => '''',\n  ''defaultvalue'' => '''',\n  ''ispassword'' => ''0'',\n)', '', '', '', 1, 1, 0, 0, 0, 0, 0, 0, 50, 0, 0),
(68, 16, 1, 'listorder', '排序', '', '', 0, 6, '', '', 'number', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 51, 0, 0),
(69, 16, 1, 'template', '内容页模板', '', '', 0, 30, '', '', 'template', 'array (\n  ''size'' => '''',\n  ''defaultvalue'' => '''',\n)', '', '-99', '-99', 0, 0, 0, 0, 0, 0, 0, 0, 53, 0, 0),
(70, 16, 1, 'allow_comment', '允许评论', '', '', 0, 0, '', '', 'box', 'array (\n  ''options'' => ''允许评论|1\r\n不允许评论|0'',\n  ''boxtype'' => ''radio'',\n  ''fieldtype'' => ''tinyint'',\n  ''minnumber'' => ''1'',\n  ''width'' => ''88'',\n  ''size'' => ''1'',\n  ''defaultvalue'' => ''1'',\n  ''outputtype'' => ''0'',\n)', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 54, 0, 0),
(71, 16, 1, 'status', '状态', '', '', 0, 2, '', '', 'box', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 55, 0, 0),
(72, 16, 1, 'readpoint', '阅读收费', '', '', 0, 5, '', '', 'readpoint', 'array (\n  ''minnumber'' => ''1'',\n  ''maxnumber'' => ''99999'',\n  ''decimaldigits'' => ''0'',\n  ''defaultvalue'' => '''',\n)', '', '-99', '-99', 0, 0, 0, 0, 0, 0, 0, 0, 55, 1, 0),
(73, 16, 1, 'username', '用户名', '', '', 0, 20, '', '', 'text', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 98, 0, 0),
(74, 16, 1, 'islink', '转向链接', '', '', 0, 0, '', '', 'islink', 'array (\n  ''size'' => '''',\n)', '', '', '', 0, 1, 0, 0, 0, 1, 0, 0, 20, 0, 0),
(76, 16, 1, 'copyfrom', '来源', '', '', 0, 0, '', '', 'copyfrom', 'array (\n  ''defaultvalue'' => '''',\n)', '', '', '', 0, 0, 0, 1, 0, 1, 0, 0, 5, 0, 0),
(103, 17, 1, 'developer', '开发商', '', '', 0, 0, '', '', 'text', 'array (\n  ''size'' => ''50'',\n  ''defaultvalue'' => '''',\n  ''ispassword'' => ''0'',\n)', '', '', '', 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0),
(82, 17, 1, 'typeid', '类别', '', '', 0, 0, '', '', 'typeid', 'array (\n  ''minnumber'' => '''',\n  ''defaultvalue'' => '''',\n)', '', '', '', 0, 1, 0, 1, 1, 1, 0, 0, 2, 0, 0),
(83, 17, 1, 'title', '标题', '', 'inputtitle', 1, 80, '', '请输入标题', 'title', '', '', '', '', 0, 1, 0, 1, 1, 1, 1, 1, 4, 0, 0),
(84, 17, 1, 'keywords', '关键词', '多关键词之间用空格或者“,”隔开', '', 0, 40, '', '', 'keyword', 'array (\r\n  ''size'' => ''100'',\r\n  ''defaultvalue'' => '''',\r\n)', '', '-99', '-99', 0, 1, 0, 1, 1, 1, 1, 0, 7, 0, 0),
(85, 17, 1, 'description', '摘要', '', '', 0, 255, '', '', 'textarea', 'array (\r\n  ''width'' => ''98'',\r\n  ''height'' => ''46'',\r\n  ''defaultvalue'' => '''',\r\n  ''enablehtml'' => ''0'',\r\n)', '', '', '', 0, 1, 0, 1, 0, 1, 1, 1, 10, 0, 0),
(86, 17, 1, 'updatetime', '更新时间', '', '', 0, 0, '', '', 'datetime', 'array (\r\n  ''dateformat'' => ''int'',\r\n  ''format'' => ''Y-m-d H:i:s'',\r\n  ''defaulttype'' => ''1'',\r\n  ''defaultvalue'' => '''',\r\n)', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 12, 0, 0),
(87, 17, 1, 'content', '内容', '<div class="content_attr"><label><input name="add_introduce" type="checkbox"  value="1" checked>是否截取内容</label><input type="text" name="introcude_length" value="200" size="3">字符至内容摘要\r\n<label><input type=''checkbox'' name=''auto_thumb'' value="1" checked>是否获取内容第</label><input type="text" name="auto_thumb_no" value="1" size="2" class="">张图片作为标题图片\r\n</div>', '', 1, 999999, '', '内容不能为空', 'editor', 'array (\n  ''toolbar'' => ''full'',\n  ''defaultvalue'' => '''',\n  ''enablekeylink'' => ''1'',\n  ''replacenum'' => ''2'',\n  ''link_mode'' => ''0'',\n  ''enablesaveimage'' => ''1'',\n)', '', '', '', 0, 0, 0, 1, 0, 1, 1, 0, 13, 0, 0),
(88, 17, 1, 'thumb', '缩略图', '', '', 0, 100, '', '', 'image', 'array (\n  ''size'' => ''50'',\n  ''defaultvalue'' => '''',\n  ''show_type'' => ''1'',\n  ''upload_maxsize'' => ''1024'',\n  ''upload_allowext'' => ''jpg|jpeg|gif|png|bmp'',\n  ''watermark'' => ''0'',\n  ''isselectimage'' => ''1'',\n  ''images_width'' => '''',\n  ''images_height'' => '''',\n)', '', '', '', 0, 1, 0, 0, 0, 1, 0, 1, 14, 0, 0),
(89, 17, 1, 'relation', '相关文章', '', '', 0, 0, '', '', 'omnipotent', 'array (\n  ''formtext'' => ''<input type=\\''hidden\\'' name=\\''info[relation][ids]\\'' id=\\''relation\\'' value=\\''{FIELD_VALUE_IDS}\\'' style=\\''50\\'' >\r\n<input type=\\''hidden\\'' name=\\''info[relation][cats]\\'' id=\\''relation\\'' value=\\''{FIELD_VALUE_CATS}\\'' style=\\''50\\'' >\r\n<ul class="list-dot" id="relation_text"></ul>\r\n<div>\r\n<input type=\\''button\\'' value="添加相关" onclick="omnipotent(\\''selectid\\'',\\''{URL_ADD_RELATION}?modelid={MODELID}\\'',\\''添加相关文章\\'',1)" class="button" style="width:66px;">\r\n<span class="edit_content">\r\n<input type=\\''button\\'' value="显示已有" onclick="show_relation(\\''{URL_SHOW_RELATION}\\'',{MODELID},{ID})" class="button" style="width:66px;">\r\n</span>\r\n</div>'',\n  ''fieldtype'' => ''varchar'',\n  ''minnumber'' => ''1'',\n)', '', '', '', 0, 0, 0, 0, 0, 0, 1, 0, 15, 0, 0),
(90, 17, 1, 'inputtime', '发布时间', '', '', 0, 0, '', '', 'datetime', 'array (\n  ''fieldtype'' => ''int'',\n  ''format'' => ''Y-m-d H:i:s'',\n  ''defaulttype'' => ''0'',\n)', '', '', '', 0, 1, 0, 0, 0, 0, 0, 1, 17, 0, 0),
(91, 17, 1, 'posids', '推荐位', '', '', 0, 0, '', '', 'posid', 'array (\n  ''cols'' => ''4'',\n  ''width'' => ''125'',\n)', '', '', '', 0, 1, 0, 1, 0, 0, 0, 0, 18, 0, 0),
(92, 17, 1, 'url', 'URL', '', '', 0, 100, '', '', 'text', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 50, 0, 0),
(93, 17, 1, 'listorder', '排序', '', '', 0, 6, '', '', 'number', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 51, 0, 0),
(94, 17, 1, 'template', '内容页模板', '', '', 0, 30, '', '', 'template', 'array (\n  ''size'' => '''',\n  ''defaultvalue'' => '''',\n)', '', '-99', '-99', 0, 0, 0, 0, 0, 0, 0, 0, 53, 0, 0),
(95, 17, 1, 'allow_comment', '允许评论', '', '', 0, 0, '', '', 'box', 'array (\n  ''options'' => ''允许评论|1\r\n不允许评论|0'',\n  ''boxtype'' => ''radio'',\n  ''fieldtype'' => ''tinyint'',\n  ''minnumber'' => ''1'',\n  ''width'' => ''88'',\n  ''size'' => ''1'',\n  ''defaultvalue'' => ''1'',\n  ''outputtype'' => ''0'',\n)', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 54, 0, 0),
(96, 17, 1, 'status', '状态', '', '', 0, 2, '', '', 'box', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 55, 0, 0),
(97, 17, 1, 'readpoint', '阅读收费', '', '', 0, 5, '', '', 'readpoint', 'array (\n  ''minnumber'' => ''1'',\n  ''maxnumber'' => ''99999'',\n  ''decimaldigits'' => ''0'',\n  ''defaultvalue'' => '''',\n)', '', '-99', '-99', 0, 0, 0, 0, 0, 0, 0, 0, 55, 0, 0),
(98, 17, 1, 'username', '用户名', '', '', 0, 20, '', '', 'text', '', '', '', '', 1, 1, 0, 1, 0, 0, 0, 0, 98, 0, 0),
(99, 17, 1, 'islink', '转向链接', '', '', 0, 0, '', '', 'islink', '', '', '', '', 0, 1, 0, 1, 0, 1, 0, 0, 20, 0, 0),
(104, 16, 1, 'email', 'email', '', '', 1, 0, '/^[\\w\\-\\.]+@[\\w\\-\\.]+(\\.\\w+)+$/', '邮箱地址不争取', 'text', 'array (\n  ''size'' => ''50'',\n  ''defaultvalue'' => '''',\n  ''ispassword'' => ''0'',\n)', '', '', '', 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `xy_model_type`
--

CREATE TABLE IF NOT EXISTS `xy_model_type` (
`id` smallint(5) NOT NULL,
  `name` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `siteid` smallint(5) NOT NULL,
  `description` varchar(255) NOT NULL,
  `listorder` smallint(5) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `xy_model_type`
--

INSERT INTO `xy_model_type` (`id`, `name`, `module`, `siteid`, `description`, `listorder`) VALUES
(1, '楼盘分类', 'House', 1, '楼盘分类，包括新房，小区，二手房等模型', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `xy_model`
--
ALTER TABLE `xy_model`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xy_model_field`
--
ALTER TABLE `xy_model_field`
 ADD PRIMARY KEY (`fieldid`), ADD KEY `modelid` (`modelid`,`disabled`), ADD KEY `field` (`field`,`modelid`);

--
-- Indexes for table `xy_model_type`
--
ALTER TABLE `xy_model_type`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `xy_model`
--
ALTER TABLE `xy_model`
MODIFY `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `xy_model_field`
--
ALTER TABLE `xy_model_field`
MODIFY `fieldid` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `xy_model_type`
--
ALTER TABLE `xy_model_type`
MODIFY `id` smallint(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
