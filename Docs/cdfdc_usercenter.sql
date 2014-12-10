-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014-12-10 10:52:56
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cdfdc_usercenter`
--

-- --------------------------------------------------------

--
-- 表的结构 `sl_area`
--

CREATE TABLE IF NOT EXISTS `sl_area` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `pid` smallint(6) NOT NULL DEFAULT '0' COMMENT '父ID',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `sl_area`
--

INSERT INTO `sl_area` (`id`, `name`, `pid`, `sort`, `belong`) VALUES
(1, '武陵区', 0, 0, 0),
(2, '鼎城区', 0, 0, 0),
(3, '德山经开区', 0, 0, 0),
(4, '柳叶湖度假区', 0, 0, 0),
(5, '柳叶湖度假区', 4, 0, 0),
(6, '德山经开区', 3, 0, 0),
(7, '鼎城区', 2, 0, 0),
(8, '步行街', 1, 1, 0),
(9, '东城', 1, 0, 0),
(10, '西城', 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_attachment`
--

CREATE TABLE IF NOT EXISTS `sl_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL COMMENT '所属栏目',
  `title` varchar(255) NOT NULL COMMENT '自定义标题',
  `description` varchar(255) NOT NULL COMMENT '自定义描述',
  `path` varchar(255) NOT NULL COMMENT '附件路径',
  `name` varchar(255) NOT NULL COMMENT '附件本身名字',
  `size` int(10) NOT NULL COMMENT '附件大小',
  `ext` char(10) NOT NULL COMMENT '附件扩展名',
  `user_id` int(11) NOT NULL COMMENT '上传用户',
  `upload_ip` char(15) NOT NULL COMMENT '上传IP',
  `upload_time` int(10) NOT NULL COMMENT '上传时间',
  `compression_image` varchar(255) NOT NULL,
  `sort` smallint(6) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `width` smallint(6) DEFAULT NULL,
  `height` smallint(6) DEFAULT NULL,
  `compression_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1417164290 ;

--
-- 转存表中的数据 `sl_attachment`
--

INSERT INTO `sl_attachment` (`id`, `category_id`, `title`, `description`, `path`, `name`, `size`, `ext`, `user_id`, `upload_ip`, `upload_time`, `compression_image`, `sort`, `url`, `width`, `height`, `compression_url`) VALUES
(1415523687, 0, '', '', '/uploads/2014/11/09/7af40ad162d9f2d3faf867d9aaec8a136327cc1f.jpg', '7af40ad162d9f2d3faf867d9aaec8a136327cc1f.jpg', 95661, 'jpg', 0, '127.0.0.1', 1415523687, '/uploads/2014/11/09/compression-7af40ad162d9f2d3faf867d9aaec8a136327cc1f.jpg', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/09/7af40ad162d9f2d3faf867d9aaec8a136327cc1f.jpg', 1251, 702, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/09/compression-7af40ad162d9f2d3faf867d9aaec8a136327cc1f.jpg'),
(1416140868, 0, '', '', '/uploads/2014/11/16/QQ20141115-5.png', 'QQ20141115-5.png', 93674, 'png', 0, '127.0.0.1', 1416140868, '/uploads/2014/11/16/compression-QQ20141115-5.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/16/QQ20141115-5.png', 987, 399, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/16/compression-QQ20141115-5.png'),
(1416370424, 0, '', '', '/uploads/2014/11/19/QQ20140111-1.png', 'QQ20140111-1.png', 44027, 'png', 0, '127.0.0.1', 1416370424, '/uploads/2014/11/19/compression-QQ20140111-1.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/QQ20140111-1.png', 926, 254, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/compression-QQ20140111-1.png'),
(1416370437, 0, '', '', '/uploads/2014/11/19/QQ20140115-1.png', 'QQ20140115-1.png', 441429, 'png', 0, '127.0.0.1', 1416370437, '/uploads/2014/11/19/compression-QQ20140115-1.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/QQ20140115-1.png', 472, 587, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/compression-QQ20140115-1.png'),
(1417083459, 0, '', '', '/uploads/2014/11/27/QQ20141125-8.png', 'QQ20141125-8.png', 150192, 'png', 0, '127.0.0.1', 1417083459, '/uploads/2014/11/27/compression-QQ20141125-8.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/QQ20141125-8.png', 973, 630, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/compression-QQ20141125-8.png'),
(1417083460, 0, '', '', '/uploads/2014/11/27/QQ20141125-7.png', 'QQ20141125-7.png', 73022, 'png', 0, '127.0.0.1', 1417083460, '/uploads/2014/11/27/compression-QQ20141125-7.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/QQ20141125-7.png', 686, 480, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/compression-QQ20141125-7.png'),
(1417083465, 0, '', '', '/uploads/2014/11/27/QQ20141125-5.png', 'QQ20141125-5.png', 22821, 'png', 0, '127.0.0.1', 1417083465, '/uploads/2014/11/27/compression-QQ20141125-5.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/QQ20141125-5.png', 733, 384, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/compression-QQ20141125-5.png'),
(1417164289, 0, '', '', '/uploads/2014/11/28/QQ20141125-5.png', 'QQ20141125-5.png', 22821, 'png', 0, '127.0.0.1', 1417164289, '/uploads/2014/11/28/compression-QQ20141125-5.png', 0, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/28/QQ20141125-5.png', 733, 384, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/28/compression-QQ20141125-5.png');

-- --------------------------------------------------------

--
-- 表的结构 `sl_decoration`
--

CREATE TABLE IF NOT EXISTS `sl_decoration` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sl_decoration`
--

INSERT INTO `sl_decoration` (`id`, `name`, `sort`, `belong`) VALUES
(2, '精装修', 0, 0),
(3, '中等装修', 5, 0),
(4, '简装修', 4, 0),
(7, '豪华装修', 0, 1),
(8, '毛坯', 1, 0),
(9, '豪华装修', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_direction`
--

CREATE TABLE IF NOT EXISTS `sl_direction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `sl_direction`
--

INSERT INTO `sl_direction` (`id`, `name`, `sort`, `belong`) VALUES
(1, '东', 1, 0),
(3, '南', 7, 0),
(5, '东西', 8, 0),
(6, '东南', 6, 0),
(7, '西南', 0, 0),
(8, '南北', 3, 0),
(9, '东北', 2, 0),
(10, '西北', 5, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_floor`
--

CREATE TABLE IF NOT EXISTS `sl_floor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='楼层表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `sl_floor`
--

INSERT INTO `sl_floor` (`id`, `name`, `sort`, `belong`) VALUES
(1, '低层', 0, 0),
(2, '多层', 0, 0),
(3, '小高层', 1, 0),
(4, '高层', 0, 0),
(5, '超高层', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_house_supporting`
--

CREATE TABLE IF NOT EXISTS `sl_house_supporting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0' COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `sl_house_supporting`
--

INSERT INTO `sl_house_supporting` (`id`, `name`, `sort`, `belong`) VALUES
(1, '厨房', 0, 0),
(2, '床', 0, 0),
(3, '家具', 0, 0),
(4, '有线', 0, 0),
(5, '热水器', 0, 0),
(6, '宽带', 0, 0),
(7, '电话', 0, 0),
(8, '饮水机', 0, 0),
(9, '电视机', 0, 0),
(10, '空调', 0, 0),
(11, '洗衣机', 0, 0),
(12, '冰箱', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_house_supporting_relationship`
--

CREATE TABLE IF NOT EXISTS `sl_house_supporting_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL COMMENT '0为出售，1为出租',
  `model` tinyint(2) NOT NULL COMMENT '0:二手房，1:商铺，2:写字楼，3:别墅',
  `house_id` int(11) NOT NULL,
  `supporting_id` smallint(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

--
-- 转存表中的数据 `sl_house_supporting_relationship`
--

INSERT INTO `sl_house_supporting_relationship` (`id`, `type`, `model`, `house_id`, `supporting_id`) VALUES
(7, 0, 0, 2, 2),
(8, 0, 0, 2, 6),
(9, 0, 0, 2, 10),
(37, 0, 0, 4, 9),
(38, 0, 0, 3, 2),
(39, 0, 0, 3, 3),
(40, 0, 0, 3, 7),
(41, 0, 0, 3, 10),
(42, 0, 0, 3, 11),
(44, 0, 0, 5, 1);

-- --------------------------------------------------------

--
-- 表的结构 `sl_i_wanna_buy_property`
--

CREATE TABLE IF NOT EXISTS `sl_i_wanna_buy_property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL COMMENT '发布类型，1:住宅，2:写字楼，3:商铺',
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `room` tinyint(3) NOT NULL,
  `bathroom` tinyint(3) NOT NULL,
  `hall` tinyint(3) NOT NULL,
  `price` float(8,2) NOT NULL COMMENT '售价',
  `house_age` float(8,2) NOT NULL COMMENT '期望房龄',
  `direction_id` smallint(6) DEFAULT NULL COMMENT '朝向ID',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `floor` varchar(255) NOT NULL COMMENT '期望楼层，楼层表id',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '描述',
  `type_id` varchar(255) DEFAULT NULL COMMENT '写字楼，商铺类型，类型ID',
  `shop_manager_type` varchar(255) NOT NULL COMMENT '关联经营类别表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `supporting` varchar(255) NOT NULL,
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介发布',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人发布',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网发布',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，1：再次提交审核，99：审核通过。默认审核通过',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `sl_i_wanna_buy_property`
--

INSERT INTO `sl_i_wanna_buy_property` (`id`, `type`, `contacts`, `phone`, `area_id`, `construction_area`, `room_structure`, `room`, `bathroom`, `hall`, `price`, `house_age`, `direction_id`, `decoration_id`, `floor`, `title`, `content`, `type_id`, `shop_manager_type`, `supporting`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `created_at`, `updated_at`) VALUES
(4, 1, '补天', '18182156697', 8, 205.00, '{"room":"3","hall":"1","bathroom":"1"}', 3, 1, 1, 220.00, 10.00, 1, 2, '低层', '住宅求购', '发多少法撒旦法撒旦', NULL, '', '["1","2","3","4","5","6","7","8","9","10","11","12"]', 0, 1, 0, 35, 1, '2014-11-12 09:22:39', '2014-11-26 14:37:39'),
(6, 2, '补天', '18182156697', 8, 245.00, '', 0, 0, 0, 20.00, 0.00, NULL, 1, '多层', '求购测试', '', '1', '', '["1","2","3","4","5","6","7","8","9","10","11","12"]', 0, 1, 0, 35, 1, '2014-11-14 02:23:56', '2014-11-14 07:32:24'),
(7, 3, '补天', '18182156697', 5, 245.00, '', 0, 0, 0, 20.00, 0.00, NULL, 1, '低层', '临街商铺求购', '', '["2","5","6"]', '["1","5","9"]', '["3","7"]', 0, 1, 0, 35, 1, '2014-11-14 02:54:18', '2014-11-14 07:40:39');

-- --------------------------------------------------------

--
-- 表的结构 `sl_i_wanna_rent_property`
--

CREATE TABLE IF NOT EXISTS `sl_i_wanna_rent_property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL COMMENT '发布类型，1:住宅，2:写字楼，3:商铺',
  `community` varchar(255) NOT NULL,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `bathroom` tinyint(3) NOT NULL,
  `hall` tinyint(3) NOT NULL,
  `room` tinyint(3) NOT NULL,
  `rent_method_id` tinyint(3) NOT NULL,
  `price` float(8,2) NOT NULL COMMENT '售价',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '描述',
  `supporting` varchar(255) NOT NULL,
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介发布',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人发布',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网发布',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，1：再次提交审核，99：审核通过。默认审核通过',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sl_i_wanna_rent_property`
--

INSERT INTO `sl_i_wanna_rent_property` (`id`, `type`, `community`, `contacts`, `phone`, `area_id`, `construction_area`, `room_structure`, `bathroom`, `hall`, `room`, `rent_method_id`, `price`, `title`, `content`, `supporting`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '["","",""]', '补天', '18182156697', 8, 45.00, '{"room":"1","hall":"1","bathroom":"1"}', 1, 1, 1, 6, 200.00, '求租测试', '', '["1","5"]', 0, 1, 0, 35, 1, '2014-11-26 14:48:20', '2014-11-26 14:48:20');

-- --------------------------------------------------------

--
-- 表的结构 `sl_laravel_sessions`
--

CREATE TABLE IF NOT EXISTS `sl_laravel_sessions` (
  `id` varchar(255) NOT NULL,
  `payload` text NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `laravel_sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sl_laravel_sessions`
--

INSERT INTO `sl_laravel_sessions` (`id`, `payload`, `last_activity`) VALUES
('013dc38cad215cbd7ffdb9c68fc919d130ebf357', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWG1CTDl1YzV1WWtkZ3QzU1VDTDI5YVE1QmFEUzVQbTZsS0NJY2NOaCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE5NzY7czoxOiJjIjtpOjE0MTY5OTE5NzY7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991976),
('035005dc296f0ff2661c0c54b2dbab30fd52aba7', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnZKYUdWUUpBa2xobW83Zk43N0E3VXhTSlVjZjVndmhoWGpWVktzSiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNzAxNDg4MjtzOjE6ImMiO2k6MTQxNzAxNDg0ODtzOjE6ImwiO3M6MToiMCI7fX0=', 1417014882),
('0e3259f50dc22fd0adc4e1c9e78e163d1dd144e8', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVZxSHJubzZiS0tqajZhUFltU1dCSkZXV3JBV3lETlZHdlBRd3IwaiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNzAwODcyODtzOjE6ImMiO2k6MTQxNzAwODcyODtzOjE6ImwiO3M6MToiMCI7fX0=', 1417008728),
('0ef244d6402f8b3d558740c580835b2eaafdd011', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSkpCbFBPaWtheUZjZFdFMkYzY2d0VXc2bXJTV052bll2RFlOeTFQMCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIxMzE7czoxOiJjIjtpOjE0MTY5OTIxMzE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992131),
('0f1f88248892a8ccfcf203dae3379ff63021cfbb', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTGdEZEgyaExMZFRYdVhjSW1KWWVhZ1phNkZWbkxyT0U2cDRkZ3hPYSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjY0NjM7czoxOiJjIjtpOjE0MTUyNTY0MTI7czoxOiJsIjtzOjE6IjAiO319', 1415326463),
('1588f559c15ee6102c95c1005b6d95dba34572ca', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEFWM2gyRlY5RENlSzByNUxVZXpvRTBCMjJTRzYyck93eUdUSGFJSyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDg3MTg7czoxOiJjIjtpOjE0MTUxMDg3MTg7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415108718),
('15cc3ffd3941e80e59a2bd5806605be2529cf32c', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS09jRUFCSGVsTGVWb2sxeW9Kd1FGaXdXbWhGTEluQ2dkaUZJTFRjTyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMzA1Nzk7czoxOiJjIjtpOjE0MTUzMzA1Nzk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415330579),
('1ac55e8863f4cfa6be1afd26e54f2f6a9223d922', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmR0RE9JaVZrczdacmszRVlIWWg4SmJNOUxyMUVicHFLdWU4ZlNqZyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDI3NzQ7czoxOiJjIjtpOjE0MTUyNDI3NzQ7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415242774),
('20dda9bbed67693d8c371a25bdf10b3d889d31e9', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiY05aNkVtWjBORTk4a25WbmtqNWQycVREMGRoUmVOdVJDeGc2MXJFYyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjExOiJ0ZW1wX21vYmlsZSI7czoxMToiMTgxODIxNTY2OTciO3M6MTA6InRlbXBfbWNvZGUiO2k6MzE0Njg2O3M6MTU6InRlbXBfbWNvZGVfdGltZSI7aToxNDE1NjI5NTQ2O3M6Mzg6ImxvZ2luXzgyZTVkMmM1NmJkZDA4MTEzMThmMGNmMDc4Yjc4YmZjIjtzOjI6IjM1IjtzOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MTMyNTtzOjE6ImMiO2k6MTQxNTU5ODk2OTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416991325),
('215532165cb9381b41910ae46e1a3da53dcd4595', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQXR1VVhyZldIdzhUY0F5bHM2SFNwT2Z3aG9WYTZaM29QazVodGpmWiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMzA0MzA7czoxOiJjIjtpOjE0MTUzMzA0MzA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415330430),
('226ff98cb7de3ce82f703d545fc2f4902f1740ea', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibVphS09VdzJnSmhhYU9WQlV5RVVBZjZVWnVYVnlyeVkwRjd2WEpVZSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMTA2Njk7czoxOiJjIjtpOjE0MTUxMTA2Njk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415110669),
('22fed032686d4c71cc0f879d63b7855ab3c4bcc3', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibE5xQVlFaE1ObGRNdXFUaVdoVWFLZWhuV1pQbm1ReVU5TElyaVQwdSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTU1ODczNDY7czoxOiJjIjtpOjE0MTUzMjkzODg7czoxOiJsIjtzOjE6IjAiO319', 1415587346),
('25141a941d939d1cf1e22752d26c0c1f58b913ad', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHlnc0tTWDM2TjRUa1A1WXQ4QmwzRVBxcm5sT3VIU1p1N3lDYlE4ZSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMzA1Njc7czoxOiJjIjtpOjE0MTUzMzA1Njc7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415330567),
('25b2ca871be33a954765370cdb45978e580e6dde', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1ppS3ZRbWxYUzRPVTRaaW9EUW5XcUtIYTM0azhiOU9icDQ5R2V5aCI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNTk2ODQxMTtzOjE6ImMiO2k6MTQxNTk2ODI5MTtzOjE6ImwiO3M6MToiMCI7fX0=', 1415968412),
('25f5ff6f84693e796b1fea6d8949819cb1d43bad', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic1o4ODFCWk5jZDJSQkhvZHZCY2N1Ym9Ba01WajYwTjRKNGtKUHVYQyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNTA4NDY4NTtzOjE6ImMiO2k6MTQxNTA4Mzc4NTtzOjE6ImwiO3M6MToiMCI7fX0=', 1415084685),
('28fd07872f95238cdd748ab8ce6fa977a0993c1f', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNE9KUWFldEp1VkJNTTRPSXM4VnNqdFpXZ3ZFdlJUenNzTkRNTUpsaCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwOTY7czoxOiJjIjtpOjE0MTY5OTIwOTY7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992096),
('2a684fec2c15f47b0cceb6e2016497d2c4b510cb', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUVNMQk8zWHdJS3k5SUk2QWlTTk9RQ3p5SW1uY0FJamx4WVQ1dXRBbSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA1MjE7czoxOiJjIjtpOjE0MTUyNDA1MjE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240521),
('2e85c435057df978e7c515e9cf72a5abbdb29948', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekZDTjhzOVpJcjhrWE40dVZ5SjdqNEU3QUs0ajZ4NmZEcDh5S2ZiNCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTU1OTc4MTM7czoxOiJjIjtpOjE0MTU1OTc4MTM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415597813),
('31118005ee0a70afa17886ed9fccb26e3d8de988', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1RTTjNvQXBlR3IwM0xwRUxIbTdualZkb01PT0RVTGR1Z0lMZlRwMCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMzA0MDQ7czoxOiJjIjtpOjE0MTUzMzA0MDQ7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415330404),
('3396b9958411fda2ae520be74559416ca23d997a', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1ZwVzRUMjc5RlY4endSZlJ3TzNUTGdNTjB5aWFUck1sN0hJaGVqMSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk0ODI7czoxOiJjIjtpOjE0MTUxMDk0ODI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109482),
('33a0945a26d9b012c4d45bc12c53f1d577c417eb', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOHo4Z3NZdXJpWkZWR3BEZnZycjIyWHJzZFFTQlJaOXJIWHlEZEZjaSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk5MzQ7czoxOiJjIjtpOjE0MTUxMDk5MzQ7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109934),
('39ec4ffac4ea5efda566447ce4bbfe89eb97468b', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidU1HNEo5QUJ4UVpwZGlTd3R5b2JaMmVSTWpiSEhjTUM4RHlCS2R3ZiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MjA1MjtzOjE6ImMiO2k6MTQxNjk5MjA0MTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416992052),
('3a509865cd4c13e2c74e69924a67452463552428', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGRET0pzeU5pT2t0dkVXc0RyMlY0QlFCeldWdDA0aUJxd2NTT1NhaiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA0NzM7czoxOiJjIjtpOjE0MTUyNDA0NzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240473),
('3c94b8252120ad469934443767b14597111741dc', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSndiYVFDdVZVMm0yU1NmdzFhZTVFa0dmR1RsdzJGSGE3TFdHdHJRaSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA0Nzk7czoxOiJjIjtpOjE0MTUyNDA0Nzk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240479),
('4946fa9132d7a92a5bac6344cc9e3b96d2c78ff5', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU09JMk15d1didVZ3ZU5objRVS0U4bThndWNXYjJ1TkVUNkxhazFZQiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwNjg7czoxOiJjIjtpOjE0MTY5OTIwNjg7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992068),
('4b96c35ddfbbebd9e0b86413d233a88043a27db5', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1Q0a1Z3STRCcGNmalJzTVFiUWtSaXNlSHphM1hOWEdFSWYySFJuZiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk5MzE7czoxOiJjIjtpOjE0MTUxMDk5MzE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109931),
('4b9b58f3d4aa1bbb9bceeac6c3c3179ef24c7be2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEpOMlp6b0E4WU9wN2d0QzZUUzRtdkRqM3dCU3p4Z2ZZWjN6T25xTSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDQ3MTc7czoxOiJjIjtpOjE0MTUxMDQ3MTc7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415104717),
('4cc7327692e159553117bcef9d29c333e1c73622', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYUliZkpuQ0pOTXFRZFNEUGMwOWlROG1jYUpSMHBLN0RWTXQ5NXBhQiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk0ODI7czoxOiJjIjtpOjE0MTUxMDk0ODI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109482),
('50c4673abf2b88b55fb44b9a517b20030b2385aa', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1RDdG15TDhRRUNaM0FQUGFXMXRRd2NMR2NiOVE2WjYzN2p5cThzYyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMTA2ODE7czoxOiJjIjtpOjE0MTUxMTA2ODE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415110681),
('51a0cb2d093af33e8ed7180fee53be27e6df508c', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSnlmWk1vZ3V4NkhjUHhpTEU1d25NRmllZ3ZkbEJXcU9UYzg4QUtsNCI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjc5OTk7czoxOiJjIjtpOjE0MTUzMjc5NjI7czoxOiJsIjtzOjE6IjAiO319', 1415327999),
('53480121ed79beb0ed3c14570d64c95fdc91f252', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakpON2RRNGVhd09JUEp0a1RSMEt3UVJZMFVPOXNVRmpvTk8wSnl3OSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwNjM7czoxOiJjIjtpOjE0MTY5OTIwNjM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992063),
('558fe45558df658ea082cca1c7c5b5f695b16919', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR1NqbVJTbHVDbUhTQWE1WFFYWDVJaTh5d2dCMjFrdDUxbTdaU1l3WCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk5MjI7czoxOiJjIjtpOjE0MTUxMDk5MjI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109922),
('5a8d90595c97cb20baf4378296cede371b0d2939', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS1p4VThhTXR2MlJVVTBvSndSeTg5elA3eWZpY3pDR1oyamRQU05DZSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjQ0NjY7czoxOiJjIjtpOjE0MTUzMjQ0NjY7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415324466),
('5f4960e999a3a3e00705a0c3eb4d569d3d331da8', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN3RBQ0xCSlZyZnhZM0JNVFpvWVc0bWdtT2UwV2lhMFRBNXoyV2tJYiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjY1MDY7czoxOiJjIjtpOjE0MTUzMjY0OTU7czoxOiJsIjtzOjE6IjAiO319', 1415326506),
('5f63e3c77e58ce158dbc91ee28249600e222bf25', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOEpyOWhmTGJMUWtJYXVBRlhnQlpzeWZFTWd2eVhGYzNsUk5jRFhUeSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTcwMDg3MTQ7czoxOiJjIjtpOjE0MTcwMDc3ODk7czoxOiJsIjtzOjE6IjAiO319', 1417008714),
('5f74405777a35f5dd165bbe8b821895dd7232c0b', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTFsZnp0dktjOGR3M1BpRTBlb1dRblhmNFlObmN2SDdSTk1xenRwViI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA0MTM7czoxOiJjIjtpOjE0MTUyNDA0MTM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240413),
('61a3c609d4dcc1c5b41f83ef906c6c03f0c64bad', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1lobmtiU2Zmc0J2amFNdTQwaTB4dFJMUlBYVFg1em1CQ2ZKcnl4YSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MjAzMDtzOjE6ImMiO2k6MTQxNjk5MjAwNTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416992030),
('6289a51df8e2b6d13b172de7c6e74369f120037b', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSFFVam5zVVFuYjFZYjNBNEFrWVNvVHRITllMWHBQUEc1ZHBtUzdObyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjc4ODM7czoxOiJjIjtpOjE0MTUzMjc4Mjg7czoxOiJsIjtzOjE6IjAiO319', 1415327883),
('6765696e103bbcb5758b00ab6903a93416077fc3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSkRTMnp0Q01GVFczOXUxczRtVHBTeUVEOGd6dHdUaFo0ZEJMRHhSRiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE3MDM7czoxOiJjIjtpOjE0MTY5OTE3MDM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991703),
('6a27d9cbc18ec057d329fffeba36ef71df05267d', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicmNBZXRuVGF0T3dHaG1ONEJ1R1J2RUh2bzZaNmNRWFRwSEZrU1UzYiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTI2ODA7czoxOiJjIjtpOjE0MTY5OTI2ODA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992680),
('6ae57ed487c9e558e25f22407315d08484a3f712', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZ21Ba1g4aFRneTRHUFI2dXBaMDZrakYxbHNmV0cxWFl4T3ZhUFIwUiI7czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI2NTMyO3M6MToiYyI7aToxNDE1MzI2NTMyO3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1415326532),
('7282bfc0e020355d8193016a1724f537990dfb67', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFVUNTFBQzVyYjMzUVdFUHpwekVPc05aWVNiU1U4UE1XZ2RJV01XdCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE0MjM7czoxOiJjIjtpOjE0MTY5OTE0MjM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991423),
('7732ac70e68ee756f34d9910e89edddb42de8cb1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXN2TkxCRm9VNWc1TUVQV21rUUFORzFXcE5mQTlCV0JFRk9TdXJpTyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MTQwODtzOjE6ImMiO2k6MTQxNjk5MTM3ODtzOjE6ImwiO3M6MToiMCI7fX0=', 1416991408),
('85f74a0aa3c2101b9e10d5f8102f414c54657ac8', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUkJuZFZCbDNSd2I0S3JqMWpSQXZpVmdHc1JQZXNUaElhdTNzV3ZCcCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMzAzMzM7czoxOiJjIjtpOjE0MTUzMzAzMzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415330333),
('8657c2ce8c9d344e8b53b688ba9f3dab671f2e43', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUHoxMHlad0RROXdRblBQancwMkhxMWxDZTBURkxSVU0zSDhVNERybyI7czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI4MTU2O3M6MToiYyI7aToxNDE1MzI4MTU2O3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1415328156),
('8be1c6306bf4ebec325805d76fa6ff5836d031d2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWEdMZVpMRzI2azh1RkdWMkFhQVRObWtrZ1p4QnNQWnB2dmdIeDZyNiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTcwMDg5Mzk7czoxOiJjIjtpOjE0MTcwMDg5Mzk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1417008939),
('8cb2c543999673b8b041e060d62fe01de8611e7f', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoialNVNmROVmZWNWxvbm9OMGpqUXJBeWxiSE1PRGJnaXdnSkRQU1M0biI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDQ0NDk7czoxOiJjIjtpOjE0MTUxMDQ0NDk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415104449),
('91cfa04f80ed30482d8d8f429be0b5f41de02bc6', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDNPcjNmYzdEUnVvZ1JuT2gyQ3Fld2xaYWpydjFxNXdGbUlDTXlFSSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE5NzI7czoxOiJjIjtpOjE0MTY5OTE5NzI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991972),
('924bd7d3c11fd2ec779497d5654d156a70c8baa4', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNk5ib3pmZVZjRmFGSjVRc2w0c0ZySG1RT0lpVEU4T1lJS3FBZHAycSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTc1Njg1MDI7czoxOiJjIjtpOjE0MTcwODMwODU7czoxOiJsIjtzOjE6IjAiO319', 1417568502),
('92b43de97f1f7893527e6926d931981f11153c86', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT3RpV0dRNThoMkhza05WZTBmSFBONkNiOUd4cHptRzE3QVFhbWd5dyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE0ODU7czoxOiJjIjtpOjE0MTY5OTE0ODU7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991485),
('94ee145738f547378b8e5d468c99622503a1d44e', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0piempNc1hBNmFrQlNiUE9PRElRWEJ6dm9XZFQyN081c2Z2ODZCTCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA1MzQ7czoxOiJjIjtpOjE0MTUyNDA1MzQ7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240534),
('959f480118731f4a5a147cd8c648e7c0d1363c93', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSlh0YXZpQUlORDY0SEd4UFRsOGRoak1SWkdQeTdVcDBTYjgzWVRNcSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk5MzM7czoxOiJjIjtpOjE0MTUxMDk5MzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109933),
('9bf7d798e695db18b865cecc794fcf2f5e8b5ed2', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjlRaXF3WTh2d1hBYVhzOWZ1NVRvc2s1YU9GejIyQUxTRTNRSzhNZyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNzAwODczMDtzOjE6ImMiO2k6MTQxNzAwODczMDtzOjE6ImwiO3M6MToiMCI7fX0=', 1417008730),
('9f4f3198817da213830bec77dabb2ca703fa6b84', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSmg3QU85UWhnV3lxYWJjMU9TbWdwSTlWRWVIcW5DSWoySGltdUhTUSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE5Mjg7czoxOiJjIjtpOjE0MTY5OTE5Mjg7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991928),
('9f507675bb33ae530c95de9606a5256c19737f32', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjkyektZUk14NEdjSWRmRDRKUmo5NHlzSW4zRExWSFdQWFd3YVBSeiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNzAwODcyNztzOjE6ImMiO2k6MTQxNzAwODcyNjtzOjE6ImwiO3M6MToiMCI7fX0=', 1417008727),
('9f91aea72b81908a4212bcff1bb3d1438dc17d98', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSTFna2ZHbEJJZjg3R0VSc2xoakpSWGtjNmZxUG1ydDNBdXVEVktKRSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxMzg2NTE3MjtzOjE6ImMiO2k6MTQxMzcyOTkyNztzOjE6ImwiO3M6MToiMCI7fX0=', 1413865172),
('a8f00f16e50b7a736fe2c9182670f83c6f284c84', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidEJNUGNrWXVEQU16TG9xekJqbG5CNUl4blk1Wm04aTJDYTlsUWJ5MyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTcwODMwNTc7czoxOiJjIjtpOjE0MTcwODMwNTc7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1417083057),
('a8fa15b5f11e12b30785d068909405ad9d434c5a', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0Y2dEpwRUZaZkgxT3lXSm56bWZuSzljcjhNbWNuVWJUTGdwbkpyOSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDEwNDI7czoxOiJjIjtpOjE0MTUyNDEwNDI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415241042),
('aeb318a71ccf07981ffc85bf73e8cd83a3fd6cc7', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiczRadUFnTmNJQXRWTDdmZUpscEREZmNwRDdBb21CQXBMWmh6V1g4bCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk5MzM7czoxOiJjIjtpOjE0MTUxMDk5MzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109933),
('b085388a3325a92fb2e2661c6f68c57ff2d8d573', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid3FnMmlBZEVSSTRUaXhIR1VnZnNYTktHR3dXZFZobmlQSktmejZTQyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMTA5MzM7czoxOiJjIjtpOjE0MTUxMTA5MzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415110933),
('b114ac330e2278dd196f1d0af8da99a93316489c', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0U5SE0yd3h2NE1zaWNqSkpndXh3VEJFbzZEaHZDRmxmYjNBNVVWcyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMTA3MjE7czoxOiJjIjtpOjE0MTUxMTA3MjE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415110721),
('b50c8d2ecbde421a23500e4fbd0adcc0c308e4eb', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1JMWVV6RFF0blZsVHV6eDdZeXNpOGlybW14TFdsZ0kxSWRXbmJhRCI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MjU5MDtzOjE6ImMiO2k6MTQxNjk5MjQ2ODtzOjE6ImwiO3M6MToiMCI7fX0=', 1416992590),
('b6b6dbd9fab8ae2748769fca7a7f86f01ced762f', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXp0UU5VeDhobk55V3F4V3YwQzZnaEZROXRpWVcxd20wTWpOUmNKeSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwMzU7czoxOiJjIjtpOjE0MTY5OTIwMzU7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992035),
('b8fa114510714d342119ed10aa7f80ac3e10ae16', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS05HcDhWdFExY3JHQ3pwbnEzRWc2UWFDSE50VFRwMDh5NXFhUDdieSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjMwMzM7czoxOiJjIjtpOjE0MTUzMjMwMzM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415323033),
('bb8583733f4be10e9656de8126b1b34a1add54b4', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlJZWmV6R1lFTUtsUndQVmxKSnRiZWl4YXVMY291QUxIbXJPUmMwbCI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MjY3NTtzOjE6ImMiO2k6MTQxNjk5MjU5NTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416992675),
('bcc988fb77b802a0ffe385cf1fbc291bc87015ec', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWDVYSjFKMEQ0UkNEcUcyVVVoT3NuQ1hVbGF1NXVHaFcxaGJNbkpGNCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk0ODI7czoxOiJjIjtpOjE0MTUxMDk0ODI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109482),
('be4913f9a4c00042976c419def24079e9d011bab', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkUxQ0JYblByWjY2U1A2VGE2MTZNYWpiZ1poVGJNVG9JbGZOeUZ1ZCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE0MjI7czoxOiJjIjtpOjE0MTY5OTE0MjI7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991422),
('c406138d410030c705e8245b6e917133f0490d52', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVUVjS1NnaWRmTFRCRGFjYWh3NFpDaUQ2b29ib1F1bEpjd1JUbXE0OCI7czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI4MzA2O3M6MToiYyI7aToxNDE1MzI4MzA2O3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1415328306),
('c40b1720b5fb0afad8943c7235685ea0377e1583', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSllNWHc1UFRXQWRxOVJjdXFUUllodWlGSGlEd2dzRWlkVmlwRUw2TyI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0NjoiaHR0cDovL3d3dy5jZGZkYy5jb20vY19lc2YvcHVibGljL2hvdXNlL2NyZWF0ZSI7fXM6NToiZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI5Mzc4O3M6MToiYyI7aToxNDE1MzI5MTA1O3M6MToibCI7czoxOiIwIjt9fQ==', 1415329378),
('c5b14ebced059692f0eed088d3f11b4b64099514', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicnhUZXM3WEVwVGtZdXFuRXNrZXlkRjVIZnZyeXNJRk11Q0J6S0Y2cSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTcwMTQ2NTY7czoxOiJjIjtpOjE0MTcwMDg5NTY7czoxOiJsIjtzOjE6IjAiO319', 1417014656),
('c93cd2c958329880b0f8047fca1293e6dd9ff36d', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid25HZWpjU1k3aVNOclhYTm1TVVY5OEZqRWlJa0RsZXZReDA1UkFkRCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUzMjQ0NDk7czoxOiJjIjtpOjE0MTUzMjQ0NDk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415324449),
('c9d7a68e45d820a2300a75f74abd9be2d03035a8', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRlJqQkhIZHZDV01MWE5wZ2FpalVMVXcwUlRrRFB2amNZTzhpOFk5MSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNTI0NTA5MztzOjE6ImMiO2k6MTQxMzcyODA0NDtzOjE6ImwiO3M6MToiMCI7fX0=', 1415245093),
('cbe493b9b6242743859fee1ec9a3f044d5516dc6', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1QxSVJRaXljUmpVY204RE1wRGd1dnFWZ1VYQjZDcHJ6UTZWVHdFbiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDA2Mjc7czoxOiJjIjtpOjE0MTUyNDA2Mjc7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240627),
('cfd02fbd60437b7bc9e83219aa7d0c188507dd1d', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWoyb2ZJR1VwQmhyVXFTejd6NG1qbUozMW5ZQ1NGNE9TTmxrV2dOTiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUyNDAyOTA7czoxOiJjIjtpOjE0MTUyNDAyOTA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415240290),
('d0f652bf75197b162809ceeb7521176c035b3437', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWU2QjhLNVVmdmVxQk50QmNTT3lmZm1rRkdlUllDMjJWMG5tWDc4SSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDQ2NzA7czoxOiJjIjtpOjE0MTUxMDQ2NzA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415104670),
('db8fbff1945f8e8d982999dd76ce435409b6ea34', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1kxYTVtQUx2c3R2elczb2lUejh6SHQ2ZWlQWVVkNURVRlhsZ0ZEciI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk0Nzk7czoxOiJjIjtpOjE0MTUxMDk0Nzk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109480),
('de69d9e2d5454e5e13f2e31f6722f9525d1888d4', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoia2lCVnE2dHVXdkpxV2x1ZkVBbmxVcTgyZnJtRm9JSEY5bDF2QmFVVyI7czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI2NDc0O3M6MToiYyI7aToxNDE1MzI2NDc0O3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1415326474),
('e12f8a64aa13268d3a1381dfffa64e4b42dc860d', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUVFcFM2UWNrTVhCMEdJc25pSmFrUDVqTVU1QURoT1I4amVqMmx1VCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMTEzMDA7czoxOiJjIjtpOjE0MTUxMTEzMDA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415111300),
('e32ea48195c54a640de8f31727ed3a14b4077f79', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblRGTVpwblJ2bXdIZHhTVkh1U0hCQ2JXRktiNk8welV5Mmk3cnNMbiI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNzAxNDY5OTtzOjE6ImMiO2k6MTQxNzAxNDY5NjtzOjE6ImwiO3M6MToiMCI7fX0=', 1417014699),
('e332798f3665eee043fd37d30c8599ae38a5636c', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoickZRbTg4SXFnd05EVlptSEs5RVA5akRiV3V1bzZLckxBM3ZFcW1RRyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwODc7czoxOiJjIjtpOjE0MTY5OTIwODc7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992087),
('e39701e1c3a2fe4ea9502fa4970a0f1f0342e946', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHhUTHYwQ0Z0OGkxaE5lMGJ4bXFMd2ZBc0ZkdHV1bE16YTViNEZINyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDUzMTY7czoxOiJjIjtpOjE0MTUxMDUzMTY7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415105316),
('e5c1851e370fdc526f7a5ec3305b16e39cad123d', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVp5c2p3SEhLRE1lZzd4QjZPWE90aFByZ0lQSk9DWXRnMDJPOXZMNyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTIwOTA7czoxOiJjIjtpOjE0MTY5OTIwOTA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416992090),
('e8dcfcc31bf3c922d29631ae3c37680df5f46fca', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlltYjdvT0c2UWo2eVk3OVpETEY3QjRWUzV6NFFVeGRrcE1UQWxxayI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5MzMxMTtzOjE6ImMiO2k6MTQxNjk5Mjc3MTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416993312),
('ec6f6e9193507a189e63e14e1c7e7b3c5bfbef17', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOFlqdXEwb0FNeFJtOTNaZ1VLZU0wT0lubFl6cjhWWDFXUFFjQVBleSI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM4OiJsb2dpbl84MmU1ZDJjNTZiZGQwODExMzE4ZjBjZjA3OGI3OGJmYyI7czoyOiIzNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTcwODI5NzE7czoxOiJjIjtpOjE0MTcwNTI3NDQ7czoxOiJsIjtzOjE6IjAiO319', 1417082971),
('ee3230e40cad991cfa9a91bf3a06ac3593329253', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoid2JMNE9hNWhISlFJT0FOcmdvSHBxQ1V3QkJsZ3BaQ1o3eEdiYjFUbSI7czozODoibG9naW5fODJlNWQyYzU2YmRkMDgxMTMxOGYwY2YwNzhiNzhiZmMiO3M6MjoiMzUiO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDE1MzI4NDkzO3M6MToiYyI7aToxNDE1MzI4NDkzO3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1415328493),
('ef5bc61276a93e93d69a96efdeb09e1d55038383', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVA3MUMxWlMzVEZ0a1haeERleUhOeHk1Y2pLbjE4dGZzeGRRTlAzNyI7czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQxNjk5Mjc2OTtzOjE6ImMiO2k6MTQxNjk5MjY4NTtzOjE6ImwiO3M6MToiMCI7fX0=', 1416992769),
('f17964c169a6c7c09193fbe2ccc5b9b8581d5cc0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNGc5dG1kaFNoTThSV3h1WkdxeE40YWg3SVdma2hXTmNzQndkR2ZSNSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTU1OTg5Njk7czoxOiJjIjtpOjE0MTU1OTg5Njk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415598969),
('fab2ba6c15d597d8f922652186d1f9043d1d2f94', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTVPV0t5czVHVWlnRThYWlcyR0FhYUVCZ2Zmdnp0eU8ySVZPY1E3UiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDk0OTM7czoxOiJjIjtpOjE0MTUxMDk0OTM7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415109493),
('fe1a8874288263235c2299623c7ff7cdd1159259', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibWVEUm5wdFdERXRoZ2dnb3c0VE02ZFF5cmN1Q3BKRFlpQUs5eVRxVCI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTY5OTE0MTE7czoxOiJjIjtpOjE0MTY5OTE0MTE7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1416991411),
('ff2487779473640fcccc86944aa44714dce97dc1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUZtTU01RDFWbFRJeWJtNldObGZoWHBRNVgwenZwajNXYmFRRkhlSSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0MTUxMDQ2NTA7czoxOiJjIjtpOjE0MTUxMDQ2NTA7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1415104650);

-- --------------------------------------------------------

--
-- 表的结构 `sl_migrations`
--

CREATE TABLE IF NOT EXISTS `sl_migrations` (
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sl_office`
--

CREATE TABLE IF NOT EXISTS `sl_office` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `region_id` tinyint(2) NOT NULL,
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `price` float(8,2) NOT NULL COMMENT '单价',
  `floor` varchar(255) NOT NULL COMMENT '楼层；存储json格式的数据，如：json_encode( array( ‘total_floor’ => 1, ‘floor’ => 1 ) )',
  `total_floor` tinyint(3) NOT NULL,
  `current_floor` tinyint(3) NOT NULL,
  `type_id` smallint(6) DEFAULT NULL COMMENT '类型ID',
  `validity` smallint(6) DEFAULT NULL COMMENT '有效期',
  `property_corporation` varchar(255) NOT NULL COMMENT '物业公司',
  `property_costs` varchar(255) NOT NULL COMMENT '物业费',
  `construct_year` smallint(6) NOT NULL COMMENT '建筑年代',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `thumbnail` varchar(255) NOT NULL,
  `traffic` text NOT NULL COMMENT '房源描述',
  `around` text NOT NULL COMMENT '房源描述',
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sl_office`
--

INSERT INTO `sl_office` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `region_id`, `area_id`, `address`, `construction_area`, `price`, `floor`, `total_floor`, `current_floor`, `type_id`, `validity`, `property_corporation`, `property_costs`, `construct_year`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `thumbnail`, `traffic`, `around`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(9, '逍遥', '18182156697', '紫金城・金色世纪', 21, 1, 9, '常德市紫菱路与荷花路交汇处东北角', 245.00, 200.00, '{"floor":"2","total_floor":"12"}', 12, 2, 1, 15, '', '', 0, 1, '["1","2"]', '["\\u53d1\\u7684\\u8428\\u82ac"]', '精装写字楼4', '["5","6","9","10"]', 'type_idtype_idtype_id', '', 'type_id<br />\r\ntype_idtype_idtype_id', 'type_idtype_idtype_id', '', 0, 0, 0, 0, 35, 1, '2014-10-22 15:45:24', '2014-10-22 07:43:53', '2014-11-28 02:06:23');

-- --------------------------------------------------------

--
-- 表的结构 `sl_pay_method`
--

CREATE TABLE IF NOT EXISTS `sl_pay_method` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `sort` smallint(6) NOT NULL DEFAULT '0',
  `belong` tinyint(2) NOT NULL DEFAULT '0' COMMENT '(0:所有, 1:住宅出租，2:商铺出租，3:写字楼出租，4:别墅出租)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `sl_pay_method`
--

INSERT INTO `sl_pay_method` (`id`, `name`, `sort`, `belong`) VALUES
(1, '面议', 0, 0),
(2, '月付', 0, 0),
(3, '半年付', 0, 0),
(4, '押一付三', 0, 0),
(5, '季付', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent`
--

CREATE TABLE IF NOT EXISTS `sl_rent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `region_id` tinyint(3) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT '地址',
  `rent_method_id` smallint(6) NOT NULL COMMENT '租赁方式id',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `room` tinyint(1) NOT NULL,
  `hall` tinyint(1) NOT NULL,
  `bathroom` tinyint(1) NOT NULL,
  `construction_area` smallint(5) NOT NULL COMMENT '建筑面积',
  `price` smallint(5) NOT NULL COMMENT '租金',
  `pay_method_id` smallint(6) NOT NULL COMMENT '支付方式',
  `floor` varchar(255) NOT NULL COMMENT '楼层；存储json格式的数据，如：json_encode( array( ‘total_floor’ => 1, ‘floor’ => 1 ) )',
  `current_floor` tinyint(3) NOT NULL,
  `total_floor` tinyint(3) NOT NULL,
  `house_number` varchar(255) NOT NULL COMMENT '楼栋号； 存储json格式的数据，如：json_encode( array( ‘floor’ => 1, ‘unit’ => 1, ‘room’ => 1 ) )',
  `direction_id` smallint(6) DEFAULT NULL COMMENT '朝向ID',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `thumbnail` varchar(255) NOT NULL,
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `sl_rent`
--

INSERT INTO `sl_rent` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `area_id`, `region_id`, `address`, `rent_method_id`, `room_structure`, `room`, `hall`, `bathroom`, `construction_area`, `price`, `pay_method_id`, `floor`, `current_floor`, `total_floor`, `house_number`, `direction_id`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `thumbnail`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', '金海岸二期', NULL, 8, 0, '津市市九澧大道金海岸小区二期售楼部', 7, '{"room":"1","hall":"1","bathroom":"1"}', 0, 0, 0, 245, 200, 1, '{"total_floor":"1","floor":"2"}', 0, 0, '{"floor":"12","unit":"1","room":"202"}', 2, 2, '["1","2"]', NULL, '房屋出租', '["6","10"]', '<p>发的萨芬山大法撒旦第三方&nbsp;</p>', '', '', 0, 0, 1, 0, 35, 1, '2014-11-04 16:05:33', '2014-10-24 01:20:27', '2014-11-04 08:10:16'),
(2, '补天', '18182156697', '欣隆盛世·朗郡', NULL, 8, 0, '武陵区三闾南路（东方嘉园斜对面）', 6, '{"room":"1","hall":"1","bathroom":"1"}', 0, 0, 0, 245, 200, 1, '{"floor":"2","total_floor":"22"}', 2, 22, '{"floor":"","unit":"","room":""}', 0, 2, '["3"]', NULL, '小户型急租', '', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-11 22:27:35', '2014-11-11 14:22:21', '2014-11-19 04:06:07'),
(3, '补天', '18182156697', '西城水恋', NULL, 8, 0, '常澧路与长庚路交汇处，洞庭大道烟厂联合工房斜对面', 6, '{"room":"1","hall":"1","bathroom":"1"}', 0, 0, 0, 245, 200, 1, '{"floor":"2","total_floor":"22"}', 2, 22, '{"floor":"","unit":"","room":""}', 2, 2, '["3"]', NULL, '西城水恋', '', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-11 22:27:35', '2014-11-11 14:22:21', '2014-11-19 04:05:01'),
(4, '逍遥', '18182156697', '金海岸二期', NULL, 8, 0, '津市市九澧大道金海岸小区二期售楼部', 7, '{"room":"1","hall":"1","bathroom":"1"}', 0, 0, 0, 245, 200, 1, '{"total_floor":"1","floor":"2"}', 0, 0, '{"floor":"12","unit":"1","room":"202"}', 2, 2, '["1","2"]', NULL, '房屋出租', '["6","10"]', '<p>发的萨芬山大法撒旦第三方&nbsp;</p>', '', '', 0, 0, 1, 0, 35, 1, '2014-11-04 16:05:33', '2014-10-24 01:20:27', '2014-11-04 08:10:16'),
(5, '补天', '18182156697', '北金城', 43, 8, 1, '常德市皂果路与常德大道交汇处', 6, '{"room":"1","hall":"1","bathroom":"1"}', 1, 1, 1, 245, 200, 1, '{"floor":"2","total_floor":"22"}', 2, 22, '{"floor":"","unit":"","room":""}', 0, 0, '["1"]', NULL, '北金城精装出租', '["2","6","10"]', '', 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/QQ20140115-1.png', '{"1416370437":{"id":"1416370437","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/19\\/QQ20140115-1.png"}}', 0, 0, 1, 0, 35, 1, '2014-11-11 22:27:35', '2014-11-11 14:22:21', '2014-11-28 08:47:16'),
(6, '逍遥', '18182156697', '金海岸二期', NULL, 8, 0, '津市市九澧大道金海岸小区二期售楼部', 7, '{"room":"1","hall":"1","bathroom":"1"}', 0, 0, 0, 245, 200, 1, '{"total_floor":"1","floor":"2"}', 0, 0, '{"floor":"12","unit":"1","room":"202"}', 2, 2, '["1","2"]', NULL, '房屋出租', '["6","10"]', '<p>发的萨芬山大法撒旦第三方&nbsp;</p>', '', '', 0, 0, 1, 0, 35, 1, '2014-11-04 16:05:33', '2014-10-24 01:20:27', '2014-11-04 08:10:16');

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent_common`
--

CREATE TABLE IF NOT EXISTS `sl_rent_common` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `community_name` varchar(255) NOT NULL,
  `community_id` int(11) NOT NULL,
  `foreign_id` int(11) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` smallint(4) NOT NULL,
  `construction_area` smallint(4) NOT NULL,
  `region_id` tinyint(3) NOT NULL,
  `area_id` tinyint(3) NOT NULL,
  `is_individual` tinyint(1) NOT NULL DEFAULT '0',
  `is_commissioned` tinyint(1) NOT NULL DEFAULT '0',
  `is_broker` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `sl_rent_common`
--

INSERT INTO `sl_rent_common` (`id`, `type`, `title`, `community_name`, `community_id`, `foreign_id`, `thumbnail`, `address`, `price`, `construction_area`, `region_id`, `area_id`, `is_individual`, `is_commissioned`, `is_broker`, `is_admin`, `member_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 'rent', '北金城精装出租', '北金城', 43, 5, 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/19/QQ20140115-1.png', '常德市皂果路与常德大道交汇处', 200, 245, 1, 8, 1, 0, 0, 0, 35, 1, '2014-11-28 16:45:35', '2014-11-28 16:47:16');

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent_method`
--

CREATE TABLE IF NOT EXISTS `sl_rent_method` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `sort` smallint(6) NOT NULL DEFAULT '0',
  `belong` tinyint(2) NOT NULL DEFAULT '0' COMMENT '(0:所有, 1:住宅出租，2:商铺出租，3:写字楼出租，4:别墅出租)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sl_rent_method`
--

INSERT INTO `sl_rent_method` (`id`, `name`, `sort`, `belong`) VALUES
(6, '押一付三', 0, 0),
(7, '押一付二', 0, 0),
(8, '半年付', 0, 0),
(9, '押一付一', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent_office`
--

CREATE TABLE IF NOT EXISTS `sl_rent_office` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `rent_method_id` varchar(255) NOT NULL COMMENT '租赁方式id',
  `type_id` smallint(6) NOT NULL,
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `price` float(8,2) NOT NULL COMMENT '租金',
  `validity` smallint(6) NOT NULL COMMENT '有效期',
  `pay_method_id` float(8,2) NOT NULL COMMENT '支付方式',
  `is_include_property_costs` tinyint(1) DEFAULT '1' COMMENT '是否包含物业费',
  `property_corporation` varchar(255) NOT NULL COMMENT '物业公司',
  `property_costs` varchar(255) NOT NULL COMMENT '物业费',
  `floor` varchar(255) NOT NULL COMMENT '楼层；存储json格式的数据，如：json_encode( array( ‘total_floor’ => 1, ‘floor’ => 1 ) )',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sl_rent_office`
--

INSERT INTO `sl_rent_office` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `area_id`, `address`, `rent_method_id`, `type_id`, `construction_area`, `price`, `validity`, `pay_method_id`, `is_include_property_costs`, `property_corporation`, `property_costs`, `floor`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', '金色华庭', NULL, 8, '临澧县安福镇兴隆街', '7', 1, 45.00, 20.00, 0, 4.00, 1, '3432', '12', '{"floor":"18","total_floor":"22"}', 2, '["1","2"]', '["afds f "]', '写字楼出租测试', '["6","10"]', '<p>dsf ds fad f ds&nbsp;</p>', '', 0, 0, 0, 0, 0, 1, '2014-10-24 17:29:41', '2014-10-24 09:06:11', '2014-11-04 09:16:57');

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent_shop`
--

CREATE TABLE IF NOT EXISTS `sl_rent_shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `rent_type` tinyint(1) DEFAULT '0' COMMENT '0:出租，1转让',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `type_id` smallint(6) DEFAULT NULL COMMENT '类型ID',
  `shop_face_type_id` smallint(6) DEFAULT NULL COMMENT '铺面类型ID',
  `shop_status` smallint(6) DEFAULT NULL COMMENT '当前状态，1:营业中，2:闲置中，3:新铺',
  `shop_manager_type` varchar(255) NOT NULL COMMENT '关联经营类别表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `price` float(8,2) NOT NULL COMMENT '租金',
  `price_unit` tinyint(1) NOT NULL DEFAULT '0',
  `pay_method_id` float(8,2) NOT NULL COMMENT '支付方式',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `validity` smallint(6) DEFAULT NULL COMMENT '有效期',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='商铺出租' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sl_rent_shop`
--

INSERT INTO `sl_rent_shop` (`id`, `contacts`, `phone`, `rent_type`, `community_name`, `community_id`, `area_id`, `address`, `type_id`, `shop_face_type_id`, `shop_status`, `shop_manager_type`, `construction_area`, `price`, `price_unit`, `pay_method_id`, `decoration_id`, `tag`, `customer_tag`, `validity`, `title`, `supporting`, `content`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', 1, '金海岸二期', NULL, 8, '津市市九澧大道金海岸小区二期售楼部', 1, 1, 0, '["1","5","9"]', 12.00, 132.00, 0, 4.00, 1, '["1"]', NULL, 15, '商铺出租测试', '["1","5"]', '啊说对方但是飞', '', 0, 0, 0, 0, 0, 1, '2014-11-04 15:03:38', '2014-11-04 07:03:38', '2014-11-04 09:17:18');

-- --------------------------------------------------------

--
-- 表的结构 `sl_rent_villas`
--

CREATE TABLE IF NOT EXISTS `sl_rent_villas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `rent_method_id` varchar(255) NOT NULL COMMENT '租赁方式id',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `price` float(8,2) NOT NULL COMMENT '租金',
  `pay_method_id` float(8,2) NOT NULL COMMENT '支付方式',
  `floor` smallint(6) NOT NULL COMMENT '楼层；存储json格式的数据，如：json_encode( array( ‘total_floor’ => 1, ‘floor’ => 1 ) )',
  `house_number` varchar(255) NOT NULL COMMENT '楼栋号； 存储json格式的数据，如：json_encode( array( ‘floor’ => 1, ‘unit’ => 1, ‘room’ => 1 ) )',
  `direction_id` smallint(6) DEFAULT NULL COMMENT '朝向ID',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sl_rent_villas`
--

INSERT INTO `sl_rent_villas` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `area_id`, `address`, `rent_method_id`, `room_structure`, `construction_area`, `price`, `pay_method_id`, `floor`, `house_number`, `direction_id`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', '汇景中央', NULL, 9, '澧县政务中心斜对面', '7', '{"room":"1","hall":"1","bathroom":"1"}', 245.00, 200.00, 2.00, 3, '{"floor":"12","unit":"1"}', 3, 0, '["1","2"]', '["\\u7684\\u6492\\u53d1\\u7684\\u8bf4\\u6cd5"]', '别墅出租', '["2","10"]', '<p>sdafsdfdsaasdfsdafsdfsdfsdfdsfdsaf</p>', '{"1414121327":{"id":"1414121327","url":"http:\\/\\/www.cdfdc.com\\/cdfdc\\/usercenter\\/public\\/uploads\\/2014\\/10\\/24\\/css-cheat-sheet-v2.png"},"1414121338":{"id":"1414121338","url":"http:\\/\\/www.cdfdc.com\\/cdfdc\\/usercenter\\/public\\/uploads\\/2014\\/10\\/24\\/logo.png"},"1414121346":{"id":"1414121346","url":"http:\\/\\/www.cdfdc.com\\/cdfdc\\/usercenter\\/public\\/uploads\\/2014\\/10\\/24\\/php-cheat-sheet-v2.png"},"1414121388":{"id":"1414121388","url":"http:\\/\\/www.cdfdc.com\\/cdfdc\\/usercenter\\/public\\/uploads\\/2014\\/10\\/24\\/regular-expressions-cheat-sheet-v21.png"},"1414121389":{"id":"1414121389","url":"http:\\/\\/www.cdfdc.com\\/cdfdc\\/usercenter\\/public\\/uploads\\/2014\\/10\\/24\\/rgb-hex-cheat-sheet-v1.png"}}', 0, 0, 0, 0, 0, 1, '2014-10-24 11:29:55', '2014-10-24 03:17:48', '2014-11-04 08:09:59');

-- --------------------------------------------------------

--
-- 表的结构 `sl_sale_common`
--

CREATE TABLE IF NOT EXISTS `sl_sale_common` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `community_name` varchar(255) NOT NULL,
  `community_id` int(11) NOT NULL,
  `foreign_id` int(11) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` smallint(4) NOT NULL,
  `construction_area` smallint(4) NOT NULL,
  `region_id` tinyint(3) NOT NULL,
  `area_id` tinyint(3) NOT NULL,
  `is_individual` tinyint(1) NOT NULL DEFAULT '0',
  `is_commissioned` tinyint(1) NOT NULL DEFAULT '0',
  `is_broker` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `sl_sale_common`
--

INSERT INTO `sl_sale_common` (`id`, `type`, `title`, `community_name`, `community_id`, `foreign_id`, `thumbnail`, `address`, `price`, `construction_area`, `region_id`, `area_id`, `is_individual`, `is_commissioned`, `is_broker`, `is_admin`, `member_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'house', '二手房测试', '绿地新都会', 23, 8, '', '常德经济技术开发区姚家湾路', 100, 123, 1, 8, 1, 0, 0, 0, 35, 1, '2014-11-28 16:22:29', '2014-11-28 16:22:29'),
(2, 'villas', '别墅出售', '中原德景园', 0, 3, '', '常德市洞庭大道与皂果路交汇处', 200, 45, 1, 8, 1, 0, 0, 0, 35, 1, '2014-11-28 16:44:25', '2014-11-28 16:44:25'),
(3, 'house', '会员楼盘测试', '紫金城・金色世纪', 0, 9, '', '常德市紫菱路与荷花路交汇处东北角', 200, 245, 1, 8, 1, 0, 0, 0, 35, 1, '2014-11-28 16:44:34', '2014-11-28 16:44:34'),
(4, 'office', '精装写字楼4', '紫金城・金色世纪', 21, 9, '', '常德市紫菱路与荷花路交汇处东北角', 200, 245, 1, 9, 1, 0, 0, 0, 35, 1, '2014-11-28 16:44:40', '2014-11-28 16:44:40'),
(5, 'villas', '特价房er', '金海岸二期', 0, 1, '', '津市市九澧大道金海岸小区二期售楼部', 200, 245, 1, 8, 1, 1, 0, 0, 35, 1, '2014-11-28 16:44:53', '2014-11-28 16:44:53');

-- --------------------------------------------------------

--
-- 表的结构 `sl_second_hand_housing`
--

CREATE TABLE IF NOT EXISTS `sl_second_hand_housing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `region_id` tinyint(2) NOT NULL,
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `room` tinyint(1) NOT NULL,
  `hall` tinyint(1) NOT NULL,
  `bathroom` tinyint(1) NOT NULL,
  `construction_area` smallint(5) NOT NULL COMMENT '建筑面积',
  `price` smallint(5) NOT NULL COMMENT '售价',
  `floor` varchar(255) NOT NULL COMMENT '楼层；存储json格式的数据，如：json_encode( array( ‘total_floor’ => 1, ‘floor’ => 1 ) )',
  `current_floor` tinyint(3) NOT NULL,
  `total_floor` tinyint(3) NOT NULL,
  `house_number` varchar(255) NOT NULL COMMENT '楼栋号； 存储json格式的数据，如：json_encode( array( ‘floor’ => 1, ‘unit’ => 1, ‘room’ => 1 ) )',
  `direction_id` smallint(6) DEFAULT NULL COMMENT '朝向ID',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `thumbnail` varchar(255) NOT NULL,
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sl_second_hand_housing`
--

INSERT INTO `sl_second_hand_housing` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `region_id`, `area_id`, `address`, `room_structure`, `room`, `hall`, `bathroom`, `construction_area`, `price`, `floor`, `current_floor`, `total_floor`, `house_number`, `direction_id`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `thumbnail`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(4, '补天', '18182156697', '紫金城・金色世纪', NULL, 0, 8, '常德市紫菱路与荷花路交汇处东北角', '{"room":"4","hall":"1","bathroom":"1"}', 4, 1, 1, 245, 200, '{"floor":"12","total_floor":"17"}', 12, 17, '{"floor":"","unit":"","room":""}', 0, 0, NULL, NULL, '会员楼盘测试', '["9"]', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-11 21:29:04', '2014-11-09 08:49:15', '2014-11-16 12:20:05'),
(5, '补天', '18182156697', '中原德景园', 30, 1, 8, '常德市洞庭大道与皂果路交汇处', '{"room":"3","hall":"1","bathroom":"1"}', 3, 1, 1, 123, 100, '{"floor":"18","total_floor":"22"}', 18, 22, '{"floor":"","unit":"","room":""}', 0, 0, '["1","2"]', NULL, '二手房测试', '["1"]', '<p>中原德景园中原德景园</p><p>中原德景园</p><p>中原德景园</p><p>中原德景园中原德景园中原德景园中原德景园</p><p><span style="font-size: 20px;">中原德景园</span></p>', 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/27/QQ20141125-8.png', '{"1417083459":{"id":"1417083459","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/27\\/QQ20141125-8.png"},"1417083460":{"id":"1417083460","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/27\\/QQ20141125-7.png"},"1417083465":{"id":"1417083465","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/27\\/QQ20141125-5.png"}}', 0, 1, 0, 0, 35, 1, '2014-11-17 11:06:02', '2014-11-17 03:06:02', '2014-11-27 10:17:49'),
(6, '补天', '18182156697', '金色华庭', 106, 1, 8, '临澧县安福镇兴隆街', '{"room":"3","hall":"1","bathroom":"1"}', 3, 1, 1, 123, 100, '{"floor":"18","total_floor":"22"}', 18, 22, '{"floor":"","unit":"","room":""}', 0, 0, '["1","2"]', '["\\u4e2d\\u7b49\\u88c5\\u4fee"]', '二手房测试', '["1"]', '<p>asfadsfdsafsdacvafsdafsadfasdfsacsadfsdafsdaf</p>', '', '', 1, 0, 1, 0, 35, 1, '2014-11-17 11:06:02', '2014-11-17 03:06:02', '2014-11-27 07:56:52'),
(8, '补天', '18182156697', '绿地新都会', 23, 1, 8, '常德经济技术开发区姚家湾路', '{"room":"3","hall":"1","bathroom":"1"}', 3, 1, 1, 123, 100, '{"floor":"18","total_floor":"22"}', 18, 22, '{"floor":"12","unit":"2","room":"202"}', 0, 0, '["1","2"]', '["\\u4e2d\\u7b49\\u88c5\\u4fee"]', '二手房测试', '["1"]', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-17 11:06:02', '2014-11-17 03:06:02', '2014-11-28 08:22:29'),
(9, '补天', '18182156697', '紫金城・金色世纪', 0, 1, 8, '常德市紫菱路与荷花路交汇处东北角', '{"room":"4","hall":"1","bathroom":"1"}', 4, 1, 1, 245, 200, '{"floor":"12","total_floor":"17"}', 12, 17, '{"floor":"","unit":"","room":""}', 0, 0, NULL, NULL, '会员楼盘测试', '["9"]', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-11 21:29:04', '2014-11-09 08:49:15', '2014-11-28 08:44:34');

-- --------------------------------------------------------

--
-- 表的结构 `sl_shop`
--

CREATE TABLE IF NOT EXISTS `sl_shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `region_id` tinyint(2) NOT NULL,
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `construction_area` smallint(5) NOT NULL COMMENT '建筑面积',
  `construct_year` smallint(6) NOT NULL COMMENT '建筑年代',
  `price` smallint(5) NOT NULL COMMENT '单价',
  `type_id` smallint(6) DEFAULT NULL COMMENT '商铺类型ID',
  `shop_face_type_id` smallint(6) DEFAULT NULL COMMENT '铺面类型ID',
  `shop_manager_type` varchar(255) NOT NULL COMMENT '关联经营类别表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `validity` smallint(6) DEFAULT NULL COMMENT '有效期',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `thumbnail` varchar(255) NOT NULL,
  `traffic` text NOT NULL COMMENT '交通状况',
  `around` text NOT NULL COMMENT '周边配套',
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sl_shop`
--

INSERT INTO `sl_shop` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `region_id`, `area_id`, `address`, `construction_area`, `construct_year`, `price`, `type_id`, `shop_face_type_id`, `shop_manager_type`, `validity`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `thumbnail`, `traffic`, `around`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', '金色华庭', NULL, 0, 6, '临澧县安福镇兴隆街', 245, 0, 200, 1, NULL, '["1","5","9"]', 15, 2, '["1"]', '["\\u6cd5\\u6492\\u65e6"]', '商铺测试', '["1","5"]', '&nbsp;阿萨帝飞山大', '', '发斯蒂芬是的', '&nbsp;ADS发的撒', '', 0, 0, 0, 0, 0, 1, '2014-10-23 11:52:40', '2014-10-23 03:52:40', '2014-10-23 03:52:40');

-- --------------------------------------------------------

--
-- 表的结构 `sl_shop_face_type`
--

CREATE TABLE IF NOT EXISTS `sl_shop_face_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `sl_shop_face_type`
--

INSERT INTO `sl_shop_face_type` (`id`, `name`, `sort`) VALUES
(1, '店铺', 0),
(2, '摊位', 0),
(3, '柜台', 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_shop_manager_type`
--

CREATE TABLE IF NOT EXISTS `sl_shop_manager_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sl_shop_manager_type`
--

INSERT INTO `sl_shop_manager_type` (`id`, `name`, `sort`) VALUES
(1, '餐饮美食', 0),
(2, '服饰鞋包', 0),
(3, '休闲娱乐', 0),
(4, '美容美发', 0),
(5, '生活服务', 0),
(6, '百货超市', 0),
(7, '酒店宾馆', 0),
(8, '家居建材', 0),
(9, '其他', 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_s_area`
--

CREATE TABLE IF NOT EXISTS `sl_s_area` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `sort` smallint(5) NOT NULL DEFAULT '0',
  `belong` smallint(5) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅, 6:出租，7:商铺出租，8:写字楼出租，9:别墅出租)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- 转存表中的数据 `sl_s_area`
--

INSERT INTO `sl_s_area` (`id`, `name`, `area`, `sort`, `belong`) VALUES
(1, '50平米以下', '0,50', 0, 2),
(2, '50-70平米', '50,70', 0, 2),
(3, '70-90平米', '70,90', 0, 2),
(4, '90-110平米', '90,110', 0, 2),
(5, '110-130平米', '110,130', 0, 2),
(6, '130-150平米', '130,150', 0, 2),
(7, '150-200平米', '150,200', 0, 2),
(8, '200平米以上', '200,100000', 0, 2),
(9, '20平米以下', '0,20', 0, 3),
(10, '20-50平米', '20,50', 0, 3),
(11, '100-150平米', '100,150', 0, 3),
(12, '150-200平米', '150,200', 0, 3),
(13, '200-500平米', '200,500', 0, 3),
(14, '500-1000平米', '500,1000', 0, 3),
(15, '1000平米以上', '1000,1000000', 0, 3);

-- --------------------------------------------------------

--
-- 表的结构 `sl_s_price`
--

CREATE TABLE IF NOT EXISTS `sl_s_price` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `sort` smallint(5) NOT NULL DEFAULT '0',
  `belong` smallint(5) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅, 6:出租，7:商铺出租，8:写字楼出租，9:别墅出租)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- 转存表中的数据 `sl_s_price`
--

INSERT INTO `sl_s_price` (`id`, `name`, `price`, `sort`, `belong`) VALUES
(1, '30万以下', '0,30', 0, 2),
(2, '30-50万', '30,50', 0, 2),
(4, '80-100万', '50,80', 0, 2),
(5, '100-150万', '100,150', 0, 2),
(6, '150-200万', '150,200', 0, 2),
(7, '200-250万', '200,250', 1, 2),
(8, '300万以上', '300,1000000', 0, 2),
(9, '500元以下', '0,500', 0, 6),
(10, '500-1000元', '500,1000', 1, 6),
(11, '1000-2000元', '1000,2000', 0, 6),
(12, '2000-3000元', '2000,3000', 0, 6),
(13, '3000元以上', '3000,100000000', 0, 6),
(14, '2000元以下', '0,2000', 0, 3),
(15, '2000-5000元', '2000,5000', 0, 3),
(16, '5000-8000元', '5000,8000', 0, 3),
(17, '8000-10000元', '8000,10000', 0, 3),
(18, '10000-15000元', '10000,15000', 0, 3),
(19, '15000-20000元', '15000,20000', 0, 3),
(20, '20000元以上', '20000,200000', 0, 3);

-- --------------------------------------------------------

--
-- 表的结构 `sl_tag`
--

CREATE TABLE IF NOT EXISTS `sl_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `sl_tag`
--

INSERT INTO `sl_tag` (`id`, `name`, `sort`, `belong`) VALUES
(1, '两证齐全', 0, 0),
(2, '满五年', 0, 0),
(3, '小户型', 0, 0),
(4, '业主急售', 0, 0),
(5, '特价房', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_type`
--

CREATE TABLE IF NOT EXISTS `sl_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名字',
  `sort` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `belong` smallint(6) NOT NULL DEFAULT '0' COMMENT '所属类别 (0:所有，1:新房，2：二手房，3：商铺，4：写字楼，5，别墅)，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `sl_type`
--

INSERT INTO `sl_type` (`id`, `name`, `sort`, `belong`) VALUES
(1, '住宅底商', 0, 0),
(2, '商业街商铺', 0, 0),
(3, '临街门面', 0, 0),
(4, '写字楼配套底商', 0, 0),
(5, '购物中心/百货', 0, 0),
(6, '其他', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `sl_villas`
--

CREATE TABLE IF NOT EXISTS `sl_villas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contacts` char(20) NOT NULL COMMENT '联系人',
  `phone` char(11) NOT NULL COMMENT '联系人手机',
  `community_name` varchar(255) NOT NULL COMMENT '小区名字',
  `community_id` int(11) DEFAULT NULL COMMENT '小区ID；如果小区名称在小区表中有，这里为名字对应的小区的ID',
  `region_id` tinyint(2) NOT NULL,
  `area_id` smallint(6) NOT NULL COMMENT '城区ID',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `room_structure` varchar(255) NOT NULL COMMENT '户型；存储json格式的数据，如：json_encode( array( ‘room’ => 1, ‘hall’ => 1, ‘bathroom’ => 1 ) )',
  `room` tinyint(1) NOT NULL,
  `hall` tinyint(1) NOT NULL,
  `bathroom` tinyint(1) NOT NULL,
  `construction_area` float(8,2) NOT NULL COMMENT '建筑面积',
  `price` float(8,2) NOT NULL COMMENT '售价',
  `floor` smallint(6) NOT NULL COMMENT '楼层数',
  `house_number` varchar(255) NOT NULL COMMENT '楼栋号； 存储json格式的数据，如：json_encode( array( ‘floor’ => 1, ‘unit’ => 1 ) )',
  `direction_id` smallint(6) DEFAULT NULL COMMENT '朝向ID',
  `decoration_id` smallint(6) DEFAULT NULL COMMENT '装修表id',
  `tag` varchar(255) DEFAULT NULL COMMENT '特色标签；标签表id；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `customer_tag` varchar(255) DEFAULT NULL COMMENT '自定义特色标签; 存储json格式的数据，如：json_encode( array(‘特色标签1’, ‘特色标签2’, ‘特色标签3’) )',
  `title` varchar(255) NOT NULL COMMENT '房源标题',
  `supporting` varchar(255) NOT NULL COMMENT '房源配套; 关联配套表；存储json格式的数据，如：json_encode( array(‘1’, ‘2’, ‘3’ ……) )',
  `content` text NOT NULL COMMENT '房源描述',
  `thumbnail` varchar(255) NOT NULL,
  `room_images` text NOT NULL COMMENT '室内图; 关联附件表，存储json格式数据，包括图片id和图片地址。\n如：json_encode( array( array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’), array(‘id’, => 1, ‘url’ => ‘http://www.0736fdc.com/upload/2014/10/17/1231241324.png’) …… ) )\n',
  `is_commissioned` tinyint(1) NOT NULL COMMENT '是否委托',
  `is_broker` tinyint(1) NOT NULL COMMENT '是否为中介房源',
  `is_individual` tinyint(1) NOT NULL COMMENT '是否为个人房源',
  `is_admin` tinyint(1) NOT NULL COMMENT '是否为本网房源',
  `member_id` int(11) NOT NULL COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态;审核状态 0：退回，2：再次提交审核，1：审核通过。默认审核通过',
  `refresh_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '刷新时间',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `sl_villas`
--

INSERT INTO `sl_villas` (`id`, `contacts`, `phone`, `community_name`, `community_id`, `region_id`, `area_id`, `address`, `room_structure`, `room`, `hall`, `bathroom`, `construction_area`, `price`, `floor`, `house_number`, `direction_id`, `decoration_id`, `tag`, `customer_tag`, `title`, `supporting`, `content`, `thumbnail`, `room_images`, `is_commissioned`, `is_broker`, `is_individual`, `is_admin`, `member_id`, `status`, `refresh_at`, `created_at`, `updated_at`) VALUES
(1, '逍遥', '18182156697', '金海岸二期', NULL, 0, 8, '津市市九澧大道金海岸小区二期售楼部', '{"room":"2","hall":"1","bathroom":"1"}', 2, 1, 1, 245.00, 200.00, 0, '{"floor":"12","unit":"1"}', 2, 0, '["1","2"]', NULL, '特价房er', '["5","6","9","10"]', '<p>特价房特价房特价房特价房</p>', 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/28/QQ20141125-5.png', '{"1417164289":{"id":"1417164289","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/28\\/QQ20141125-5.png"}}', 1, 0, 0, 0, 35, 1, '2014-10-22 10:20:35', '2014-10-22 01:28:25', '2014-11-28 08:44:53'),
(2, '补天', '18182156697', '紫金城・金色世纪', NULL, 0, 7, '常德市紫菱路与荷花路交汇处东北角', '{"room":"3","hall":"1","bathroom":"1"}', 0, 0, 0, 245.00, 200.00, 3, '{"floor":"1","unit":"1"}', 1, 1, '["1","2"]', NULL, '特色别墅', '["2","6","10"]', '', '', '', 0, 0, 1, 0, 35, 1, '2014-11-16 18:40:51', '2014-11-16 10:40:51', '2014-11-16 10:40:51'),
(3, '补天', '18182156697', '中原德景园', NULL, 0, 8, '常德市洞庭大道与皂果路交汇处', '{"room":"4","hall":"2","bathroom":"2"}', 4, 2, 2, 45.00, 200.00, 3, '{"floor":"122","unit":"1"}', 2, 0, '["2"]', NULL, '别墅出售', '["2","3","7","10","11"]', '', 'http://www.cdfdc.com/c_esf/public/uploads/2014/11/16/QQ20141115-5.png', '{"1416140868":{"id":"1416140868","url":"http:\\/\\/www.cdfdc.com\\/c_esf\\/public\\/uploads\\/2014\\/11\\/16\\/QQ20141115-5.png"}}', 0, 0, 1, 0, 35, 1, '2014-11-16 18:42:34', '2014-11-16 10:42:34', '2014-11-16 12:27:50');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
