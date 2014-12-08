function slide(id) {
  var sWidth = $("#"+id).width();
  var len = $("#"+id +" ul li").length;
  var index = 0;
  var picTimer;
  var btn = "<div class='btnBg'></div><div class='btn'>";
  var showPics = function (index) {
    var nowLeft = -index * sWidth;
    $("#"+id+" ul").stop(true, false).animate({ "left": nowLeft }, 300);
    $("#"+id+" .btn span").stop(true, false).animate({ "opacity": "0.4" }, 300).eq(index).stop(true, false).animate({ "opacity": "1" }, 300);
  }
  for (var i = 0; i < len; i++) {
    btn += "<span></span>";
  }
  btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
  $("#"+id).append(btn);
  $("#"+id+" .btnBg").css("opacity", 0);
  $("#"+id+" .btn span").css("opacity", 0.4).mouseenter(function () {
    index = $("#"+id+" .btn span").index(this);
    showPics(index);
  }).eq(0).trigger("mouseenter");
  $("#"+id+" .preNext").css("opacity", 0.0).hover(function () {
    $(this).stop(true, false).animate({ "opacity": "0.5" }, 300);
  }, function () {
    $(this).stop(true, false).animate({ "opacity": "0" }, 300);
  });
  $("#"+id+" .pre").click(function () {
    index -= 1;
    if (index == -1) { index = len - 1; }
    showPics(index);
  });
  $("#"+id+" .next").click(function () {
    index += 1;
    if (index == len) { index = 0; }
    showPics(index);
  });
  $("#"+id+" ul").css("width", sWidth * (len));
  $("#"+id).hover(function () {
    clearInterval(picTimer);
  }, function () {
    picTimer = setInterval(function () {
      showPics(index);
      index++;
      if (index == len) { index = 0; }
    }, 2800);
  }).trigger("mouseleave");
}

