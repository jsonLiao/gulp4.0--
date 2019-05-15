$(function() {
  //在IE8 7中视屏必须先隐藏 再显示才可以看到画面， JS直接显示也不行 必须定时显示或事件触发显示
  setTimeout(function () {
    $('.video').css('display', 'block');
  }, 0);

  //getVideo();

  function getVideo() {
    $.ajax({
      type: 'GET',
      url: "/index/index/getPlayInfo",
      dataType: 'json',
      success: function (data) {
        var url = '';
        if ( data.code === 200 ) {
          url = data.result.playURL
        }
        $('#source').attr('src', url);
        $('video').mediaelementplayer({
          features: ['playpause', 'backlight', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
          success: function (media, node, player) {}
        });
      }
    });
  }

  //视频插件
  //playpause进度条上显示开关 progress显示进度条 'current','duration' 计时当前播放时间 volume显示声音控制按钮
  $('video').mediaelementplayer({
    features: ['playpause', 'backlight', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
    success: function (media, node, player) {}
  });
});