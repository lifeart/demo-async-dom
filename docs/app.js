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
var fpsMs = 16;
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
    'bodyAppendChild': 3
  };

  return actions.sort((a,b)=>{
    return priorityActionsMap[a.action] - priorityActionsMap[b.action];
  });
  // priority - create, style, append
}
function performanceFeedback(delta) {
    // var realDelta = delta / 1000;
    // if (isNaN(realDelta)) {
    //   return;
    // }
    calcAvgActionTime();
    renderConfig.timePerLastFrame = delta;
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
  return 0;
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
function getOptimalActionsCap() {
  var optimalCap = Math.round((fpsMs*1.8)/(avgActionTime || 1) || 10);
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
  var newActions = getActionsForLoop();
  log('actions.length',newActions.length);
  var totalActions = newActions.length;
  newActions.forEach(action=>{
    performAction(action, (result)=>{
      if (result.skip) {
        totalActions--;
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
  performanceFeedback(feedbackDelta);
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
    return callback({skip:true});
  }
  var start = performance.now();

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
