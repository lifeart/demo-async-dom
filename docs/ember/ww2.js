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

self.importScripts('./pseudo-dom.js');

self.importScripts('mdrnizer.js');

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

self.importScripts('./vendor-8829232c84130863b1988edd68288c26.js');
var regeneratorRuntime = window.regeneratorRuntime;
self.importScripts('./ember-api-docs-25572d828074f773af58544e93b72153.js');
