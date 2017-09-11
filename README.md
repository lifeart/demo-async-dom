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
