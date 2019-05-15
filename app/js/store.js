window.onload = function () {

  var $nowPageDom = $('#nowPage')
  // slides
  var viewSwiper = new Swiper('.view .swiper-container', {
    autoplay: 3000,
    onSlideChangeStart: function () {
      var page = viewSwiper.activeIndex + 1;
      $nowPageDom.text('0' + page);
      updateNavPosition()
    }
  })

  var previewSwiper = new Swiper('.preview .swiper-container', {
    //visibilityFullFit: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    onTap: function () {
      viewSwiper.slideTo(previewSwiper.clickedIndex)
    }
  })
  function updateNavPosition() {
    $('.preview .active-nav').removeClass('active-nav')
    var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
    if (!activeNav.hasClass('swiper-slide-visible')) {
      if (activeNav.index() > previewSwiper.activeIndex) {
        var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
        previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
      } else {
        previewSwiper.slideTo(activeNav.index())
      }
    }
  }


  var myVideo = document.getElementById('video');
  var isPlay = false;
  $('.video-cover').on('click', function() {
    if(isPlay) {
      myVideo.pause();
      $('.video-cover').show();
      $('.video-content').hide();
    }else {
      myVideo.play();
      $('.video-cover').hide();
      $('.video-content').show();
    }
    isPlay = !isPlay;
  });

  $(myVideo).on('ended', function() {
    isPlay = false;
    $('.video-cover').show();
    $('.video-content').hide();
  })


}