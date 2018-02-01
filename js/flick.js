var mFlick, evtAutoFlick = null;
var nPanel = 0;

$(function (e) {
  nPanel = $("#flickImage img").length;

  mFlick = new eg.Flicking("#flickImage", {
    duration: 500,
    circular: true,
    defaultIndex: Math.floor(Math.random() * nPanel),
  }).on({
    "flick" : function(e) {
      // console.log(e);
      if(e.isTrusted) {        
        clearInterval(evtAutoFlick);
      }
    },
    "flickEnd" : function(e) {
      // console.log(e);
      if(e.isTrusted) {
        autoFlick();
      }

      var idx = e.no;
      if(e.direction === eg.Flicking.DIRECTION_LEFT) {
        if(idx >= nPanel) {
          idx = 0;
        } else {
          idx++;
        }
      } else if(e.direction === eg.Flicking.DIRECTION_RIGHT) {
        if(idx <= 0) {
          idx = nPanel - 1;
        } else {
          idx--;
        }
      }
      lazyImage($("#flickImage img:eq(" + idx + ")"));
    },
    "restore" : function(e) {
      // console.log(e);
      if(e.isTrusted) {
        autoFlick();
      }
    }
  });

  lazyImage($(mFlick.getElement()).find("img"));
  lazyImage($(mFlick.getNextElement()).find("img"));
  lazyImage($(mFlick.getPrevElement()).find("img"));

  autoFlick();
});

function lazyImage(target) {
  if(target.data("src")) {
    target.attr("src", target.data("src"));
    target.removeData("src");
  }
}

function autoFlick() {
  evtAutoFlick = setInterval(function(){
    mFlick.next();
  }, 3000);
}

