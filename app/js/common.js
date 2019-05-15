function openApp(url) {
  var ua = window.navigator.userAgent.toLowerCase();
  //微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    window.location.href = url;
  } else { //非微信浏览器
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      var loadDateTime = new Date();
      window.setTimeout(function () {
        var timeOutDateTime = new Date();
        if (timeOutDateTime - loadDateTime < 5000) {
          window.location = url; //ios下载地址
        } else {
          window.close();
        }
      }, 25);
      window.location = "jxsg://jxsg.mobile/jump";
    } else if (navigator.userAgent.match(/android/i)) {
      var state = null;
      try {
        window.location = 'jxsg://jxsg.mobile/jump';
        setTimeout(function () {
          window.location = url; //android下载地址
        }, 500);
      } catch (e) {}
    }
  }
};

$(function () {
  $(".nav-wrap").on('touchmove', function () {
    return false;
  }).bind("click", function(){
    $(".nav-btn").removeClass("active");
    TweenMax.fromTo($('.nav-wrap'), .8, {
      autoAlpha: 0,
      left: '0'
    }, {
      autoAlpha: 1,
      left: '100%',
      ease: Expo.easeOut,
      delay: 0
    });
  })
  $(".nav a").on('touchstart', function (e) {
    e.stopPropagation();
  })
  $(".nav").on("click", function(e){
    e.stopPropagation();
  })

  if ($('.ace-download-app').length) {
    $('.down-app-btn').on('click', function () {
      openApp('http://a.app.qq.com/o/simple.jsp?pkgname=com.jingxuansugou.app');
    });
  }

  $(".nav-btn").click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass("active");
      TweenMax.fromTo($('.nav-wrap'), .5, {
        autoAlpha: 0,
        left: '0'
      }, {
        autoAlpha: 1,
        left: '100%',
        ease: Expo.easeOut,
        delay: 0
      });
    } else {
      $(this).addClass("active");
      TweenMax.fromTo($('.nav-wrap'), .5, {
        autoAlpha: 0,
        left: '100%'
      }, {
        autoAlpha: 1,
        left: '0',
        ease: Expo.easeOut,
        delay: 0
      });
    }
  })
  var lazyloadImg = new LazyloadImg({
    el: '.pages [data-src]', //匹配元素
    top: 0, //元素在顶部伸出长度触发加载机制
    right: 0, //元素在右边伸出长度触发加载机制
    bottom: 0, //元素在底部伸出长度触发加载机制
    left: 0, //元素在左边伸出长度触发加载机制
    qriginal: false, // true，自动将图片剪切成默认图片的宽高；false显示图片真实宽高
    load: function (el) {
      el.style.cssText += '-webkit-animation: fadeIn 1s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';
    },
    error: function (el) {

    }
  });
})