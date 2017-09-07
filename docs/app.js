var worker =  new Worker('ww.js');
var viewportHeight = 0;
var viewportWidth = 0;

function calcViewportSize() {
	viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
	viewportWidth = (window.innerWidth || document.documentElement.clientWidth);
}
//https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= viewportHeight &&
        bounding.right <= viewportWidth
    );
};

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
  totalActions: 0,
  skipNotInVewport: true,
  timePerLastFrame: 0
};

var _navigator = {
	userAgent: navigator.userAgent,
	platform: navigator.platform,
	language: navigator.language,
};

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {
	
	if (document.body.style['pointer-events'] !== 'none') {
		document.body.style['pointer-events'] = 'none';	
	}

    // Clear our timeout throughout the scroll
    window.clearTimeout( renderConfig.isScrolling );

    // Set a timeout to run after scrolling ends
    renderConfig.isScrolling = setTimeout(function() {
		document.body.style['pointer-events'] = 'auto';
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
var fpsMs = 16;
function shouldSkip(data) {
  if (data.length || !data.optional) {
    return false;
  }
  if (renderConfig.disableOptional && data.optional) {
    return true;
  }
  if ((renderConfig.isScrolling || document.hidden) && data.optional) {
    return true;
  }
  if (data.optional && actionsList.length > criticalSize / 2 ) {
    return true;
  }
  if (renderConfig.timePerLastFrame > (fpsMs + 0.2) && data.optional) {
    renderConfig.timePerLastFrame -= getTimePerAction(data.action);
    return true;
  } else {
    return false;
  }
}
var actionTimes = {};
function setTimePerAction(action, time) {
  actionTimes[action] = time + 0.02;
}
function getTimePerAction(action) {
  if (!actionTimes[action]) {
    actionTimes[action] = 0.5;
  }
  return actionTimes[action];
}
function smartBatchSort(actions) {

  var priorityActionsMap = {
    'createNode': 1,
    'setAttribute': 2,
    'addEventListener': 3,
	'appendChild': 4,
    'bodyAppendChild': 5
  };

  return actions.sort((a,b)=>{
    return priorityActionsMap[a.action] - priorityActionsMap[b.action];
  });
  // priority - create, style, append
}
function performanceFeedback(delta, actions) {
    // var realDelta = delta / 1000;
    // if (isNaN(realDelta)) {
    //   return;
    // }
    calcAvgActionTime();
    renderConfig.timePerLastFrame = delta;
    renderConfig.totalActions = actions;
		// sendMessage({
		// 	uid: '_onPerformanceFeedback',
		// 	delta: delta
		// });
}
var actionsList = [];
function actionScheduler(action) {
  if (!shouldSkip(action)) {
    actionsList.push(action);
  } else {
    skip(action);
  }

}
function clearActions() {
  actionsList = [];
}

function prioritySort(a,b) {
  if (a.optional && !b.optional) {
    return 1;
  }
  if (!a.optional && b.optional) {
    return -1;
  }
  if (a.length && !b.length) {
    return -1;
  }
  if (!a.length && b.length) {
    return 1;
  }
  return a.uid - b.uid;
  // return 0;
}
function getActionsForLoop() {
  var optimalCap = getOptimalActionsCap();
  actionsList = actionsList.sort(prioritySort);
  var actions = actionsList.splice(0,optimalCap);
  return actions;
}
var minLoop = {
  actions: 0,
  time: 20
}
var maxTime = {
  actions: 0,
  time: 0
}
var avgActionTime = 0;

function calcAvgActionTime() {
  avgActionTime = maxTime.time / maxTime.actions;
}
var criticalSize = 1500;
var maxSizeBeforeFlush = 300;
var flushSize = 50;
var commonPoolSize = fpsMs*2;
function getOptimalActionsCap() {

  var optimalCandidate = Math.round(fpsMs / (renderConfig.timePerLastFrame/renderConfig.totalActions));

  if (isNaN(optimalCandidate) || !isFinite(optimalCandidate)) {
    optimalCandidate = 0;
  }

  var optimalCap = Math.round((fpsMs*3)/(avgActionTime || 1) || 10);
  if ( optimalCap > 1 ) {
    optimalCap--;
  }
  var maxLength = actionsList.length;
  if (maxLength-1 < optimalCap) {
    optimalCap = maxLength;
  }
  if (maxLength >= maxSizeBeforeFlush) {
    optimalCap = flushSize;
  }
  if (maxLength>criticalSize) {
    return criticalSize;
  }
  if (optimalCap < optimalCandidate && flushSize > optimalCap) {
    if (optimalCandidate <= maxLength) {
      optimalCap = optimalCandidate;
    }
  }
  if (maxLength > commonPoolSize && optimalCap < commonPoolSize) {
    optimalCap = commonPoolSize;
  }
  return optimalCap;
}
function skip(action, result) {
  if (action.cb && action.uid) {
    var responce = result || {
      skip: true
    }
    responce.uid = action.uid;
    log('cb', action, responce);
    sendMessage(responce);
  }
}
function actionLoop(startMs) {
  calcViewportSize();
  var newActions = getActionsForLoop();
  log('actions.length',newActions.length);
  var totalActions = newActions.length;
  newActions.forEach(action=>{
    performAction(action, (result)=>{
      if (result.skip || (result.result && result.skip)) {
        totalActions--;
      }
	  if (result.result && result.result.timeShift) {
		totalActions--;
		startMs -= result.timeShift; 
	  }
      skip(action, result);
    });
  });
  var feedbackDelta = performance.now()-startMs;

  if (feedbackDelta < minLoop.time && totalActions > 1) {
    minLoop.time = feedbackDelta;
    minLoop.actions = totalActions
  }

  if (feedbackDelta > maxTime.time && totalActions > 1) {
    maxTime.time = feedbackDelta;
    maxTime.actions = totalActions
  }

  var delta = fpsMs - feedbackDelta;
  if (delta < 0) {
    delta  = 5;
  }
  if (totalActions) {
    performanceFeedback(feedbackDelta,totalActions);
  }
  requestAnimationFrame(actionLoop);
}

worker.onmessage = (e)=>{
  actionScheduler(e.data);
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
	if (data.href) {
		node.href = data.href;
	}
	if (data.textContent) {
		node.textContent = data.textContent;
	}
	if (data.target) {
		node.target = data.target;
	}	
	if (data.title) {
		node.title = data.title;
	}
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
function setTextContent(data) {
	return getNode(data.id).textContent = data.textContent;
}

function setAttribute(data) {
	return getNode(data.id).setAttribute(data.attribute,data.value);
}
function setStyle(data) {
	var node = getNode(data.id);
	if (data.optional && renderConfig.skipNotInVewport) {
		if (!isInViewport(node)) {
			log('!isInViewport',data);
			return {
				skip:true
			};
		}
		
	}
	return node.style[data.attribute] = data.value;
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
	node.parentNode.removeChild(node);
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
function getStyleValue(data) {
	return getNode(data.id).style[data.style];
}
function eventToObject(e) {
	return {
		altKey: e.altKey,
		bubbles: e.bubbles,
		button: e.button,
		buttons: e.buttons,
		cancelBubble: e.cancelBubble,
		cancelable: e.cancelable,
		clientX: e.clientX,
		clientY: e.clientY,
		composed: e.composed,
		ctrlKey: e.ctrlKey,
		currentTarget: e.currentTarget?e.currentTarget.id:null,
		defaultPrevented: e.defaultPrevented,
		detail: e.detail,
		eventPhase: e.eventPhase,
		eventPhase: e.fromElement?e.fromElement.id:null,
		isTrusted: e.isTrusted,
		layerX: e.layerX,
		layerY: e.layerY,
		metaKey: e.metaKey,
		movementX: e.movementX,
		movementY: e.movementY,
		offsetX: e.offsetX,
		offsetY: e.offsetY,
		pageX: e.pageX,
		pageY: e.pageY,
		returnValue: e.returnValue,
		screenX: e.screenX,
		screenY: e.screenY,
		shiftKey: e.shiftKey,
		srcElement: e.srcElement?e.srcElement.id:null,
		target: e.target.id,
		timeStamp: e.timeStamp,
		toElement: e.toElement?e.toElement.id:null,
		which: e.which,
		x: e.x,
		y: e.y
	};
}
function customAlert(data) {
	var blockStart = performance.now();
	alert(data.text);
	return {
		timeShift: performance.now()-blockStart
	}
}
function customAddEventListener(data) {
	log('addEventListener',data);
	var eventCallback = function(domEvent) {
		var e = eventToObject(domEvent);
		e.uid = `_${data.uid}_${data.name}`;
		sendMessage(e);
	};
	getNode(data.id).addEventListener(data.name, eventCallback.bind(data), false);
	return {};
}
function evaluateAction(data, callback) {

  if (shouldSkip(data)) {
    log('skip',data);
    return callback({skip:true});
  }
  var start = performance.now();

	var actions = {
		'createNode': createNode,
		'focus': focusEl,
		'setHTML': setHTML,
		'getStyleValue': getStyleValue,
		'setTextContent': setTextContent,
		'alert': customAlert,
		'addEventListener': customAddEventListener,
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
    setTimePerAction(data.action, performance.now()-start);
    log('action',data);
	} else {
		callback({});
    log('no-action',data);
	}
}
function performAction(data,callback) {

	var result = [];
	if (data.length) {
		smartBatchSort(data).forEach(adata => {
      evaluateAction(adata, (item)=>{
        result.push(item);
        if (result.length === data.length) {
          callback(result);
        }
      });
		});
	} else {
		evaluateAction(data,callback);
	}

}
requestAnimationFrame(actionLoop);
