var worker =  new Worker('ww.js');

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


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
function performanceFeedback(delta) {
	// if (delta > 20) {
		worker.postMessage({
			uid: '_onPerformanceFeedback',
			delta: delta
		});
	// }
}
var mid = 0;
worker.onmessage = function(e) {
	start = Date.now();
	mid++;
	// console.log('resived',mid);
	requestAnimationFrame(function(){
		var result = performAction(e);
		performanceFeedback(Date.now()-start);
		if (e.data.cb) {
			result.uid = e.data.uid;
			worker.postMessage(result);
		}
	});
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
function evaluateAction(data) {

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
		return getNodeData(data);
	} else {
		return {}
	}
}
function performAction(e) {

	var result = null;
	if (e.data.length) {
		result = [];
		e.data.forEach(data => {
			result.push(evaluateAction(data));
		});
	} else {
		result = evaluateAction(e.data);
	}
	return result;

}
