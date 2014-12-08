var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var eventType = supportsTouch ? 'mouseover' : 'click';
;(function($) {
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
  });
  var currY = 0, isfirst = true;
  $(document).ready( function() {
    $("#Gallery a").photoSwipe();
    $("#Gallery").imagesLoaded(function(){
      $('#Gallery').masonry({
        itemSelector : '.gallery-item'
      });
    });
    /*$(".newsnav")[0].addEventListener("touchstart", function(e){
      e.preventDefault();
      isfirst = true;
      // currY = Number(touch.pageY); //页面触点Y坐标
      // $("#screenlock").text(currY);
    }, false)
    $(".newsnav")[0].addEventListener("touchmove", function(e){
      e.preventDefault();
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        $y = Number(touch.pageY);
        $move = currY - $y;
        if (isfirst) {
          isfirst = false;
          currY = Number(touch.pageY);
        }
        if (Math.abs($move) > 2 ) {
          currY = $y;
          if ($move > 0 ) {
          $("#screenlock").text($move);
            $(".newsnav").animate({scrollTop : "+=" + $move}, 0);  
          } else {
            $(".newsnav").animate({scrollTop : "-=" + Math.abs($move)}, 0);  
          };
        };
      }
    }, false);

    $(".newsnav")[0].addEventListener("touchend", function(e){
      e.preventDefault();
      isfirst = true;
    }, false);*/
    
    // $(".navpanel").niceScroll(".navpanel .newsnav",{boxzoom:false});

    $(".navbtn").click(function(){
      $obj = $(this);
      $trigger = $obj.data("trigger");
      if ($trigger == "close" ) {
        $obj.data("trigger", "open");
        $obj.children(".glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        $(".navpanel").show();
        $("#screenlock").show();
      } else {
        hide_nav($(this));
        /*$(this).data("trigger", "close");
        $(this).children(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
        $(".navpanel").hide();
        $("#screenlock").hide();*/
      }
    });

    $("#screenlock").click(function(){
      hide_nav($(".navbtn"));
    }).bind("touchmove", function(e){
      e.preventDefault();
    });

    $('img.lazyimage').lazyload();
    var $container = $('#news_list');
    $container.infinitescroll({
      debug           : true,
      loading     : {
        img     : "http://fx.smzdm.com/../wp-content/plugins/wp_love/images/web_loading.gif",
        msgText   : "",
        finishedMsg : "已全部加载",
        finished : function(){}
      },
      navSelector  : "div.navigation",           
      nextSelector : "div.navigation a",
      contentSelector : "#news_list",
      itemSelector : ".list_tw_item"
    }, function( newElements ) {
      var $newElems = $( newElements ).css({ opacity: 0 });
      $newElems.animate({ opacity: 1 });
      $newElems.find('.lazyimage').lazyload();
      $container.append($newElems);
    });
  });


function hide_nav($obj) {
  $($obj).data("trigger", "close");
  $($obj).children(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
  $(".navpanel").hide();
  $("#screenlock").hide();
}
})(jQuery);