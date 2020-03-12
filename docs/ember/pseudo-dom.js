const hexToRgba = function(hex, a) {
  if (hex.charAt(0) !== '#') {
    return hex;
  }
  const fixHex = (hex) => {
    let newHex = hex.startsWith('#') ? hex.slice(1) : hex;

    if (newHex.length === 3) {
      newHex = `${newHex.slice(0, 1)}${newHex.slice(0, 1)}${newHex.slice(1, 2)}${newHex.slice(1, 2)}${newHex.slice(2, 3)}${newHex.slice(2, 3)}`;
    }


    return newHex;
  };

  const newHex = fixHex(hex);
  const r = parseInt(newHex.substring(0, 2), 16);
  const g = parseInt(newHex.substring(2, 4), 16);
  const b = parseInt(newHex.substring(4, 6), 16);

  let o;
  if (newHex.length === 8) {
    o = +((parseInt(newHex.substring(6, 8), 16)/255).toFixed(2));
  }
  o = isNumeric(a) ? a : o;

  return isNumeric(o) ? `rgba(${r}, ${g}, ${b}, ${o})` : `rgb(${r}, ${g}, ${b})`;
};

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);


var navigator = {
  userAgent: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
}

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
var REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;
var kebabCache = {};
function kebabCase(str) {
  if (!kebabCache[str]) {
    kebabCache[str] = str.replace(KEBAB_REGEX, function (match) {
  		return '-' + match.toLowerCase();
  	});
  }
	return kebabCache[str];
};


var imageId = 0;

function EventAdapter(callback) {
  return function(e) {
    e.currentTarget = document._ids[e.currentTarget];
    e.srcElement = document._ids[e.srcElement];
    e.target = document._ids[e.target] || e.currentTarget || null;
    e.toElement = document._ids[e.toElement];
    e.eventPhase = document._ids[e.eventPhase];
    e.preventDefault = ()=>{};
    callback(e);
  }
}


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
  getBoundingClientRect() {
    return {
      innerWidth: 0,
      innerHeight: 0,
      pageYOffset: 0,
      pageXOffset: 0
    }
  }
  insertAdjacentHTML(position, html) {
    // console.log('insertAdjacentHTML',position,html);
    if (position === 'beforeEnd') {

    } else if (position === 'beforeBegin') {

    }
    asyncSendMessage({action:'insertAdjacentHTML',id:this.id,position:position,html:html});
    this._syncDom();
    return null;
  }
  get protocol() {
        var url = this.href;
        if (url.charAt(0) === '/' && url.charAt(1) !== '/') {
          url = 'http://localhost:2015' + url;
        }
    var n = new URL(url);

    return  n.protocol;
  }
  set innerHTML(value) {
    console.log('innerHTML',value);
    this._removeChildren();

    this._innerHTML = value;

    if (String(value).trim().length === 0) {
      return;
    }

    if (value.indexOf('>')==-1) {
      this.textContent = value;
      asyncSendMessage({action:'setTextContent',id:this.id,textContent:this.textContent});
      this._syncDom();

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

    // Ember.js hook
    if (value === '<textarea>x</textarea>') {
      asyncSendMessage({action:'setHTML',id:this.id,html:this.textContent});
      this.appendChild(this._root.createElement('textarea')).defaultValue = 'x';
    } else {
      this.textContent = value;
        // console.log('textContent',this.textContent);
        asyncSendMessage({action:'setHTML',id:this.id,html:this.textContent});
        // asyncSendMessage({action:'setTextContent',id:this.id,textContent:this.textContent});
        this._syncDom();
    }


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
    this._syncDom();
    this._classes = value.split(' ');

    return value;
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
  get nodeType() {
    // if ()
    // return 3;
    // if (this.tagName === 'BODY') {
      return 1;
    // }
    // console.log('nodeType',this.tagName);
    // return 3;
  }
  serialize() {
    return '';
  }
  get ownerDocument() {
    return this._root;
  }
  compareDocumentPosition(node) {
    console.log('compareDocumentPosition', node, this);
    return 0;
  }
  getComputedStyle() {
    console.log('getComputedStyle',this.style);
    return this.style;
  }
  setParentNode(parent) {
      this.parentNode = parent;
  }
  get nextSibling() {
    if (!this.parentNode) {
      return null;
    }
    if (!this.parentNode.children) {
      return  {
        nodeValue: '',
        removeChild() {}
      }
    }
    return this.parentNode.children[this.parentNode.children.indexOf(this)+1] || null;
  }
  get previousSibling() {
    if (!this.parentNode) {
      return null;
    }
    if (!this.parentNode.children) {
      return  {
        nodeValue: '',
        removeChild() {}
      }
    }
    return this.parentNode.children[this.parentNode.children.indexOf(this)-1] || null;
  }
  customGetAttributeNode(key) {
    return {
      specified: this._attributes[key] ? true : false,
      value: this._attributes[key]
    };
  }
  _removeChildren() {
    asyncSendMessage({action:'setHTML',id:this.id,html:''});
    this.children.forEach(el=>{
      if (typeof el.remove === 'function') {
          el.remove();
      } else {
        console.log('unable to remove el', el);
      }

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
    // console.log('insertBefore','newEl',newElement,'this',this,'ref',referenceElement);
    newElement.setParentNode(this);
    this.children.splice( index, 0, newElement );
    asyncSendMessage({action:'insertBefore',id:this.id,newId: newElement.id, refId: referenceElement?referenceElement.id:null});
  }
  remove() {
    // console.log('remove',this);
    this._removeChildren();
    if (this.parentNode) {
        this.parentNode.children =  this.parentNode.children.filter(el=>el!==this);
    }

    asyncSendMessage({action:'removeNode',id:this.id});
    // this.removeNode();
    // delete this = undefined;
  }
  removeChild(child) {
    this.children = this.children.filter(el=>el!==child);
    child.parentNode = null;
    if (typeof child.remove === 'function') {
        child.remove();
    } else {
      console.log('removeChild',child);
    }

  }
  get attributes() {
    const _this = this;
    const keys = Object.keys(this._attributes);
    return {
      item: (index) => {
        return {
          name: keys[index],
          value: _this[keys[index]]
        }
      },
      length: keys.length
    }
  }
  pause() {

  }
  play() {

  }
  set id(value) {
    // console.log('setId', value);
    var oldId = this._id;
    asyncSendMessage({action:'setAttribute',id:oldId,attribute:'id',value:value});
    this._root._ids[value] = this;
    this._id = value;
    this._attributes['id'] = value;
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
  propsToClone() {
    return ['checked'];
  }
  removeAttribute(key) {
    delete this._attributes[key];
    asyncSendMessage({action:'removeAttribute',id:this.id,attribute:key});
  }
  setAttribute(key, value) {
    if (key === 'id') {
      this.id = value;
      this._attributes[key] = value;
      return;
    }
    if (key === 'checked') {
      this.checked = value;
    }
    if (key === 'style') {
      value.split(';').forEach(e=>{
        let [key,v] = e.split(':');
        if (key && typeof v !== 'undefined') {
          if (key === 'background-color') {
            v = hexToRgba(v);
          }
          this._style[key.trim()] = v.trim();
        }
      });
    }
    this._attributes[key] = value;
    asyncSendMessage({action:'setAttribute',id:this.id,attribute:key,value:value});
    this._syncDom();
  }
  _syncDom() {
    if (!this.offsetHeight) {
        const offHeight = parseInt(this._style.height, 10);
        // console.log(this._style.height);
        if (isNaN(offHeight)) {
          this.offsetHeight = 15;
        } else {
          this.offsetHeight = offHeight;
        }
    }
    if (!this.offsetWidth) {
      const offWidth = parseInt(this._style.width, 10);
      if (isNaN(offWidth)) {
        this.offsetWidth = 16;
      } else {
        this.offsetWidth = offWidth;
      }
      // console.log('offWidth',offWidth);
      // console.log('ewe',this._style.width);
      // this.offsetWidth = this.style.width;
    }
    asyncSendMessage({action:'getElementById',id:this.id}).then(result=>{
      var node = result.result;
      if (!result.result.style) {
        // console.log(result.result);
        return;
      }
      // console.log(result.result);
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
        // console.log(el,'"'+node.style[el]+'"');
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
  cloneNode(deep) {
    var newNode = this._root.createElement(this.nodeName);
    this.propsToClone().forEach(prop=>{
      newNode[prop] = this[prop];
    });
    if (deep) {
      this.children.forEach(el=>{
        newNode.appendChild(el.cloneNode(deep));
      });
    }
    return newNode
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


    this.scrollWidth = 0;
    this.scrollHeight = 0;
    this.offsetWidth = 0;
    this.offsetHeight = 0;
    this.innerWidth = 0;
    this.innerHeight = 0;
    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.scrollY = 0;


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
          var newClasses = _this._classes.filter(e=>e!==name);
          _this.className = newClasses.join(' ');
        },
        contains(name) {
          return _this.className.indexOf(name) > -1;
        }

    }

    return this;
  }
  closest(selector) {
    console.log('closest', selector, this);
  }
  contains(el) {
    if (!el) {
      return false;
    }
    if (this === el) {
      return true;
    }
    if (el.children && el.children.indexOf(el) > -1) {
      return true;
    }
    if (!el.children) {
      return false;
    }
    var hasEl = false;
    el.children.forEach(child=>{
      if (hasEl) {
        return;
      }
      if (typeof child.contains === 'function') {
        hasEl = child.contains(el);
      }
    });
    return hasEl;
  }
  querySelectorAll(selector) {
    if (selector.indexOf('[data-')>-1) {
      console.log('querySelectorAll',selector,this);
      if (selector.indexOf('=')===-1) {
        var results = [];
        var searchKey = selector.replace('[','').replace(']','');
        this.children.forEach(el=>{
            if (el._attributes && el._attributes[searchKey]) {
              results.push(el);
            }
        });
        return {
          item: function(index) {
            return results[index] || null;
          },
          length: results.length
        }
      }
    }
    if (selector === 'script') {
      // hook
      _eai_d = window.define;
      _eai_r = window.require;
      return [
        {
          src: ''
        }
      ];
    }
  }
  get parentElement() {
    return this.parentNode;
  }
  _appendChild(element) {
    // console.log('append');
    element.setParentNode(this);
    // console.log('_appendChild',this.id, this.nodeName, element.id, element.nodeName, this, element);
    if (!element.id) {
      return;
    }
    asyncSendMessage({action:'appendChild',id:this.id,childrenId:element.id});
    this._syncDom();
    this.children.push(element);
  }
  removeEventListener(name, callback) {
    if (!name) {
      return;
    }
    // asyncSendMessage({action:'addEventListener',id:this.id,name:name,callback:callback)});
    console.log('removeEventListener',arguments);
  }
  addEventListener(name, callback) {
    // console.log('addEventListener',name,this);
    if (!name) {
      return;
    }
    asyncSendMessage({action:'addEventListener',id:this.id,name:name,callback:EventAdapter(callback)});
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
    return children;
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
  cloneNode() {
    // console.log('this._root.createText',this);
    var newNode = this.parentNode._root.createTextNode(this.innerHTML);
    return newNode
  }
  remove() {
      asyncSendMessage({action:'removeNode',id:this._id});
  }
  get nodeType() {
    return 3;
  }
  set nodeValue(value) {
    // console.log('nodeValue',value);
    asyncSendMessage({action:'setProperty',id:this._id,property:'nodeValue',value:value});
  }
  get nodeValue() {
    return this.innerHTML;
    console.log('nodeValue');
  }
  setParentNode(parent) {
      this.parentNode = parent;
  }
  constructor(data) {
    this.innerHTML = data;
    return this;
  }
}
class CommentNode extends TextNode {

}


var styleProxy = {
  get(target, prop) {
    // console.log('getStyle',target, prop,kebabCase(prop));
    return target[kebabCase(prop)] || '';
  },
  set(target, prop, value) {
    var kebabProp = kebabCase(prop);
    if (kebabProp === 'css-text') {

      value.split(';').forEach(e=>{
        let [key,v] = e.split(':');
        if (key && typeof v !== 'undefined') {
          if (key === 'background-color') {
            // console.log(v);
            v = hexToRgba(v);
          }
          // console.log(key,v);
            target[key.trim()] = v.trim();
        }
      });
      target.node.setAttribute('style',value);
      console.log(target);
      return true;
    }

    var val = value;

    if (kebabProp === 'background-color') {

      val = hexToRgba(val);
      console.log(val);

    }

    // if (String(value).indexOf(';')>-1) {
    //     console.log('setStyle',target, prop,kebabCase(prop),value);
    // }

    if (isNaN(val)) {
      return true;
    }

    // if (prop === 'opacity') {
      // val = 1;
    // }
    asyncSendMessage({action:'setStyle',id:target.node.id,attribute:kebabProp,value:val});

    // console.log('target.id',target);

    // console.log('setStyle',target, prop, value);
    target[kebabProp] = val;
    target.node._syncDom();
    return true;
  }
}


var realWindowProxy = {
  get(target, prop) {
    // if (target.tagName) {
          // console.log('get',target, prop);
    // }

    return target[prop] || self[prop];
  },
  set(target, prop, value) {
    // console.log('set',target, prop, value);
    target[prop] = value;
    return true;
  }
}

var windowProxy = {
  get(target, prop) {
    // if (target.tagName) {
          // console.log('get',target, prop);
    // }

    return target[prop];
  },
  set(target, prop, value) {
    // console.log('set',target, prop, value);
    target[prop] = value;
    return true;
  }
}

class CustomEvent {
  constructor() {
    console.log(arguments);
  }
}

class Document {
  _syncDom(id) {
    if (!id) {
      return;
    }
    this._ids[id]._syncDom();
  }
  createEvent() {
    console.log('createEvent',arguments);
  }
  addEventListener(name, callback) {
    // console.log('addEventListener',name,this);
    if (!name) {
      return;
    }
    asyncSendMessage({action:'addEventListener',id:'document',name:name,callback:EventAdapter(callback)});
  }
  removeEventListener(name, callback) {
    if (!name) {
      return;
    }
    // asyncSendMessage({action:'addEventListener',id:this.id,name:name,callback:callback)});
    console.log('removeEventListener',arguments);
  }
  get defaultView() {
    return window;
  }
  get ownerDocument() {
    return this;
  }
  get nodeType() {
    return 9;
  }
  createComment(text) {
    return new CommentNode(text);
    // return `<!--${text}-->`;
  }
  getElementsByTagName(tagName) {
      if (tagName === '*') {
        var els = [];
        for (let i in this.taggedElements) {
          this.taggedElements[i].forEach(e=>els.push(e));
        }
        return els;
      }
      // console.log('getElementsByTagName',tagName);
      return this.taggedElements[tagName.toUpperCase()];
  }
  get htmlParser() {
    return htmlParser;
  }
  constructor() {
    this.taggedElements = {};
    // this.htmlParser = htmlParser;
    this._ids = {};
    this.implementation = {
      // Ember hook
      createHTMLDocument: function() {
        return {
          body: {
            innerHTML: ()=>{},
            childNodes: [1,2]
          }
        }
      }
    };
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
    if (id === 'fastboot-body-start') {
      return null;
    }
    return this._ids[id] || this.body;
  }
  createElementNS(ns, nodeName) {
    // console.log('createElement',nodeName,arguments);
    return this._createElement(nodeName);
  }
  querySelectorAll(selector) {
    if (selector.indexOf('[data-')>-1) {
      console.log('querySelectorAll',selector,this);
      if (selector.indexOf('=')===-1) {
        var results = [];
        var searchKey = selector.replace('[','').replace(']','');
        this.children.forEach(el=>{
            if (el._attributes && el._attributes[searchKey]) {
              results.push(el);
            }
        });
        return {
          item: function(index) {
            return results[index] || null;
          },
          length: results.length
        }
      }
    }
    if (selector === 'script') {
      return [
        {
          src: ''
        }
      ];
    }
    return [];
  }
  querySelector(q) {
    console.log('querySelector',q);
    if (q.charAt(0) === '#') {
      return this._ids[q.slice(1)];
    }
    if (q === 'body') {
      return this.body;
    }
    if (q === 'body, html') {
      return {
        scrollTo() {

        }
      }
    }
    if (q === 'meta[name="ember-api-docs/config/environment"]') {
      return {
        getAttribute() {
          return atob(`JTdCJTIybW9kdWxlUHJlZml4JTIyJTNBJTIyZW1iZXItYXBpLWRvY3MlMjIlMkMlMjJlbnZpcm9ubWVudCUyMiUzQSUyMnByb2R1Y3Rpb24lMjIlMkMlMjJyb290VVJMJTIyJTNBJTIyL2RlbW8tYXN5bmMtZG9tL2VtYmVyLyUyMiUyQyUyMnJvdXRlclJvb3RVUkwlMjIlM0ElMjIvYXBpLyUyMiUyQyUyMmxvY2F0aW9uVHlwZSUyMiUzQSUyMmhhc2glMjIlMkMlMjJBUElfSE9TVCUyMiUzQSUyMmh0dHBzJTNBLy9lbWJlci1hcGktZG9jcy5nbG9iYWwuc3NsLmZhc3RseS5uZXQlMjIlMkMlMjJnYVRyYWNraW5nSWQlMjIlM0ElMjJVQS0yNzY3NTUzMy0xJTIyJTJDJTIyRW1iZXJFTlYlMjIlM0ElN0IlMjJFWFRFTkRfUFJPVE9UWVBFUyUyMiUzQWZhbHNlJTJDJTIyRkVBVFVSRVMlMjIlM0ElN0IlN0QlN0QlMkMlMjJBUFAlMjIlM0ElN0IlMjJzY3JvbGxDb250YWluZXJTZWxlY3RvciUyMiUzQSUyMmJvZHklMkMlMjBodG1sJTIyJTJDJTIybmFtZSUyMiUzQSUyMmVtYmVyLWFwaS1kb2NzJTIyJTJDJTIydmVyc2lvbiUyMiUzQSUyMjAuMS4wKyUyMiU3RCUyQyUyMmZhc3Rib290JTIyJTNBJTdCJTIyaG9zdFdoaXRlbGlzdCUyMiUzQSU1QiU3QiU3RCUyQyU3QiU3RCU1RCU3RCUyQyUyMmVtYmVyLWFsZ29saWElMjIlM0ElN0IlMjJhbGdvbGlhSWQlMjIlM0ElMjJCSDREOU9EMTZBJTIyJTJDJTIyYWxnb2xpYUtleSUyMiUzQSUyMjc2MDk2OWVmMDgxZmNhZGM3ZTBlNjBmYWVmZGIwOTA3JTIyJTdEJTJDJTIyY29udGVudFNlY3VyaXR5UG9saWN5JTIyJTNBJTdCJTIyZGVmYXVsdC1zcmMlMjIlM0ElMjIlMjdzZWxmJTI3JTIwKi5mYXN0bHkubmV0JTIyJTJDJTIyY29ubmVjdC1zcmMlMjIlM0ElMjIlMjdzZWxmJTI3JTIwKi5hbGdvbGlhLm5ldCUyMCouYWxnb2xpYW5ldC5jb20lMjAqLmZhc3RseS5uZXQlMjIlMkMlMjJzY3JpcHQtc3JjJTIyJTNBJTIyJTI3c2VsZiUyNyUyMHVuc2FmZS1pbmxpbmUlMjB1c2UudHlwZWtpdC5uZXQlMjAlMjdzaGEyNTYtbEtCdGNVREtkMVlzWEFwejN6Z2ZGcDRnN1R1SVZQU3NZZy9pYys3N0xqbyUzRCUyNyUyMCouZmFzdGx5Lm5ldCUyMGh0dHBzJTNBLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20lMjIlMkMlMjJmb250LXNyYyUyMiUzQSUyMiUyN3NlbGYlMjclMjBkYXRhJTNBLy8qJTIwaHR0cHMlM0EvL2ZvbnRzLmdzdGF0aWMuY29tJTIwJTIwKi5mYXN0bHkubmV0JTIyJTJDJTIyaW1nLXNyYyUyMiUzQSUyMiUyN3NlbGYlMjclMjBkYXRhJTNBLy8qJTIwJTIwKi5mYXN0bHkubmV0JTIwaHR0cHMlM0EvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbSUyMiUyQyUyMnN0eWxlLXNyYyUyMiUzQSUyMiUyN3NlbGYlMjclMjAlMjd1bnNhZmUtaW5saW5lJTI3JTIwaHR0cHMlM0EvL2ZvbnRzLmdvb2dsZWFwaXMuY29tJTIwJTIwKi5mYXN0bHkubmV0JTIyJTJDJTIybWVkaWEtc3JjJTIyJTNBJTVCJTIyJTI3c2VsZiUyNyUyMiU1RCU3RCUyQyUyMmNvbnRlbnRTZWN1cml0eVBvbGljeUhlYWRlciUyMiUzQSUyMkNvbnRlbnQtU2VjdXJpdHktUG9saWN5LVJlcG9ydC1Pbmx5JTIyJTJDJTIyZW1iZXJBbmNob3IlMjIlM0ElN0IlMjJhbmNob3JRdWVyeVBhcmFtJTIyJTNBJTIyYW5jaG9yJTIyJTdEJTJDJTIyZXhwb3J0QXBwbGljYXRpb25HbG9iYWwlMjIlM0FmYWxzZSU3RA==`);
          // return '%7B%22modulePrefix%22%3A%22ember-observer%22%2C%22environment%22%3A%22production%22%2C%22rootURL%22%3A%22/%22%2C%22locationType%22%3A%22router-scroll%22%2C%22historySupportMiddleware%22%3Atrue%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22ember-observer%22%2C%22version%22%3A%220.0.0+2beb269f%22%7D%2C%22metricsAdapters%22%3A%5B%7B%22name%22%3A%22GoogleAnalytics%22%2C%22environments%22%3A%5B%22production%22%5D%2C%22config%22%3A%7B%22id%22%3A%22UA-59673320-1%22%7D%7D%2C%7B%22name%22%3A%22LocalAdapter%22%2C%22environments%22%3A%5B%22development%22%5D%7D%5D%2C%22ember-cli-mirage%22%3A%7B%22usingProxy%22%3Atrue%2C%22useDefaultPassthroughs%22%3Atrue%7D%2C%22exportApplicationGlobal%22%3Afalse%7D';
        }
      }
    }
    if (q === 'meta[name="ember-observer/config/environment"]') {
      return {
        getAttribute() {
          return '%7B%22modulePrefix%22%3A%22ember-observer%22%2C%22environment%22%3A%22production%22%2C%22rootURL%22%3A%22/%22%2C%22locationType%22%3A%22router-scroll%22%2C%22historySupportMiddleware%22%3Atrue%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22ember-observer%22%2C%22version%22%3A%220.0.0+2beb269f%22%7D%2C%22metricsAdapters%22%3A%5B%7B%22name%22%3A%22GoogleAnalytics%22%2C%22environments%22%3A%5B%22production%22%5D%2C%22config%22%3A%7B%22id%22%3A%22UA-59673320-1%22%7D%7D%2C%7B%22name%22%3A%22LocalAdapter%22%2C%22environments%22%3A%5B%22development%22%5D%7D%5D%2C%22ember-cli-mirage%22%3A%7B%22usingProxy%22%3Atrue%2C%22useDefaultPassthroughs%22%3Atrue%7D%2C%22exportApplicationGlobal%22%3Afalse%7D';
        }
      }
    }
    return null;
  }
  createElement(nodeName) {
    // console.log('createElement',nodeName,arguments);
    return new Proxy(this._createElement(nodeName),windowProxy);
  }
  defaultView() {
    return this;
  }
  _createElement(name,textContent) {
      this.nodeCounter++;
      var nodeId = `async-dom-${this.nodeCounter}`;
      var elementName = String(name).toUpperCase();
      var node = new Element(elementName);
      node._root = this;
      if (!this.taggedElements[elementName]) {
        this.taggedElements[elementName] = [];
      }
      this.taggedElements[elementName].push(node);
      this.allNodes.push(node);
      node.textContent = textContent;
      // console.log('textContent',textContent);
      if (elementName === 'BODY') {
          node._id = 'body-node';
      } else if (elementName === 'HEAD') {
          node._id = 'head-node';
      } else {
        node._id = nodeId;
      }
      this._ids[node._id] = node;
      asyncSendMessage({action:'createNode',id:node.id,tag:node.tagName,textContent:textContent||''});
      // console.log('elementName',elementName);
      return node;
  }
  _createTextNode(text) {
    this.nodeCounter++;
    var nodeId = `async-dom-${this.nodeCounter}`;
    var node = new TextNode(text);
    node._root = this;
    if (!this.taggedElements['#text']) {
      this.taggedElements['#text'] = [];
    }
    this.taggedElements['#text'].push(node);
    this.allNodes.push(node);

    node._id = nodeId;
    node.id = nodeId;
    this._ids[nodeId] = node;
    asyncSendMessage({action:'createNode',id:nodeId,tag:'#text',textContent:text});
    // console.log('elementName',elementName);
    return node;

  }
  createTextNode(data) {
    return this._createTextNode(data);
  }
  createDocumentFragment() {
    console.log('createDocumentFragment');
    return new DocumentFragment();
  }
}

var window = new Proxy({},realWindowProxy);
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

function getComputedStyle(el) {
  console.log('getComputedStyle', arguments);
  return el.getComputedStyle();
}
window.getComputedStyle = getComputedStyle;
var document = new Proxy(new Document(),windowProxy);
window.history = {};
window.history.state = [];
window.history.pushState = function(state, title, url) {
  asyncSendMessage({action:'pushState',id:Date.now(),state:state,title:title,url:url});
  console.log('pushState',arguments);
}
window.history.replaceState = function(state, title, url) {
  asyncSendMessage({action:'replaceState',id:Date.now(),state:state,title:title,url:url});
  console.log('replaceState',arguments);
}
window.screen = {
    width: 1280,
    height: 720
}
// Object.defineProperty(window,'Ember',{
//   get() {
//     return self[];
//   }
// })
window.location = {
  href: "http://127.0.0.1:2015/",
  protocol: 'http:',
  pathname: '/'
}
window.scrollTo = function() {
  console.log(arguments);
    // asyncSendMessage({action:'scrollTo',id:'window'});
  // console.log('scrollTo', arguments);
}
window.addEventListener = function(name, callback) {
  console.log('addEventListener', name, callback);
  if (name === 'load') {
    setTimeout(callback, 200);
  }
  asyncSendMessage({action:'addEventListener',id:'window',name:name,callback:EventAdapter(callback)});
}
window.removeEventListener = function(name, callback) {
  console.log('removeEventListener', name, callback);
  // if (name === 'load') {
  //   setTimeout(callback, 200);
  // }
  // asyncSendMessage({action:'addEventListener',id:'window',name:name,callback:EventAdapter(callback)});
}



// instanse of Text
class Text {

}

window.document = document;
window.document.location = window.location;
window.Element = Element;
window.dispatchEvent = function() {
  console.log('dispatchEvent', arguments);
}

function cancelAnimationFrame(id) {
  clearTimeot(id);
}

function requestAnimationFrame(callback) {
  console.log('requestAnimationFrame');
	var id = setTimeout(function(){
		callback(performance.now());
	},100);
  return id;
}