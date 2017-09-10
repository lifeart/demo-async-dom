var window = undefined;
var _this = self;

self.importScripts('ww-transport.js');
self.importScripts('pseudo-dom.js');
self.importScripts('mdrnizer.js');
// self.importScripts('htmlParser.js');


var _setTimeout = self.setTimeout;
var _setInterval = self.setInterval;

self.setTimeout = function(cb,time) {
  return _setTimeout(()=>{
    Promise.all(WAITING_LIST).then(()=>{
      WAITING_LIST = [];
      cb();
    });
  },time);
};
// self.setInterval = function(cb,time) {
//   console.log('setInterval');
//   return _setInterval(()=>{
//     Promise.all(WAITING_LIST).then(()=>{
//       WAITING_LIST = [];
//       cb();
//     });
//   },time);
// };

// self.importScripts('qml.app.js');
self.importScripts('http://pureqml.com/qml.index.min.js');
