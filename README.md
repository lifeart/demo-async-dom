# Demo-async-dom, #AsyncDOM
[Demo page](https://lifeart.github.io/demo-async-dom/) with async dom and wrebworkers

# Why?

```javascript

console.time('commonAppend');
for (var i = 0; i < 10000; i++) {
	body.appendChild(document.createElement('div'));
}
console.timeEnd('commonAppend');
// -> 1000ms

console.time('asyncAppend');
for (var i = 0; i < 10000; i++) {
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
// -> 10ms

```
# Logic

1. All DOM modifications collected in single pool
2. For each `requestAnimationFrame` we create fittable modifications list (pool slice)
3. If our modifications took more than 16ms, we put remaining modifications back to pool
4. Repeat all operations for next frame

* DOM modifications are sorted for optimal "rolling changes" (first create an element, add styles, and then add to DOM (not create an element, add to DOM, add styles))
* Optional DOM modifications (if the performance does not allow this modification, it is thrown out of the queue)
* Modifications orioritization and batching (you can create an array of modifications that will always be executed within a single frame)

# Description:
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
