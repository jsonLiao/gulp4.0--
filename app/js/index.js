$(document).ready(function () {
  var d1 = $(".qr-codes"),
    d2 = $(".download-box .dm");

  var tl = new TimelineLite();

  // 按钮动画
  tl.staggerFrom(d2, 0.5, {
    scale: 0,
    opacity: 0,
    autoAlpha: 1
  }, 0.4, "stagger");

  // 二维码
  $("#qrCode").bind("mouseenter", function (event) {
    TweenMax.killTweensOf($(this).children('.code-img'));
    TweenMax.fromTo($(this).children('.code-img'), .8, {
      autoAlpha: 0,
      top: '0'
    }, {
      autoAlpha: 1,
      top: '-55',
      ease: Expo.easeOut,
      delay: 0
    });
  }).bind("mouseleave", function (event) {
    TweenMax.killTweensOf($(this).children('.code-img'));
    TweenMax.fromTo($(this).children('.code-img'), .8, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      ease: Expo.easeOut,
      delay: 0
    });
  })

  $(".dl-btn").bind("mouseenter", function (event) {
    TweenMax.killTweensOf($(this));
    TweenMax.fromTo($(this), .8, {
      autoAlpha: 1,
    }, {
      autoAlpha: 0.8,
      ease: Expo.easeOut,
      delay: 100
    });
  }).bind("mouseleave", function (event) {
    TweenMax.killTweensOf($(this));
    TweenMax.fromTo($(this), .8, {
      autoAlpha: 0.8
    }, {
      autoAlpha: 1,
      ease: Expo.easeOut,
      delay: 100
    });
  })
  var $curBg = $('.curBg');

  //
  var controller = $.superscrollorama();
  controller.addTween('.posi1', TweenMax.fromTo($(".posi1"), .8, {
    autoAlpha: 0,
    css:{
      left: '10%'
    }
  }, {
    autoAlpha: 1,
    css: {
      left: '50%'
    },
    ease: Expo.easeOut,
  }));
  controller.addTween('.posi2', TweenMax.fromTo($(".posi2"), .8, {
    autoAlpha: 0,
      css: {
        left: '10%'
      }
    }, {
      autoAlpha: 1,
      css: {
        left: '50%'
      },
      ease: Expo.easeOut,
  }));
  controller.addTween('.posi3', TweenMax.fromTo($(".posi3"), .8, {
    autoAlpha: 0,
      css: {
        left: '10%'
      }
    }, {
      autoAlpha: 1,
      css: {
        left: '50%'
      },
      ease: Expo.easeOut,
  }));
  controller.addTween('.posi4', TweenMax.fromTo($(".posi4"), .8, {
    autoAlpha: 0,
      css: {
        left: '10%'
      }
    }, {
      autoAlpha: 1,
      css: {
        left: '50%'
      },
      ease: Expo.easeOut,
  }));
  controller.addTween('.posi5', TweenMax.fromTo($(".posi5"), .8, {
    autoAlpha: 0,
      css: {
        left: 0
      }
    }, {
      autoAlpha: 1,
      css: {
        left: '50%'
      },
      ease: Expo.easeOut,
  }));
  controller.addTween('.posi6', TweenMax.fromTo($(".posi6"), .8, {
    autoAlpha: 0,
      css: {
        width: 0
      }
    }, {
      autoAlpha: 1,
      css: {
        width: '330px'
      },
      ease: Expo.easeOut,
  }));
  controller.addTween('.posi7', TweenMax.fromTo($(".posi7"), .8, {
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    ease: Expo.easeOut,
  }));
  controller.addTween('.posi8', TweenMax.fromTo($(".posi8"), .8, {
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    ease: Expo.easeOut,
  }));
  controller.addTween('.posi9', TweenMax.fromTo($(".posi9"), .8, {
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    ease: Expo.easeOut,
  }));
})