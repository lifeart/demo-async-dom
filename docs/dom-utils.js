var window = undefined;
self.importScripts('https://wzrd.in/standalone/jsdom@latest');
var jsDom = new jsdom.JSDOM();
var windowProxy = {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  }
}

var documentProxy = {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  }
}

window = new Proxy(jsDom.window, windowProxy);
window.requestAnimationFrame = requestAnimationFrame;
var _localStorage = {};
window.localStorage = {
	setItem: function(key,value) {
		_localStorage[key] = value;
	},
	getItem: function(key) {
		_localStorage[key];
	},
};
var document = new Proxy(jsDom.window.document, documentProxy);

document.createElement = new Proxy(document.createElement.bind(document), documentProxy);

var imageId = 0;
class Image {
  set src(value) {
    this._src = value;
    asyncImageLoad(this._imgId, this._src , function(result) {
      this.naturalWidth =  result.naturalWidth;
      this.naturalHeight =  result.naturalHeight;
      if (typeof this.onload === 'function') {
        this.onload();
      }
    }.bind(this), this.onerror);
  }
  get src() {
    return this._src;
  }
	constructor() {
		imageId++;
		this._imgId = imageId;
		this.src = '';
		this.onload = '';
		this.onerror = '';
    this.node =  document.createElement('img');
    this.node.src = this.src;
    return this;
	}
}

function requestAnimationFrame(callback) {
		setTimeout(function(){
			callback(performance.now());
		},30);
}
