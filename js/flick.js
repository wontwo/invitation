$(function (e) {
  var mFlick = new eg.Flicking("#flickImage", {
    duration: 500,
    circular: true,
  });

  setInterval(function(){
    mFlick.next();
  }, 3000);
});