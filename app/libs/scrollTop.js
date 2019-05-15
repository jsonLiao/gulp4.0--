/**
 * 返回顶部
 * @version v1
 */
;
(function($) {
    'use strict';
    $.fn.scrollTo = function(options) {
        var defaults = {
            toT: 0, //滚动目标位置
            durTime: 500, //过渡动画时间
            delay: 30, //定时器时间
            callback: null //回调函数
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),
            subTop = opts.toT - curTop,
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function() {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
})(window.jQuery || window.Zepto);

function backTop() {
    if ($(".backTop").length < 1) {
        $("body").append('<div class="backtop" id="backMoveTop"><i class="nicon nicon-back-top"></i></div>');
    }
    var backTop = $("#backMoveTop");
    $(window).scroll(function() {
        vtop = $(this).scrollTop();
        var showBackTopHeight = $(window).height();
        if (vtop > showBackTopHeight) {
            backTop.show();
        } else {
            backTop.hide();
        }
    });
    backTop.on('click', function() {
        $("html,body").scrollTo({
            toT: 0,
            durTime: 500
        });
        return false;
    });
};
backTop();