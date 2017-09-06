var _this = self;

function asyncSendMessage(data) {
    return new Promise(function(resolve, reject) {
        _this.sendMessage(data, function(result) {
            resolve(result);
        });
    });
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

function asyncHeadAppendChild(id) {
    return asyncSendMessage({
        action: 'headAppendChild',
        id: id
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

var navigator = {};
var elId = 0;
var document = {
    title: 'test',
    body: {
        style: {

        }
    }
};
var window = {
    focus() {
        _this.sendMessage({
            action: 'focus',
            id: id
        });
    },
    localStorage: {
        setItem: function() {},
        getItem: function() {},
    },
    location: {

    },
    history: {
        pushState: function() {

        }
    },
    screen: {
        width: 1280,
        height: 720
    }
}
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
var maxId = 0;
_this.onmessage = function(e) {
    uids[e.data.uid] && uids[e.data.uid](e.data);
    if (String(e.data.uid).charAt(0) !== '_') {
        delete uids[e.data.uid];
    }
};
var mid = 0;
_this.sendMessage = function(data, callback) {
    maxId++;
    mid++;
    data.uid = maxId;
    if (callback) {
        uids[maxId] = callback
    }
    data.cb = callback ? true : false;
    _this.postMessage(data);
}
function adjustSpeed(data) {

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
var actionsList = [];
var batchCallbacks = [];
function sendBatch() {
	asyncBatchMessages(actionsList);
	actionsList = [];
}

var updateTimeout = null
var packSize = 5;
var batchTimeout = 400;
var asyncBatch = function(action) {
  actionsList.push(action);
	if (actionsList.length > packSize) {
		sendBatch();
	}
  updateTimeout = setTimeout(function() {
      sendBatch();
  }, batchTimeout);
}
function slowUp() {
	if (packSize < 20) {
		packSize++;
	}
	colorUpdateInterval--;
	batchTimeout++;
}
function slowDown() {
	if (packSize > 2) {
		packSize--;
	}
	colorUpdateInterval++
	batchTimeout--;
}
var colorUpdateInterval = 10000;
function scheduleColorUpdate(id) {
    setTimeout(function() {
		asyncSendMessage({
            action: 'setStyle',
            id: id,
            optional: true,
            attribute: 'background-color',
            value: getRandomColor()
        }).then(function(){
			scheduleColorUpdate(id);
		});

    }, colorUpdateInterval*Math.sin(Date.now()));
}

async function _initWebApp() {
    for (let i = 0; i < 7000; i++) {
        var id = i;
        var style = 'display:inline-block;width:10px;height:10px;background-color:' + getRandomColor() + ';';
        var actions = [{
                action: 'createNode',
                id: id,
                tag: 'div'
            },
            {
                action: 'bodyAppendChild',
                id: id
            },
            {
                action: 'setAttribute',
                id: id,
                attribute: 'style',
                value: style
            }
        ]
        // await asyncCreateElement(id,'div');
        // await asyncBodyAppendChild(id);
        // await asyncSetAttribute(id,'style',);
        await asyncBatchMessages(actions);
        scheduleColorUpdate(id);
    }
}
