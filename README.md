# Demo-async-dom, #AsyncDOM
* [Demo page](https://lifeart.github.io/demo-async-dom/) with async dom and webworkers
* [Demo Page (no async-dom)] (https://lifeart.github.io/demo-async-dom/index2.html) no async dom and webworkers
* [Ember.js App](https://lifeart.github.io/demo-async-dom/ember/index.html) with async dom and webworkers
* [Glimmer.js App](https://lifeart.github.io/demo-async-dom/glimmer-port/index.html) with async dom and webworkers
* [Glimmer.js App (no AsyncDom)](https://lifeart.github.io/sierpinski-glimmer/)
* [React App](https://lifeart.github.io/demo-async-dom/react-port/index.html) with async dom and webworkers
------------------------------------------
# Latest codebase in /glimmer-port/ folder
------------------------------------------

# Why?

```javascript

console.time('commonAppend');
for (let i = 0; i < 10000; i++) {
	document.body.appendChild(document.createElement('div'));
}
console.timeEnd('commonAppend');
//commonAppend: 62.622802734375ms - 300+ms (depend at layout calculation time, t != const)

console.time('asyncAppend');
for (let i = 0; i < 10000; i++) {
	let id = i;
	asyncSendMessage({
		action: 'createNode',
		id: id,
		tag: 'div'
	});
	asyncSendMessage({
		action: 'bodyAppendChild',
		id: id
	});
}
console.timeEnd('asyncAppend');
//asyncAppend: 277.938232421875ms (not depend at layout calculation time, t = const)

console.time('asyncAppendGroup');
for (let i = 0; i < 10000; i++) {
	let id = i;
	asyncSendMessage([{
		action: 'createNode',
		id: id,
		tag: 'div'
	},{
		action: 'bodyAppendChild',
		id: id
	}]);
}
console.timeEnd('asyncAppendGroup');
//asyncAppend: 117.579833984375ms (not depend at layout calculation time, t = const)

console.time('asyncAppendBatch');
var msgs = [];
for (let i = 0; i < 10000; i++) {
	let id = i;
	msgs.push({
		action: 'createNode',
		id: id,
		tag: 'div'
	});
	msgs.push({
		action: 'bodyAppendChild',
		id: id
	});
}
asyncSendMessage(msgs);
console.timeEnd('asyncAppendBatch');
//asyncAppend: 23.794189453125ms (not depend at layout calculation time, t = const)

```
# Logic

1. All DOM modifications collected in single pool
2. For each `requestAnimationFrame` we create fittable modifications list (pool slice)
3. If our modifications took more than 16ms, we put remaining modifications back to pool
4. Repeat all operations for next frame

* DOM modifications are sorted for optimal "rolling changes" (first create an element, add styles, and then add to DOM (not create an element, add to DOM, add styles))
* Optional DOM modifications (if the performance does not allow this modification, it is thrown out of the queue)
* Modifications orioritization and batching (you can create an array of modifications that will always be executed within a single frame)

# Description
This is a proof of concept of asynchronous DOM modification example with:
* event binding
* DOM modifications batching
* 60 fps performance
* optional DOM updates

# Main thread (DOM EventLoop)
* Only DOM update logic

# WebWorker 
* Business logic
* All DOM modifications came from WebWorker and applyed to Main thread DOM


* [async PreventDefault/StopPropagation](https://github.com/lifeart/async-event) - as part of concept
