 $(document).ready(function() {
     // var length, 
     //  preIndex,
     //  currentIndex, 
     //  interval, 
     //  hasStarted = false, //是否已经开始轮播 
     //  t = 2000; //轮播时间间隔 
     // length = $('.banner-slide').length; 

     // //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时开始滑动 
     // $('.banner,.slide-prev,.slide-next').hover(function() { 
     //  stop(); 
     // }, function() { 
     //  start(); 
     // }); 

     // $('.banner').hover(function(e) { 
     //  stop(); 
     //  preIndex = $(".slide-item").filter(".active").index(); 
     //  currentIndex = $(this).index(); 
     //  play(preIndex, currentIndex); 
     // }, function() { 
     //  start(); 
     // }); 
     // $('.slide-prev').unbind('click'); 
     // $('.slide-prev').bind('click', function() { 
     //  pre(); 
     // }); 
     // $('.slide-next').unbind('click'); 
     // $('.slide-next').bind('click', function() { 
     //  next(); 
     // }); 
     // /** 
     //  * 向前翻页 
     //  */
     // function pre() { 
     //  preIndex = currentIndex; 
     //  currentIndex = (--currentIndex + length) % length; 
     //  play(preIndex, currentIndex); 
     // } 
     // /** 
     //  * 向后翻页 
     //  */
     // function next() { 
     //  preIndex = currentIndex; 
     //  currentIndex = ++currentIndex % length; 
     //  play(preIndex, currentIndex); 
     // } 
     // /** 
     //  * 从preIndex页翻到currentIndex页 
     //  * preIndex 整数，翻页的起始页 
     //  * currentIndex 整数，翻到的那页 
     //  */
     // function play(preIndex, currentIndex) { 

     //  $('.banner-slide').eq(preIndex).removeClass('slide-active');
     //  $('.banner-slide').eq(currentIndex).addClass('slide-active');
     //  $('.slide-item').removeClass('active'); 
     //  $('.slide-item').eq(currentIndex).addClass('active'); 
     // } 
     // /** 
     //  * 开始轮播 
     //  */
     // function start() { 
     //  if(!hasStarted) { 
     //  hasStarted = true; 
     //  interval = setInterval(next, t); 
     //  } 
     // } 
     // /** 
     //  * 停止轮播 
     //  */
     // function stop() { 
     //  clearInterval(interval); 
     //  hasStarted = false; 
     // } 
     // //开始轮播 
     // start(); 




 });
