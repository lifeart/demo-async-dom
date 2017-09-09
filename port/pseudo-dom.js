var imageId = 0;

class Image {
  set src(value) {
    this._src = value;
    asyncImageLoad(this._imgId, this._src , function(result) {
      this.naturalWidth =  result.naturalWidth;
      this.naturalHeight =  result.naturalHeight;
      this.src =  result.src;
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



class Element {
  set innerHTML(value) {
    this._removeChildren();

    this._innerHTML = value;

    if (String(value).trim().length === 0) {
      return;
    }

    if (value.indexOf('>')==-1) {
      this.textContent = value;
      asyncSendMessage({action:'setTextContent',id:this.id,textContent:this.textContent}).then(()=>{
          this._syncDom();
      });

      return;
      // return;
    }

    if (value.indexOf('<style>')>-1) {
      // this.appendChild(this._root.createElement('style'));
      // return;
    }

    value  = value.replace('</br>','<br/>')

    // var nodes = this._root.htmlParser.parse(value);
    // console.log('textContent',nodes);
    // return;
    // if (!nodes.childNodes.length) {
      this.textContent =value;
        // console.log('textContent',this.textContent);
        asyncSendMessage({action:'setHTML',id:this.id,html:this.textContent}).then(()=>{
            this._syncDom();
        });
        // asyncSendMessage({action:'setTextContent',id:this.id,textContent:this.textContent});
        this._syncDom();
    // }
    // nodes.childNodes.forEach(node=>{
      // console.log('uppend',node);
      // if (node) {
        // this.appendChild(this._root.createElement(node.nodeName));
      // }
    // });
  }
  select() {
    console.log('select',arguments);
  }
  blur() {
    console.log('blur',arguments);
  }
  get className() {
    return this._classes.join(' ');
  }
  set className(value) {
    // console.log('setclassName',value,this.id ,this.tagName);
    asyncSendMessage({action:'setClassName',id:this.id,name:value});
    return this._classes = value.split(' ');
  }
  get innerHTML() {
    return this._innerHTML;
  }
  set type(value) {
    this._type = value;
  }
  get type() {
    return this._type;
  }
  serialize() {
    return '';
  }
  getComputedStyle() {
    console.log('getComputedStyle',this.style);
    return this.style;
  }
  setParentNode(parent) {
      this.parentNode = parent;
  }
  _removeChildren() {
    asyncSendMessage({action:'setHTML',id:this.id,html:''});
    this.children.forEach(el=>{
      el.remove();
    });
    this.children = [];
  }
  removeNode() {
    this.parentNode.removeChild(this);
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    return this.children[this.children.length-1] || null;
  }
  insertBefore(newElement, referenceElement) {
    var index = this.children.indexOf(referenceElement);
    if (index < 0) {
      index = 0;
    }
    newElement.setParentNode(this);
    this.children.splice( index, 0, newElement );
  }
  remove() {
    this._removeChildren();
    // delete this = undefined;
  }
  removeChild(child) {
    this.children = this.children.filter(el=>el!==child);
    child.remove();
  }
  pause() {

  }
  play() {

  }
  set id(value) {
    this._root._ids[value] = this;
    this._id = value;
  }
  get display() {
    console.log('get display');
    return true;
  }
  set display(value) {
    console.log('set display',value);
    return true;
  }
  get id() {
    return this._id;
  }
  setAttribute(key, value) {
    if (key === 'id') {
      this._id = value;
    }
    this._attributes[key] = value;
    asyncSendMessage({action:'setAttribute',id:this.id,attribute:key,value:value}).then(()=>{
      this._syncDom();
    })
  }
  _syncDom() {
    asyncSendMessage({action:'getElementById',id:this.id}).then(result=>{
      var node = result.result;
      this.clientWidth = node.clientWidth;
      this.clientHeight = node.clientHeight;
      this.scrollWidth = node.scrollWidth;
      this.scrollHeight = node.scrollHeight;
      this.offsetWidth = node.offsetWidth;
      this.offsetHeight = node.offsetHeight;
      this.innerWidth = node.innerWidth;
      this.innerHeight = node.innerHeight;
      this.scrollTop = node.scrollTop;
      this.scrollLeft = node.scrollLeft;
      this.scrollY = node.scrollY;
      for (var el in node.style) {
        this._style[el] = node.style[el];
      }
    });
  }
  get childNodes() {
    return this.children;
  }
  getAttribute(key) {
    return this._attributes[key];
  }
  cloneNode() {
    return this._root.createElement(this.nodeName);
  }
  constructor(nodeName) {
    // if (!nodeName) {
      // return undefined;
      // debugger;
    // }
    var _this = this;

    this._attributes = {};
    this.children = [];
    this._classes = [];
    this.parentNode = null;
    this._style = {
      opacity: 1,
      node: this,
    };
    this.style = new Proxy(this._style, styleProxy);
    this.clientWidth = 1280;
    this.clientHeight = 800;
    this.scrollHeight = 0;
    this.nodeName = String(nodeName).toUpperCase();
    this.tagName = this.nodeName;
    this.type = 'node';


    this.styleSheet = {
      addRule(selector,rule) {

          asyncSendMessage({action:'styleSheetAddRule',id:_this.id,selector:selector,rule:rule});
          // console.log('addRule',_this,arguments);
      }
    }

    this.classList = {
        add(name) {
          _this._classes.push(name);
          _this.className = _this._classes.join(' ');
        },
        remove(name) {
          _this.className = _this._classes.filter(e=>e!==name);
          _this.className = _this._classes.join(' ');
        }

    }

    return this;
  }
  _appendChild(element) {
    element.setParentNode(this);
    asyncSendMessage({action:'appendChild',id:this.id,childrenId:element.id});
    this.children.push(element);
    this._syncDom();
  }
  addEventListener(name, callback) {
    // console.log('addEventListener',arguments,this);
    asyncSendMessage({action:'addEventListener',id:this.id,name:name,callback:callback});
  }
  appendChild(children) {
    if (children.type === 'fragment') {
      console.log('appendFragment',children);
      children.children.forEach((el) => {
        this._appendChild(el);
      });
    } else {
      this._appendChild(children);
    }
  }
}

class DocumentFragment extends Element {
  constructor(data) {
    super(data);
    this.type = 'fragment';
    return this;
  }
}

class TextNode {
  constructor(data) {
    this.innerHTML = data;
    return this;
  }
}

var styleProxy = {
  get(target, prop) {
    // console.log('getStyle',target, prop);
    return target[prop];
  },
  set(target, prop, value) {
    if (isNaN(value)) {
      return true;
    }
    var val = value;
    // if (prop === 'opacity') {
      // val = 1;
    // }
    asyncSendMessage({action:'setStyle',id:target.node.id,attribute:prop,value:val});
    // console.log('target.id',target);
    target.node._syncDom();
    // console.log('setStyle',target, prop, value);
    target[prop] = val;
    return true;
  }
}

var windowProxy = {
  get(target, prop) {
    // console.log('get',target, prop);
    return target[prop];
  },
  set(target, prop, value) {
    // console.log('set',target, prop, value);
    target[prop] = value;
    return true;
  }
}

class Document {
  _syncDom(id) {
    this._ids[id]._syncDom();
  }
  getElementsByTagName(tagName) {
      if (tagName === '*') {
        var els = [];
        for (i in this.taggedElements) {
          this.taggedElements[i].forEach(e=>els.push(e));
        }
        return els;
      }
      return this.taggedElements[tagName.toUpperCase()];
  }
  _createElement(name,textContent) {
      this.nodeCounter++;
      var elementName = String(name).toUpperCase();
      var node = new Element(elementName);
      node._root = this;
      if (!this.taggedElements[elementName]) {
        this.taggedElements[elementName] = [];
      }
      this.taggedElements[elementName].push(node);
      this.allNodes.push(node);
      node.textContent = textContent;
      if (elementName === 'BODY') {
          node.id = 'body-node';
      } else if (elementName === 'HEAD') {
          node.id = 'head-node';
      } else {
        node.id = this.nodeCounter;
      }
      asyncSendMessage({action:'createNode',id:node.id,tag:node.tagName,textContent:textContent||''});
      // console.log('elementName',elementName);
      return node;
  }
  get htmlParser() {
    return htmlParser;
  }
  constructor() {
    this.taggedElements = {};
    // this.htmlParser = htmlParser;
    this._ids = {};
    this.allNodes = [];
    this.nodeCounter = 0;
    this.head = this._createElement('head');
    this.head.setParentNode(this);
    this.body = this._createElement('body');
    this.body.setParentNode(this);
    this.documentElement = this._createElement('html');
    this.parentNode =  this.documentElement;
  }
  getElementById(id) {
    // console.log('getElementById',id);
    return this._ids[id] || this.body;
  }
  createElementNS(ns, nodeName) {
    // console.log('createElement',nodeName,arguments);
    return this._createElement(nodeName);
  }
  createElement(nodeName) {
    // console.log('createElement',nodeName,arguments);
    return new Proxy(this._createElement(nodeName),windowProxy);
  }
  createTextNode(data) {
    return new TextNode(data);
  }
  createDocumentFragment() {
    return new DocumentFragment();
  }
}

var window = new Proxy({},windowProxy);
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

function getComputedStyle() {
  console.log('getComputedStyle');
}
var document = new Proxy(new Document(),windowProxy);
window.history = {};
window.history.state = [];
window.history.pushState = function() {
  console.log('pushState',arguments);
}
window.screen = {
    width: 1280,
    height: 720
}
window.scrollTo = function() {
  console.log(arguments);
    // asyncSendMessage({action:'scrollTo',id:'window'});
  // console.log('scrollTo', arguments);
}
window.addEventListener = function(name, callback) {
  if (name === 'load') {
    setTimeout(callback, 200);
  }
  asyncSendMessage({action:'addEventListener',id:'window',name:name,callback:callback});
}

window.document = document;

function requestAnimationFrame(callback) {
			setTimeout(function(){
				callback(performance.now());
			},17);
}

function _initWebApp() {
	console.log('_initWebApp');
}
