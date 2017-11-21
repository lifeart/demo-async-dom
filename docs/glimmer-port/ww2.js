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
window.Event = function() {

}
window.chrome = {};
var global  = window;
window.setTimeout = self.setTimeout;

// self.setInterval = function(cb,time) {
//   console.log('setInterval');
//   return _setInterval(()=>{
//     Promise.all(WAITING_LIST).then(()=>{
//       WAITING_LIST = [];
//       cb();
//     });
//   },time);
// };


self.importScripts('/ww/app.js');
// self.importScripts('https://emberobserver.com/assets/vendor-63fb928166ab18a0d8a59b4c0239d88b.js');
var regeneratorRuntime = window.regeneratorRuntime;
// self.importScripts('https://emberobserver.com/assets/ember-observer-6183d2e97f093c7a7b31ab8faeda96d6.js');
//self.importScripts('https://ember-api-docs-frontend.global.ssl.fastly.net/assets/ember-api-docs-f260be3bbe602aac5e4bf94c38a4a8e5.js');
// self.importScripts('http://pureqml.com/qml.index.min.js');
