$(function() {

  var UA = navigator.userAgent;
  var isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1; //android终端

  if(isAndroid) {
    $('.c_wrap').css('paddingLeft', '1.81rem');
  }

  // 点击大事件，展开和收缩
  var lock = false;
  $('.item_event .y_item').on('click', function() {
    var _this = $(this);
    if(lock) {
      return;
    }
    lock = true;
    if(_this.hasClass('active')) {
      _this.find('.c_list .c_month').fadeOut(500);
      _this.find('.c_list').delay(600).slideUp(800, function() {
        _this.find('.text, .c_line').fadeIn(800, function() {
          lock = false;
        });
      });
    }else {
      _this.find('.text, .c_line').fadeOut(600, function() {
          _this.find('.c_list .c_month').hide();
          _this.find('.c_list').slideDown(600, function() {
            _this.find('.c_list .c_month').delay(200).fadeIn(600, function() {
              lock = false;
            });
          });
      });

    }
    $(this).toggleClass('active');
  });
})