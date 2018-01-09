var removedNodes = [];
var middlewareActions = [];
var maxId = 0;
var mid = 0;


function _initWebApp() {
	console.log('_initWebApp');
}


_this.sendMessage = function(data, callback) {
    maxId++;
    mid++;
    data.uid = maxId;
    if (callback) {
        uids[maxId] = callback;
    }
	if (typeof data.callback === 'function') {
		uids[`_${maxId}_${data.name}`] = data.callback;
		delete data.callback;
	}
	if (typeof data.onerror === 'function') {
		uids[`onerror_${data.id}`] = data.onerror;
		delete data.onerror;
	}
	if (typeof data.onload === 'function') {
		uids[`onload_${data.id}`] = data.onload;
		delete data.onload;
	}
	if (data.length) {
		data.forEach((el)=>{
			if (typeof el.callback === 'function') {
				maxId++;
				uids[`_${maxId}_${el.name}`] = el.callback;
				el.uid = maxId;
				delete el.callback;
			}
		});
	}
	// console.log(data);
    data.cb = callback ? true : false;
    _this.postMessage(data);
}

self.onmessage = function(e) {
    var uid = String(e.data.uid);
    uids[uid] && uids[uid](e.data);
    if (String(uid).charAt(0) !== '_') {
        delete uids[uid];
    }
};


var actionsList = [];
var batchCallbacks = [];
var WAITING_LIST = [];
//document.createElement = new Proxy(document.createElement.bind(document), documentProxy);
// document.body = new Proxy(document.body.bind(document), documentProxy);

function middleware(data) {
	middlewareActions.forEach(action=>action(data));
}
function addMiddleware(action) {
	middlewareActions.push(action);
}
function asyncSendMessage(data) {
	  middleware(data);
    var request = new Promise(function(resolve, reject) {

        _this.sendMessage(data, function(result) {
            resolve(result);
        });

    });

    var waitingStates = [
      'createNode',
  		'setHTML',
  		'appendHTML',
  		'getInnerHTML',
  		'getStyleValue',
  		'pushState',
  		'setTextContent',
  		'styleSheetAddRule',
  		'headAppendChild',
  		'bodyAppendChild',
  		'appendChild',
  		'setAttribute',
  		'setStyle',
  		'removeNode',
  		'loadImage',
      'setClassName',
  		'getElementById',
  		'addClass',
  		'removeClass'
    ];



    if (waitingStates.indexOf(data.action>-1)) {
      WAITING_LIST.push(request);
    } else {
      if (data.onload) {
        WAITING_LIST.push(request);
      }
    }
    return request;
}

function asyncSetAttribute(id, name, value) {
    return asyncSendMessage({
        action: 'setAttribute',
        id: id,
        attribute: name,
        value: value
    });
}

function asyncBatchMessages(messages) {
    return asyncSendMessage(messages);
}

function asyncBodyAppendChild(id) {
    return asyncSendMessage({
        action: 'bodyAppendChild',
        id: id
    });
}

function asyncImageLoad(id, src, onload, onerror) {
    return asyncSendMessage({
        action: 'loadImage',
        id: id,
		src: src,
		onload: onload,
		onerror: onerror
    });
}

function asyncHeadAppendChild(id) {
    return asyncSendMessage({
        action: 'headAppendChild',
        id: id
    });
}

function asyncAddEventListener(id) {
    return asyncSendMessage({
        action: 'addEventListener',
        id: id,
		name: 'click',
		callback: () => {
			console.log(arguments, 'clicked');
		}
    });
}

function asyncGetElementById(id) {
    return asyncSendMessage({
        action: 'getElementById',
        id: id
    });
}

function asyncCreateElement(id, tagName) {
    return asyncSendMessage({
        action: 'createNode',
        id: id,
        tag: tagName
    });
}


addMiddleware(function(data){
	if (data.action === 'removeNode') {
		removedNodes.push(data.id);
	}
});

addMiddleware(function(data){
	if (data.action === 'loadImage') {
		removedNodes.push(data.id);
	}
});

// var navigator = {};
var elId = 0;

// var document = {
    // title: 'test',
    // body: {
        // style: {

        // }
    // }
// };
// var window = {
    // focus() {
        // _this.sendMessage({
            // action: 'focus',
            // id: id
        // });
    // },
    // localStorage: {
        // setItem: function() {},
        // getItem: function() {},
    // },
    // location: {

    // },
    // history: {
        // pushState: function() {

        // }
    // },
    // screen: {
        // width: 1280,
        // height: 720
    // }
// }
var uids = {
    '_setNavigator': function(data) {
        navigator = data.navigator;
    },
    '_setLocation': function(data) {
        window.location = data.location;
    },
    'set_modernizr_custom': function(data) {
        modernizr_custom = data.modernizr_custom;
    },
    '_onFocus': function() {
        if (window.onfocus)
            window.onfocus();
    },
    '_onhashchange': function() {
        window.onhashchange();
    },
    '_onpopstate': function() {
        window.onpopstate();
    },
    '_onBlur': function() {
        if (window.onblur)
            window.onblur();
    },
	'_onPerformanceFeedback': function(data) {
		adjustSpeed(data);
	},
    '_setScreen': function(data) {
        window.screen = data.screen;
    },
    'init': function() {
        _initWebApp();
    }
};

function sendBatch() {
    let actionsToSend = actionsList.splice(0, actionsList.length);
    asyncBatchMessages(actionsToSend);
}

var updateTimeout = null
var packSize = 30;
var batchTimeout = 4;
var asyncBatch = function(action) {
  actionsList.push(action);
	if (actionsList.length > packSize) {
		sendBatch();
	}
  updateTimeout = setTimeout(function() {
      sendBatch();
  }, batchTimeout);
}
