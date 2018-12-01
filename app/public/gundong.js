function scroll(){
   $(".bodyer_btmm ul").animate({"margin-top":"-20px"},function(){
   //这个是让整个ul先向前滑动个li ,如果要一次性滑动5个~那么就是550px.
  //想向上滚动就改成 $(".content ul").animate({"margin-top":"-105px"}
  //想向下滚动就改成 $(".content ul").animate({"margin-top":"105px"}
  //想向右滚动就改成 $(".content ul").animate({"margin-left":"110px"}
     $(".bodyer_btmm ul li:eq(0)").appendTo($(".bodyer_btmm ul"))
     $(".bodyer_btmm ul").css({"margin-top":0})
  //对应这的这边
  //想向上滚动就改成 $(".content ul").animate({"margin-top":0}
  //想向下滚动就改成 $(".content ul").animate({"margin-top":0}
  //想向右滚动就改成 $(".content ul").animate({"margin-left":0}
   })
   }
    setInterval(scroll,1800)
  //这上面的是1000是滚动的速度，可以自己调整

// $(function(){
//     $('.myscroll').myScroll({
//         speed: 40, //数值越大，速度越慢
//         rowHeight: 26 //li的高度
//     });
// });
