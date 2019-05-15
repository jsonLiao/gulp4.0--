$(function() {
  var myVideo = document.getElementById('video');
  var isPlay = false;
  $('.video-cover').on('click', function() {
    if(isPlay) {
      myVideo.pause();
      $('.video-cover').show();
      $('.video_wrap').hide();
    }else {
      myVideo.play();
      $('.video-cover').hide();
      $('.video_wrap').show();
    }
    isPlay = !isPlay;
  });

  $(myVideo).on('ended', function() {
    isPlay = false;
    $('.video-cover').show();
    $('.video_wrap').hide();
  })
});