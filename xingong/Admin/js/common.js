$(document).ready(function() {
    setHeaderNavItemActive();
    dropMenu(".drop-nav__item");
    modal();

    var timer = setInterval((function(obj) {
        function test() {
            changeStatus(obj);
            if (obj.next().index() == -1)
                obj = $('.news li').first();
            else
                obj = obj.next();
        }
        return test;
    })($('.news li').first()), 1800);
    fold(timer);

    var myPage = GetQueryString("jumpid");
    if (myPage != null) {
        console.log("myPage的值为：" + myPage);
        console.log($('#' + myPage + '-btn').text());
        displayInPage($('#' + myPage + '-btn'), myPage);
        console.log('#' + myPage + '-btn');
        console.log($('#' + myPage + '-btn').text());
    }

//导航栏底部滑动条动画
//获取tip
var borderTip=$('.header__nav-item-tip');
//获取当前激活的菜单项
var activeIndex=$('.header__nav-item').index($('.header__nav-item_status_active'));
borderTip.css("margin-left",-5+activeIndex*100+"px");

$('.nav__item').hover(function(){
    var index=$('.nav__item').index(this);
    borderTip.stop().animate({marginLeft:-5+index*100+"px"},"normal");
},function(){
    borderTip.stop().animate({marginLeft:-5+activeIndex*100+"px"},"normal");
});

});

function modal() {
    var $el1 = $('.contactus');
    var $el2 = $('.organization');
    var $el3 = $('.faculty-guide');
    var $el4 = $('.schoolwebsite');
    var $el5 = $('.friendlink');

    var $add_item = $('.add_item_img');


    $add_item.hDialog({
        box: '#HBox6',
        boxBg: '#eeeeee',
        closeBg: 'rgba(0,0,0,0.3)',
        width: 350,
        height: 185
    });
    $el1.hDialog({
        box: '#HBox1',
        boxBg: '#eeeeee',
        
        closeBg: 'rgba(0,0,0,0.3)',
        width: 520,
        height: 350
    });
    $el2.hDialog({
        box: '#HBox2',
        boxBg: '#eeeeee',
        
        closeBg: 'rgba(0,0,0,0.3)',
        width: 520,
        height: 350
    });
    $el3.hDialog({
        box: '#HBox3',
        boxBg: '#eeeeee',
        
        closeBg: 'rgba(0,0,0,0.3)',
        width: 520,
        height: 350
    });
    $el4.hDialog({
        box: '#HBox4',
        boxBg: '#eeeeee',
        
        closeBg: 'rgba(0,0,0,0.3)',
        width: 520,
        height: 350
    });
    $el5.hDialog({
        box: '#HBox5',
        boxBg: '#eeeeee',
        
        closeBg: 'rgba(0,0,0,0.3)',
        width: 520,
        height: 350
    });
}

function stickMenu() {
    // Cache selectors for faster performance.
    var $window = $(window),
        $mainMenuBar = $('.info__menu'),
        $mainMenuBarAnchor = $('#mainMenuBarAnchor');

    // Run this on scroll events.
    //scroll()
    //当用户滚动指定的元素时，会发生scroll事件。
    //scroll事件适用于所有可滚动的元素和window对象（浏览器窗口）
    //scroll()方法触发scroll事件，或规定当发生scroll事件时运行的函数
    $window.scroll(function() {
        //scrollTop()方法返回或设置匹配元素的滚动条的垂直位置
        var window_top = $window.scrollTop();
        //javascript用offsetTop();jquery用offset().top;
        var div_top = $mainMenuBarAnchor.offset().top;
        if (window_top > div_top) {
            // Make the div sticky.
            $mainMenuBar.addClass('stick');
            $mainMenuBarAnchor.height('40px');
        } else {
            // Unstick the div.
            $mainMenuBar.removeClass('stick');
            $mainMenuBarAnchor.height(0);
        }
    });
}

function dropMenu(obj) {
    $(obj).each(function() {
        var level1 = $(this); //获取的是li
        var theMenu = level1.find(".level-2");
        var tarHeight = theMenu.height();
        theMenu.css({ height: 0, opacity: 0 });
        level1.hover(
            function() {
                level1.find(".header__nav-item").addClass('header__nav-item_status_active');
                theMenu.stop().show().animate({ height: tarHeight, opacity: 1 }, 100);
            },
            function() {
                if (!(level1.find(".header__nav-item").attr("data-active") === "active")) level1.find(".header__nav-item").removeClass('header__nav-item_status_active');
                theMenu.stop().animate({ height: 0, opacity: 0 }, 400, function() {
                    $(this).css({ display: "none" });
                });
            }
        );
    });
}


function changeStatus(obj) {
    if (obj.hasClass('new__item-active')) return;
    var newsItem = obj;
    var newsLi = $('.news li');
    newsLi.removeClass('news__item-active');
    newsItem.addClass('news__item-active');
}

function fold(timer) {

    var newsLi = $('.news li');
    var newsContent = $('.news__content ul');
    var newsItem = newsLi.eq(0);

    newsItem.addClass('news__item-active'); //刚开始吧=把第一项设置为默认的展开状态

    //子元素li
    newsLi.hover(function() {
        clearInterval(timer);
        changeStatus($(this));
    }, function() {
        timer = setInterval((function(obj) {
            function test() {
                changeStatus(obj);
                if (obj.next().index() == -1)
                    obj = $('.news li').first();
                else
                    obj = obj.next();
            }
            return test;
        })($(this)), 1800);
    });
}

function returnFacultyOrg() {
    var orgPannels = $('.orgpannel');
    var displayBlock = $('#faculty__org');

    orgPannels.css("display", "none");

    $('.returnimg').remove(); //删除返回图片节点

    $('.info__list').css("display", "none");
    displayBlock.css("display", "block");
    $(".info__menu a").removeClass("info__menu__item-active");
    $("#faculty__org-btn").addClass("info__menu__item-active");
    $("#guide-position").text($("#faculty__org-btn").text());

}

function displayInPage(btn, idName) {
    var orgPannels = $('.orgpannel');
    var displayBlock = $('#' + idName);

    orgPannels.css("display", "none");

    $('.returnimg').remove(); //删除返回图片节点

    if (displayBlock.css("display") != "block") {
        $('.info__list').css("display", "none");
        displayBlock.css("display", "block");
        $(".info__menu a").removeClass("info__menu__item-active");
        $(btn).addClass("info__menu__item-active");
        $("#guide-position").text($(btn).text());
    }

    //党政领导
    if (idName == "faculty__leader") {
        displayInPagePannel('office1', 'faculty__office');
    }

    //学科简介
    if (idName == "faculty__xueke") {
        $('.xuekepannel').css("display", "block");
    }

}

function displayInPagePannel(pannelIdName, pageIdName) {
    var displayBlock = $('#' + pageIdName);
    var displayPannel = $('#' + pannelIdName);
    var orgPannels = $('.orgpannel');
    var returnImg = $("<a href='javascript:void' onClick='returnFacultyOrg()'><img src='./../icons/return.png' class='returnimg'></a>");
    displayPannel.append(returnImg); //增加返回图片

    if (displayBlock.css("display") != "block") {
        $('.info__list').css("display", "none");
        displayBlock.css("display", "block");
    }

    orgPannels.css("display", "none");
    displayPannel.css("display", "block");
}


//获取页面文件名 
function getPageName() 
{ 
var url=window.location.href;//获取完整URL 
var tmp= new Array();//临时变量，保存分割字符串 
tmp=url.split("/");//按照"/"分割 
var pp = tmp[tmp.length-1];//获取最后一部分，即文件名和参数 
tmp=pp.split("?");//把参数和文件名分割开 
return tmp[0]; 
}
function setHeaderNavItemActive(){
    var pageName=getPageName();
    var navs=$('.header__nav-item');
    var activeNav;
    navs.removeClass('header__nav-item_status_active');
    navs.removeAttr('data-active');
    switch(pageName){
        case "index.html":
            activeNav=$('.header__nav-item:eq(0)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "faculty_info.html":
            activeNav=$('.header__nav-item:eq(1)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "teacher_info.html":
            activeNav=$('.header__nav-item:eq(2)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "education_info.html":
            activeNav=$('.header__nav-item:eq(3)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "party_info.html":
            activeNav=$('.header__nav-item:eq(4)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "science_info.html":
            activeNav=$('.header__nav-item:eq(5)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "student_info.html":
            activeNav=$('.header__nav-item:eq(6)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "job_info.html":
            activeNav=$('.header__nav-item:eq(7)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
        case "download_info.html":
            activeNav=$('.header__nav-item:eq(8)');
            activeNav.addClass('header__nav-item_status_active');
            activeNav.attr("data-active","active");
            break;
    }
}
/*获得URL相应的参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

/*首页更多新闻事件监听,跳转到详情页面*/
function openwin(url,newstype){
    var height=700;
    var width=800;
    //获得窗口的垂直位置 
    var iTop = (window.screen.availHeight - 30 - height) / 2; 
    //获得窗口的水平位置 
    var iLeft = (window.screen.availWidth - 10 - width) / 2; 
    window.open(url+"?"+"newstype="+newstype,'newWindow','toolbar=no,location=yes,resizable=yes, height='+height+', width='+width+',scrollbars=yes ,left='+iLeft+',top='+iTop);
}
function opennews(url){
    var height=700;
    var width=900;
    //获得窗口的垂直位置 
    var iTop = (window.screen.availHeight - 30 - height) / 2; 
    //获得窗口的水平位置 
    var iLeft = (window.screen.availWidth - 10 - width) / 2; 
    window.open(url,'newsWindow','toolbar=no,location=yes,resizable=yes, height='+height+', width='+width+',scrollbars=yes ,left='+iLeft+',top='+iTop);
}


// 对Date的扩展，将 Date 转化为指定格式的String

Date.prototype.Format = function (fmt) { 
    
 var o = {
 "M+": this.getMonth() + 1, //月份 
 "d+": this.getDate(), //日 
 "h+": this.getHours(), //小时 
 "m+": this.getMinutes(), //分 
 "s+": this.getSeconds(), //秒 
 "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
 "S": this.getMilliseconds() //毫秒 

 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

function getFormateDate(dateString){
    return (new Date(dateString)).Format("yyyy/MM/dd");//返回2017/10/25
}

function getFullYear(dateString){
    return (new Date(dateString)).getFullYear();
}
function getRelMonth(dateString){
    return (new Date(dateString)).getMonth()+1;
}
function getDay(dateString){
    return (new Date(dateString)).getDate();
}

/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层插件
+-------------------------------------------------------------------
* @version 2.0.1
* @update 2015.07.30
* @author haibao <hhb219@163.com> <http://www.hehaibao.com/>
+-------------------------------------------------------------------
*/
;
(function($, window, document, undefined) {
    var $D = $(document),
        $W = $(window),
        $B = $('body');
    methods = {
        init: function(options) {
            return this.each(function() {
                var T = $(this),
                    _O = T.data('hDialog');
                if (typeof(_O) == 'undefined') {
                    var defaults = {
                        title: '', //弹框标题
                        box: '#HBox', //弹框默认选择器
                        boxBg: '#ffffff', //弹框默认背景颜色
                        modalBg: 'rgba(0,0,0,0.5)', //遮罩默认背景颜色
                        closeBg: '#cccccc', //弹框关闭按钮默认背景颜色
                        width: 300, //弹框默认宽度
                        height: 270, //弹框默认高度
                        positions: 'center', //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
                        effect: 'zoomOut', //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)
                        hideTime: 0, //弹框定时关闭(默认0:不自动关闭，以毫秒为单位)
                        resetForm: true, //是否清空表单(默认true：清空，false：不清空)
                        modalHide: true, //是否点击遮罩背景关闭弹框(默认true：关闭，false：不可关闭)
                        isOverlay: true, //是否显示遮罩背景(默认true：显示，false：不显示)
                        closeHide: true, //是否隐藏关闭按钮(默认true：不隐藏，false：隐藏)
                        escHide: true, //是否支持ESC关闭弹框(默认true：关闭，false：不可关闭)
                        autoShow: false, //是否页面加载完成后自动弹出(默认false点击弹出，true：自动弹出)
                        types: 1, //弹框类型(默认：1正常弹框，2：iframe框架)
                        iframeSrc: '', //弹框类型为iframe时使用的 链接地址
                        iframeId: 'iframeHBox', //弹框类型为iframe时使用的 ID
                        beforeShow: function() {}, //显示前的回调方法
                        afterHide: function() {} //隐藏后的回调方法
                    };
                    _O = $.extend({}, defaults, options);
                    T.data('hDialog', _O);
                }
                _O = $.extend({}, _O, options);

                if (_O.autoShow != false) {
                    methods.open(_O, T);
                } else {
                    T.on('click', function() { methods.open(_O, T); });
                }
            });
        },
        open: function(o, T) {
            var w, h, t, l, m, $close, headTpl = closeBtnTpl = overlayTpl = iframeTpl = '',
                $obj = $(o.box),
                title = o.title,
                c = T.attr("class"),
                modalBg = o.modalBg,
                closeBg = o.closeBg;
            w = o.width != undefined ? parseInt(o.width) : 300, h = o.height != undefined ? parseInt(o.height) : 270, m = "" + parseInt(-(h / 2)) + 'px 0 0 ' + parseInt(-(w / 2)) + "px";

            //重置表单
            if (o.resetForm) {
                $obj.find('input[type=text],input[type=tel],input[type=email],input[type=date],input[type=password],textarea').val('');
                $obj.find('select option').removeAttr('selected');
                $obj.find('input[type=radio],input[type=checkbox]').removeAttr('checked');
            }

            //显示前的回调
            methods.fire.call(this, o.beforeShow);

            //弹框位置
            switch (o.positions) {
                case 'top':
                    t = 0;
                    l = '50%';
                    m = "0 0 0 " + parseInt(-(w / 2)) + "px";
                    break;
                case 'left':
                    t = l = m = 0;
                case 'bottom':
                    t = parseInt($W.height() - h) + 'px';
                    l = parseInt($W.width() - w) + 'px';
                    m = 0;
                    break;
                default:
                    t = l = '50%';
            }

            //关闭按钮
            if (o.closeHide != false) closeBtnTpl = '<a id="HCloseBtn" title="关闭" style="width:24px;height:24px;line-height:24px;display:inline-block;cursor:pointer;background-color:' + closeBg + ';color:#fff;font-size:1.4em;text-align:center;position:absolute;top:8px;right:8px;"><span style="width:24px;height:24px;display:inline-block;">×</span></a>';

            //弹框标题
            if (o.title != '') headTpl = '<div id="HTitle" style="padding:10px 45px 10px 12px;border-bottom:1px solid #ddd;background-color:#f2f2f2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + o.title + '</div>';

            //遮罩背景层
            if (o.isOverlay != false) overlayTpl = "<div id='HOverlay' style='width:" + $D.width() + "px;height:" + $D.height() + "px;background-color:" + modalBg + ";position:fixed;top:0;left:0;z-index:9999;'></div>";

            //显示弹框
            if (o.types == 2) {
                iframeTpl = '<iframe width="' + o.width + '" height="' + o.height + '" frameborder="0" scrolling="auto" src="' + o.iframeSrc + '"></iframe>';
                $B.append('<div id="' + o.iframeId + '"></div>');
                $obj = $('#' + o.iframeId);
            }
            if (o.autoShow != false) $obj = T;
            $B.stop().append(overlayTpl).find($obj).css({ 'background-color': 'rgba(255,255,255,1)', 'position': 'fixed', 'top': t, 'left': l, 'z-index': 999999, 'margin': m, 'width': o.width, 'height': o.height }).removeAttr('class').addClass('animated ' + c).prepend(headTpl + closeBtnTpl + iframeTpl).show();

            //默认关闭
            $close = $('#HCloseBtn');
            if (o.modalHide) $close = $('#HOverlay,#HCloseBtn');
            $close.on('click', function() { methods.close(o, T); });

            //定时关闭
            if (o.hideTime != 0) setTimeout(function() { methods.close(o, T); }, parseInt(o.hideTime));

            //支持ESC关闭
            if (o.escHide) $D.keyup(function() {
                if (event.keyCode === 27) methods.close(o, T);
            });
        },
        close: function(o, T) {
            var $obj = (o.autoShow != false) ? T : $(o.box);
            methods.remove('#HOverlay,#HCloseBtn,#HTitle,#' + o.iframeId);
            $obj.removeAttr('class').addClass('animated ' + o.effect);
            if ($obj.hasClass(o.effect)) { setTimeout(function() { $obj.removeAttr('style').hide(); }, 300); }
            this.fire.call(this, o.afterHide); //隐藏后的回调
        },
        remove: function(a) { $(a).remove(); },
        fire: function(event, data) {
            if ($.isFunction(event)) {
                return event.call(this, data);
            }
        },
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);
                $this.removeData('hDialog');
            });
        }
    };

    $.fn.hDialog = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Error! Method' + method + 'does not exist on jQuery.hDialog！');
            return this;
        }
    };
})(jQuery, window, document);
