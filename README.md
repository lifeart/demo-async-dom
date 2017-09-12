# Demo-async-dom, #AsyncDOM
[Demo page](https://lifeart.github.io/demo-async-dom/) with async dom and wrebworkers

# Why?

```javascript

console.time('commonAppend');
for (let i = 0; i < 10000; i++) {
	document.body.appendChild(document.createElement('div'));
}
console.timeEnd('commonAppend');
//commonAppend: 62.622802734375ms

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
//asyncAppend: 277.938232421875ms

console.time('asyncAppendBatch');
var msgs = [];
for (let i = 0; i < 10000; i++) {
	let id = i;
	msgs.push([{
		action: 'createNode',
		id: id,
		tag: 'div'
	},{
		action: 'bodyAppendChild',
		id: id
	}]);
}
asyncSendMessage(msgs);
console.timeEnd('asyncAppendBatch');
//asyncAppend: 27.975830078125ms

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
