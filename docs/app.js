var worker =  new Worker('ww.js');

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


// Setup isScrolling variable
var isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {

    // Clear our timeout throughout the scroll
    window.clearTimeout( isScrolling );

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      isScrolling = false;
        // Run the callback
        //console.log( 'Scrolling has stopped.' );

    }, 66);

}, false);

var _navigator = {
	userAgent: navigator.userAgent,
	platform: navigator.platform,
	language: navigator.language,
};
worker.postMessage({
	uid: '_setNavigator',
	navigator: _navigator
});
worker.postMessage({
	uid: 'set_modernizr_custom',
	modernizr_custom: {}
});
worker.postMessage({
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
worker.postMessage({
	uid: '_setScreen',
	screen: {
		width: window.screen.width,
		height: window.screen.height,
	}
});
worker.postMessage({
	uid: 'init',
});
window.onfocus = function() {
	worker.postMessage({
		uid: '_onFocus',
	});
}
window.onhashchange = function() {
	worker.postMessage({
		uid: '_onhashchange',
	});
}
window.onpopstate = function() {
	worker.postMessage({
		uid: '_onpopstate',
	});
}
window.onblur = function() {
	worker.postMessage({
		uid: '_onBlur'
	});
}
var timePerLastFrame = 0;
function shouldSkip(data) {
  if (data.length) {
    return false;
  }
  if (renderConfig.disableOptional && data.optional) {
    return true;
  }
  if ((isScrolling || document.hidden) && data.optional) {
    return true;
  }
  if (timePerLastFrame > 15 && data.optional) {
    timePerLastFrame -= 0.2;
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
    if (timePerLastFrame < 10 && delta < 10) {
      return;
    }
    timePerLastFrame = delta;
		worker.postMessage({
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
    		worker.postMessage(result);
    	}
      performanceFeedback(Date.now()-start);
    });
  });
}
var renderConfig = {
  disableOptional: false
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
	// console.log(data);
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
    var result = actions[data.action](data);
		callback(result);
	} else {
		callback({});
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
