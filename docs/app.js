var worker =  new Worker('ww.js');
function sendMessage(data) {
  worker.postMessage(data);
}
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var renderConfig = {
  disableOptional: false,
  isScrolling: undefined,
  timePerLastFrame: 0
};

var _navigator = {
	userAgent: navigator.userAgent,
	platform: navigator.platform,
	language: navigator.language,
};

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {

    // Clear our timeout throughout the scroll
    window.clearTimeout( renderConfig.isScrolling );

    // Set a timeout to run after scrolling ends
    renderConfig.isScrolling = setTimeout(function() {
      renderConfig.isScrolling = false;
        // Run the callback
        //console.log( 'Scrolling has stopped.' );

    }, 66);

}, false);


sendMessage({
	uid: '_setNavigator',
	navigator: _navigator
});
sendMessage({
	uid: 'set_modernizr_custom',
	modernizr_custom: {}
});
sendMessage({
	uid: '_setLocation',
	location: {
		hash: window.location.hash,
		href: window.location.href,
		port: window.location.port,
		host: window.location.host,
		origin: window.location.origin,
		hostname: window.location.hostname,
		pathname: window.location.pathname,
		protocol: window.location.protocol,
		search: window.location.search,
		state: window.history.state,
	}
});


sendMessage({
	uid: '_setScreen',
	screen: {
		width: window.screen.width,
		height: window.screen.height,
	}
});
sendMessage({
	uid: 'init',
});
window.onfocus = function() {
	sendMessage({
		uid: '_onFocus',
	});
}
window.onhashchange = function() {
	sendMessage({
		uid: '_onhashchange',
	});
}
window.onpopstate = function() {
	sendMessage({
		uid: '_onpopstate',
	});
}
window.onblur = function() {
	sendMessage({
		uid: '_onBlur'
	});
}
function shouldSkip(data) {
  if (data.length) {
    return false;
  }
  if (renderConfig.disableOptional && data.optional) {
    return true;
  }
  if ((renderConfig.isScrolling || document.hidden) && data.optional) {
    return true;
  }
  if (renderConfig.timePerLastFrame > 15 && data.optional) {
    renderConfig.timePerLastFrame -= 0.2;
    return true;
  } else {
    return false;
  }
}
function smartBatchSort(actions) {

  var priorityActionsMap = {
    'createNode': 1,
    'setAttribute': 2,
    'bodyAppendChild': 3
  };

  return actions.sort((a,b)=>{
    return priorityActionsMap[a.action] - priorityActionsMap[b.action];
  });
  // priority - create, style, append
}
function performanceFeedback(delta) {
    if (renderConfig.timePerLastFrame < 10 && delta < 10) {
      return;
    }
    renderConfig.timePerLastFrame = delta;
		sendMessage({
			uid: '_onPerformanceFeedback',
			delta: delta
		});
}
var mid = 0;
worker.onmessage = (e)=>{
	mid++;
  var start = Date.now();
  requestAnimationFrame(()=>{
    performAction(e,(result)=>{
      if (e.data.cb) {
    		result.uid = e.data.uid;
        log('cb', e.data, result);
    		sendMessage(result);
    	}
      performanceFeedback(Date.now()-start);
    });
  });
}

var debug = false;

function log() {
  if (!debug) {
    return;
  }
  console.log.apply(this,Array.prototype.slice.call(arguments));
}



var nodesCache = [];

function getNode(id) {
	if (!nodesCache[id]) {
		nodesCache[id] = document.getElementById(id);
	}
	return nodesCache[id] || document.body;
}

function createNode(data) {
	var node = document.createElement(data.tag);
	node.id = data.id
	nodesCache[data.id] = node;
}

function appendChild(data) {
	var parent = getNode(data.id);
	var children = getNode(data.childrenId);
	parent.appendChild(children);
}

function setHTML(data) {
	return getNode(data.id).innerHTML = data.html;
}

function setAttribute(data) {
	return getNode(data.id).setAttribute(data.attribute,data.value);
}
function setStyle(data) {
	return getNode(data.id).style[data.attribute] = data.value;
}
function headAppendChild(data) {
	var node = getNode(data.id);
	node && document.head.appendChild(node);
}
function bodyAppendChild(data) {
	var node = getNode(data.id);
	node && document.body.appendChild(node);
}
function removeNode(data) {
	var node = getNode(data.id);
	delete nodesCache[data.id];
	return node.parentNode.removeChild(node);
}

function removeClass(data) {
	return getNode(data.id).classList.remove(data.class);
}

function getElementById(data) {
	return getNodeData(data);
}

function getNodeData(data) {
	var node = getNode(data.id);
	if (!node) {
		return {};
	}
	return {
		clientWidth: node.clientWidth,
		clientHeight: node.clientHeight,
		scrollWidth: node.scrollWidth,
		scrollHeight: node.scrollHeight,
		offsetWidth: node.offsetWidth,
		offsetHeight: node.offsetHeight,
		innerWidth: node.innerWidth,
		innerHeight: node.innerHeight,
		scrollY: node.scrollY
	}
}

function focusEl(data) {
	if (data.id) {
		getNode(data.id).focus();
	} else {
		window.focus();
	}
}

function addClass(data) {
	return getNode(data.id).classList.add(data.class);
}
function evaluateAction(data, callback) {

  if (shouldSkip(data)) {
    log('skip',data);
    return callback({});
  }

	var actions = {
		'createNode': createNode,
		'focus': focusEl,
		'setHTML': setHTML,
		'headAppendChild': headAppendChild,
		'bodyAppendChild': bodyAppendChild,
		'appendChild': appendChild,
		'setAttribute': setAttribute,
		'setStyle': setStyle,
		'removeNode': removeNode,
		'getElementById': getElementById,
		'addClass': addClass,
		'removeClass': removeClass
	}

	if (data.action) {
		callback({result: actions[data.action](data)});
    log('action',data);
	} else {
		callback({});
    log('no-action',data);
	}
}
function performAction(e,callback) {

	var result = [];
	if (e.data.length) {
		smartBatchSort(e.data).forEach(data => {
      evaluateAction(data, (item)=>{
        result.push(item);
        if (result.length === e.data.length) {
          callback(result);
        }
      });
			result.push();
		});
	} else {
		evaluateAction(e.data,callback);
	}

}
