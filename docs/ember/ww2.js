var window = undefined;
var _this = self;


var _eai_d = (d,e,f) => {
  window.define(d, e, f);
};
var _eai_r = (a,b) => {
  console.log('_eai_r', a,b);
};

function i() {
  console.log('iiiii', ...arguments);
}
self.importScripts('./ww-transport.js');

self.importScripts('./pseudo-dom.js?t=19');

var pageXOffset = 0;
var pageYOffset = 0;
var innerWidth = 1000;
var innerHeight = 1000;

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

self.importScripts('./mdrnizer.js');

self.importScripts('./vendor-8829232c84130863b1988edd68288c26.js?t=20');
var regeneratorRuntime = window.regeneratorRuntime;
self.importScripts('./ember-api-docs-25572d828074f773af58544e93b72153.js?t=18');
