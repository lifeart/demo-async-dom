var window = undefined;
var _this = self;

self.importScripts('ww-transport.js');
self.importScripts('pseudo-dom.js');
self.importScripts('mdrnizer.js');
// self.importScripts('htmlParser.js');


var _setTimeout = self.setTimeout;

self.setTimeout = function(cb,time) {
  return _setTimeout(()=>{
    Promise.all(WAITING_LIST).then(()=>{
      WAITING_LIST = [];
      cb();
    });
  },time);
};

self.importScripts('http://pureqml.com/qml.index.min.js');
