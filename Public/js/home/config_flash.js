/*Ò»Á÷ËØ²ÄÍøÊÕ¼¯ÕûÀí£ºwww.16sucai.com*/

;(function($){
	/*  Variables  */
	var container = null;
	var allImgs = '', allLIs = '', containerStr = '';
	
	var element = this;
	var _bgStretcherPause = false;
	var _bgStretcherTm = null;
	
	$.fn.bgStretcher = function(settings){
		settings = $.extend({}, $.fn.bgStretcher.defaults, settings);
		$.fn.bgStretcher.settings = settings;
		
		function _build(){
			if(!settings.images.length){ return; }
			
			_genHtml();
			
			containerStr = '#' + settings.imageContainer;
			container = $(containerStr);
			allImgs = '#' + settings.imageContainer + ' IMG';
			allLIs = '#' + settings.imageContainer + ' LI';
			
			$(allLIs).hide();
			$(allLIs + ':first').show().addClass('bgs-current');
			
			if(!container.length){ return; }
			$(window).resize(_resize);
			
			if(settings.slideShow && $(allImgs).length > 1){
				_bgStretcherTm = setTimeout('$.fn.bgStretcher.slideShow()', settings.nextSlideDelay);
			}
			_resize();
		};
		
		function _resize(){
			var winW = $(window).width();
			var winH = $(window).height();
			var imgW = 0, imgH = 0,max_w=1224;
			//	Update container's height
			container.width(winW);
			container.height(winH);
			
			//	Non-proportional resize
			if(!settings.resizeProportionally){
				imgW = winW;
				imgH = winH;
			} else {
				var initW = settings.imageWidth, initH = settings.imageHeight;
				var ratio = initH / initW;
				
				imgW = winW;
				imgH = winW * ratio;
				
				if(imgH < winH){
					imgH = winH;
					imgW = imgH / ratio;
				}
			}
			
			//使背景图主体居中
			var off_left=imgW>winW?(winW-imgW)*.5:0;
			
			//	Apply new size for images
			if(!settings.resizeAnimate){
				$(allImgs).width(imgW).height(imgH).css('margin-left',off_left+'px');
				
				//新添加的
				settings.resize_flash_position!=null?settings.resize_flash_position():'';   //改变窗口大小时  修正各个元素的位置
			} else {
				$(allImgs).animate({width: imgW, height: imgH, marginLeft:off_left+'px'}, 'normal');
				
				//新添加的
				settings.resize_flash_position!=null?settings.resize_flash_position():'';   //改变窗口大小时  修正各个元素的位置
			};
			
			/*if($('#bottom_color').length>0){
				if(winH<=768){
					$('#bottom_color').css('bottom','-10px');
					}else{
					$('#bottom_color').css('bottom','27px');
				   };
			};*/
			
			//宽度自适应1024不出现横向滚动条
			
			if(settings.resize_flash_position!=null){  //金谷美丽城
				var obj_head=$('#head');
				var obj_foot=$('#foot div:first');
				var obj_bottom=$('.bottom_menu');
				if(winW>=max_w){
					obj_head.css('width',max_w+'px');
					obj_foot.css('width',max_w+'px');
					obj_bottom.css('width',max_w+'px');
					}else{
							obj_head.css('width',winW+'px');
							obj_foot.css('width',winW+'px');
							obj_bottom.css('width',winW+'px');
						};
				}else{    											//美丽公馆
					
					}
			
			
			
		};
		
		function _genHtml(){
			var code = '<div id="' + settings.imageContainer + '" class="bgstretcher"><ul>';
			for(i = 0; i < settings.images.length; i++){
				code += '<li><img src="' + settings.images[i] + '" alt="" /></li>';
			}
			code += '</ul></div>';
			
			if(settings.img_finish_callback!=null){
				//显示的背景添加onload事件
					var img = new Image;
					/*img.onload = function(){
					alert ( img.width );
					};*/
					finish_load(img,function(){
						settings.img_finish_callback();
						})
					img.src = settings.images[settings.images.length-1];
				}
			
			$(code).appendTo('body');
			
		};
		
		/*  Start bgStretcher  */
		_build();
	};
	function finish_load(image,callback){   //检测图片加载完成
    
			if(navigator.userAgent.indexOf("MSIE")>0){ 
		        if($.browser.version==6.0 || $.browser.version==9.0){ 
		            image.onreadystatechange = function () { 
		                if (image.readyState == "complete"){ 
		                   callback();
		                } 
		            }; 
		        }else{ 
		            ie7imagetime = window.setInterval(function(){ 
		                var rs = image.readyState; 
		                if(rs=="complete"){ 
		                    window.clearInterval(ie7imagetime); 
		                    callback();
		                }else{ 
		                    return; 
		                } 
		            },200); 
		        } 
		    }else{ 
		        image.onload = function () { 
		            if (image.complete == true){ 
		                callback();
		             } 
		        }; 
		    } 
	};	
	$.fn.bgStretcher.play = function(){
       _bgStretcherPause = false;
       $.fn.bgStretcher._clearTimeout();
       $.fn.bgStretcher.slideShow();
       
	};
	
	$.fn.bgStretcher._clearTimeout = function(){
       if(_bgStretcherTm != null){
           clearTimeout(_bgStretcherTm);
           _bgStretcherTm = null;
       }
	}
	
	$.fn.bgStretcher.pause = function(){
	   _bgStretcherPause = true;
	   $.fn.bgStretcher._clearTimeout();
	};
	
	$.fn.bgStretcher.slideShow = function(){
		var current = $(containerStr + ' LI.bgs-current');
		var next = current.next();
		if(!next.length){
			next = $(containerStr + ' LI:first');
		}
		
		$(containerStr + ' LI').removeClass('bgs-current');
		next.addClass('bgs-current');
		
		next.fadeIn( $.fn.bgStretcher.settings.slideShowSpeed );
		current.fadeOut( $.fn.bgStretcher.settings.slideShowSpeed );
		
		if(!_bgStretcherPause){
		  _bgStretcherTm = setTimeout('$.fn.bgStretcher.slideShow()', $.fn.bgStretcher.settings.nextSlideDelay);
		}
	};
	
	/*  Default Settings  */
	$.fn.bgStretcher.defaults = {
		imageContainer:             'bgstretcher',
		resizeProportionally:       true,
		resizeAnimate:              false,
		images:                     [],
		imageWidth:                 1024,
		imageHeight:                768,
		resize_flash_position:      null,   //新添加的
		img_finish_callback:		 null,   //新添加的 （背景加载完成后的回调函数）	
		nextSlideDelay:             3000,
		slideShowSpeed:             'normal',
		slideShow:                  true
	};
	$.fn.bgStretcher.settings = {};
})(jQuery);

/*$(function(){
	//加背景音乐
	$('body').append('<embed src="aa.mp3" type="" loop="true" hidden="true">');
	});*/



// JavaScript Document



	
function finish_load(image,callback){   
    
			if(navigator.userAgent.indexOf("MSIE")>0){ 
		        if($.browser.version==6.0 || $.browser.version==9.0){ 
		            image.onreadystatechange = function () { 
		                if (image.readyState == "complete"){ 
		                   callback();
		                } 
		            }; 
		        }else{ 
		            ie7imagetime = window.setInterval(function(){ 
		                var rs = image.readyState; 
		                if(rs=="complete"){ 
		                    window.clearInterval(ie7imagetime); 
		                    callback();
		                }else{ 
		                    return; 
		                } 
		            },200); 
		        } 
		    }else{ 
		        image.onload = function () { 
		            if (image.complete == true){ 
		                callback();
		             } 
		        }; 
		    } 
	}	

//--------------------------------------------头部导航事件
var menu_even=function(){
	
			$('#menu ul>li').on('mouseover',function(){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				//$(this).find('ul').fadeIn();
				$(this).find('ul').show();
				}).on('mouseleave',function(){
					$(this).find('div:first').stop().animate({opacity: 0},500);
					//$(this).find('ul').fadeOut();
					$(this).find('ul').hide();
					});
					
			$('#menu ul ul li').on('mouseover',function(){
				//$(this).animate({opacity:1},20);
				$(this).css({opacity:1});
				}).on('mouseleave',function(){
					//$(this).animate({opacity:0.7},50);
					$(this).css({opacity:0.7});
					});		
	
	/*		$('#menu ul>li:eq(0)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),0);
				event.preventDefault();
				});	
		
		$('#menu ul>li:eq(1)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),1);
				event.preventDefault();
				});	
		$('#menu ul>li:eq(2)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),2);
				event.preventDefault();
				});		*/
	};

//-----------------------------------划过底部导航li
var swip_bottom_menu=function(){
		$('.bottom_menu ul li').on('mouseover',function(){
				$(this).find('div').stop().animate({opacity: 1},500);
			}).on('mouseleave',function(){
				$(this).find('div').stop().animate({opacity: 0},500);
			});		
	};


//-----------------------------划过news_center
var swip_new=function(){
		
		//划过显示 隐藏news
		var show_news=function(){
			
			var obj=$('.news_slide ul li');
			
			if(obj.length==0){return false;};
			$('.news_slide').css('display','block');
			
			obj.eq(0).stop().animate({marginTop:'0',opacity:1},500);
			obj.eq(1).stop().animate({marginTop:'0',opacity:1},500);	
		
			};
		
		var hide_news=function(){
			var obj=$('.news_slide ul li');
			
			obj.eq(1).stop().animate({marginTop:'200px',opacity:0},500);
			obj.eq(0).stop().animate({marginTop:'200px',opacity:0},500,function(){
				$('.news_slide').css('display','none');
				});	
			};	
			
	
		$('.right_ico ul .s_first ').on('mouseover',function(){
				$(this).find('span:first').stop().animate({opacity: 0.5});
					show_news();
				}).on('mouseleave',function(){
				$(this).find('span:first').stop().animate({opacity: 0});
					hide_news();
				});				
		
		
		$('.right_ico ul .s_second ').on('mouseover',function(){
				$(this).find('span:first').stop().animate({opacity: 0.5});
				}).on('mouseleave',function(){
				$(this).find('span:first').stop().animate({opacity: 0});
				});	

}

//--------------------------------------缓动推出 下部导航
var bottom_menu_slide=function(){
	  
	  
	
				var left_arr=[241,354,467,580,693,806,919];
				var clear_Inter=function(){
						clearInterval(s);
					}
				var s;
				var obj=$('.bottom_menu li');
				var slide=function(i){
					obj.eq(i).stop().animate({
						top:'0',
						opacity:1},1000,function(){
				
							});
							
						s=setInterval(function(){
							if(i==8){
								clear_Inter();
								return false;
								}
							if(obj.eq(i).position().top>50){  //划过一半距离后，执行下一个
								i++;
								slide(i);
								}
							},50);
					};
					
				//slide(1);  //菜单已修改 暂时不用
}


var get_bg_style=function(){
	    var str=$('.bgstretcher ul li').html();
		var start=str.indexOf('style');
		var style=str.substring(start).replace('>','');
		return style;
	}
	
 //页面初始化动画对象
var flash_init={               
	'index':function(config_position,finish){                      //首页
		
		
		
		//页面中部文字动画
		$('.flash1').animate({
				right:'150px',
				opacity:1},1000,function(){
					$('.flash2').animate({
						bottom:config_position['flash2']['end_bottom']+'px',
						opacity:1},800,function(){
							finish();  //动画执行完成
						});
			});	


		//划过news_center
		swip_new();
		
		//缓动推出 下部导航
		bottom_menu_slide();	
		
		//划过底部导航li
		swip_bottom_menu();
		
		//头部下拉菜单
		menu_even();
		
		},
	'1_1_qyjz':function(config_position,finish){		//区域价值

			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1
						},800,function(){
							$(this).css('filter','none');
							$('.flash2').show().stop().animate({
								left:'52%',opacity:1},800,function(){
									$(this).css('filter','none');
									finish();  //动画执行完成
								});
						});
			

			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/qyjz_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},
	'1_2_cszx':function(config_position,finish){	//城市中心.
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'46%',opacity:1},800,function(){
									$(this).css('filter','none');
									finish();  //动画执行完成
								});
						});
			
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/cszx_bg2.jpg" alt="" '+get_bg_style()+'></li>');
		//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},
	'1_3_lssty':function(config_position,finish){	//绿色生态圈
	
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'40%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/lssty_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();		
		},
	'1_4_jtpt':function(config_position,finish){		//交通配套
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'50%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'2_1_xmbj':function(config_position,finish){   //项目背景
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'60%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/xmbj_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'2_2_xmgh':function(config_position,finish){   //项目背景
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'60%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/xmbj_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'3_1_hbskyq':function(config_position,finish){   //豪 布 斯 卡 缘 起
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'50%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/jbskyq_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			
			//导航划块的事件
			$('.flash5_item ul li').on('mouseover',function(){
				$('.flash5_item').find('div').stop().animate({opacity: 0});
				var index=$('.flash5_item ul li').index($(this));
			    $(this).find('div').stop().animate({opacity: 1},10,function(){
					
					$('.flash5>img').stop().animate({opacity: 0});
					$('.flash5 .pic'+index).stop().animate({opacity: 1});
					});
			});		
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'3_2_hbskxl':function(config_position,finish){
		
		//页面中部文字动画
					$('.item1_flash3').show().stop().animate({
						bottom:config_position['item1_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item1_flash2').show().stop().animate({
								left:config_position['item1_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
		
		//---------巴黎拉德芳斯 介绍背景
		var style=get_bg_style();
		$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/item3_2.jpg" alt="" '+style+'></li><!--东京六本木切换背景-->\
													<li style="" class=""><img src="images/item3_1.jpg" alt="" '+style+'></li><!--东京六本木默认背景-->\
													<li style="" class=""><img src="images/item2_2.jpg" alt="" '+style+'></li><!--纽约巴特利公园城切换背景-->\
													<li style="" class=""><img src="images/item2_1.jpg" alt="" '+style+'></li><!--纽约巴特利公园城默认背景-->\
													<li style="" class=""><img src="images/hbskxl_bg2.jpg" alt="" '+style+'></li>');   //巴黎拉德芳斯切换背景
		
		
		//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},	
		'2_jggc':function(config_position,finish){   //金谷广场
		
			$('.flash3').stop().animate({
						left:'325px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash4').show().stop().animate({
								bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
										$('.flash5').show().stop().animate({
											bottom:config_position['flash5']['end_bottom']+'px',opacity:1},800,function(){
												$(this).css('filter','none');   //去掉ie 下文字黑边
												finish();  //动画执行完成
											});
									
								});
						});
			
			
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
			},
		'3_jgjy':function(config_position,finish){   //金谷基业
			$('.flash2').show().stop().animate({
				bottom:config_position['flash2']['end_bottom']+'px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
								$('.flash4').show().stop().animate({
									bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
										$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();
									});
						});
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'4_jgal':function(config_position,finish){   //金谷奥莱
			$('.flash4').show().stop().animate({
				bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash5').show().stop().animate({
						bottom:config_position['flash5']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'445px',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
								});
							setTimeout(function(){
								$('.flash3').show().stop().animate({
									left:'445px',opacity:1},800,function(){
										$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();
								});	
								},400)	
							
								
						});
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'5_jgtj':function(config_position,finish){   //金谷天街
			
			$('.flash2').show().stop().animate({
				left:'125px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'6_jgly':function(config_position,finish){   //金谷乐园
				$('.flash2').show().stop().animate({
				right:'290px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'7_jgsa':function(config_position,finish){   //金谷水岸
			
			$('.flash2').show().stop().animate({
				left:'365px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'24shi':function(config_position,finish,move,move_part){
			var gettime=function(){
				var d=new Date();
				return (d.getHours()<10?('0'+d.getHours()):d.getHours())+':'+(d.getMinutes()<10?('0'+d.getMinutes()):d.getMinutes());
				};
			var Judge_day=function(){
				var d=new Date();
				var hour=d.getHours();
				if(hour<=12){
					return '.am';
					}else{
						return '.pm';
						}
				};
				
				//-------------------
			var reverse_flash=function(){
				$('.hour').stop().animate({fontSize:config_position['hour']['start_font']+'px'},1000,function(){
					$(this).hide();
					});
				$('.day').stop().animate({fontSize:config_position['day']['end_font']+'px'},1000,function(){
					$(this).hide();
				});	
				$('.flash1').stop().animate({left:config_position['flash1']['start_left']+'px',
													height:config_position['flash1']['start_height']+'px',
													width:config_position['flash1']['start_width']+'px',
													bottom:config_position['flash1']['start_bottom']+'px'
													},1000,function(){
														$(this).hide();
														});
				};
			//---------------------
			
			var time_obj=[
				[7,9],
				[9,11],
				[11,13],
				[13,15],
				[15,17],
				[17,19],
				[19,21],
				[21,23]
			];
			
			
			var max_time=function(a,b,c){
				return Math.max(a,b,c);
				};
			//打开当前时间段
			var curr_time_open=function(){
				var curr_hour=new Date().getHours();
				
				
				
				for(var i=0; i<8; i++){
					time_obj[i].push(curr_hour);
					
					if( max_time.apply(null,time_obj[i])>curr_hour ){
						break;
						};
				};
					
					//console.log(i);
					if(curr_hour>=7 && curr_hour<=23){
						$('.flash2 li:eq('+i+')').click();
						};
					
				
				};
			
			
			var flash2_show=function(){
				$('.flash2').show().stop().animate({left:config_position['flash2']['end_left']+'px'	},1000,function(){
					
					//$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff; z-index:2">fdffd</div>');
					
					
					move();
					
					curr_time_open();
					});
				};	
				
					
			$('.flash1').stop().animate({left:config_position['flash1']['end_left']+'px',
													height:config_position['flash1']['end_height']+'px',
													width:config_position['flash1']['end_width']+'px',
													bottom:config_position['flash1']['end_bottom']+'px'
													},500,function(){
														finish();
														});
			$('.hour').stop().animate({fontSize:config_position['hour']['end_font']+'px'},1000,function(){
				$(this).animate({opacity:'0'},1000,function(){
					  $(this).html(gettime());
				      $(this).animate({opacity:'1'},1000);
					});
				});
				
			$('.day').stop().animate({fontSize:config_position['day']['end_font']+'px'},1000,function(){
				$(Judge_day()).animate({opacity:'1'},1000,function(){
					setTimeout(function(){
						reverse_flash();
						flash2_show();
						},3000);
					});
				});
				
			
			//划过news_center
			swip_new();
				//头部下拉菜单
			menu_even();	
				},
		'24shi_8':function(config_position,finish8,finish,move,move_part,get_finish_flash){
			
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			
				var hide_flash_8_bg=function(){ //半透明背景图
					$('.flash_8_bg').stop().animate({'bottom':config_position['flash_8_bg']['start_bottom']+'px',
												'left':config_position['flash_8_bg']['start_left']+'px',
												'width':config_position['flash_8_bg']['start_width']+'px',
												'height':config_position['flash_8_bg']['start_height']+'px'},1000,function(){
													$(this).hide();
													select==''?hide_flash_lay():'';
													$('.close_flash').attr('select','');
												});
					
					};
				
				
				//太阳
				var hide_flash_8_2=function(){
					$('.flash_8_2').stop().animate({'bottom':config_position['flash_8_2']['start_bottom']+'px',
													'left':config_position['flash_8_2']['start_left']+'px',
													'width':config_position['flash_8_2']['start_width']+'px',
													'height':config_position['flash_8_2']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};
				//白鸽
				var hide_flash_8_3=function(){
					$('.flash_8_3').stop().animate({'bottom':config_position['flash_8_3']['start_bottom']+'px',
													'left':config_position['flash_8_3']['start_left']+'px',
													'width':config_position['flash_8_3']['start_width']+'px',
													'height':config_position['flash_8_3']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};	
					
				//阳光时刻
				var hide_flash_8_4=function(){
					$('.flash_8_4').stop().animate({'bottom':config_position['flash_8_4']['start_bottom']+'px',
													'left':config_position['flash_8_4']['start_left']+'px',
													'width':config_position['flash_8_4']['start_width']+'px',
													'height':config_position['flash_8_4']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};		
				//汽车
				var hide_flash_8_5=function(){
					$('.flash_8_5').stop().animate({'bottom':config_position['flash_8_5']['start_bottom']+'px',
													'left':config_position['flash_8_5']['start_left']+'px',
													'width':config_position['flash_8_5']['start_width']+'px',
													'height':config_position['flash_8_5']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};	
				
				
				//底部草地 楼房								
				$('.flash_8_1').stop().animate({'bottom':config_position['flash_8_1']['start_bottom']+'px',
												'left':config_position['flash_8_1']['start_left']+'px',
												'width':config_position['flash_8_1']['start_width']+'px',
												'height':config_position['flash_8_1']['start_height']+'px'},1000,function(){
													$(this).hide();
													hide_flash_8_bg();
													hide_flash_8_5();
													hide_flash_8_4();
													hide_flash_8_3();
													hide_flash_8_2();
												});
				
												
												
				};
			//----------------------------------------------------------------------------------------
			
			
			//开始动画
			var show_flash_8_5=function(){//////////汽车
				$('.flash_8_5').show().animate({'bottom':config_position['flash_8_5']['end_bottom']+'px',
												'left':config_position['flash_8_5']['end_left']+'px',
												'width':config_position['flash_8_5']['end_width']+'px',
												'height':config_position['flash_8_5']['end_height']+'px'},1000,function(){
													finish8();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
													$('.close_flash').on('click',function(){
																
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($(this).attr('select'));
																
																});
													});
				};
			var show_flash_8_4=function(){//////////阳光时刻
				$('.flash_8_4').show().animate({'bottom':config_position['flash_8_4']['end_bottom']+'px',
												'left':config_position['flash_8_4']['end_left']+'px',
												'width':config_position['flash_8_4']['end_width']+'px',
												'height':config_position['flash_8_4']['end_height']+'px'},1000);
				};
			
			var show_flash_8_3=function(){///////////白鸽
				$('.flash_8_3').show().animate({'bottom':config_position['flash_8_3']['end_bottom']+'px',
												'left':config_position['flash_8_3']['end_left']+'px',
												'width':config_position['flash_8_3']['end_width']+'px',
												'height':config_position['flash_8_3']['end_height']+'px'},1000);
				};
			
			var show_flash_8_2=function(){////////////太阳
				$('.flash_8_2').show().animate({'bottom':config_position['flash_8_2']['end_bottom']+'px',
												'left':config_position['flash_8_2']['end_left']+'px',
												'width':config_position['flash_8_2']['end_width']+'px',
												'height':config_position['flash_8_2']['end_height']+'px'},1000);
				};
				
			var show_flash_8_1=function(){  ///////////底部 草地 楼房
				$('.flash_8_1').show().animate({'bottom':config_position['flash_8_1']['end_bottom']+'px',
																						'left':config_position['flash_8_1']['end_left']+'px',
																						'width':config_position['flash_8_1']['end_width']+'px',
																						'height':config_position['flash_8_1']['end_height']+'px'},1000,function(){
																							show_flash_8_2();//太阳出现
																							show_flash_8_3();//白鸽出现
																							show_flash_8_4();//阳光时刻
																							show_flash_8_5();//汽车
																							});
				};
				
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_8_bg').show().animate({'bottom':config_position['flash_8_bg']['end_bottom']+'px',
																						'left':config_position['flash_8_bg']['end_left']+'px',
																						'width':config_position['flash_8_bg']['end_width']+'px',
																						'height':config_position['flash_8_bg']['end_height']+'px'},1000);
																				
																						
															
															finish8();
															
															show_flash_8_1();	
																
															});
			},
		'24shi_10':function(config_position,finish10,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
				//楼房	
				$('.flash_10_4').show().animate({'bottom':config_position['flash_10_4']['start_bottom']+'px',
											'left':config_position['flash_10_4']['start_left']+'px',
											'width':config_position['flash_10_4']['start_width']+'px',
											'height':config_position['flash_10_4']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//商务时刻	
				$('.flash_10_3').show().animate({'bottom':config_position['flash_10_3']['start_bottom']+'px',
											'left':config_position['flash_10_3']['start_left']+'px',
											'width':config_position['flash_10_3']['start_width']+'px',
											'height':config_position['flash_10_3']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//人物	
				$('.flash_10_2').show().animate({'bottom':config_position['flash_10_2']['start_bottom']+'px',
											'left':config_position['flash_10_2']['start_left']+'px',
											'width':config_position['flash_10_2']['start_width']+'px',
											'height':config_position['flash_10_2']['start_height']+'px'},1000,function(){
												$(this).hide();
												});							
				//像框	
				$('.flash_10_1').show().animate({'bottom':config_position['flash_10_1']['start_bottom']+'px',
											'left':config_position['flash_10_1']['start_left']+'px',
											'width':config_position['flash_10_1']['start_width']+'px',
											'height':config_position['flash_10_1']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												});									
				//背景图	
				$('.flash_10_bg').show().animate({'bottom':config_position['flash_10_bg']['start_bottom']+'px',
											'left':config_position['flash_10_bg']['start_left']+'px',
											'width':config_position['flash_10_bg']['start_width']+'px',
											'height':config_position['flash_10_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												});		
					
			};
			//----------------------------------------
			
			var show_flash_10_4=function(){///////////////楼房
				$('.flash_10_4').show().animate({'bottom':config_position['flash_10_4']['end_bottom']+'px',
											'left':config_position['flash_10_4']['end_left']+'px',
											'width':config_position['flash_10_4']['end_width']+'px',
											'height':config_position['flash_10_4']['end_height']+'px'},1000,function(){
												finish10();//最后一个动画改变标记
													move();
												$('.close_flash').off('click');
												$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($(this).attr('select'));
																
													});	
												});
				
				};
			
			var show_flash_10_3=function(){///////////////商务时刻
				$('.flash_10_3').show().animate({'bottom':config_position['flash_10_3']['end_bottom']+'px',
											'left':config_position['flash_10_3']['end_left']+'px',
											'width':config_position['flash_10_3']['end_width']+'px',
											'height':config_position['flash_10_3']['end_height']+'px'},1000,function(){
												show_flash_10_4();
												});
				
				};
				
			var show_flash_10_2=function(){///////////////人物
				$('.flash_10_2').show().animate({'bottom':config_position['flash_10_2']['end_bottom']+'px',
											'left':config_position['flash_10_2']['end_left']+'px',
											'width':config_position['flash_10_2']['end_width']+'px',
											'height':config_position['flash_10_2']['end_height']+'px'},1000,function(){
												show_flash_10_3();//商务时刻出现
												});
				
				};
			
			var show_flash_10_1=function(){/////////////像框
				$('.flash_10_1').show().animate({'bottom':config_position['flash_10_1']['end_bottom']+'px',
											'left':config_position['flash_10_1']['end_left']+'px',
											'width':config_position['flash_10_1']['end_width']+'px',
											'height':config_position['flash_10_1']['end_height']+'px'},1000,function(){
												show_flash_10_2();//人物出现
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_10_bg').show().animate({'bottom':config_position['flash_10_bg']['end_bottom']+'px',
																						'left':config_position['flash_10_bg']['end_left']+'px',
																						'width':config_position['flash_10_bg']['end_width']+'px',
																						'height':config_position['flash_10_bg']['end_height']+'px'},1000,function(){
																						   show_flash_10_1();		
																							});
																				
																						
															
															finish10();
															
																
															});
			},
		'24shi_12':function(config_position,finish12,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
				
				//美食时刻	
				$('.flash_12_3').show().animate({'bottom':config_position['flash_12_3']['start_bottom']+'px',
											'left':config_position['flash_12_3']['start_left']+'px',
											'width':config_position['flash_12_3']['start_width']+'px',
											'height':config_position['flash_12_3']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//碗	
				$('.flash_12_2').show().animate({'bottom':config_position['flash_12_2']['start_bottom']+'px',
											'left':config_position['flash_12_2']['start_left']+'px',
											'width':config_position['flash_12_2']['start_width']+'px',
											'height':config_position['flash_12_2']['start_height']+'px'},1000,function(){
												$(this).hide();
												});							
				//盘子	
				$('.flash_12_1').show().animate({'bottom':config_position['flash_12_1']['start_bottom']+'px',
											'left':config_position['flash_12_1']['start_left']+'px',
											'width':config_position['flash_12_1']['start_width']+'px',
											'height':config_position['flash_12_1']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												});									
				//背景图	
				$('.flash_12_bg').show().animate({'bottom':config_position['flash_12_bg']['start_bottom']+'px',
											'left':config_position['flash_12_bg']['start_left']+'px',
											'width':config_position['flash_12_bg']['start_width']+'px',
											'height':config_position['flash_12_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
			
			
			
			var show_flash_12_3=function(){///////////////美食时刻
				$('.flash_12_3').show().animate({'bottom':config_position['flash_12_3']['end_bottom']+'px',
											'left':config_position['flash_12_3']['end_left']+'px',
											'width':config_position['flash_12_3']['end_width']+'px',
											'height':config_position['flash_12_3']['end_height']+'px'},1000,function(){
												finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																	
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
				
			var show_flash_12_2=function(){///////////////碗
				$('.flash_12_2').show().animate({'bottom':config_position['flash_12_2']['end_bottom']+'px',
											'left':config_position['flash_12_2']['end_left']+'px',
											'width':config_position['flash_12_2']['end_width']+'px',
											'height':config_position['flash_12_2']['end_height']+'px'},1000,function(){
												show_flash_12_3();//美食时刻出现
												});
				
				};
			
			var show_flash_12_1=function(){/////////////盘子
				$('.flash_12_1').show().animate({'bottom':config_position['flash_12_1']['end_bottom']+'px',
											'left':config_position['flash_12_1']['end_left']+'px',
											'width':config_position['flash_12_1']['end_width']+'px',
											'height':config_position['flash_12_1']['end_height']+'px'},1000,function(){
												show_flash_12_2();//碗
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_12_bg').show().animate({'bottom':config_position['flash_12_bg']['end_bottom']+'px',
																						'left':config_position['flash_12_bg']['end_left']+'px',
																						'width':config_position['flash_12_bg']['end_width']+'px',
																						'height':config_position['flash_12_bg']['end_height']+'px'},1000);
																				
																						
															
															finish12();
															/*$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
															show_flash_12_1();	
																
															});
			},
		'24shi_14':function(config_position,finish14,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				hide_flash('flash_14_9');//酒		
				hide_flash('flash_14_8');//休闲时刻								
				hide_flash('flash_14_7');//咖啡
				//花瓣
				hide_flash('flash_14_6');
				hide_flash('flash_14_5');
				hide_flash('flash_14_4');
				hide_flash('flash_14_3');
				hide_flash('flash_14_2');
				hide_flash('flash_14_1');							
																											
											
				//背景图	
				$('.flash_14_bg').show().animate({'bottom':config_position['flash_14_bg']['start_bottom']+'px',
											'left':config_position['flash_14_bg']['start_left']+'px',
											'width':config_position['flash_14_bg']['start_width']+'px',
											'height':config_position['flash_14_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
			var show_flash_14_9=function(){///////////////酒
				$('.flash_14_9').show().animate({'bottom':config_position['flash_14_9']['end_bottom']+'px',
											'left':config_position['flash_14_9']['end_left']+'px',
											'width':config_position['flash_14_9']['end_width']+'px',
											'height':config_position['flash_14_9']['end_height']+'px'},1000,function(){
												//finish14();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			var show_flash_14_8=function(){///////////////休闲时刻
				$('.flash_14_8').show().animate({'bottom':config_position['flash_14_8']['end_bottom']+'px',
											'left':config_position['flash_14_8']['end_left']+'px',
											'width':config_position['flash_14_8']['end_width']+'px',
											'height':config_position['flash_14_8']['end_height']+'px'},1000,function(){
												//show_flash_14_4();
												});
				
				};
			
			var show_flash_14_7=function(){///////////////咖啡
				$('.flash_14_7').show().animate({'bottom':config_position['flash_14_7']['end_bottom']+'px',
											'left':config_position['flash_14_7']['end_left']+'px',
											'width':config_position['flash_14_7']['end_width']+'px',
											'height':config_position['flash_14_7']['end_height']+'px'},1000,function(){
												show_flash_14_8();
												show_flash_14_9();
												});
				
				};
			
			var show_flash_14_6=function(){///////////////花瓣六
				$('.flash_14_6').show().animate({'bottom':config_position['flash_14_6']['end_bottom']+'px',
											'left':config_position['flash_14_6']['end_left']+'px',
											'width':config_position['flash_14_6']['end_width']+'px',
											'height':config_position['flash_14_6']['end_height']+'px'},1000,function(){
												show_flash_14_7();
												});
				
				};
			
			var show_flash_14_5=function(){///////////////花瓣五
				$('.flash_14_5').show().animate({'bottom':config_position['flash_14_5']['end_bottom']+'px',
											'left':config_position['flash_14_5']['end_left']+'px',
											'width':config_position['flash_14_5']['end_width']+'px',
											'height':config_position['flash_14_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												});
				
				};
			
			
			var show_flash_14_4=function(){///////////////花瓣四
				$('.flash_14_4').show().animate({'bottom':config_position['flash_14_4']['end_bottom']+'px',
											'left':config_position['flash_14_4']['end_left']+'px',
											'width':config_position['flash_14_4']['end_width']+'px',
											'height':config_position['flash_14_4']['end_height']+'px'},1000,function(){
												/*finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
																
													//show_flash_14_5();			
												});
				
				};
			
			
			var show_flash_14_3=function(){///////////////花瓣三
				$('.flash_14_3').show().animate({'bottom':config_position['flash_14_3']['end_bottom']+'px',
											'left':config_position['flash_14_3']['end_left']+'px',
											'width':config_position['flash_14_3']['end_width']+'px',
											'height':config_position['flash_14_3']['end_height']+'px'},1000,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_14_2=function(){///////////////花瓣二
				$('.flash_14_2').show().animate({'bottom':config_position['flash_14_2']['end_bottom']+'px',
											'left':config_position['flash_14_2']['end_left']+'px',
											'width':config_position['flash_14_2']['end_width']+'px',
											'height':config_position['flash_14_2']['end_height']+'px'},1000,function(){
												//show_flash_14_3();//花瓣三
												});
				
				};
			
			var show_flash_14_1=function(){/////////////花瓣一
				$('.flash_14_1').show().animate({'bottom':config_position['flash_14_1']['end_bottom']+'px',
											'left':config_position['flash_14_1']['end_left']+'px',
											'width':config_position['flash_14_1']['end_width']+'px',
											'height':config_position['flash_14_1']['end_height']+'px'},1200,function(){
												//show_flash_14_2();//花瓣二
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_14_bg').show().animate({'bottom':config_position['flash_14_bg']['end_bottom']+'px',
																						'left':config_position['flash_14_bg']['end_left']+'px',
																						'width':config_position['flash_14_bg']['end_width']+'px',
																						'height':config_position['flash_14_bg']['end_height']+'px'},1000,function(){
																							show_flash_14_1();
																							show_flash_14_2();
																							show_flash_14_3();
																							show_flash_14_4();
																							show_flash_14_5();
																							show_flash_14_6();	
																							});
																				
																						
															
															finish14();
															
																
															});
			},
		'24shi_16':function(config_position,finish16,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				hide_flash('flash_16_5');
				hide_flash('flash_16_4');
				hide_flash('flash_16_3');
				hide_flash('flash_16_2');
				hide_flash('flash_16_1');							
																											
											
				//背景图	
				$('.flash_16_bg').show().animate({'bottom':config_position['flash_16_bg']['start_bottom']+'px',
											'left':config_position['flash_16_bg']['start_left']+'px',
											'width':config_position['flash_16_bg']['start_width']+'px',
											'height':config_position['flash_16_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			
			
			
			var show_flash_16_5=function(){///////////////包
				$('.flash_16_5').show().animate({'bottom':config_position['flash_16_5']['end_bottom']+'px',
											'left':config_position['flash_16_5']['end_left']+'px',
											'width':config_position['flash_16_5']['end_width']+'px',
											'height':config_position['flash_16_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																	
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			
			
			var show_flash_16_4=function(){///////////////酒
				$('.flash_16_4').show().animate({'bottom':config_position['flash_16_4']['end_bottom']+'px',
											'left':config_position['flash_16_4']['end_left']+'px',
											'width':config_position['flash_16_4']['end_width']+'px',
											'height':config_position['flash_16_4']['end_height']+'px'},1000,function(){
												/*finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
																
													//show_flash_14_5();			
												});
				
				};
			
			
			var show_flash_16_3=function(){///////////////时尚时刻
				$('.flash_16_3').show().animate({'bottom':config_position['flash_16_3']['end_bottom']+'px',
											'left':config_position['flash_16_3']['end_left']+'px',
											'width':config_position['flash_16_3']['end_width']+'px',
											'height':config_position['flash_16_3']['end_height']+'px'},2000,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_16_2=function(){///////////////人物
				$('.flash_16_2').show().animate({'bottom':config_position['flash_16_2']['end_bottom']+'px',
											'left':config_position['flash_16_2']['end_left']+'px',
											'width':config_position['flash_16_2']['end_width']+'px',
											'height':config_position['flash_16_2']['end_height']+'px'},1000,function(){
												//show_flash_14_3();//花瓣三
												});
				
				};
			
			var show_flash_16_1=function(){/////////////表
				$('.flash_16_1').show().animate({'bottom':config_position['flash_16_1']['end_bottom']+'px',
											'left':config_position['flash_16_1']['end_left']+'px',
											'width':config_position['flash_16_1']['end_width']+'px',
											'height':config_position['flash_16_1']['end_height']+'px'},1200,function(){
												//show_flash_14_2();//花瓣二
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_16_bg').show().animate({'bottom':config_position['flash_16_bg']['end_bottom']+'px',
																						'left':config_position['flash_16_bg']['end_left']+'px',
																						'width':config_position['flash_16_bg']['end_width']+'px',
																						'height':config_position['flash_16_bg']['end_height']+'px'},1000,function(){
																							show_flash_16_1();
																							show_flash_16_2();
																							show_flash_16_3();
																							show_flash_16_4();
																							show_flash_16_5();
																							
																							});
																				
																						
															
															finish16();
															
																
															});
			},
		'24shi_18':function(config_position,finish18,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				hide_flash('flash_18_7');
				hide_flash('flash_18_6');
				hide_flash('flash_18_5');
				hide_flash('flash_18_4');
				hide_flash('flash_18_3');
				hide_flash('flash_18_2');
				hide_flash('flash_18_1');							
																											
											
				//背景图	
				$('.flash_18_bg').show().animate({'bottom':config_position['flash_18_bg']['start_bottom']+'px',
											'left':config_position['flash_18_bg']['start_left']+'px',
											'width':config_position['flash_18_bg']['start_width']+'px',
											'height':config_position['flash_18_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			var show_flash_18_7=function(){///////////////笑脸
				$('.flash_18_7').show().animate({'bottom':config_position['flash_18_7']['end_bottom']+'px',
											'left':config_position['flash_18_7']['end_left']+'px',
											'width':config_position['flash_18_7']['end_width']+'px',
											'height':config_position['flash_18_7']['end_height']+'px'},1000,function(){
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			
			var show_flash_18_6=function(){///////////////亲子时刻
				$('.flash_18_6').show().animate({'bottom':config_position['flash_18_6']['end_bottom']+'px',
											'left':config_position['flash_18_6']['end_left']+'px',
											'width':config_position['flash_18_6']['end_width']+'px',
											'height':config_position['flash_18_6']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												/*move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
												});
				
				};
			
			var show_flash_18_5=function(){///////////////玩具
				$('.flash_18_5').show().animate({'bottom':config_position['flash_18_5']['end_bottom']+'px',
											'left':config_position['flash_18_5']['end_left']+'px',
											'width':config_position['flash_18_5']['end_width']+'px',
											'height':config_position['flash_18_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												/*move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
												});
				
				};
			
			
			var show_flash_18_4=function(){///////////////人物
				$('.flash_18_4').show().animate({'bottom':config_position['flash_18_4']['end_bottom']+'px',
											'left':config_position['flash_18_4']['end_left']+'px',
											'width':config_position['flash_18_4']['end_width']+'px',
											'height':config_position['flash_18_4']['end_height']+'px'},1000,function(){
															
												});
				
				};
			
			
			var show_flash_18_3=function(){///////////////C
				$('.flash_18_3').show().animate({'bottom':config_position['flash_18_3']['end_bottom']+'px',
											'left':config_position['flash_18_3']['end_left']+'px',
											'width':config_position['flash_18_3']['end_width']+'px',
											'height':config_position['flash_18_3']['end_height']+'px'},500,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_18_2=function(){///////////////B
				$('.flash_18_2').show().animate({'bottom':config_position['flash_18_2']['end_bottom']+'px',
											'left':config_position['flash_18_2']['end_left']+'px',
											'width':config_position['flash_18_2']['end_width']+'px',
											'height':config_position['flash_18_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_18_1=function(){/////////////A
				$('.flash_18_1').show().animate({'bottom':config_position['flash_18_1']['end_bottom']+'px',
											'left':config_position['flash_18_1']['end_left']+'px',
											'width':config_position['flash_18_1']['end_width']+'px',
											'height':config_position['flash_18_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_18_bg').show().animate({'bottom':config_position['flash_18_bg']['end_bottom']+'px',
																						'left':config_position['flash_18_bg']['end_left']+'px',
																						'width':config_position['flash_18_bg']['end_width']+'px',
																						'height':config_position['flash_18_bg']['end_height']+'px'},1000,function(){
																							show_flash_18_1();
																							show_flash_18_2();
																							show_flash_18_3();
																							show_flash_18_4();
																							show_flash_18_5();
																							show_flash_18_6();
																							show_flash_18_7();
																							});
																				
																						
															
															finish18();
															
																
															});
			},
		'24shi_20':function(config_position,finish20,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				hide_flash('flash_20_4');
				hide_flash('flash_20_3');
				hide_flash('flash_20_2');
				hide_flash('flash_20_1');							
																											
											
				//背景图	
				$('.flash_20_bg').show().animate({'bottom':config_position['flash_20_bg']['start_bottom']+'px',
											'left':config_position['flash_20_bg']['start_left']+'px',
											'width':config_position['flash_20_bg']['start_width']+'px',
											'height':config_position['flash_20_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			var show_flash_20_4=function(){///////////////人物
				$('.flash_20_4').show().animate({'bottom':config_position['flash_20_4']['end_bottom']+'px',
											'left':config_position['flash_20_4']['end_left']+'px',
											'width':config_position['flash_20_4']['end_width']+'px',
											'height':config_position['flash_20_4']['end_height']+'px'},1000,function(){
														move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});	
												});
				
				};
			
			
			var show_flash_20_3=function(){///////////////社交时刻
				$('.flash_20_3').show().animate({'bottom':config_position['flash_20_3']['end_bottom']+'px',
											'left':config_position['flash_20_3']['end_left']+'px',
											'width':config_position['flash_20_3']['end_width']+'px',
											'height':config_position['flash_20_3']['end_height']+'px'},500,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_20_2=function(){///////////////花
				$('.flash_20_2').show().animate({'bottom':config_position['flash_20_2']['end_bottom']+'px',
											'left':config_position['flash_20_2']['end_left']+'px',
											'width':config_position['flash_20_2']['end_width']+'px',
											'height':config_position['flash_20_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_20_1=function(){/////////////瓶
				$('.flash_20_1').show().animate({'bottom':config_position['flash_20_1']['end_bottom']+'px',
											'left':config_position['flash_20_1']['end_left']+'px',
											'width':config_position['flash_20_1']['end_width']+'px',
											'height':config_position['flash_20_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_20_bg').show().animate({'bottom':config_position['flash_20_bg']['end_bottom']+'px',
																						'left':config_position['flash_20_bg']['end_left']+'px',
																						'width':config_position['flash_20_bg']['end_width']+'px',
																						'height':config_position['flash_20_bg']['end_height']+'px'},1000,function(){
																							show_flash_20_1();
																							show_flash_20_2();
																							show_flash_20_3();
																							show_flash_20_4();
																							});
																				
																						
															
															finish20();
															
																
															});
			},
		'24shi_22':function(config_position,finish22,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				
				hide_flash('flash_22_3');
				hide_flash('flash_22_2');
				hide_flash('flash_22_1');							
																											
											
				//背景图	
				$('.flash_22_bg').show().animate({'bottom':config_position['flash_22_bg']['start_bottom']+'px',
											'left':config_position['flash_22_bg']['start_left']+'px',
											'width':config_position['flash_22_bg']['start_width']+'px',
											'height':config_position['flash_22_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			
			
			
			var show_flash_22_3=function(){///////////////灯
				$('.flash_22_3').show().animate({'bottom':config_position['flash_22_3']['end_bottom']+'px',
											'left':config_position['flash_22_3']['end_left']+'px',
											'width':config_position['flash_22_3']['end_width']+'px',
											'height':config_position['flash_22_3']['end_height']+'px'},500,function(){
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});	
												});
				
				};
				
			var show_flash_22_2=function(){///////////////全家庭时刻
				$('.flash_22_2').show().animate({'bottom':config_position['flash_22_2']['end_bottom']+'px',
											'left':config_position['flash_22_2']['end_left']+'px',
											'width':config_position['flash_22_2']['end_width']+'px',
											'height':config_position['flash_22_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_22_1=function(){/////////////人物
				$('.flash_22_1').show().animate({'bottom':config_position['flash_22_1']['end_bottom']+'px',
											'left':config_position['flash_22_1']['end_left']+'px',
											'width':config_position['flash_22_1']['end_width']+'px',
											'height':config_position['flash_22_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_22_bg').show().animate({'bottom':config_position['flash_22_bg']['end_bottom']+'px',
																						'left':config_position['flash_22_bg']['end_left']+'px',
																						'width':config_position['flash_22_bg']['end_width']+'px',
																						'height':config_position['flash_22_bg']['end_height']+'px'},1000,function(){
																							show_flash_22_1();
																							show_flash_22_2();
																							show_flash_22_3();
																							});
																				
																						
															
															finish22();
															
																
															});
			}							
	};



//切换背景
var show_bg=function(index){
				$('.bgstretcher ul li').stop().animate({opacity: 0},2000,function(){})
				$('.bgstretcher ul li:eq('+index+')').stop().animate({opacity: 1},2000,function(){});
	}

//点击中部文字出现动画 对象
var flash={
	'1_1_qyjz':function(config_position,finish1,get_sign1,set_sign1){
			
			
			
			var reverse_flash=function(){  //点击back后执行
				
				$('.flash4').stop().animate({left:config_position['flash4']['start_left']+'px',
																				bottom:config_position['flash4']['start_bottom']+'px'
																				},3000,function(){
																					$(this).hide();
																					});
				$('.flash6').stop().animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});
				$('.flash5').stop().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},1500,function(){
					$(this).hide();
					set_sign1(false);  //标记后三个div已隐藏
					$('.back').hide();
					});																												
				show_bg(1);																	
				};
				
				
				
			
			/*(function () {
			  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			setTimeout(callback, 1000 / 60);
			};
			  window.requestAnimationFrame = requestAnimationFrame;
			})();*/
			
			
			
		/*	setInterval(function(){
				$('.flash5').css('left',config_position['flash5']['end_left']+left+'px');
				},600);*/
				
			/*var loop=function(){
				$('.flash5').css('left',config_position['flash5']['end_left']+left+'px');
				requestAnimationFrame(loop);	
				//setTimeout(function(){loop()},200);
				};	
				//requestAnimationFrame(loop);	
				loop();*/
				
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
					});
				};
			
			//------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(y){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y+'px'},1000,function(){
												});			
					},300);												
				}*/
				//------------------------
		
			
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);
  			//$('.flash5').show();
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-21添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
															    
																
																$('body').off('mousemove');
																reverse_flash();
																
															})
															
															});
		    show_bg(0);
		},
	'1_2_cszx':function(config_position,finish1,get_sign1,set_sign1){
			
			var reverse_flash=function(){
				
			   $('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});
			
			$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});
			$('.flash7').animate({left:config_position['flash7']['start_left']+'px',
														bottom:config_position['flash7']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},1500,function(){
					$(this).hide();
					set_sign1(false);
					});														
				show_bg(1);	
				$('.back').hide();										
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
			
			
			
			
			//-----------------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-180+'px'},1000,function(){
												});			
					},300);		
					
				setTimeout(function(){
					$('.flash7').animate({bottom:y-210+'px'},1000,function(){
												});			
					},600);			
															
				};*/
		//-----------------------------------
		
  			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000);
			
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);
			$('.flash7').show().animate({left:config_position['flash7']['end_left']+'px',
														bottom:config_position['flash7']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															
															});											
			
			
			
			 show_bg(0);
		},
	'1_3_lssty':function(config_position,finish1,get_sign1,set_sign1){
		
		
			var reverse_flash=function(){
				
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$('.flash6').hide();
															});
			$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$('.flash4').hide();
															});	
			$('.flash7').animate({left:config_position['flash7']['start_left']+'px',
														bottom:config_position['flash7']['start_bottom']+'px'
														},3000,function(){
															$('.flash7').hide();
															//$('.flash5').hide();
															});																						
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});	
		     show_bg(1);
				};
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
				
			//---------------------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-260+'px'},1000,function(){
												});			
					},300);		
					
				setTimeout(function(){
					$('.flash7').animate({bottom:y-290+'px'},1000,function(){
												});			
					},600);			
															
				};*/
			//-------------------------------
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000);
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash7').show().animate({left:config_position['flash7']['end_left']+'px',
														bottom:config_position['flash7']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});																						
			
		     show_bg(0);
			
		},
	'1_4_jtpt':function(){		//交通配套
		
		},
	'2_1_xmbj':function(config_position,finish1,get_sign1,set_sign1){		
			
			var reverse_flash=function(){
				$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});																						
			show_bg(1);
			
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
					
			//-----------------------上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-80+'px'},1000,function(){
												});			
					},300);		
						
															
				};*/
			//--------------------	
				
				
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});		
															
																								
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			show_bg(0);
			
			
		},
	'2_2_xmgh':function(config_position,finish1,get_sign1,set_sign1){		
			
			var reverse_flash=function(){
				$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});																						
			show_bg(1);
			
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-80+'px'},1000,function(){
												});			
					},300);		
				};*/
				
				
				
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});		
															
																								
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			show_bg(0);
			
			
		},	
	'3_1_hbskyq':function(config_position,finish1,sign1,set_sign1){	
	
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								//$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
				
			var item_show=function(){
				var i=0;
				var s=function(i){
					$('.flash5_item li:eq('+i+')').stop().animate({marginTop:0},500);
					
					if(i==6){
						clearInterval(t);
						//2013-5-22添加
						$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
						move();
						$('.back').show();
						return false;
						}
					
					};
					
					var t=setInterval(function(){
						if(parseInt($('.flash5_item li:eq('+i+')').css('margin-top'))<40){
							i++;
							s(i);
							}
						},20);
					s(i);
				};
	
			$('.flash4').show().stop().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000,function(){
															
															item_show();
															
															
															finish1();
															});	
  			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			
			
			show_bg(0);	
			},
	'3_2_hbskxl_open1':function(config_position,get_sign1,set_sign1){
		
			var reverse_flash=function(){
				$('.item1_flash4').stop().animate({left:config_position['item1_flash4']['start_left']+'px',
														bottom:config_position['item1_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();				
															});	
				$('.item1_flash6').stop().animate({left:config_position['item1_flash6']['start_left']+'px',
															bottom:config_position['item1_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();				
																	//$('.item1_flash5').hide();
																});													
				$('.item1_flash5').stop().animate({width:config_position['item1_flash5']['start_width']+'px',height:config_position['item1_flash5']['start_height']+'px',left:config_position['item1_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});	
				show_bg(5);	
			
				};
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item1_flash5').css({'left':config_position['item1_flash5']['end_left']-move_x+'px','bottom':config_position['item1_flash5']['end_bottom']+move_y+'px'});
								$('.item1_flash4').css({'left':config_position['item1_flash4']['end_left']+move_x+'px','bottom':config_position['item1_flash4']['end_bottom']+move_y+'px'});
								$('.item1_flash6').css({'left':config_position['item1_flash6']['end_left']+move_x+'px','bottom':config_position['item1_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
				
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['item1_flash6']['end_bottom']+s*10;
				$('.item1_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item1_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
						
															
				};*/
			
			$('.item1_flash4').show().stop().animate({left:config_position['item1_flash4']['end_left']+'px',
														bottom:config_position['item1_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item1_flash6').show().stop().animate({left:config_position['item1_flash6']['end_left']+'px',
														bottom:config_position['item1_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
  			$('.item1_flash5').show().animate({width:config_position['item1_flash5']['end_width']+'px',height:config_position['item1_flash5']['end_height']+'px',left:config_position['item1_flash5']['end_left']+'px'},1500);

			show_bg(4);
		},
		'3_2_hbskxl_open2':function(config_position,get_sign2,set_sign2){
			
			var reverse_flash=function(){
				$('.item2_flash4').stop().animate({left:config_position['item2_flash4']['start_left']+'px',
														bottom:config_position['item2_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
				$('.item2_flash6').stop().animate({left:config_position['item2_flash6']['start_left']+'px',
															bottom:config_position['item2_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();
																//$('.item2_flash5').hide();
																});													
				$('.item2_flash5').stop().animate({width:config_position['item2_flash5']['start_width']+'px',height:config_position['item2_flash5']['start_height']+'px',left:config_position['item2_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign2(false);
					$('.back').hide();
					});	
				show_bg(3);
	  			
				};
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item2_flash5').css({'left':config_position['item2_flash5']['end_left']-move_x+'px','bottom':config_position['item2_flash5']['end_bottom']+move_y+'px'});
								$('.item2_flash4').css({'left':config_position['item2_flash4']['end_left']+move_x+'px','bottom':config_position['item2_flash4']['end_bottom']+move_y+'px'});
								$('.item2_flash6').css({'left':config_position['item2_flash6']['end_left']+move_x+'px','bottom':config_position['item2_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['item2_flash6']['end_bottom']+s*10;
				$('.item2_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign2()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item2_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
									
				};*/
			
			$('.item2_flash4').show().stop().animate({left:config_position['item2_flash4']['end_left']+'px',
														bottom:config_position['item2_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item2_flash6').show().stop().animate({left:config_position['item2_flash6']['end_left']+'px',
														bottom:config_position['item2_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
			$('.item2_flash5').show().animate({width:config_position['item2_flash5']['end_width']+'px',height:config_position['item2_flash5']['end_height']+'px',left:config_position['item2_flash5']['end_left']+'px'},1500);
			
			show_bg(4);

		
		},
		'3_2_hbskxl_open3':function(config_position,get_sign3,set_sign3){
			
			var reverse_flash=function(){
				$('.item3_flash4').stop().animate({left:config_position['item3_flash4']['start_left']+'px',
														bottom:config_position['item3_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
				$('.item3_flash6').stop().animate({left:config_position['item3_flash6']['start_left']+'px',
															bottom:config_position['item3_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();
																//$('.item3_flash5').hide();
																});													
				$('.item3_flash5').stop().animate({width:config_position['item3_flash5']['start_width']+'px',height:config_position['item3_flash5']['start_height']+'px',left:config_position['item3_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign3(false);
					$('.back').hide();
					});	
				show_bg(1);
	  			
				};
				
				var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item3_flash5').css({'left':config_position['item3_flash5']['end_left']-move_x+'px','bottom':config_position['item3_flash5']['end_bottom']+move_y+'px'});
								$('.item3_flash4').css({'left':config_position['item3_flash4']['end_left']+move_x+'px','bottom':config_position['item3_flash4']['end_bottom']+move_y+'px'});
								$('.item3_flash6').css({'left':config_position['item3_flash6']['end_left']+move_x+'px','bottom':config_position['item3_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
		/*	var s=1;
			var shake=function(){
				var y=config_position['item3_flash6']['end_bottom']+s*10;
				$('.item3_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign3()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item3_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
									
				};*/
			
			$('.item3_flash4').show().stop().animate({left:config_position['item3_flash4']['end_left']+'px',
														bottom:config_position['item3_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item3_flash6').show().stop().animate({left:config_position['item3_flash6']['end_left']+'px',
														bottom:config_position['item3_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
			$('.item3_flash5').show().animate({width:config_position['item3_flash5']['end_width']+'px',height:config_position['item3_flash5']['end_height']+'px',left:config_position['item3_flash5']['end_left']+'px'},1500);
			show_bg(4);

		
		},
	'3_2_hbskxl_t1':function(config_position,resize_flash_position){   //右侧第一个按钮
	     $('body').off('mousemove');
	
			resize_flash_position();
			
			$('.item1_flash1').show();
  			$('.item1_flash2').show();
			$('.item1_flash3').show();
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').hide();
  			$('.item2_flash2').hide().css('opacity',0);
			$('.item2_flash3').hide().css('opacity',0);
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').hide();
  			$('.item3_flash2').hide().css('opacity',0);
			$('.item3_flash3').hide().css('opacity',0);
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item1_flash3').show().stop().animate({
						bottom:config_position['item1_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item1_flash2').show().stop().animate({
								left:config_position['item1_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
								
								});
						});

			show_bg(5);
		},
	'3_2_hbskxl_t2':function(config_position,resize_flash_position){   //右侧第二个按钮
			$('body').off('mousemove');
			resize_flash_position();
			$('.item1_flash1').hide();
  			$('.item1_flash2').hide().css('opacity',0);
			$('.item1_flash3').hide().css('opacity',0);
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').show();
  			$('.item2_flash2').show();
			$('.item2_flash3').show();
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').hide();
  			$('.item3_flash2').hide().css('opacity',0);
			$('.item3_flash3').hide().css('opacity',0);
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item2_flash3').show().stop().animate({
						bottom:config_position['item2_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item2_flash2').show().stop().animate({
								left:config_position['item2_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									
								});
						});

			show_bg(3);
		},
	'3_2_hbskxl_t3':function(config_position,resize_flash_position){   //右侧第三个按钮
			$('body').off('mousemove');
			$('.item1_flash1').hide();
  			$('.item1_flash2').hide().css('opacity',0);
			$('.item1_flash3').hide().css('opacity',0);
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').hide();
  			$('.item2_flash2').hide().css('opacity',0);
			$('.item2_flash3').hide().css('opacity',0);
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').show();
  			$('.item3_flash2').show();
			$('.item3_flash3').show();
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item3_flash3').show().stop().animate({
						bottom:config_position['item3_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item3_flash2').show().stop().animate({
								left:config_position['item3_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									
								});
						});
		

			show_bg(1);
		}						
				
		
	}



// JavaScript Document



	
function finish_load(image,callback){   
    
			if(navigator.userAgent.indexOf("MSIE")>0){ 
		        if($.browser.version==6.0 || $.browser.version==9.0){ 
		            image.onreadystatechange = function () { 
		                if (image.readyState == "complete"){ 
		                   callback();
		                } 
		            }; 
		        }else{ 
		            ie7imagetime = window.setInterval(function(){ 
		                var rs = image.readyState; 
		                if(rs=="complete"){ 
		                    window.clearInterval(ie7imagetime); 
		                    callback();
		                }else{ 
		                    return; 
		                } 
		            },200); 
		        } 
		    }else{ 
		        image.onload = function () { 
		            if (image.complete == true){ 
		                callback();
		             } 
		        }; 
		    } 
	}	

//--------------------------------------------头部导航事件
var menu_even=function(){
	
			$('#menu ul>li').on('mouseover',function(){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				//$(this).find('ul').fadeIn();
				$(this).find('ul').show();
				}).on('mouseleave',function(){
					$(this).find('div:first').stop().animate({opacity: 0},500);
					//$(this).find('ul').fadeOut();
					$(this).find('ul').hide();
					});
					
			$('#menu ul ul li').on('mouseover',function(){
				//$(this).animate({opacity:1},20);
				$(this).css({opacity:1});
				}).on('mouseleave',function(){
					//$(this).animate({opacity:0.7},50);
					$(this).css({opacity:0.7});
					});		
	
	/*		$('#menu ul>li:eq(0)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),0);
				event.preventDefault();
				});	
		
		$('#menu ul>li:eq(1)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),1);
				event.preventDefault();
				});	
		$('#menu ul>li:eq(2)').on('mouseover',function(event){
				$(this).find('div:first').stop().animate({opacity: 0.8},500);
				var index=$('#menu ul>li ').index($(this));
				//alert(index);
				show_menu_slide($(this),index);
				event.preventDefault();
				}).on('mouseleave',function(event){
				$(this).find('div:first').stop().animate({opacity: 0},500);
				hide_menu_slide($(this),2);
				event.preventDefault();
				});		*/
	};

//-----------------------------------划过底部导航li
var swip_bottom_menu=function(){
		$('.bottom_menu ul li').on('mouseover',function(){
				$(this).find('div').stop().animate({opacity: 1},500);
			}).on('mouseleave',function(){
				$(this).find('div').stop().animate({opacity: 0},500);
			});		
	};


//-----------------------------划过news_center
var swip_new=function(){
		
		//划过显示 隐藏news
		var show_news=function(){
			
			var obj=$('.news_slide ul li');
			
			if(obj.length==0){return false;};
			$('.news_slide').css('display','block');
			
			obj.eq(0).stop().animate({marginTop:'0',opacity:1},500);
			obj.eq(1).stop().animate({marginTop:'0',opacity:1},500);	
		
			};
		
		var hide_news=function(){
			var obj=$('.news_slide ul li');
			
			obj.eq(1).stop().animate({marginTop:'200px',opacity:0},500);
			obj.eq(0).stop().animate({marginTop:'200px',opacity:0},500,function(){
				$('.news_slide').css('display','none');
				});	
			};	
			
	
		$('.right_ico ul .s_first ').on('mouseover',function(){
				$(this).find('span:first').stop().animate({opacity: 0.5});
					show_news();
				}).on('mouseleave',function(){
				$(this).find('span:first').stop().animate({opacity: 0});
					hide_news();
				});				
		
		
		$('.right_ico ul .s_second ').on('mouseover',function(){
				$(this).find('span:first').stop().animate({opacity: 0.5});
				}).on('mouseleave',function(){
				$(this).find('span:first').stop().animate({opacity: 0});
				});	

}

//--------------------------------------缓动推出 下部导航
var bottom_menu_slide=function(){
	  
	  
	
				var left_arr=[241,354,467,580,693,806,919];
				var clear_Inter=function(){
						clearInterval(s);
					}
				var s;
				var obj=$('.bottom_menu li');
				var slide=function(i){
					obj.eq(i).stop().animate({
						top:'0',
						opacity:1},1000,function(){
				
							});
							
						s=setInterval(function(){
							if(i==8){
								clear_Inter();
								return false;
								}
							if(obj.eq(i).position().top>50){  //划过一半距离后，执行下一个
								i++;
								slide(i);
								}
							},50);
					};
					
				//slide(1);  //菜单已修改 暂时不用
}


var get_bg_style=function(){
	    var str=$('.bgstretcher ul li').html();
		var start=str.indexOf('style');
		var style=str.substring(start).replace('>','');
		return style;
	}
	
 //页面初始化动画对象
var flash_init={               
	'index':function(config_position,finish){                      //首页
		
		
		
		//页面中部文字动画
		$('.flash1').animate({
				right:'150px',
				opacity:1},1000,function(){
					$('.flash2').animate({
						bottom:config_position['flash2']['end_bottom']+'px',
						opacity:1},800,function(){
							finish();  //动画执行完成
						});
			});	


		//划过news_center
		swip_new();
		
		//缓动推出 下部导航
		bottom_menu_slide();	
		
		//划过底部导航li
		swip_bottom_menu();
		
		//头部下拉菜单
		menu_even();
		
		},
	'1_1_qyjz':function(config_position,finish){		//区域价值

			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1
						},800,function(){
							$(this).css('filter','none');
							$('.flash2').show().stop().animate({
								left:'52%',opacity:1},800,function(){
									$(this).css('filter','none');
									finish();  //动画执行完成
								});
						});
			

			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/qyjz_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},
	'1_2_cszx':function(config_position,finish){	//城市中心.
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'46%',opacity:1},800,function(){
									$(this).css('filter','none');
									finish();  //动画执行完成
								});
						});
			
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/cszx_bg2.jpg" alt="" '+get_bg_style()+'></li>');
		//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},
	'1_3_lssty':function(config_position,finish){	//绿色生态圈
	
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'40%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/lssty_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();		
		},
	'1_4_jtpt':function(config_position,finish){		//交通配套
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'50%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'2_1_xmbj':function(config_position,finish){   //项目背景
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'60%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/xmbj_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'2_2_xmgh':function(config_position,finish){   //项目背景
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'60%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/xmbj_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'3_1_hbskyq':function(config_position,finish){   //豪 布 斯 卡 缘 起
			
			//页面中部文字动画
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'50%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
			
			$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/jbskyq_bg2.jpg" alt="" '+get_bg_style()+'></li>');
			
			//导航划块的事件
			$('.flash5_item ul li').on('mouseover',function(){
				$('.flash5_item').find('div').stop().animate({opacity: 0});
				var index=$('.flash5_item ul li').index($(this));
			    $(this).find('div').stop().animate({opacity: 1},10,function(){
					
					$('.flash5>img').stop().animate({opacity: 0});
					$('.flash5 .pic'+index).stop().animate({opacity: 1});
					});
			});		
			
			//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		
		},
	'3_2_hbskxl':function(config_position,finish){
		
		//页面中部文字动画
					$('.item1_flash3').show().stop().animate({
						bottom:config_position['item1_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item1_flash2').show().stop().animate({
								left:config_position['item1_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();  //动画执行完成
								});
						});
		
		//---------巴黎拉德芳斯 介绍背景
		var style=get_bg_style();
		$('.bgstretcher ul').prepend('<li style="" class=""><img src="images/item3_2.jpg" alt="" '+style+'></li><!--东京六本木切换背景-->\
													<li style="" class=""><img src="images/item3_1.jpg" alt="" '+style+'></li><!--东京六本木默认背景-->\
													<li style="" class=""><img src="images/item2_2.jpg" alt="" '+style+'></li><!--纽约巴特利公园城切换背景-->\
													<li style="" class=""><img src="images/item2_1.jpg" alt="" '+style+'></li><!--纽约巴特利公园城默认背景-->\
													<li style="" class=""><img src="images/hbskxl_bg2.jpg" alt="" '+style+'></li>');   //巴黎拉德芳斯切换背景
		
		
		//划过news_center
			swip_new();

			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
		},	
		'2_jggc':function(config_position,finish){   //金谷广场
		
			$('.flash3').stop().animate({
						left:'325px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash4').show().stop().animate({
								bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
										$('.flash5').show().stop().animate({
											bottom:config_position['flash5']['end_bottom']+'px',opacity:1},800,function(){
												$(this).css('filter','none');   //去掉ie 下文字黑边
												finish();  //动画执行完成
											});
									
								});
						});
			
			
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();
			},
		'3_jgjy':function(config_position,finish){   //金谷基业
			$('.flash2').show().stop().animate({
				bottom:config_position['flash2']['end_bottom']+'px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
								$('.flash4').show().stop().animate({
									bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
										$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();
									});
						});
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'4_jgal':function(config_position,finish){   //金谷奥莱
			$('.flash4').show().stop().animate({
				bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash5').show().stop().animate({
						bottom:config_position['flash5']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.flash2').show().stop().animate({
								left:'445px',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
								});
							setTimeout(function(){
								$('.flash3').show().stop().animate({
									left:'445px',opacity:1},800,function(){
										$(this).css('filter','none');   //去掉ie 下文字黑边
									finish();
								});	
								},400)	
							
								
						});
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'5_jgtj':function(config_position,finish){   //金谷天街
			
			$('.flash2').show().stop().animate({
				left:'125px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'6_jgly':function(config_position,finish){   //金谷乐园
				$('.flash2').show().stop().animate({
				right:'290px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'7_jgsa':function(config_position,finish){   //金谷水岸
			
			$('.flash2').show().stop().animate({
				left:'365px',opacity:1},800,function(){
					$(this).css('filter','none');   //去掉ie 下文字黑边
					$('.flash3').show().stop().animate({
						bottom:config_position['flash3']['end_bottom']+'px',opacity:1},800,function(){
						$(this).css('filter','none');   //去掉ie 下文字黑边
					});
					
					setTimeout(function(){
						$('.flash4').show().stop().animate({
							bottom:config_position['flash4']['end_bottom']+'px',opacity:1},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
						});
						},400);
						
					finish();	
				});
		
			//划过news_center
			swip_new();
			
			//缓动推出 下部导航
			bottom_menu_slide();	
			
			//划过底部导航li
			swip_bottom_menu();
			
			//头部下拉菜单
			menu_even();	
			},
		'24shi':function(config_position,finish,move,move_part){
			var gettime=function(){
				var d=new Date();
				return (d.getHours()<10?('0'+d.getHours()):d.getHours())+':'+(d.getMinutes()<10?('0'+d.getMinutes()):d.getMinutes());
				};
			var Judge_day=function(){
				var d=new Date();
				var hour=d.getHours();
				if(hour<=12){
					return '.am';
					}else{
						return '.pm';
						}
				};
				
				//-------------------
			var reverse_flash=function(){
				$('.hour').stop().animate({fontSize:config_position['hour']['start_font']+'px'},1000,function(){
					$(this).hide();
					});
				$('.day').stop().animate({fontSize:config_position['day']['end_font']+'px'},1000,function(){
					$(this).hide();
				});	
				$('.flash1').stop().animate({left:config_position['flash1']['start_left']+'px',
													height:config_position['flash1']['start_height']+'px',
													width:config_position['flash1']['start_width']+'px',
													bottom:config_position['flash1']['start_bottom']+'px'
													},1000,function(){
														$(this).hide();
														});
				};
			//---------------------
			
			var time_obj=[
				[7,9],
				[9,11],
				[11,13],
				[13,15],
				[15,17],
				[17,19],
				[19,21],
				[21,23]
			];
			
			
			var max_time=function(a,b,c){
				return Math.max(a,b,c);
				};
			//打开当前时间段
			var curr_time_open=function(){
				var curr_hour=new Date().getHours();
				
				
				
				for(var i=0; i<8; i++){
					time_obj[i].push(curr_hour);
					
					if( max_time.apply(null,time_obj[i])>curr_hour ){
						break;
						};
				};
					
					//console.log(i);
					if(curr_hour>=7 && curr_hour<=23){
						$('.flash2 li:eq('+i+')').click();
						};
					
				
				};
			
			
			var flash2_show=function(){
				$('.flash2').show().stop().animate({left:config_position['flash2']['end_left']+'px'	},1000,function(){
					
					//$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff; z-index:2">fdffd</div>');
					
					
					move();
					
					curr_time_open();
					});
				};	
				
					
			$('.flash1').stop().animate({left:config_position['flash1']['end_left']+'px',
													height:config_position['flash1']['end_height']+'px',
													width:config_position['flash1']['end_width']+'px',
													bottom:config_position['flash1']['end_bottom']+'px'
													},500,function(){
														finish();
														});
			$('.hour').stop().animate({fontSize:config_position['hour']['end_font']+'px'},1000,function(){
				$(this).animate({opacity:'0'},1000,function(){
					  $(this).html(gettime());
				      $(this).animate({opacity:'1'},1000);
					});
				});
				
			$('.day').stop().animate({fontSize:config_position['day']['end_font']+'px'},1000,function(){
				$(Judge_day()).animate({opacity:'1'},1000,function(){
					setTimeout(function(){
						reverse_flash();
						flash2_show();
						},3000);
					});
				});
				
			
			//划过news_center
			swip_new();
				//头部下拉菜单
			menu_even();	
				},
		'24shi_8':function(config_position,finish8,finish,move,move_part,get_finish_flash){
			
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			
				var hide_flash_8_bg=function(){ //半透明背景图
					$('.flash_8_bg').stop().animate({'bottom':config_position['flash_8_bg']['start_bottom']+'px',
												'left':config_position['flash_8_bg']['start_left']+'px',
												'width':config_position['flash_8_bg']['start_width']+'px',
												'height':config_position['flash_8_bg']['start_height']+'px'},1000,function(){
													$(this).hide();
													select==''?hide_flash_lay():'';
													$('.close_flash').attr('select','');
												});
					
					};
				
				
				//太阳
				var hide_flash_8_2=function(){
					$('.flash_8_2').stop().animate({'bottom':config_position['flash_8_2']['start_bottom']+'px',
													'left':config_position['flash_8_2']['start_left']+'px',
													'width':config_position['flash_8_2']['start_width']+'px',
													'height':config_position['flash_8_2']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};
				//白鸽
				var hide_flash_8_3=function(){
					$('.flash_8_3').stop().animate({'bottom':config_position['flash_8_3']['start_bottom']+'px',
													'left':config_position['flash_8_3']['start_left']+'px',
													'width':config_position['flash_8_3']['start_width']+'px',
													'height':config_position['flash_8_3']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};	
					
				//阳光时刻
				var hide_flash_8_4=function(){
					$('.flash_8_4').stop().animate({'bottom':config_position['flash_8_4']['start_bottom']+'px',
													'left':config_position['flash_8_4']['start_left']+'px',
													'width':config_position['flash_8_4']['start_width']+'px',
													'height':config_position['flash_8_4']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};		
				//汽车
				var hide_flash_8_5=function(){
					$('.flash_8_5').stop().animate({'bottom':config_position['flash_8_5']['start_bottom']+'px',
													'left':config_position['flash_8_5']['start_left']+'px',
													'width':config_position['flash_8_5']['start_width']+'px',
													'height':config_position['flash_8_5']['start_height']+'px'},1000,function(){
														$(this).hide();
												      });
					};	
				
				
				//底部草地 楼房								
				$('.flash_8_1').stop().animate({'bottom':config_position['flash_8_1']['start_bottom']+'px',
												'left':config_position['flash_8_1']['start_left']+'px',
												'width':config_position['flash_8_1']['start_width']+'px',
												'height':config_position['flash_8_1']['start_height']+'px'},1000,function(){
													$(this).hide();
													hide_flash_8_bg();
													hide_flash_8_5();
													hide_flash_8_4();
													hide_flash_8_3();
													hide_flash_8_2();
												});
				
												
												
				};
			//----------------------------------------------------------------------------------------
			
			
			//开始动画
			var show_flash_8_5=function(){//////////汽车
				$('.flash_8_5').show().animate({'bottom':config_position['flash_8_5']['end_bottom']+'px',
												'left':config_position['flash_8_5']['end_left']+'px',
												'width':config_position['flash_8_5']['end_width']+'px',
												'height':config_position['flash_8_5']['end_height']+'px'},1000,function(){
													finish8();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
													$('.close_flash').on('click',function(){
																
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($(this).attr('select'));
																
																});
													});
				};
			var show_flash_8_4=function(){//////////阳光时刻
				$('.flash_8_4').show().animate({'bottom':config_position['flash_8_4']['end_bottom']+'px',
												'left':config_position['flash_8_4']['end_left']+'px',
												'width':config_position['flash_8_4']['end_width']+'px',
												'height':config_position['flash_8_4']['end_height']+'px'},1000);
				};
			
			var show_flash_8_3=function(){///////////白鸽
				$('.flash_8_3').show().animate({'bottom':config_position['flash_8_3']['end_bottom']+'px',
												'left':config_position['flash_8_3']['end_left']+'px',
												'width':config_position['flash_8_3']['end_width']+'px',
												'height':config_position['flash_8_3']['end_height']+'px'},1000);
				};
			
			var show_flash_8_2=function(){////////////太阳
				$('.flash_8_2').show().animate({'bottom':config_position['flash_8_2']['end_bottom']+'px',
												'left':config_position['flash_8_2']['end_left']+'px',
												'width':config_position['flash_8_2']['end_width']+'px',
												'height':config_position['flash_8_2']['end_height']+'px'},1000);
				};
				
			var show_flash_8_1=function(){  ///////////底部 草地 楼房
				$('.flash_8_1').show().animate({'bottom':config_position['flash_8_1']['end_bottom']+'px',
																						'left':config_position['flash_8_1']['end_left']+'px',
																						'width':config_position['flash_8_1']['end_width']+'px',
																						'height':config_position['flash_8_1']['end_height']+'px'},1000,function(){
																							show_flash_8_2();//太阳出现
																							show_flash_8_3();//白鸽出现
																							show_flash_8_4();//阳光时刻
																							show_flash_8_5();//汽车
																							});
				};
				
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_8_bg').show().animate({'bottom':config_position['flash_8_bg']['end_bottom']+'px',
																						'left':config_position['flash_8_bg']['end_left']+'px',
																						'width':config_position['flash_8_bg']['end_width']+'px',
																						'height':config_position['flash_8_bg']['end_height']+'px'},1000);
																				
																						
															
															finish8();
															
															show_flash_8_1();	
																
															});
			},
		'24shi_10':function(config_position,finish10,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
				//楼房	
				$('.flash_10_4').show().animate({'bottom':config_position['flash_10_4']['start_bottom']+'px',
											'left':config_position['flash_10_4']['start_left']+'px',
											'width':config_position['flash_10_4']['start_width']+'px',
											'height':config_position['flash_10_4']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//商务时刻	
				$('.flash_10_3').show().animate({'bottom':config_position['flash_10_3']['start_bottom']+'px',
											'left':config_position['flash_10_3']['start_left']+'px',
											'width':config_position['flash_10_3']['start_width']+'px',
											'height':config_position['flash_10_3']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//人物	
				$('.flash_10_2').show().animate({'bottom':config_position['flash_10_2']['start_bottom']+'px',
											'left':config_position['flash_10_2']['start_left']+'px',
											'width':config_position['flash_10_2']['start_width']+'px',
											'height':config_position['flash_10_2']['start_height']+'px'},1000,function(){
												$(this).hide();
												});							
				//像框	
				$('.flash_10_1').show().animate({'bottom':config_position['flash_10_1']['start_bottom']+'px',
											'left':config_position['flash_10_1']['start_left']+'px',
											'width':config_position['flash_10_1']['start_width']+'px',
											'height':config_position['flash_10_1']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												});									
				//背景图	
				$('.flash_10_bg').show().animate({'bottom':config_position['flash_10_bg']['start_bottom']+'px',
											'left':config_position['flash_10_bg']['start_left']+'px',
											'width':config_position['flash_10_bg']['start_width']+'px',
											'height':config_position['flash_10_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												});		
					
			};
			//----------------------------------------
			
			var show_flash_10_4=function(){///////////////楼房
				$('.flash_10_4').show().animate({'bottom':config_position['flash_10_4']['end_bottom']+'px',
											'left':config_position['flash_10_4']['end_left']+'px',
											'width':config_position['flash_10_4']['end_width']+'px',
											'height':config_position['flash_10_4']['end_height']+'px'},1000,function(){
												finish10();//最后一个动画改变标记
													move();
												$('.close_flash').off('click');
												$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($(this).attr('select'));
																
													});	
												});
				
				};
			
			var show_flash_10_3=function(){///////////////商务时刻
				$('.flash_10_3').show().animate({'bottom':config_position['flash_10_3']['end_bottom']+'px',
											'left':config_position['flash_10_3']['end_left']+'px',
											'width':config_position['flash_10_3']['end_width']+'px',
											'height':config_position['flash_10_3']['end_height']+'px'},1000,function(){
												show_flash_10_4();
												});
				
				};
				
			var show_flash_10_2=function(){///////////////人物
				$('.flash_10_2').show().animate({'bottom':config_position['flash_10_2']['end_bottom']+'px',
											'left':config_position['flash_10_2']['end_left']+'px',
											'width':config_position['flash_10_2']['end_width']+'px',
											'height':config_position['flash_10_2']['end_height']+'px'},1000,function(){
												show_flash_10_3();//商务时刻出现
												});
				
				};
			
			var show_flash_10_1=function(){/////////////像框
				$('.flash_10_1').show().animate({'bottom':config_position['flash_10_1']['end_bottom']+'px',
											'left':config_position['flash_10_1']['end_left']+'px',
											'width':config_position['flash_10_1']['end_width']+'px',
											'height':config_position['flash_10_1']['end_height']+'px'},1000,function(){
												show_flash_10_2();//人物出现
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_10_bg').show().animate({'bottom':config_position['flash_10_bg']['end_bottom']+'px',
																						'left':config_position['flash_10_bg']['end_left']+'px',
																						'width':config_position['flash_10_bg']['end_width']+'px',
																						'height':config_position['flash_10_bg']['end_height']+'px'},1000,function(){
																						   show_flash_10_1();		
																							});
																				
																						
															
															finish10();
															
																
															});
			},
		'24shi_12':function(config_position,finish12,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
				
				//美食时刻	
				$('.flash_12_3').show().animate({'bottom':config_position['flash_12_3']['start_bottom']+'px',
											'left':config_position['flash_12_3']['start_left']+'px',
											'width':config_position['flash_12_3']['start_width']+'px',
											'height':config_position['flash_12_3']['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
				//碗	
				$('.flash_12_2').show().animate({'bottom':config_position['flash_12_2']['start_bottom']+'px',
											'left':config_position['flash_12_2']['start_left']+'px',
											'width':config_position['flash_12_2']['start_width']+'px',
											'height':config_position['flash_12_2']['start_height']+'px'},1000,function(){
												$(this).hide();
												});							
				//盘子	
				$('.flash_12_1').show().animate({'bottom':config_position['flash_12_1']['start_bottom']+'px',
											'left':config_position['flash_12_1']['start_left']+'px',
											'width':config_position['flash_12_1']['start_width']+'px',
											'height':config_position['flash_12_1']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												});									
				//背景图	
				$('.flash_12_bg').show().animate({'bottom':config_position['flash_12_bg']['start_bottom']+'px',
											'left':config_position['flash_12_bg']['start_left']+'px',
											'width':config_position['flash_12_bg']['start_width']+'px',
											'height':config_position['flash_12_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
			
			
			
			var show_flash_12_3=function(){///////////////美食时刻
				$('.flash_12_3').show().animate({'bottom':config_position['flash_12_3']['end_bottom']+'px',
											'left':config_position['flash_12_3']['end_left']+'px',
											'width':config_position['flash_12_3']['end_width']+'px',
											'height':config_position['flash_12_3']['end_height']+'px'},1000,function(){
												finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																	
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
				
			var show_flash_12_2=function(){///////////////碗
				$('.flash_12_2').show().animate({'bottom':config_position['flash_12_2']['end_bottom']+'px',
											'left':config_position['flash_12_2']['end_left']+'px',
											'width':config_position['flash_12_2']['end_width']+'px',
											'height':config_position['flash_12_2']['end_height']+'px'},1000,function(){
												show_flash_12_3();//美食时刻出现
												});
				
				};
			
			var show_flash_12_1=function(){/////////////盘子
				$('.flash_12_1').show().animate({'bottom':config_position['flash_12_1']['end_bottom']+'px',
											'left':config_position['flash_12_1']['end_left']+'px',
											'width':config_position['flash_12_1']['end_width']+'px',
											'height':config_position['flash_12_1']['end_height']+'px'},1000,function(){
												show_flash_12_2();//碗
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_12_bg').show().animate({'bottom':config_position['flash_12_bg']['end_bottom']+'px',
																						'left':config_position['flash_12_bg']['end_left']+'px',
																						'width':config_position['flash_12_bg']['end_width']+'px',
																						'height':config_position['flash_12_bg']['end_height']+'px'},1000);
																				
																						
															
															finish12();
															/*$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
															show_flash_12_1();	
																
															});
			},
		'24shi_14':function(config_position,finish14,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				hide_flash('flash_14_9');//酒		
				hide_flash('flash_14_8');//休闲时刻								
				hide_flash('flash_14_7');//咖啡
				//花瓣
				hide_flash('flash_14_6');
				hide_flash('flash_14_5');
				hide_flash('flash_14_4');
				hide_flash('flash_14_3');
				hide_flash('flash_14_2');
				hide_flash('flash_14_1');							
																											
											
				//背景图	
				$('.flash_14_bg').show().animate({'bottom':config_position['flash_14_bg']['start_bottom']+'px',
											'left':config_position['flash_14_bg']['start_left']+'px',
											'width':config_position['flash_14_bg']['start_width']+'px',
											'height':config_position['flash_14_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
			var show_flash_14_9=function(){///////////////酒
				$('.flash_14_9').show().animate({'bottom':config_position['flash_14_9']['end_bottom']+'px',
											'left':config_position['flash_14_9']['end_left']+'px',
											'width':config_position['flash_14_9']['end_width']+'px',
											'height':config_position['flash_14_9']['end_height']+'px'},1000,function(){
												//finish14();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			var show_flash_14_8=function(){///////////////休闲时刻
				$('.flash_14_8').show().animate({'bottom':config_position['flash_14_8']['end_bottom']+'px',
											'left':config_position['flash_14_8']['end_left']+'px',
											'width':config_position['flash_14_8']['end_width']+'px',
											'height':config_position['flash_14_8']['end_height']+'px'},1000,function(){
												//show_flash_14_4();
												});
				
				};
			
			var show_flash_14_7=function(){///////////////咖啡
				$('.flash_14_7').show().animate({'bottom':config_position['flash_14_7']['end_bottom']+'px',
											'left':config_position['flash_14_7']['end_left']+'px',
											'width':config_position['flash_14_7']['end_width']+'px',
											'height':config_position['flash_14_7']['end_height']+'px'},1000,function(){
												show_flash_14_8();
												show_flash_14_9();
												});
				
				};
			
			var show_flash_14_6=function(){///////////////花瓣六
				$('.flash_14_6').show().animate({'bottom':config_position['flash_14_6']['end_bottom']+'px',
											'left':config_position['flash_14_6']['end_left']+'px',
											'width':config_position['flash_14_6']['end_width']+'px',
											'height':config_position['flash_14_6']['end_height']+'px'},1000,function(){
												show_flash_14_7();
												});
				
				};
			
			var show_flash_14_5=function(){///////////////花瓣五
				$('.flash_14_5').show().animate({'bottom':config_position['flash_14_5']['end_bottom']+'px',
											'left':config_position['flash_14_5']['end_left']+'px',
											'width':config_position['flash_14_5']['end_width']+'px',
											'height':config_position['flash_14_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												});
				
				};
			
			
			var show_flash_14_4=function(){///////////////花瓣四
				$('.flash_14_4').show().animate({'bottom':config_position['flash_14_4']['end_bottom']+'px',
											'left':config_position['flash_14_4']['end_left']+'px',
											'width':config_position['flash_14_4']['end_width']+'px',
											'height':config_position['flash_14_4']['end_height']+'px'},1000,function(){
												/*finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
																
													//show_flash_14_5();			
												});
				
				};
			
			
			var show_flash_14_3=function(){///////////////花瓣三
				$('.flash_14_3').show().animate({'bottom':config_position['flash_14_3']['end_bottom']+'px',
											'left':config_position['flash_14_3']['end_left']+'px',
											'width':config_position['flash_14_3']['end_width']+'px',
											'height':config_position['flash_14_3']['end_height']+'px'},1000,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_14_2=function(){///////////////花瓣二
				$('.flash_14_2').show().animate({'bottom':config_position['flash_14_2']['end_bottom']+'px',
											'left':config_position['flash_14_2']['end_left']+'px',
											'width':config_position['flash_14_2']['end_width']+'px',
											'height':config_position['flash_14_2']['end_height']+'px'},1000,function(){
												//show_flash_14_3();//花瓣三
												});
				
				};
			
			var show_flash_14_1=function(){/////////////花瓣一
				$('.flash_14_1').show().animate({'bottom':config_position['flash_14_1']['end_bottom']+'px',
											'left':config_position['flash_14_1']['end_left']+'px',
											'width':config_position['flash_14_1']['end_width']+'px',
											'height':config_position['flash_14_1']['end_height']+'px'},1200,function(){
												//show_flash_14_2();//花瓣二
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_14_bg').show().animate({'bottom':config_position['flash_14_bg']['end_bottom']+'px',
																						'left':config_position['flash_14_bg']['end_left']+'px',
																						'width':config_position['flash_14_bg']['end_width']+'px',
																						'height':config_position['flash_14_bg']['end_height']+'px'},1000,function(){
																							show_flash_14_1();
																							show_flash_14_2();
																							show_flash_14_3();
																							show_flash_14_4();
																							show_flash_14_5();
																							show_flash_14_6();	
																							});
																				
																						
															
															finish14();
															
																
															});
			},
		'24shi_16':function(config_position,finish16,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				hide_flash('flash_16_5');
				hide_flash('flash_16_4');
				hide_flash('flash_16_3');
				hide_flash('flash_16_2');
				hide_flash('flash_16_1');							
																											
											
				//背景图	
				$('.flash_16_bg').show().animate({'bottom':config_position['flash_16_bg']['start_bottom']+'px',
											'left':config_position['flash_16_bg']['start_left']+'px',
											'width':config_position['flash_16_bg']['start_width']+'px',
											'height':config_position['flash_16_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			
			
			
			var show_flash_16_5=function(){///////////////包
				$('.flash_16_5').show().animate({'bottom':config_position['flash_16_5']['end_bottom']+'px',
											'left':config_position['flash_16_5']['end_left']+'px',
											'width':config_position['flash_16_5']['end_width']+'px',
											'height':config_position['flash_16_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																	
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			
			
			var show_flash_16_4=function(){///////////////酒
				$('.flash_16_4').show().animate({'bottom':config_position['flash_16_4']['end_bottom']+'px',
											'left':config_position['flash_16_4']['end_left']+'px',
											'width':config_position['flash_16_4']['end_width']+'px',
											'height':config_position['flash_16_4']['end_height']+'px'},1000,function(){
												/*finish12();//最后一个动画改变标记
													move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
																
													//show_flash_14_5();			
												});
				
				};
			
			
			var show_flash_16_3=function(){///////////////时尚时刻
				$('.flash_16_3').show().animate({'bottom':config_position['flash_16_3']['end_bottom']+'px',
											'left':config_position['flash_16_3']['end_left']+'px',
											'width':config_position['flash_16_3']['end_width']+'px',
											'height':config_position['flash_16_3']['end_height']+'px'},2000,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_16_2=function(){///////////////人物
				$('.flash_16_2').show().animate({'bottom':config_position['flash_16_2']['end_bottom']+'px',
											'left':config_position['flash_16_2']['end_left']+'px',
											'width':config_position['flash_16_2']['end_width']+'px',
											'height':config_position['flash_16_2']['end_height']+'px'},1000,function(){
												//show_flash_14_3();//花瓣三
												});
				
				};
			
			var show_flash_16_1=function(){/////////////表
				$('.flash_16_1').show().animate({'bottom':config_position['flash_16_1']['end_bottom']+'px',
											'left':config_position['flash_16_1']['end_left']+'px',
											'width':config_position['flash_16_1']['end_width']+'px',
											'height':config_position['flash_16_1']['end_height']+'px'},1200,function(){
												//show_flash_14_2();//花瓣二
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_16_bg').show().animate({'bottom':config_position['flash_16_bg']['end_bottom']+'px',
																						'left':config_position['flash_16_bg']['end_left']+'px',
																						'width':config_position['flash_16_bg']['end_width']+'px',
																						'height':config_position['flash_16_bg']['end_height']+'px'},1000,function(){
																							show_flash_16_1();
																							show_flash_16_2();
																							show_flash_16_3();
																							show_flash_16_4();
																							show_flash_16_5();
																							
																							});
																				
																						
															
															finish16();
															
																
															});
			},
		'24shi_18':function(config_position,finish18,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				hide_flash('flash_18_7');
				hide_flash('flash_18_6');
				hide_flash('flash_18_5');
				hide_flash('flash_18_4');
				hide_flash('flash_18_3');
				hide_flash('flash_18_2');
				hide_flash('flash_18_1');							
																											
											
				//背景图	
				$('.flash_18_bg').show().animate({'bottom':config_position['flash_18_bg']['start_bottom']+'px',
											'left':config_position['flash_18_bg']['start_left']+'px',
											'width':config_position['flash_18_bg']['start_width']+'px',
											'height':config_position['flash_18_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			var show_flash_18_7=function(){///////////////笑脸
				$('.flash_18_7').show().animate({'bottom':config_position['flash_18_7']['end_bottom']+'px',
											'left':config_position['flash_18_7']['end_left']+'px',
											'width':config_position['flash_18_7']['end_width']+'px',
											'height':config_position['flash_18_7']['end_height']+'px'},1000,function(){
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});
												});
				
				};
			
			var show_flash_18_6=function(){///////////////亲子时刻
				$('.flash_18_6').show().animate({'bottom':config_position['flash_18_6']['end_bottom']+'px',
											'left':config_position['flash_18_6']['end_left']+'px',
											'width':config_position['flash_18_6']['end_width']+'px',
											'height':config_position['flash_18_6']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												/*move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
												});
				
				};
			
			var show_flash_18_5=function(){///////////////玩具
				$('.flash_18_5').show().animate({'bottom':config_position['flash_18_5']['end_bottom']+'px',
											'left':config_position['flash_18_5']['end_left']+'px',
											'width':config_position['flash_18_5']['end_width']+'px',
											'height':config_position['flash_18_5']['end_height']+'px'},1000,function(){
												//show_flash_14_6();
												/*move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																$('body').off('mousemove');
																finish();
																reverse_flash();
																
																});*/
												});
				
				};
			
			
			var show_flash_18_4=function(){///////////////人物
				$('.flash_18_4').show().animate({'bottom':config_position['flash_18_4']['end_bottom']+'px',
											'left':config_position['flash_18_4']['end_left']+'px',
											'width':config_position['flash_18_4']['end_width']+'px',
											'height':config_position['flash_18_4']['end_height']+'px'},1000,function(){
															
												});
				
				};
			
			
			var show_flash_18_3=function(){///////////////C
				$('.flash_18_3').show().animate({'bottom':config_position['flash_18_3']['end_bottom']+'px',
											'left':config_position['flash_18_3']['end_left']+'px',
											'width':config_position['flash_18_3']['end_width']+'px',
											'height':config_position['flash_18_3']['end_height']+'px'},500,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_18_2=function(){///////////////B
				$('.flash_18_2').show().animate({'bottom':config_position['flash_18_2']['end_bottom']+'px',
											'left':config_position['flash_18_2']['end_left']+'px',
											'width':config_position['flash_18_2']['end_width']+'px',
											'height':config_position['flash_18_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_18_1=function(){/////////////A
				$('.flash_18_1').show().animate({'bottom':config_position['flash_18_1']['end_bottom']+'px',
											'left':config_position['flash_18_1']['end_left']+'px',
											'width':config_position['flash_18_1']['end_width']+'px',
											'height':config_position['flash_18_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_18_bg').show().animate({'bottom':config_position['flash_18_bg']['end_bottom']+'px',
																						'left':config_position['flash_18_bg']['end_left']+'px',
																						'width':config_position['flash_18_bg']['end_width']+'px',
																						'height':config_position['flash_18_bg']['end_height']+'px'},1000,function(){
																							show_flash_18_1();
																							show_flash_18_2();
																							show_flash_18_3();
																							show_flash_18_4();
																							show_flash_18_5();
																							show_flash_18_6();
																							show_flash_18_7();
																							});
																				
																						
															
															finish18();
															
																
															});
			},
		'24shi_20':function(config_position,finish20,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				hide_flash('flash_20_4');
				hide_flash('flash_20_3');
				hide_flash('flash_20_2');
				hide_flash('flash_20_1');							
																											
											
				//背景图	
				$('.flash_20_bg').show().animate({'bottom':config_position['flash_20_bg']['start_bottom']+'px',
											'left':config_position['flash_20_bg']['start_left']+'px',
											'width':config_position['flash_20_bg']['start_width']+'px',
											'height':config_position['flash_20_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			var show_flash_20_4=function(){///////////////人物
				$('.flash_20_4').show().animate({'bottom':config_position['flash_20_4']['end_bottom']+'px',
											'left':config_position['flash_20_4']['end_left']+'px',
											'width':config_position['flash_20_4']['end_width']+'px',
											'height':config_position['flash_20_4']['end_height']+'px'},1000,function(){
														move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});	
												});
				
				};
			
			
			var show_flash_20_3=function(){///////////////社交时刻
				$('.flash_20_3').show().animate({'bottom':config_position['flash_20_3']['end_bottom']+'px',
											'left':config_position['flash_20_3']['end_left']+'px',
											'width':config_position['flash_20_3']['end_width']+'px',
											'height':config_position['flash_20_3']['end_height']+'px'},500,function(){
												//show_flash_14_4();
												});
				
				};
				
			var show_flash_20_2=function(){///////////////花
				$('.flash_20_2').show().animate({'bottom':config_position['flash_20_2']['end_bottom']+'px',
											'left':config_position['flash_20_2']['end_left']+'px',
											'width':config_position['flash_20_2']['end_width']+'px',
											'height':config_position['flash_20_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_20_1=function(){/////////////瓶
				$('.flash_20_1').show().animate({'bottom':config_position['flash_20_1']['end_bottom']+'px',
											'left':config_position['flash_20_1']['end_left']+'px',
											'width':config_position['flash_20_1']['end_width']+'px',
											'height':config_position['flash_20_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_20_bg').show().animate({'bottom':config_position['flash_20_bg']['end_bottom']+'px',
																						'left':config_position['flash_20_bg']['end_left']+'px',
																						'width':config_position['flash_20_bg']['end_width']+'px',
																						'height':config_position['flash_20_bg']['end_height']+'px'},1000,function(){
																							show_flash_20_1();
																							show_flash_20_2();
																							show_flash_20_3();
																							show_flash_20_4();
																							});
																				
																						
															
															finish20();
															
																
															});
			},
		'24shi_22':function(config_position,finish22,finish,move,move_part,get_finish_flash){
			
			
			var reverse_flash=function(select){
				$('.close_flash').off('click'); //返回按钮
				var hide_flash_lay=function(){
					$('.flash_lay').stop().animate({'bottom':config_position['flash_lay']['start_bottom']+'px',
													'left':config_position['flash_lay']['start_left']+'px',
													'width':config_position['flash_lay']['start_width']+'px',
													'height':config_position['flash_lay']['start_height']+'px'},1000,function(){
														$(this).hide();
														$('.opacity_bg').animate({'opacity':0},1000,function(){
															$(this).hide().css('opacity',0.3);
															move();
															});
														$('.select_item').hide();	
												      });
					};
				
			  	var hide_flash=function(sign){
					$('.'+sign).show().animate({'bottom':config_position[sign]['start_bottom']+'px',
											'left':config_position[sign]['start_left']+'px',
											'width':config_position[sign]['start_width']+'px',
											'height':config_position[sign]['start_height']+'px'},1000,function(){
												$(this).hide();
												});	
					};
					
				
				
				hide_flash('flash_22_3');
				hide_flash('flash_22_2');
				hide_flash('flash_22_1');							
																											
											
				//背景图	
				$('.flash_22_bg').show().animate({'bottom':config_position['flash_22_bg']['start_bottom']+'px',
											'left':config_position['flash_22_bg']['start_left']+'px',
											'width':config_position['flash_22_bg']['start_width']+'px',
											'height':config_position['flash_22_bg']['start_height']+'px'},1000,function(){
												$(this).hide();
												select==''?hide_flash_lay():'';
												$('.close_flash').attr('select','');
												//hide_flash_lay();
												
												});		
					
			};
			//----------------------------------------
		
			
			
			
			
			
			
			var show_flash_22_3=function(){///////////////灯
				$('.flash_22_3').show().animate({'bottom':config_position['flash_22_3']['end_bottom']+'px',
											'left':config_position['flash_22_3']['end_left']+'px',
											'width':config_position['flash_22_3']['end_width']+'px',
											'height':config_position['flash_22_3']['end_height']+'px'},500,function(){
												move();
													$('.close_flash').off('click');
															$('.close_flash').on('click',function(){
																if(!get_finish_flash()){
																	return false;
																	};
																
																$('body').off('mousemove');
																finish();
																reverse_flash($('.close_flash').attr('select'));
																
																});	
												});
				
				};
				
			var show_flash_22_2=function(){///////////////全家庭时刻
				$('.flash_22_2').show().animate({'bottom':config_position['flash_22_2']['end_bottom']+'px',
											'left':config_position['flash_22_2']['end_left']+'px',
											'width':config_position['flash_22_2']['end_width']+'px',
											'height':config_position['flash_22_2']['end_height']+'px'},1000,function(){
												
												});
				
				};
			
			var show_flash_22_1=function(){/////////////人物
				$('.flash_22_1').show().animate({'bottom':config_position['flash_22_1']['end_bottom']+'px',
											'left':config_position['flash_22_1']['end_left']+'px',
											'width':config_position['flash_22_1']['end_width']+'px',
											'height':config_position['flash_22_1']['end_height']+'px'},1200,function(){
												
												});
				
				};
			
			$('.flash_lay').show().animate({'bottom':config_position['flash_lay']['end_bottom']+'px',
											'left':config_position['flash_lay']['end_left']+'px',
											'width':config_position['flash_lay']['end_width']+'px',
											'height':config_position['flash_lay']['end_height']+'px'},function(){
															
														$('.flash_22_bg').show().animate({'bottom':config_position['flash_22_bg']['end_bottom']+'px',
																						'left':config_position['flash_22_bg']['end_left']+'px',
																						'width':config_position['flash_22_bg']['end_width']+'px',
																						'height':config_position['flash_22_bg']['end_height']+'px'},1000,function(){
																							show_flash_22_1();
																							show_flash_22_2();
																							show_flash_22_3();
																							});
																				
																						
															
															finish22();
															
																
															});
			}							
	};



//切换背景
var show_bg=function(index){
				$('.bgstretcher ul li').stop().animate({opacity: 0},2000,function(){})
				$('.bgstretcher ul li:eq('+index+')').stop().animate({opacity: 1},2000,function(){});
	}

//点击中部文字出现动画 对象
var flash={
	'1_1_qyjz':function(config_position,finish1,get_sign1,set_sign1){
			
			
			
			var reverse_flash=function(){  //点击back后执行
				
				$('.flash4').stop().animate({left:config_position['flash4']['start_left']+'px',
																				bottom:config_position['flash4']['start_bottom']+'px'
																				},3000,function(){
																					$(this).hide();
																					});
				$('.flash6').stop().animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});
				$('.flash5').stop().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},1500,function(){
					$(this).hide();
					set_sign1(false);  //标记后三个div已隐藏
					$('.back').hide();
					});																												
				show_bg(1);																	
				};
				
				
				
			
			/*(function () {
			  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			setTimeout(callback, 1000 / 60);
			};
			  window.requestAnimationFrame = requestAnimationFrame;
			})();*/
			
			
			
		/*	setInterval(function(){
				$('.flash5').css('left',config_position['flash5']['end_left']+left+'px');
				},600);*/
				
			/*var loop=function(){
				$('.flash5').css('left',config_position['flash5']['end_left']+left+'px');
				requestAnimationFrame(loop);	
				//setTimeout(function(){loop()},200);
				};	
				//requestAnimationFrame(loop);	
				loop();*/
				
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
					});
				};
			
			//------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(y){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y+'px'},1000,function(){
												});			
					},300);												
				}*/
				//------------------------
		
			
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);
  			//$('.flash5').show();
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-21添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
															    
																
																$('body').off('mousemove');
																reverse_flash();
																
															})
															
															});
		    show_bg(0);
		},
	'1_2_cszx':function(config_position,finish1,get_sign1,set_sign1){
			
			var reverse_flash=function(){
				
			   $('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});
			
			$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});
			$('.flash7').animate({left:config_position['flash7']['start_left']+'px',
														bottom:config_position['flash7']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},1500,function(){
					$(this).hide();
					set_sign1(false);
					});														
				show_bg(1);	
				$('.back').hide();										
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
			
			
			
			
			//-----------------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-180+'px'},1000,function(){
												});			
					},300);		
					
				setTimeout(function(){
					$('.flash7').animate({bottom:y-210+'px'},1000,function(){
												});			
					},600);			
															
				};*/
		//-----------------------------------
		
  			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000);
			
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);
			$('.flash7').show().animate({left:config_position['flash7']['end_left']+'px',
														bottom:config_position['flash7']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															
															});											
			
			
			
			 show_bg(0);
		},
	'1_3_lssty':function(config_position,finish1,get_sign1,set_sign1){
		
		
			var reverse_flash=function(){
				
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$('.flash6').hide();
															});
			$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$('.flash4').hide();
															});	
			$('.flash7').animate({left:config_position['flash7']['start_left']+'px',
														bottom:config_position['flash7']['start_bottom']+'px'
														},3000,function(){
															$('.flash7').hide();
															//$('.flash5').hide();
															});																						
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});	
		     show_bg(1);
				};
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
				
			//---------------------------上下晃动(暂时不用)
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-260+'px'},1000,function(){
												});			
					},300);		
					
				setTimeout(function(){
					$('.flash7').animate({bottom:y-290+'px'},1000,function(){
												});			
					},600);			
															
				};*/
			//-------------------------------
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000);
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash7').show().animate({left:config_position['flash7']['end_left']+'px',
														bottom:config_position['flash7']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});																						
			
		     show_bg(0);
			
		},
	'1_4_jtpt':function(){		//交通配套
		
		},
	'2_1_xmbj':function(config_position,finish1,get_sign1,set_sign1){		
			
			var reverse_flash=function(){
				$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});																						
			show_bg(1);
			
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};
					
			//-----------------------上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-80+'px'},1000,function(){
												});			
					},300);		
						
															
				};*/
			//--------------------	
				
				
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});		
															
																								
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			show_bg(0);
			
			
		},
	'2_2_xmgh':function(config_position,finish1,get_sign1,set_sign1){		
			
			var reverse_flash=function(){
				$('.flash4').animate({left:config_position['flash4']['start_left']+'px',
														bottom:config_position['flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
			$('.flash6').animate({left:config_position['flash6']['start_left']+'px',
														bottom:config_position['flash6']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															//$('.flash5').hide();
															});		
			$('.flash5').show().animate({width:config_position['flash5']['start_width']+'px',height:config_position['flash5']['start_height']+'px',left:config_position['flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});																						
			show_bg(1);
			
				};
				
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['flash6']['end_bottom']+s*10;
				$('.flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.flash5').animate({bottom:y-80+'px'},1000,function(){
												});			
					},300);		
				};*/
				
				
				
			$('.flash4').show().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000);	
			$('.flash6').show().animate({left:config_position['flash6']['end_left']+'px',
														bottom:config_position['flash6']['end_bottom']+'px'
														},3000,function(){
															finish1();
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});		
															
																								
			
			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			show_bg(0);
			
			
		},	
	'3_1_hbskyq':function(config_position,finish1,sign1,set_sign1){	
	
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.flash5').css({'left':config_position['flash5']['end_left']-move_x+'px','bottom':config_position['flash5']['end_bottom']+move_y+'px'});
								$('.flash4').css({'left':config_position['flash4']['end_left']+move_x+'px','bottom':config_position['flash4']['end_bottom']+move_y+'px'});
								//$('.flash6').css({'left':config_position['flash6']['end_left']+move_x+'px','bottom':config_position['flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
				
			var item_show=function(){
				var i=0;
				var s=function(i){
					$('.flash5_item li:eq('+i+')').stop().animate({marginTop:0},500);
					
					if(i==6){
						clearInterval(t);
						//2013-5-22添加
						$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
						move();
						$('.back').show();
						return false;
						}
					
					};
					
					var t=setInterval(function(){
						if(parseInt($('.flash5_item li:eq('+i+')').css('margin-top'))<40){
							i++;
							s(i);
							}
						},20);
					s(i);
				};
	
			$('.flash4').show().stop().animate({left:config_position['flash4']['end_left']+'px',
														bottom:config_position['flash4']['end_bottom']+'px'
														},3000,function(){
															
															item_show();
															
															
															finish1();
															});	
  			$('.flash5').show().animate({width:config_position['flash5']['end_width']+'px',height:config_position['flash5']['end_height']+'px',left:config_position['flash5']['end_left']+'px'},1500);
			
			
			
			show_bg(0);	
			},
	'3_2_hbskxl_open1':function(config_position,get_sign1,set_sign1){
		
			var reverse_flash=function(){
				$('.item1_flash4').stop().animate({left:config_position['item1_flash4']['start_left']+'px',
														bottom:config_position['item1_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();				
															});	
				$('.item1_flash6').stop().animate({left:config_position['item1_flash6']['start_left']+'px',
															bottom:config_position['item1_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();				
																	//$('.item1_flash5').hide();
																});													
				$('.item1_flash5').stop().animate({width:config_position['item1_flash5']['start_width']+'px',height:config_position['item1_flash5']['start_height']+'px',left:config_position['item1_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign1(false);
					$('.back').hide();
					});	
				show_bg(5);	
			
				};
			
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item1_flash5').css({'left':config_position['item1_flash5']['end_left']-move_x+'px','bottom':config_position['item1_flash5']['end_bottom']+move_y+'px'});
								$('.item1_flash4').css({'left':config_position['item1_flash4']['end_left']+move_x+'px','bottom':config_position['item1_flash4']['end_bottom']+move_y+'px'});
								$('.item1_flash6').css({'left':config_position['item1_flash6']['end_left']+move_x+'px','bottom':config_position['item1_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
				
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['item1_flash6']['end_bottom']+s*10;
				$('.item1_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign1()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item1_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
						
															
				};*/
			
			$('.item1_flash4').show().stop().animate({left:config_position['item1_flash4']['end_left']+'px',
														bottom:config_position['item1_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item1_flash6').show().stop().animate({left:config_position['item1_flash6']['end_left']+'px',
														bottom:config_position['item1_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
  			$('.item1_flash5').show().animate({width:config_position['item1_flash5']['end_width']+'px',height:config_position['item1_flash5']['end_height']+'px',left:config_position['item1_flash5']['end_left']+'px'},1500);

			show_bg(4);
		},
		'3_2_hbskxl_open2':function(config_position,get_sign2,set_sign2){
			
			var reverse_flash=function(){
				$('.item2_flash4').stop().animate({left:config_position['item2_flash4']['start_left']+'px',
														bottom:config_position['item2_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
				$('.item2_flash6').stop().animate({left:config_position['item2_flash6']['start_left']+'px',
															bottom:config_position['item2_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();
																//$('.item2_flash5').hide();
																});													
				$('.item2_flash5').stop().animate({width:config_position['item2_flash5']['start_width']+'px',height:config_position['item2_flash5']['start_height']+'px',left:config_position['item2_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign2(false);
					$('.back').hide();
					});	
				show_bg(3);
	  			
				};
			var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item2_flash5').css({'left':config_position['item2_flash5']['end_left']-move_x+'px','bottom':config_position['item2_flash5']['end_bottom']+move_y+'px'});
								$('.item2_flash4').css({'left':config_position['item2_flash4']['end_left']+move_x+'px','bottom':config_position['item2_flash4']['end_bottom']+move_y+'px'});
								$('.item2_flash6').css({'left':config_position['item2_flash6']['end_left']+move_x+'px','bottom':config_position['item2_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
			/*var s=1;
			var shake=function(){
				var y=config_position['item2_flash6']['end_bottom']+s*10;
				$('.item2_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign2()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item2_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
									
				};*/
			
			$('.item2_flash4').show().stop().animate({left:config_position['item2_flash4']['end_left']+'px',
														bottom:config_position['item2_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item2_flash6').show().stop().animate({left:config_position['item2_flash6']['end_left']+'px',
														bottom:config_position['item2_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
			$('.item2_flash5').show().animate({width:config_position['item2_flash5']['end_width']+'px',height:config_position['item2_flash5']['end_height']+'px',left:config_position['item2_flash5']['end_left']+'px'},1500);
			
			show_bg(4);

		
		},
		'3_2_hbskxl_open3':function(config_position,get_sign3,set_sign3){
			
			var reverse_flash=function(){
				$('.item3_flash4').stop().animate({left:config_position['item3_flash4']['start_left']+'px',
														bottom:config_position['item3_flash4']['start_bottom']+'px'
														},3000,function(){
															$(this).hide();
															});	
				$('.item3_flash6').stop().animate({left:config_position['item3_flash6']['start_left']+'px',
															bottom:config_position['item3_flash6']['start_bottom']+'px'
															},3000,function(){
																$(this).hide();
																//$('.item3_flash5').hide();
																});													
				$('.item3_flash5').stop().animate({width:config_position['item3_flash5']['start_width']+'px',height:config_position['item3_flash5']['start_height']+'px',left:config_position['item3_flash5']['start_left']+'px'},2000,function(){
					$(this).hide();
					set_sign3(false);
					$('.back').hide();
					});	
				show_bg(1);
	  			
				};
				
				var move=function(){
				
				$('body').on('mousemove',function(event){
					
					$('#tip').html(event.clientX+','+event.clientY+','+config_position['center_x']+','+config_position['center_y']+','+config_position['w_rate']);
					
					var move_x=(config_position['center_x']-event.clientX)*config_position['w_rate'];
					var move_y=(config_position['center_y']-event.clientY)*config_position['h_rate'];
					
								$('.item3_flash5').css({'left':config_position['item3_flash5']['end_left']-move_x+'px','bottom':config_position['item3_flash5']['end_bottom']+move_y+'px'});
								$('.item3_flash4').css({'left':config_position['item3_flash4']['end_left']+move_x+'px','bottom':config_position['item3_flash4']['end_bottom']+move_y+'px'});
								$('.item3_flash6').css({'left':config_position['item3_flash6']['end_left']+move_x+'px','bottom':config_position['item3_flash6']['end_bottom']+move_y+'px'});
								//$('.flash7').css({'left':config_position['flash7']['end_left']-move_x+'px','bottom':config_position['flash7']['end_bottom']-move_y+'px'});
					
					});
				};	
			//上下晃动
		/*	var s=1;
			var shake=function(){
				var y=config_position['item3_flash6']['end_bottom']+s*10;
				$('.item3_flash6').animate({bottom:y+'px'},1000,function(){
																s=s*(-1);
																
																if(get_sign3()){    // 第二帧图片都显示了
																	shake();
																	}else{  //隐藏第二帧的图片
																		reverse_flash();
																		}
																
												});
												
				setTimeout(function(){
					$('.item3_flash5').animate({bottom:y-20+'px'},1000,function(){
												});			
					},300);		
									
				};*/
			
			$('.item3_flash4').show().stop().animate({left:config_position['item3_flash4']['end_left']+'px',
														bottom:config_position['item3_flash4']['end_bottom']+'px'
														},3000,function(){
															
															});	
			$('.item3_flash6').show().stop().animate({left:config_position['item3_flash6']['end_left']+'px',
														bottom:config_position['item3_flash6']['end_bottom']+'px'
														},3000,function(){
															//shake();
															//2013-5-22添加
															$('body').append('<div id="tip" style="position:absolute; display:none; width:50px; height:20px; background:#ffffff;">fdffd</div>');
															move();
															$('.back').show();
															$('.back').off('click');
															$('.back').on('click',function(){   //标记第二帧的图片不显示
																$('body').off('mousemove');
																reverse_flash();
															})
															});													
			
			
			$('.item3_flash5').show().animate({width:config_position['item3_flash5']['end_width']+'px',height:config_position['item3_flash5']['end_height']+'px',left:config_position['item3_flash5']['end_left']+'px'},1500);
			show_bg(4);

		
		},
	'3_2_hbskxl_t1':function(config_position,resize_flash_position){   //右侧第一个按钮
	     $('body').off('mousemove');
	
			resize_flash_position();
			
			$('.item1_flash1').show();
  			$('.item1_flash2').show();
			$('.item1_flash3').show();
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').hide();
  			$('.item2_flash2').hide().css('opacity',0);
			$('.item2_flash3').hide().css('opacity',0);
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').hide();
  			$('.item3_flash2').hide().css('opacity',0);
			$('.item3_flash3').hide().css('opacity',0);
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item1_flash3').show().stop().animate({
						bottom:config_position['item1_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item1_flash2').show().stop().animate({
								left:config_position['item1_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
								
								});
						});

			show_bg(5);
		},
	'3_2_hbskxl_t2':function(config_position,resize_flash_position){   //右侧第二个按钮
			$('body').off('mousemove');
			resize_flash_position();
			$('.item1_flash1').hide();
  			$('.item1_flash2').hide().css('opacity',0);
			$('.item1_flash3').hide().css('opacity',0);
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').show();
  			$('.item2_flash2').show();
			$('.item2_flash3').show();
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').hide();
  			$('.item3_flash2').hide().css('opacity',0);
			$('.item3_flash3').hide().css('opacity',0);
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item2_flash3').show().stop().animate({
						bottom:config_position['item2_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item2_flash2').show().stop().animate({
								left:config_position['item2_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									
								});
						});

			show_bg(3);
		},
	'3_2_hbskxl_t3':function(config_position,resize_flash_position){   //右侧第三个按钮
			$('body').off('mousemove');
			$('.item1_flash1').hide();
  			$('.item1_flash2').hide().css('opacity',0);
			$('.item1_flash3').hide().css('opacity',0);
			$('.item1_flash4').hide();
  			$('.item1_flash5').hide();
			$('.item1_flash6').hide();
				
			
			$('.item2_flash1').hide();
  			$('.item2_flash2').hide().css('opacity',0);
			$('.item2_flash3').hide().css('opacity',0);
			$('.item2_flash4').hide();
  			$('.item2_flash5').hide();
			$('.item2_flash6').hide();
			
			$('.item3_flash1').show();
  			$('.item3_flash2').show();
			$('.item3_flash3').show();
			$('.item3_flash4').hide();
  			$('.item3_flash5').hide();
			$('.item3_flash6').hide();
			
			//页面中部文字动画
					$('.item3_flash3').show().stop().animate({
						bottom:config_position['item3_flash3']['end_bottom']+'px',
						opacity:1
						},800,function(){
							$(this).css('filter','none');   //去掉ie 下文字黑边
							$('.item3_flash2').show().stop().animate({
								left:config_position['item3_flash2']['end_left']+'%',opacity:1},800,function(){
									$(this).css('filter','none');   //去掉ie 下文字黑边
									
								});
						});
		

			show_bg(1);
		}						
				
		
	}