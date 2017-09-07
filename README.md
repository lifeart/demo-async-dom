# Demo-async-dom, #AsyncDOM
[Demo page](https://lifeart.github.io/demo-async-dom/) with async dom and wrebworkers



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
