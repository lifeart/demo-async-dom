(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()})(0,function(){"use strict"
function t(t){return t[st]}function e(t,e){t[st]=e}function s(t="unreachable"){return new Error(t)}function n(t,e){if(!t)throw new Error(e||"assertion failure")}function i(t){for(let e=1;e<arguments.length;e++){let s=arguments[e]
if(null===s||"object"!=typeof s)continue
let n=nt(s)
for(let e=0;e<n.length;e++){let i=n[e]
t[i]=s[i]}}return t}function r(t){let e=new Array(t)
for(let s=0;s<t;s++)e[s]=null
return e}function a(t){return t._guid=++it}function l(t){return t._guid||a(t)}function o(){return Object.create(null)}function h(t){let e=bt.length
bt.push(t=>t.value()),yt.push((t,e)=>t.validate(e)),t.id=e}function u({tag:t}){return t===kt}function c(t){return t===kt}function p(t){let e=[]
for(let s=0,n=t.length;s<n;s++){let n=t[s].tag
if(n===wt)return wt
n!==kt&&e.push(n)}return f(e)}function d(t){let e=[],s=t.head()
for(;null!==s;){let n=s.tag
if(n===wt)return wt
n!==kt&&e.push(n),s=t.nextNode(s)}return f(e)}function m(t){let e=[]
for(let s=0,n=t.length;s<n;s++){let n=t[s]
if(n===wt)return wt
n!==kt&&e.push(n)}return f(e)}function f(t){switch(t.length){case 0:return kt
case 1:return t[0]
case 2:return Ct.create(t[0],t[1])
default:return xt.create(t)}}function g(t){return function(e){return Array.isArray(e)&&e[0]===t}}function b(t,e,s){let[,n,i,r]=t
s.expr(i),r?s.dynamicAttr(n,r,e):s.dynamicAttr(n,null,e)}function y(t){return!(!t||!t[ve])}function v(t,e,s){let n=t.lookupComponent(e,s)
return n}function k(t){return w(t)?"":String(t)}function w(t){return null===t||void 0===t||"function"!=typeof t.toString}function S(t){return"object"==typeof t&&null!==t&&"function"==typeof t.toHTML}function _(t){return"object"==typeof t&&null!==t&&"number"==typeof t.nodeType}function E(t){return _(t)&&11===t.nodeType}function C(t){return"string"==typeof t}function x(t,e){return new Ve(t,e)}function A(t,e){let s=t.parentElement(),n=t.firstNode(),i=t.lastNode(),r=n
for(;r;){let t=r.nextSibling
if(s.insertBefore(r,e),r===i)return t
r=t}return null}function N(t){let e=t.parentElement(),s=t.firstNode(),n=t.lastNode(),i=s
for(;i;){let t=i.nextSibling
if(e.removeChild(i),i===n)return t
i=t}return null}function O(t,e,s){if(!t)return e
if(!function(t,e){let s=t.createElementNS(e,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(t){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==ze}}(t,s))return e
let n=t.createElement("div")
return class extends e{insertHTMLBefore(t,e,i){return null===i||""===i?super.insertHTMLBefore(t,e,i):t.namespaceURI!==s?super.insertHTMLBefore(t,e,i):function(t,e,s,n){let i="<svg>"+s+"</svg>"
e.innerHTML=i
let[r,a]=function(t,e,s){let n=t.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,e.insertBefore(i,s)
return[n,i]}(e.firstChild,t,n)
return new je(t,r,a)}(t,n,i,e)}}}function T(t,e){return t&&function(t){let e=t.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(t)?class extends e{constructor(t){super(t),this.uselessComment=t.createComment("")}insertHTMLBefore(t,e,s){if(null===s)return super.insertHTMLBefore(t,e,s)
let n=!1,i=e?e.previousSibling:t.lastChild
i&&i instanceof Text&&(n=!0,t.insertBefore(this.uselessComment,e))
let r=super.insertHTMLBefore(t,e,s)
return n&&t.removeChild(this.uselessComment),r}}:e}function L(t,e){return-1!==t.indexOf(e)}function B(t,e){return(null===t||L(Ze,t))&&L(es,e)}function D(t,e){return null!==t&&(L(ts,t)&&L(ss,e))}function R(t,e){return B(t,e)||D(t,e)}function M(t,e,s,n){let i=null
if(null===n||void 0===n)return n
if(S(n))return n.toHTML()
i=e?e.tagName.toUpperCase():null
let r=k(n)
if(B(i,s)){let e=t.protocolForURL(r)
if(L(Qe,e))return`unsafe:${r}`}return D(i,s)?`unsafe:${r}`:r}function F(t,e){let s,n
if(e in t)n=e,s="prop"
else{let i=e.toLowerCase()
i in t?(s="prop",n=i):(s="attr",n=e)}return"prop"!==s||"style"!==n.toLowerCase()&&!function(t,e){let s=ns[t.toUpperCase()]
return s&&s[e.toLowerCase()]||!1}(t.tagName,n)||(s="attr"),{normalized:n,type:s}}function P(t,e){let{tagName:s,namespaceURI:n}=t
if(n===He)return I(s,e)
let{type:i,normalized:r}=F(t,e)
return"attr"===i?I(s,r):function(t,e){if(R(t,e))return ls
if(function(t,e){return("INPUT"===t||"TEXTAREA"===t)&&"value"===e}(t,e))return hs
if(function(t,e){return"OPTION"===t&&"selected"===e}(t,e))return us
return as}(s,r)}function I(t,e){return R(t,e)?os:rs}function j(t){return!1===t||void 0===t||null===t||void 0===t.toString?null:!0===t?"":"function"==typeof t?null:String(t)}function V(t,e,s){let{block:n,referrer:r}=t,{hasEval:a,symbols:l}=n,o=i({},e,{asPartial:s,referrer:r})
return new ne(n.statements,t,o,{referrer:r,hasEval:a,symbols:l})}function z(){}function H(...t){let[e,s,n]=t
return"string"==typeof e?function(e,s,n){return U(e,s,n,t)}:n?U(e,s,n,[]):void function(t,e){let s,n=Symbol(e)
$(t).trackedProperties[e]=!0,void 0!==t[e]&&(s=t[e])
Object.defineProperty(t,e,{configurable:!0,get(){return this[n]},set(t){$(this).dirtyableTagFor(e).inner.dirty(),this[n]=t,tn()}})}(e,s)}function U(t,e,s,n){let i=$(t)
return i.trackedProperties[e]=!0,i.trackedPropertyDependencies[e]=n||[],{enumerable:!0,configurable:!1,get:s.get,set:function(){$(this).dirtyableTagFor(e).inner.dirty(),s.set.apply(this,arguments),tn()}}}function $(t){let e=t[Qs]
return e&&function(t,e){return Zs.call(t,e)}(t,Qs)?e:t[Qs]=new Js(e)}function G(t,e,s=function(t,e){throw en.for(t,e)}){if("object"==typeof t&&t){return $(t).tagFor(e)}return kt}function Y(t,e,s){return t|e<<16|s<<30}function W(t,e){return t|e<<30}function X(t,e){let s=t.getSelf(),n=e.capture(),i=n.positional.at(0).value()
return"function"!=typeof i&&function(t,e){let s=function(t){let e,s,n=""
if(null===t||void 0===t)return n
"parent"in t&&"property"in t?(e=t.parent.value(),s=t.property):"_parentValue"in t&&"_propertyKey"in t&&(e=t._parentValue,s=t._propertyKey)
void 0!==s&&(n+=`('${s}' on ${function(t){let e=typeof t
if(null===t||void 0===t)return e
if("number"===e||"boolean"===e)return t.toString()
if(t.debugName)return t.debugName
try{return JSON.stringify(t)}catch(t){}return t.toString()}(e)}) `)
return n}(e)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof t} instead of a function.`)}(i,n.positional.at(0)),new Vs(function(...t){let e=n.positional.value()
e.shift(),e.push(...t),i.apply(s&&s.value(),e)})}function q(t){return void 0!==t.rootName&&void 0!==t.collection&&void 0!==t.name&&void 0!==t.type}function K(t){let e=t.type,s=function(t){let e=[]
t.rootName&&e.push(t.rootName)
t.collection&&e.push(t.collection)
t.namespace&&e.push(t.namespace)
t.name&&e.push(t.name)
if(e.length>0){let s=e.join("/")
return q(t)&&(s="/"+s),s}}(t)
return s?e+":"+s:e}function J(t){let e={}
if(t.indexOf(":")>-1){let[s,n]=t.split(":")
e.type=s
let i
0===n.indexOf("/")?(i=n.substr(1).split("/"),e.rootName=i.shift(),e.collection=i.shift()):i=n.split("/"),i.length>0&&(e.name=i.pop(),i.length>0&&(e.namespace=i.join("/")))}else e.type=t
return e}function Q(t,e){if(!e)throw new Error("Assertion Failed: "+t)}function Z(t){return Math.round(1e3*Math.random())%t}class tt{constructor(t,e=null){this._registry=t,this._resolver=e,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(t){let e=this._factoryDefinitionLookups[t]
if(e||(this._resolver&&(e=this._resolver.retrieve(t)),e||(e=this._registry.registration(t)),e&&(this._factoryDefinitionLookups[t]=e)),e)return this.buildFactory(t,e)}lookup(t){let e=!1!==this._registry.registeredOption(t,"singleton")
if(e&&this._lookups[t])return this._lookups[t]
let s=this.factoryFor(t)
if(!s)return
if(!1===this._registry.registeredOption(t,"instantiate"))return s.class
let n=s.create()
return e&&n&&(this._lookups[t]=n),n}defaultInjections(t){return{}}buildInjections(t){let e,s=this.defaultInjections(t),n=this._registry.registeredInjections(t)
for(let i=0;i<n.length;i++)s[(e=n[i]).property]=this.lookup(e.source)
return s}buildFactory(t,e){let s=this.buildInjections(t)
return{class:e,create(t){let n=Object.assign({},s,t)
return e.create(n)}}}}class et{constructor(t){this._registrations={},this._registeredOptions={},this._registeredInjections={},t&&t.fallback&&(this._fallback=t.fallback)}register(t,e,s){this._registrations[t]=e,s&&(this._registeredOptions[t]=s)}registration(t){let e=this._registrations[t]
return void 0===e&&this._fallback&&(e=this._fallback.registration(t)),e}unregister(t){delete this._registrations[t],delete this._registeredOptions[t],delete this._registeredInjections[t]}registerOption(t,e,s){let n=this._registeredOptions[t]
n||(n={},this._registeredOptions[t]=n),n[e]=s}registeredOption(t,e){let s,n=this.registeredOptions(t)
return n&&(s=n[e]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(t,e)),s}registeredOptions(t){let e=this._registeredOptions[t]
if(void 0===e){let[s]=t.split(":")
e=this._registeredOptions[s]}return e}unregisterOption(t,e){let s=this._registeredOptions[t]
s&&delete s[e]}registerInjection(t,e,s){let n=this._registeredInjections[t]
void 0===n&&(this._registeredInjections[t]=n=[]),n.push({property:e,source:s})}registeredInjections(t){let[e]=t.split(":"),s=this._fallback?this._fallback.registeredInjections(t):[]
return Array.prototype.push.apply(s,this._registeredInjections[e]),Array.prototype.push.apply(s,this._registeredInjections[t]),s}}const st="__owner__",{keys:nt}=Object
let it=0
class rt{constructor(){this.dict=o()}add(t){return"string"==typeof t?this.dict[t]=t:this.dict[l(t)]=t,this}delete(t){"string"==typeof t?delete this.dict[t]:t._guid&&delete this.dict[t._guid]}}class at{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(t){this.current=t,this.stack.push(t)}pop(){let t=this.stack.pop(),e=this.stack.length
return this.current=0===e?null:this.stack[e-1],void 0===t?null:t}isEmpty(){return 0===this.stack.length}}class lt{constructor(t){this.next=null,this.prev=null,this.value=t}}class ot{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t.next}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=e.next}insertBefore(t,e=null){return null===e?this.append(t):(e.prev?e.prev.next=t:this._head=t,t.prev=e.prev,t.next=e,e.prev=t,t)}append(t){let e=this._tail
return e?(e.next=t,t.prev=e,t.next=null):this._head=t,this._tail=t}remove(t){return t.prev?t.prev.next=t.next:this._head=t.next,t.next?t.next.prev=t.prev:this._tail=t.prev,t}}class ht{constructor(t,e){this._head=t,this._tail=e}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=this.nextNode(e)}head(){return this._head}tail(){return this._tail}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t===this._tail?null:t.next}}new ht(null,null)
const ut=Object.freeze([])
class ct{constructor(){this.evaluateOpcode=r(78).slice()}add(t,e){this.evaluateOpcode[t]=e}evaluate(t,e,s){(0,this.evaluateOpcode[s])(t,e)}}const pt=new ct
class dt{constructor(){a(this)}}class mt extends dt{constructor(){super(...arguments),this.next=null,this.prev=null}}var ft;(function(t){t[t.pc=0]="pc",t[t.ra=1]="ra",t[t.fp=2]="fp",t[t.sp=3]="sp",t[t.s0=4]="s0",t[t.s1=5]="s1",t[t.t0=6]="t0",t[t.t1=7]="t1",t[t.v0=8]="v0"})(ft||(ft={}))
class gt{validate(t){return this.value()===t}}gt.id=0
const bt=[],yt=[]
class vt{constructor(t,e){this.type=t,this.inner=e}value(){return(0,bt[this.type])(this.inner)}validate(t){return(0,yt[this.type])(this.inner,t)}}bt.push(()=>0),yt.push((t,e)=>0===e)
const kt=new vt(0,null)
bt.push(()=>NaN),yt.push((t,e)=>NaN===e)
const wt=new vt(1,null)
bt.push(()=>St),yt.push((t,e)=>e===St)
new vt(2,null)
let St=1
class _t extends gt{static create(t=St){return new vt(this.id,new _t(t))}constructor(t=St){super(),this.revision=t}value(){return this.revision}dirty(){this.revision=++St}}h(_t)
class Et extends gt{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let{lastChecked:t,lastValue:e}=this
return t!==St&&(this.lastChecked=St,this.lastValue=e=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class Ct extends Et{static create(t,e){return new vt(this.id,new Ct(t,e))}constructor(t,e){super(),this.first=t,this.second=e}compute(){return Math.max(this.first.value(),this.second.value())}}h(Ct)
class xt extends Et{static create(t){return new vt(this.id,new xt(t))}constructor(t){super(),this.tags=t}compute(){let{tags:t}=this,e=-1
for(let s=0;s<t.length;s++){let n=t[s].value()
e=Math.max(n,e)}return e}}h(xt)
class At extends Et{static create(t){return new vt(this.id,new At(t))}constructor(t){super(),this.tag=t,this.lastUpdated=1}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(t){t!==this.tag&&(this.tag=t,this.lastUpdated=St,this.invalidate())}}h(At)
class Nt{constructor(){this.lastRevision=null,this.lastValue=null}value(){let{tag:t,lastRevision:e,lastValue:s}=this
return null!==e&&t.validate(e)||(s=this.lastValue=this.compute(),this.lastRevision=t.value()),s}invalidate(){this.lastRevision=null}}class Ot{constructor(t){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=t.tag,this.reference=t}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let{reference:t,lastRevision:e}=this,s=t.tag
if(s.validate(e))return Tt
this.lastRevision=s.value()
let{lastValue:n}=this,i=t.value()
return i===n?Tt:(this.lastValue=i,i)}initialize(){let{reference:t}=this,e=this.lastValue=t.value()
return this.lastRevision=t.tag.value(),this.initialized=!0,e}}const Tt="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class Lt{constructor(t){this.inner=t,this.tag=kt}value(){return this.inner}}class Bt extends lt{constructor(t,e){super(t.valueReferenceFor(e)),this.retained=!1,this.seen=!1,this.key=e.key,this.iterable=t,this.memo=t.memoReferenceFor(e)}update(t){this.retained=!0,this.iterable.updateValueReference(this.value,t),this.iterable.updateMemoReference(this.memo,t)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class Dt{constructor(t){this.iterator=null,this.map=o(),this.list=new ot,this.tag=t.tag,this.iterable=t}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let t
return t=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,t}has(t){return!!this.map[t]}get(t){return this.map[t]}wasSeen(t){let e=this.map[t]
return void 0!==e&&e.seen}append(t){let{map:e,list:s,iterable:n}=this,i=e[t.key]=new Bt(n,t)
return s.append(i),i}insertBefore(t,e){let{map:s,list:n,iterable:i}=this,r=s[t.key]=new Bt(i,t)
return r.retained=!0,n.insertBefore(r,e),r}move(t,e){let{list:s}=this
t.retained=!0,s.remove(t),s.insertBefore(t,e)}remove(t){let{list:e}=this
e.remove(t),delete this.map[t.key]}nextNode(t){return this.list.nextNode(t)}head(){return this.list.head()}}class Rt{constructor(t){this.iterator=null
let e=new Dt(t)
this.artifacts=e}next(){let{artifacts:t}=this,e=(this.iterator=this.iterator||t.iterate()).next()
return null===e?null:t.append(e)}}var Mt;(function(t){t[t.Append=0]="Append",t[t.Prune=1]="Prune",t[t.Done=2]="Done"})(Mt||(Mt={}))
class Ft{constructor({target:t,artifacts:e}){this.target=t,this.artifacts=e,this.iterator=e.iterate(),this.current=e.head()}sync(){let t=Mt.Append
for(;;)switch(t){case Mt.Append:t=this.nextAppend()
break
case Mt.Prune:t=this.nextPrune()
break
case Mt.Done:return void this.nextDone()}}advanceToKey(t){let{current:e,artifacts:s}=this,n=e
for(;null!==n&&n.key!==t;)n.seen=!0,n=s.nextNode(n)
null!==n&&(this.current=s.nextNode(n))}nextAppend(){let{iterator:t,current:e,artifacts:s}=this,n=t.next()
if(null===n)return this.startPrune()
let{key:i}=n
return null!==e&&e.key===i?this.nextRetain(n):s.has(i)?this.nextMove(n):this.nextInsert(n),Mt.Append}nextRetain(t){let{artifacts:e,current:s}=this;(s=s).update(t),this.current=e.nextNode(s),this.target.retain(t.key,s.value,s.memo)}nextMove(t){let{current:e,artifacts:s,target:n}=this,{key:i}=t,r=s.get(t.key)
r.update(t),s.wasSeen(t.key)?(s.move(r,e),n.move(r.key,r.value,r.memo,e?e.key:null)):this.advanceToKey(i)}nextInsert(t){let{artifacts:e,target:s,current:n}=this,i=e.insertBefore(t,n)
s.insert(i.key,i.value,i.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),Mt.Prune}nextPrune(){let{artifacts:t,target:e,current:s}=this
if(null===s)return Mt.Done
let n=s
return this.current=t.nextNode(n),n.shouldRemove()?(t.remove(n),e.delete(n.key)):n.reset(),Mt.Prune}nextDone(){this.target.done()}}class Pt extends Lt{constructor(t){super(t)}static create(t){return void 0===t?Vt:null===t?zt:!0===t?Ht:!1===t?Ut:"number"==typeof t?new jt(t):new It(t)}get(t){return Vt}}class It extends Pt{constructor(){super(...arguments),this.lengthReference=null}get(t){if("length"===t){let{lengthReference:t}=this
return null===t&&(t=this.lengthReference=new jt(this.inner.length)),t}return super.get(t)}}class jt extends Pt{constructor(t){super(t)}}const Vt=new jt(void 0),zt=new jt(null),Ht=new jt(!0),Ut=new jt(!1)
class $t{constructor(t){this.inner=t,this.tag=t.tag}value(){return this.toBool(this.inner.value())}toBool(t){return!!t}}class Gt extends Nt{constructor(t){super(),this.parts=t,this.tag=p(t)}compute(){let t=new Array
for(let e=0;e<this.parts.length;e++){let s=this.parts[e].value()
null!==s&&void 0!==s&&(t[e]=function(t){return"function"!=typeof t.toString?"":String(t)}(s))}return t.length>0?t.join(""):null}}pt.add(1,(t,{op1:e})=>{let s=t.stack,n=t.constants.resolveHandle(e)(t,s.pop())
t.loadValue(ft.v0,n)}),pt.add(4,(t,{op1:e})=>{let s=t.referenceForSymbol(e)
t.stack.push(s)}),pt.add(2,(t,{op1:e})=>{let s=t.stack.pop()
t.scope().bindSymbol(e,s)}),pt.add(3,(t,{op1:e})=>{let s=t.stack.pop(),n=t.stack.pop(),i=t.stack.pop(),r=i?[s,n,i]:null
t.scope().bindBlock(e,r)}),pt.add(76,(t,{op1:e})=>{let s=t.constants.getString(e),n=t.scope().getPartialMap()[s]
void 0===n&&(n=t.getSelf().get(s)),t.stack.push(n)}),pt.add(17,(t,{op1:e,op2:s})=>{t.pushRootScope(e,!!s)}),pt.add(5,(t,{op1:e})=>{let s=t.constants.getString(e),n=t.stack.pop()
t.stack.push(n.get(s))}),pt.add(6,(t,{op1:e})=>{let{stack:s}=t,n=t.scope().getBlock(e)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),pt.add(7,(t,{op1:e})=>{let s=!!t.scope().getBlock(e)
t.stack.push(s?Ht:Ut)}),pt.add(8,t=>{let e=t.stack.pop(),s=e&&e.parameters.length
t.stack.push(s?Ht:Ut)}),pt.add(9,(t,{op1:e})=>{let s=new Array(e)
for(let n=e;n>0;n--){s[n-1]=t.stack.pop()}t.stack.push(new Gt(s))})
var Yt;(function(t){t[t.Text=0]="Text",t[t.Append=1]="Append",t[t.Comment=2]="Comment",t[t.Modifier=3]="Modifier",t[t.Block=4]="Block",t[t.Component=5]="Component",t[t.OpenElement=6]="OpenElement",t[t.OpenSplattedElement=7]="OpenSplattedElement",t[t.FlushElement=8]="FlushElement",t[t.CloseElement=9]="CloseElement",t[t.StaticAttr=10]="StaticAttr",t[t.DynamicAttr=11]="DynamicAttr",t[t.AttrSplat=12]="AttrSplat",t[t.Yield=13]="Yield",t[t.Partial=14]="Partial",t[t.DynamicArg=15]="DynamicArg",t[t.StaticArg=16]="StaticArg",t[t.TrustingAttr=17]="TrustingAttr",t[t.Debugger=18]="Debugger",t[t.ClientSideStatement=19]="ClientSideStatement",t[t.Unknown=20]="Unknown",t[t.Get=21]="Get",t[t.MaybeLocal=22]="MaybeLocal",t[t.HasBlock=23]="HasBlock",t[t.HasBlockParams=24]="HasBlockParams",t[t.Undefined=25]="Undefined",t[t.Helper=26]="Helper",t[t.Concat=27]="Concat",t[t.ClientSideExpression=28]="ClientSideExpression"})(Yt||(Yt={}))
const Wt=g(Yt.Get),Xt=g(Yt.MaybeLocal)
var qt;(function(t){t[t.OpenComponentElement=0]="OpenComponentElement",t[t.DidCreateElement=1]="DidCreateElement",t[t.SetComponentAttrs=2]="SetComponentAttrs",t[t.DidRenderLayout=3]="DidRenderLayout",t[t.Debugger=4]="Debugger"})(qt||(qt={}))
var Kt=Yt
class Jt{constructor(t=0){this.offset=t,this.names=o(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}compile(t,e){let s=t[this.offset],n=this.names[s],i=this.funcs[n]
i(t,e)}}let Qt,Zt
class te{constructor(){let{blocks:t,inlines:e}=function(t=new ee,e=new se){return t.add("if",(t,e,s,n,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(t[0]),i.toBoolean(),i.enter(1),i.jumpUnless("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),t.add("unless",(t,e,s,n,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(t[0]),i.toBoolean(),i.enter(1),i.jumpIf("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),t.add("with",(t,e,s,n,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(t[0]),i.dup(),i.toBoolean(),i.enter(2),i.jumpUnless("ELSE"),i.invokeStaticBlock(s,1),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),t.add("each",(t,e,s,n,i)=>{i.startLabels(),i.pushFrame(),i.returnTo("END"),e&&"key"===e[0][0]?i.expr(e[1][0]):i.pushPrimitiveReference(null),i.expr(t[0]),i.enter(2),i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.returnTo("ITER"),i.dup(ft.fp,1),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(s,2),i.pop(2),i.exit(),i.return(),i.label("BREAK"),i.exitList(),i.popFrame(),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),t.add("in-element",(t,e,s,n,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END")
let[r,a]=e
for(let l=0;l<r.length;l++){let t=r[l]
if("nextSibling"!==t&&"guid"!==t)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
i.expr(a[l])}i.expr(t[0]),i.dup(),i.enter(4),i.jumpUnless("ELSE"),i.pushRemoteElement(),i.invokeStaticBlock(s),i.popRemoteElement(),i.label("ELSE"),i.exit(),i.return(),i.label("END"),i.popFrame(),i.stopLabels()}),t.add("-with-dynamic-vars",(t,e,s,n,i)=>{if(e){let[t,n]=e
i.compileParams(n),i.pushDynamicScope(),i.bindDynamicScope(t),i.invokeStaticBlock(s),i.popDynamicScope()}else i.invokeStaticBlock(s)}),t.add("component",(t,e,s,n,i)=>{let[r,...a]=t
i.dynamicComponent(r,a,e,!0,s,n)}),e.add("component",(t,e,s,n)=>{let[i,...r]=e
return n.dynamicComponent(i,r,s,!0,null,null),!0}),{blocks:t,inlines:e}}()
this.blocks=t,this.inlines=e}}class ee{constructor(){this.names=o(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e,s,n,i,r){let a=this.names[t]
if(void 0===a){(0,this.missing)(t,e,s,n,i,r)}else{(0,this.funcs[a])(e,s,n,i,r)}}}class se{constructor(){this.names=o(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e){let s=t[1]
if(!Array.isArray(s))return["expr",s]
let n,i,r
if(s[0]===Kt.Helper)n=s[1],i=s[2],r=s[3]
else{if(s[0]!==Kt.Unknown)return["expr",s]
n=s[1],i=r=null}let a=this.names[n]
if(void 0===a&&this.missing){let t=(0,this.missing)(n,i,r,e)
return!1===t?["expr",s]:t}if(void 0!==a){let t=(0,this.funcs[a])(n,i,r,e)
return!1===t?["expr",s]:t}return["expr",s]}}class ne{constructor(t,e,s,n){this.statements=t,this.containingLayout=e,this.options=s,this.symbolTable=n,this.compiled=null,this.statementCompiler=function(){if(Qt)return Qt
const t=Qt=new Jt
t.add(Kt.Text,(t,e)=>{e.text(t[1])}),t.add(Kt.Comment,(t,e)=>{e.comment(t[1])}),t.add(Kt.CloseElement,(t,e)=>{e.closeElement()}),t.add(Kt.FlushElement,(t,e)=>{e.flushElement()}),t.add(Kt.Modifier,(t,e)=>{let{lookup:s,referrer:n}=e,[,i,r,a]=t,l=s.lookupModifier(i,n)
if(!l)throw new Error(`Compile Error ${i} is not a modifier: Helpers may not be used in the element form.`)
e.modifier(l,r,a)}),t.add(Kt.StaticAttr,(t,e)=>{let[,s,n,i]=t
e.staticAttr(s,i,n)}),t.add(Kt.DynamicAttr,(t,e)=>{b(t,!1,e)}),t.add(Kt.TrustingAttr,(t,e)=>{b(t,!0,e)}),t.add(Kt.OpenElement,(t,e)=>{e.openPrimitiveElement(t[1])}),t.add(Kt.OpenSplattedElement,(t,e)=>{e.setComponentAttrs(!0),e.putComponentOperations(),e.openElementWithOperations(t[1])}),t.add(Kt.Component,(t,e)=>{let[,s,n,i,r]=t,{lookup:a,referrer:l}=e,o=a.lookupComponentSpec(s,l)
if(null===o)throw new Error(`Compile Error: Cannot find component ${s}`)
{let t=a.getCapabilities(o),s=[[Kt.ClientSideStatement,qt.SetComponentAttrs,!0],...n,[Kt.ClientSideStatement,qt.SetComponentAttrs,!1]],l=e.inlineBlock({statements:s,parameters:ut}),h=e.template(r)
if(!1===t.dynamicLayout){let s=a.getLayout(o)
e.pushComponentDefinition(o),e.invokeStaticComponent(t,s,l,null,i,!1,h&&h)}else e.pushComponentDefinition(o),e.invokeComponent(l,null,i,!1,h&&h)}}),t.add(Kt.Partial,(t,e)=>{let[,s,n]=t,{referrer:i}=e
e.startLabels(),e.pushFrame(),e.returnTo("END"),e.expr(s),e.dup(),e.enter(2),e.jumpUnless("ELSE"),e.invokePartial(i,e.evalSymbols(),n),e.popScope(),e.popFrame(),e.label("ELSE"),e.exit(),e.return(),e.label("END"),e.popFrame(),e.stopLabels()}),t.add(Kt.Yield,(t,e)=>{let[,s,n]=t
e.yield(s,n)}),t.add(Kt.AttrSplat,(t,e)=>{let[,s]=t
e.yield(s,[]),e.didCreateElement(ft.s0),e.setComponentAttrs(!1)}),t.add(Kt.Debugger,(t,e)=>{let[,s]=t
e.debugger(e.evalSymbols(),s)}),t.add(Kt.ClientSideStatement,(t,s)=>{e.compile(t,s)}),t.add(Kt.Append,(t,e)=>{let[,s,n]=t,{inlines:i}=e.macros
if(!0===(i.compile(t,e)||s))return
let r=Wt(s),a=Xt(s)
n?e.guardedAppend(s,!0):r||a?e.guardedAppend(s,!1):(e.expr(s),e.dynamicContent(!1))}),t.add(Kt.Block,(t,e)=>{let[,s,n,i,r,a]=t,l=e.template(r),o=e.template(a),h=l&&l,u=o&&o,{blocks:c}=e.macros
c.compile(s,n,i,h,u,e)})
const e=new Jt(1)
return e.add(qt.OpenComponentElement,(t,e)=>{e.putComponentOperations(),e.openElementWithOperations(t[2])}),e.add(qt.DidCreateElement,(t,e)=>{e.didCreateElement(ft.s0)}),e.add(qt.SetComponentAttrs,(t,e)=>{e.setComponentAttrs(t[2])}),e.add(qt.Debugger,()=>{}),e.add(qt.DidRenderLayout,(t,e)=>{e.didRenderLayout(ft.s0)}),t}()}static topLevel(t,e){return new ne(t.statements,{block:t,referrer:e.referrer},e,{referrer:e.referrer,hasEval:t.hasEval,symbols:t.symbols})}compile(){let{compiled:t}=this
if(null!==t)return t
let{options:e,statements:s,containingLayout:n}=this,{referrer:i}=n,{program:r,lookup:a,macros:l,asPartial:o,Builder:h}=e,u=new h(r,a,i,l,n,o)
for(let p=0;p<s.length;p++)this.statementCompiler.compile(s[p],u)
let c=u.commit(r.heap)
return this.compiled=c}}class ie{constructor(t){this.builder=t}static(t,e){let[s,n,i,r]=e,{builder:a}=this,{lookup:l}=a
if(null!==t){let e=l.getCapabilities(t)
if(!1===e.dynamicLayout){let o=l.getLayout(t)
a.pushComponentDefinition(t),a.invokeStaticComponent(e,o,null,s,n,!1,i,r)}else a.pushComponentDefinition(t),a.invokeComponent(null,s,n,!1,i,r)}}}class re{constructor(t){this.buffer=t,this.typePos=0,this.size=0}encode(t,...e){if(t>255)throw new Error(`Opcode type over 8-bits. Got ${t}.`)
this.buffer.push(t|e.length<<8),this.typePos=this.buffer.length-1,e.forEach(t=>{if(t>65535)throw new Error(`Operand over 16-bits. Got ${t}.`)
this.buffer.push(t)}),this.size=this.buffer.length}compact(t){return String.fromCharCode(...t)}patch(t,e){if(-1!==this.buffer[t+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[t+1]=e}}class ae{constructor(){this.labels=o(),this.targets=[]}label(t,e){this.labels[t]=e}target(t,e,s){this.targets.push({at:t,Target:e,target:s})}patch(t){let{targets:e,labels:s}=this
for(let n=0;n<e.length;n++){let{at:i,target:r}=e[n],a=s[r]-i
t.patch(i,a)}}}class le{constructor(t,e,s,n,i,r){this.program=t,this.lookup=e,this.referrer=s,this.macros=n,this.containingLayout=i,this.asPartial=r,this.encoder=new re([]),this.labelsStack=new at,this.isComponentAttrs=!1,this.component=new ie(this),this.constants=t.constants,this.expressionCompiler=function(){if(Zt)return Zt
const t=Zt=new Jt
return t.add(Kt.Unknown,(t,e)=>{let{lookup:s,asPartial:n,referrer:i}=e,r=t[1],a=s.lookupHelper(r,i)
null!==a?e.helper(a,null,null):n?e.resolveMaybeLocal(r):(e.getVariable(0),e.getProperty(r))}),t.add(Kt.Concat,(t,e)=>{let s=t[1]
for(let n=0;n<s.length;n++)e.expr(s[n])
e.concat(s.length)}),t.add(Kt.Helper,(t,e)=>{let{lookup:s,referrer:n}=e,[,i,r,a]=t
if("component"===i){let[t,...s]=r
return void e.curryComponent(t,s,a,!0)}let l=s.lookupHelper(i,n)
if(null===l)throw new Error(`Compile Error: ${i} is not a helper`)
e.helper(l,r,a)}),t.add(Kt.Get,(t,e)=>{let[,s,n]=t
e.getVariable(s)
for(let i=0;i<n.length;i++)e.getProperty(n[i])}),t.add(Kt.MaybeLocal,(t,e)=>{let[,s]=t
if(e.asPartial){let t=s[0]
s=s.slice(1),e.resolveMaybeLocal(t)}else e.getVariable(0)
for(let n=0;n<s.length;n++)e.getProperty(s[n])}),t.add(Kt.Undefined,(t,e)=>e.pushPrimitiveReference(void 0)),t.add(Kt.HasBlock,(t,e)=>{e.hasBlock(t[1])}),t.add(Kt.HasBlockParams,(t,e)=>{e.hasBlockParams(t[1])}),t}()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}expr(t){Array.isArray(t)?this.expressionCompiler.compile(t,this):this.pushPrimitiveReference(t)}upvars(t){return r(t)}reserve(t,e=1){let s=[]
for(let n=0;n<e;n++)s[n]=-1
this.push(t,...s)}push(t,...e){let{encoder:s}=this
s.encode(t,...e)}commit(t){this.push(20)
let{buffer:e}=this.encoder,s=t.malloc()
for(let n=0;n<e.length;n++)t.push(e[n])
return t.finishMalloc(s,this.containingLayout.block.symbols.length),s}setComponentAttrs(t){this.isComponentAttrs=t}pushArgs(t,e){let s=this.constants.stringArray(t)
this.push(61,s,e)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new ae)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(t){this.push(59,this.constants.handle(t))}pushDynamicComponentManager(t){this.push(60,this.constants.serializable(t))}prepareArgs(t){this.push(63,t)}createComponent(t,e,s){let n=(!0===e?1:0)|(!0===s?1:0)<<1
this.push(64,n,t)}registerComponentDestructor(t){this.push(65,t)}beginComponentTransaction(){this.push(71)}commitComponentTransaction(){this.push(72)}putComponentOperations(){this.push(66)}getComponentSelf(t){this.push(67,t)}getComponentTagName(t){this.push(68,t)}getComponentLayout(t){this.push(69,t)}invokeComponentLayout(){this.push(70)}didCreateElement(t){this.push(73,t)}didRenderLayout(t){this.push(74,t)}invokePartial(t,e,s){let n=this.constants.serializable(t),i=this.constants.stringArray(e),r=this.constants.array(s)
this.push(75,n,i,r)}resolveMaybeLocal(t){this.push(76,this.string(t))}debugger(t,e){this.push(77,this.constants.stringArray(t),this.constants.array(e))}dynamicContent(t){this.push(24,t?1:0)}text(t){this.push(22,this.constants.string(t))}openPrimitiveElement(t){this.push(25,this.constants.string(t))}openElementWithOperations(t){this.push(26,this.constants.string(t))}openDynamicElement(){this.push(27)}flushElement(){this.push(31)}closeElement(){this.push(32)}staticAttr(t,e,s){let n=this.constants.string(t),i=e?this.constants.string(e):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(30,n,1,i)
else{let t=this.constants.string(s)
this.push(28,n,t,i)}}dynamicAttr(t,e,s){let n=this.constants.string(t),i=e?this.constants.string(e):0
this.isComponentAttrs?this.push(30,n,!0===s?1:0,i):this.push(29,n,!0===s?1:0,i)}comment(t){let e=this.constants.string(t)
this.push(23,e)}modifier(t,e,s){this.pushFrame(),this.compileArgs(e,s,null,!0),this.push(33,this.constants.handle(t)),this.popFrame()}putIterator(){this.push(55)}enterList(t){this.reserve(53),this.labels.target(this.pos,53,t)}exitList(){this.push(54)}iterate(t){this.reserve(56),this.labels.target(this.pos,56,t)}setVariable(t){this.push(2,t)}setBlock(t){this.push(3,t)}getVariable(t){this.push(4,t)}getProperty(t){this.push(5,this.string(t))}getBlock(t){this.push(6,t)}hasBlock(t){this.push(7,t)}hasBlockParams(t){this.getBlock(t),this.resolveBlock(),this.push(8)}concat(t){this.push(9,t)}load(t){this.push(15,t)}fetch(t){this.push(16,t)}dup(t=ft.sp,e=0){return this.push(13,t,e)}pop(t=1){return this.push(14,t)}pushRemoteElement(){this.push(34)}popRemoteElement(){this.push(35)}label(t){this.labels.label(t,this.nextPos)}pushRootScope(t,e){this.push(17,t,e?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}returnTo(t){this.reserve(21),this.labels.target(this.pos,21,t)}pushDynamicScope(){this.push(37)}popDynamicScope(){this.push(38)}primitive(t){let e,s=0
switch(typeof t){case"number":t%1==0?t>-1?e=t:(e=this.negative(t),s=4):(e=this.float(t),s=1)
break
case"string":e=this.string(t),s=2
break
case"boolean":e=0|t,s=3
break
case"object":e=2,s=3
break
case"undefined":e=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,e<<3|s)}float(t){return this.constants.float(t)}negative(t){return this.constants.negative(t)}pushPrimitiveReference(t){this.primitive(t),this.primitiveReference()}primitiveReference(){this.push(12)}helper(t,e,s){this.pushFrame(),this.compileArgs(e,s,null,!0),this.push(1,this.constants.handle(t)),this.popFrame(),this.fetch(ft.v0)}bindDynamicScope(t){this.push(36,this.names(t))}enter(t){this.push(50,t)}exit(){this.push(51)}return(){this.push(20)}pushFrame(){this.push(48)}popFrame(){this.push(49)}invokeVirtual(){this.push(42)}invokeYield(){this.push(44)}toBoolean(){this.push(52)}jump(t){this.reserve(45),this.labels.target(this.pos,45,t)}jumpIf(t){this.reserve(46),this.labels.target(this.pos,46,t)}jumpUnless(t){this.reserve(47),this.labels.target(this.pos,47,t)}string(t){return this.constants.string(t)}names(t){let e=[]
for(let s=0;s<t.length;s++){let n=t[s]
e[s]=this.constants.string(n)}return this.constants.array(e)}symbols(t){return this.constants.array(t)}inlineBlock(t){let{parameters:e,statements:s}=t,n={parameters:e,referrer:this.containingLayout.referrer},i={program:this.program,macros:this.macros,Builder:this.constructor,lookup:this.lookup,asPartial:this.asPartial,referrer:this.referrer}
return new ne(s,this.containingLayout,i,n)}evalSymbols(){let{containingLayout:{block:t}}=this
return t.hasEval?t.symbols:null}compileParams(t){if(!t)return 0
for(let e=0;e<t.length;e++)this.expr(t[e])
return t.length}compileArgs(t,e,s,n){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let i=this.compileParams(t)<<4
n&&(i|=8),s&&(i|=7)
let r=ut
if(e){r=e[0]
let t=e[1]
for(let e=0;e<t.length;e++)this.expr(t[e])}this.pushArgs(r,i)}invokeStaticBlock(t,e=0){let{parameters:s}=t.symbolTable,n=s.length,i=Math.min(e,n)
if(this.pushFrame(),i){this.pushChildScope()
for(let t=0;t<i;t++)this.dup(ft.fp,e-t),this.setVariable(s[t])}this.pushBlock(t),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}guardedAppend(t,e){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(t),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushDynamicComponentManager(this.referrer),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(e),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}yield(t,e){this.compileArgs(e,null,null,!1),this.getBlock(t),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}invokeComponent(t,e,s,n,i,r=null,a){this.fetch(ft.s0),this.dup(ft.sp,1),this.load(ft.s0),this.pushFrame()
let l={main:i,else:r,attrs:t}
this.compileArgs(e,s,l,n),this.prepareArgs(ft.s0),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ft.s0,null!==i,null!==r),this.registerComponentDestructor(ft.s0),this.getComponentSelf(ft.s0),a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(ft.s0),this.invokeComponentLayout(),this.didRenderLayout(ft.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(ft.s0)}invokeStaticComponent(t,e,n,i,r,a,l,o=null){let{symbolTable:h}=e
if(h.hasEval||t.prepareArgs)return void this.invokeComponent(n,i,r,a,l,o,e)
this.fetch(ft.s0),this.dup(ft.sp,1),this.load(ft.s0)
let{symbols:u}=h
t.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ft.s0,null!==l,null!==o),t.createArgs&&this.popFrame(),this.registerComponentDestructor(ft.s0)
let c=[]
this.getComponentSelf(ft.s0),c.push({symbol:0,isBlock:!1})
for(let p=0;p<u.length;p++){let t=u[p]
switch(t.charAt(0)){case"&":let e=null
if("&default"===t)e=l
else if("&inverse"===t)e=o
else{if("&attrs"!==t)throw s()
e=n}e?(this.pushYieldableBlock(e),c.push({symbol:p+1,isBlock:!0})):(this.pushYieldableBlock(null),c.push({symbol:p+1,isBlock:!0}))
break
case"@":if(!r)break
let[i,h]=r,u=t
a&&(u=t.slice(1))
let d=i.indexOf(u);-1!==d&&(this.expr(h[d]),c.push({symbol:p+1,isBlock:!1}))}}this.pushRootScope(u.length+1,!!(l||o||n))
for(let s=c.length-1;s>=0;s--){let{symbol:t,isBlock:e}=c[s]
e?this.setBlock(t):this.setVariable(t)}this.pushFrame(),this.invokeStatic(e),this.didRenderLayout(ft.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(ft.s0)}dynamicComponent(t,e,s,n,i,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(t),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.pushDynamicComponentManager(this.referrer),this.invokeComponent(null,e,s,n,i,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(t,e,s,n){let i=this.referrer
this.pushFrame(),this.compileArgs(e,s,null,n),this.expr(t),this.push(58,this.constants.serializable(i)),this.popFrame(),this.fetch(ft.v0)}pushSymbolTable(t){if(t){let e=this.constants.table(t)
this.push(41,e)}else this.primitive(null)}pushBlockScope(){this.push(40)}pushYieldableBlock(t){this.pushSymbolTable(t&&t.symbolTable),this.pushBlockScope(),this.pushBlock(t)}template(t){return t?this.inlineBlock(t):null}}class oe extends le{pushBlock(t){t?this.pushOther(t):this.primitive(null)}resolveBlock(){this.push(39)}pushLayout(t){t?this.pushOther(t):this.primitive(null)}resolveLayout(){this.push(39)}invokeStatic(t){this.pushOther(t),this.push(39),this.push(42)}pushOther(t){this.push(10,this.other(t))}other(t){return this.constants.other(t)}}class he{constructor(){this.stack=null,this.positional=new ue,this.named=new pe,this.blocks=new me}setup(t,e,s,n,i){this.stack=t
let r=this.named,a=e.length,l=t.sp-a+1
r.setup(t,l,a,e,i)
let o=l-n
this.positional.setup(t,o,n)
let h=this.blocks,u=s.length,c=o-3*u
h.setup(t,c,u,s)}get tag(){return p([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(t){return this.positional.at(t)}realloc(t){if(t>0){let{positional:e,named:s,stack:n}=this,i=e.base+t
for(let t=e.length+s.length-1;t>=0;t--)n.set(n.get(t,e.base),t,i)
e.base+=t,s.base+=t,n.sp+=t}}capture(){let t=0===this.positional.length?be:this.positional.capture(),e=0===this.named.length?ge:this.named.capture()
return{tag:this.tag,length:this.length,positional:t,named:e}}clear(){let{stack:t,length:e}=this
t.pop(e)}}class ue{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(t,e,s){this.stack=t,this.base=e,this.length=s,0===s?(this._tag=kt,this._references=ut):(this._tag=null,this._references=null)}get tag(){let t=this._tag
return t||(t=this._tag=p(this.references)),t}at(t){let{base:e,length:s,stack:n}=this
return t<0||t>=s?Vt:n.get(t,e)}capture(){return new ce(this.tag,this.references)}prepend(t){let e=t.length
if(e>0){let{base:s,length:n,stack:i}=this
this.base=s-=e,this.length=n+e
for(let r=0;r<e;r++)i.set(t.at(r),r,s)
this._tag=null,this._references=null}}get references(){let t=this._references
if(!t){let{stack:e,base:s,length:n}=this
t=this._references=e.slice(s,s+n)}return t}}class ce{constructor(t,e,s=e.length){this.tag=t,this.references=e,this.length=s}static empty(){return new ce(kt,ut,0)}at(t){return this.references[t]}value(){return this.references.map(this.valueOf)}get(t){let{references:e,length:s}=this
if("length"===t)return Pt.create(s)
{let n=parseInt(t,10)
return n<0||n>=s?Vt:e[n]}}valueOf(t){return t.value()}}class pe{constructor(){this.base=0,this.length=0,this._tag=null,this._references=null,this._names=ut,this._atNames=ut}setup(t,e,s,n,i){this.stack=t,this.base=e,this.length=s,0===s?(this._tag=kt,this._references=ut,this._names=ut,this._atNames=ut):(this._tag=null,this._references=null,i?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return p(this.references)}get names(){let t=this._names
return t||(t=this._names=this._atNames.map(this.toSyntheticName)),t}get atNames(){let t=this._atNames
return t||(t=this._atNames=this._names.map(this.toAtName)),t}has(t){return-1!==this.names.indexOf(t)}get(t,e=!0){let{base:s,stack:n}=this,i=(e?this.names:this.atNames).indexOf(t)
return-1===i?Vt:n.get(i,s)}capture(){return new de(this.tag,this.names,this.references)}merge(t){let{length:e}=t
if(e>0){let{names:s,length:n,stack:i}=this,{names:r}=t
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<e;a++){let e=r[a];-1===s.indexOf(e)&&(n=s.push(e),i.push(t.references[a]))}this.length=n,this._tag=null,this._references=null,this._names=s,this._atNames=null}}get references(){let t=this._references
if(!t){let{base:e,length:s,stack:n}=this
t=this._references=n.slice(e,e+s)}return t}toSyntheticName(t){return t.slice(1)}toAtName(t){return`@${t}`}}class de{constructor(t,e,s){this.tag=t,this.names=e,this.references=s,this.length=e.length,this._map=null}get map(){let t=this._map
if(!t){let{names:e,references:s}=this
t=this._map=o()
for(let n=0;n<e.length;n++){t[e[n]]=s[n]}}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let{names:e,references:s}=this,n=e.indexOf(t)
return-1===n?Vt:s[n]}value(){let{names:t,references:e}=this,s=o()
for(let n=0;n<t.length;n++){s[t[n]]=e[n].value()}return s}}class me{constructor(){this.internalValues=null,this.internalTag=null,this.names=ut,this.length=0,this.base=0}setup(t,e,s,n){this.stack=t,this.names=n,this.base=e,this.length=s,0===s?(this.internalTag=kt,this.internalValues=ut):(this.internalTag=null,this.internalValues=null)}get values(){let t=this.internalValues
if(!t){let{base:e,length:s,stack:n}=this
t=this.internalValues=n.slice(e,e+3*s)}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let{base:e,stack:s,names:n}=this,i=n.indexOf(t)
if(-1===n.indexOf(t))return null
let r=s.get(3*i,e),a=s.get(3*i+1,e),l=s.get(3*i+2,e)
return null===l?null:[l,a,r]}capture(){return new fe(this.names,this.values)}}class fe{constructor(t,e){this.names=t,this.values=e,this.length=t.length}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names.indexOf(t)
return-1===e?null:[this.values[3*e+2],this.values[3*e+1],this.values[3*e]]}}const ge=new de(kt,ut,ut),be=new ce(kt,ut),ye={tag:kt,length:0,positional:be,named:ge},ve="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
class ke{constructor(t,e){this.inner=t,this.args=e,this[ve]=!0}unwrap(t){t.realloc(this.offset)
let e=this
for(;;){let{args:s,inner:n}=e
if(s&&(t.positional.prepend(s.positional),t.named.merge(s.named)),!y(n))return n
e=n}}get offset(){let{inner:t,args:e}=this,s=e?e.positional.length:0
return y(t)?s+t.offset:s}}class we extends $t{static create(t){return new we(t)}toBool(t){return y(t)}}pt.add(24,(t,{op1:e})=>{let s,n=t.stack.pop(),i=n.value()
s=e?t.elements().appendTrustingDynamicContent(i):t.elements().appendCautiousDynamicContent(i),u(n)||t.updateWith(new Se(n,s))})
class Se extends mt{constructor(t,e){super(),this.reference=t,this.content=e,this.tag=t.tag}evaluate(t){let{content:e,reference:s}=this
e.update(t.env,s.value())}}pt.add(18,t=>t.pushChildScope()),pt.add(19,t=>t.popScope()),pt.add(37,t=>t.pushDynamicScope()),pt.add(38,t=>t.popDynamicScope()),pt.add(10,(t,{op1:e})=>{t.stack.push(t.constants.getOther(e))}),pt.add(11,(t,{op1:e})=>{let s=t.stack,n=e>>3
switch(7&e){case 0:s.push(n)
break
case 1:s.push(t.constants.getFloat(n))
break
case 2:s.push(t.constants.getString(n))
break
case 3:switch(n){case 0:s.push(!1)
break
case 1:s.push(!0)
break
case 2:s.push(null)
break
case 3:s.push(void 0)}break
case 4:s.push(t.constants.getNegative(n))}}),pt.add(12,t=>{let e=t.stack
e.push(Pt.create(e.pop()))}),pt.add(13,(t,{op1:e,op2:s})=>{let n=t.fetchValue(e)-s
t.stack.dup(n)}),pt.add(14,(t,{op1:e})=>{t.stack.pop(e)}),pt.add(15,(t,{op1:e})=>{t.load(e)}),pt.add(16,(t,{op1:e})=>{t.fetch(e)}),pt.add(36,(t,{op1:e})=>{let s=t.constants.getArray(e)
t.bindDynamicScope(s)}),pt.add(48,t=>{t.pushFrame()}),pt.add(49,t=>{t.popFrame()}),pt.add(50,(t,{op1:e})=>{t.enter(e)}),pt.add(51,t=>{t.exit()}),pt.add(41,(t,{op1:e})=>{t.stack.push(t.constants.getSymbolTable(e))}),pt.add(40,t=>{t.stack.push(t.scope())}),pt.add(39,t=>{let e=t.stack,s=e.pop()
e.push(s?s.compile():null)}),pt.add(42,t=>{t.call(t.stack.pop())}),pt.add(43,(t,{op1:e})=>{t.call(e)}),pt.add(44,t=>{let{stack:e}=t,s=e.pop(),n=e.pop(),i=e.pop(),r=e.pop()
if(null===i)return t.pushFrame(),void t.pushScope(n)
let a=n
{let t=i.parameters,e=t.length
if(e>0){a=a.child()
for(let s=0;s<e;s++)a.bindSymbol(t[s],r.at(s))}}t.pushFrame(),t.pushScope(a),t.call(s)}),pt.add(45,(t,{op1:e})=>{t.goto(e)}),pt.add(46,(t,{op1:e})=>{let s=t.stack.pop()
if(u(s))s.value()&&t.goto(e)
else{let n=new Ot(s)
n.peek()&&t.goto(e),t.updateWith(new _e(n))}}),pt.add(47,(t,{op1:e})=>{let s=t.stack.pop()
if(u(s))s.value()||t.goto(e)
else{let n=new Ot(s)
n.peek()||t.goto(e),t.updateWith(new _e(n))}}),pt.add(20,t=>{t.return()}),pt.add(21,(t,{op1:e})=>{t.returnTo(e)}),pt.add(52,t=>{let{env:e,stack:s}=t
s.push(e.toConditionalReference(s.pop()))})
class _e extends mt{constructor(t){super(),this.type="assert",this.tag=t.tag,this.cache=t}evaluate(t){let{cache:e}=this;(function(t){return t!==Tt})(e.revalidate())&&t.throw()}}class Ee extends mt{constructor(t,e){super(),this.target=e,this.type="jump-if-not-modified",this.tag=t,this.lastRevision=t.value()}evaluate(t){let{tag:e,target:s,lastRevision:n}=this
!t.alwaysRevalidate&&e.validate(n)&&t.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class Ce extends mt{constructor(t){super(),this.target=t,this.type="did-modify",this.tag=kt}evaluate(){this.target.didModify()}}class xe{constructor(t){this.tag=kt,this.type="label",this.label=null,this.prev=null,this.next=null,a(this),this.label=t}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}pt.add(22,(t,{op1:e})=>{t.elements().appendText(t.constants.getString(e))}),pt.add(26,(t,{op1:e})=>{let s=t.constants.getString(e)
t.elements().openElement(s)}),pt.add(23,(t,{op1:e})=>{t.elements().appendComment(t.constants.getString(e))}),pt.add(25,(t,{op1:e})=>{t.elements().openElement(t.constants.getString(e))}),pt.add(27,t=>{let e=t.stack.pop().value()
t.elements().openElement(e)}),pt.add(34,t=>{let e,s,n=t.stack.pop(),i=t.stack.pop(),r=t.stack.pop().value()
if(u(n))e=n.value()
else{let s=new Ot(n)
e=s.peek(),t.updateWith(new _e(s))}if(u(i))s=i.value()
else{let e=new Ot(i)
s=e.peek(),t.updateWith(new _e(e))}t.elements().pushRemoteElement(e,r,s)}),pt.add(35,t=>{t.elements().popRemoteElement()}),pt.add(31,t=>{let e=t.fetchValue(ft.t0)
e&&(e.flush(t),t.loadValue(ft.t0,null)),t.elements().flushElement()}),pt.add(32,t=>{t.elements().closeElement()}),pt.add(33,(t,{op1:e})=>{let s=t.constants.resolveHandle(e),n=t.stack.pop(),{constructing:i,updateOperations:r}=t.elements(),a=t.dynamicScope(),l=s.create(i,n,a,r)
t.env.scheduleInstallModifier(l,s)
let o=s.getDestructor(l)
o&&t.newDestroyable(o)
let h=s.getTag(l)
c(h)||t.updateWith(new Ae(h,s,l))})
class Ae extends mt{constructor(t,e,s){super(),this.tag=t,this.manager=e,this.modifier=s,this.type="update-modifier",this.lastUpdated=t.value()}evaluate(t){let{manager:e,modifier:s,tag:n,lastUpdated:i}=this
n.validate(i)||(t.env.scheduleUpdateModifier(s,e),this.lastUpdated=n.value())}}pt.add(28,(t,{op1:e,op2:s,op3:n})=>{let i=t.constants.getString(e),r=t.constants.getString(s),a=n?t.constants.getString(n):null
t.elements().setStaticAttribute(i,r,a)}),pt.add(29,(t,{op1:e,op2:s,op3:n})=>{let i=t.constants.getString(e),r=t.stack.pop(),a=r.value(),l=n?t.constants.getString(n):null,o=t.elements().setDynamicAttribute(i,a,!!s,l)
u(r)||t.updateWith(new Ne(r,o))})
class Ne extends mt{constructor(t,e){super(),this.reference=t,this.attribute=e,this.type="patch-element",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(t){let{attribute:e,reference:s,tag:n}=this
n.validate(this.lastRevision)||(this.lastRevision=n.value(),e.update(s.value(),t.env))}}class Oe{constructor(t,e,s,n){this.inner=t,this.resolver=e,this.meta=s,this.args=n,this.tag=t.tag,this.lastValue=null,this.lastDefinition=null}value(){let{inner:t,lastValue:e}=this,s=t.value()
if(s===e)return this.lastDefinition
let n=null
if(y(s))n=s
else if("string"==typeof s&&s){let{resolver:t,meta:e}=this
n=v(t,s,e)}return n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return Vt}curry(t){let{args:e}=this
return!e&&y(t)?t:t?new ke(t,e):null}}class Te{constructor(t){this.list=t,this.tag=p(t),this.list=t}value(){let t=[],{list:e}=this
for(let s=0;s<e.length;s++){let n=k(e[s].value())
n&&t.push(n)}return 0===t.length?null:t.join(" ")}}const Le=new he
pt.add(57,t=>{let e=t.stack,s=e.pop()
e.push(we.create(s))}),pt.add(58,(t,{op1:e})=>{let s=t.stack,n=s.pop(),i=s.pop(),r=null
i.length&&(r=i.capture())
let a=t.constants.getSerializable(e),l=t.constants.resolver
t.loadValue(ft.v0,new Oe(n,l,a,r))}),pt.add(59,(t,{op1:e})=>{let s=t.constants.resolveHandle(e),{manager:n}=s
t.stack.push({definition:s,manager:n,state:null})}),pt.add(60,(t,{op1:e})=>{let n,i=t.stack,r=i.pop().value()
if("string"==typeof r){let{constants:s,constants:{resolver:i}}=t
n=v(i,r,s.getSerializable(e))}else{if(!y(r))throw s()
n=r}i.push({definition:n,manager:null,state:null})}),pt.add(61,(t,{op1:e,op2:s})=>{let n=t.stack,i=t.constants.getStringArray(e),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),Le.setup(n,i,l,r,!!a),n.push(Le)}),pt.add(63,(t,{op1:e})=>{let s,n=t.stack,i=t.fetchValue(e),{definition:r}=i
y(r)?(s=n.pop(),r=i.definition=r.unwrap(s)):s=n.pop()
let{manager:a,state:l}=r
if(i.manager=r.manager,!0!==a.getCapabilities(l).prepareArgs)return void n.push(s)
let o=s.blocks.values,h=s.blocks.names,u=a.prepareArgs(l,s)
if(u){s.clear()
for(let t=0;t<o.length;t++)n.push(o[t])
let{positional:t,named:e}=u,i=t.length
for(let s=0;s<i;s++)n.push(t[s])
let r=Object.keys(e)
for(let s=0;s<r.length;s++)n.push(e[r[s]])
s.setup(n,r,h,i,!0)}n.push(s)}),pt.add(64,(t,{op1:e,op2:s})=>{let n=t.dynamicScope(),i=t.fetchValue(s),{definition:r,manager:a}=i,l=1&e,o=null
a.getCapabilities(r.state).createArgs&&(o=t.stack.peek())
let h=a.create(t.env,r.state,o,n,t.getSelf(),!!l)
i.state=h
let u=a.getTag(h)
c(u)||t.updateWith(new De(u,h,a,n))}),pt.add(65,(t,{op1:e})=>{let{manager:s,state:n}=t.fetchValue(e),i=s.getDestructor(n)
i&&t.newDestroyable(i)}),pt.add(71,t=>{t.beginCacheGroup(),t.elements().pushSimpleBlock()}),pt.add(66,t=>{t.loadValue(ft.t0,new Be)}),pt.add(30,(t,{op1:e,op2:s,op3:n})=>{let i=t.constants.getString(e),r=t.stack.pop(),a=n?t.constants.getString(n):null
t.fetchValue(ft.t0).setAttribute(i,r,!!s,a)})
class Be{constructor(){this.attributes=o(),this.classes=[]}setAttribute(t,e,s,n){let i={value:e,namespace:n,trusting:s}
"class"===t&&this.classes.push(e),this.attributes[t]=i}flush(t){for(let e in this.attributes){let s=this.attributes[e],{value:n,namespace:i,trusting:r}=s
"class"===e&&(n=new Te(this.classes))
let a=t.elements().setDynamicAttribute(e,n.value(),r,i)
u(n)||t.updateWith(new Ne(n,a))}}}pt.add(73,(t,{op1:e})=>{let{definition:s,state:n}=t.fetchValue(e),{manager:i}=s,r=t.fetchValue(ft.t0)
i.didCreateElement(n,t.elements().expectConstructing("DidCreateElementOpcode#evaluate"),r)}),pt.add(67,(t,{op1:e})=>{let{definition:s,state:n}=t.fetchValue(e),{manager:i}=s
t.stack.push(i.getSelf(n))}),pt.add(68,(t,{op1:e})=>{let{definition:s,state:n}=t.fetchValue(e),{manager:i}=s
t.stack.push(i.getTagName(n))}),pt.add(69,(t,{op1:e})=>{let n,i=t.fetchValue(e),{manager:r,definition:a}=i,{constants:{resolver:l},stack:o}=t,{state:h}=i,{state:u}=a
if(function(t,e){return!1===e.getCapabilities(t).dynamicLayout}(u,r))n=r.getLayout(u,l)
else{if(!function(t,e){return!0===e.getCapabilities(t).dynamicLayout}(u,r))throw s()
n=r.getDynamicLayout(h,l)}o.push(n.symbolTable),o.push(n.handle)}),pt.add(70,t=>{let{stack:e}=t,s=e.pop(),{symbols:n,hasEval:i}=e.pop()
{let r=t.pushRootScope(n.length+1,!0)
r.bindSelf(e.pop())
let a=t.stack.pop(),l=null,h=-1
i&&(h=n.indexOf("$eval")+1,l=o())
let u=a.named.atNames
for(let t=u.length-1;t>=0;t--){let e=u[t],s=n.indexOf(u[t]),o=a.named.get(e,!1);-1!==s&&r.bindSymbol(s+1,o),i&&(l[e]=o)}let c=(t,e)=>{let s=n.indexOf(t),i=p.get(e);-1!==s&&r.bindBlock(s+1,i),l&&(l[t]=i)},p=a.blocks
c("&attrs","attrs"),c("&inverse","else"),c("&default","main"),l&&r.bindEvalScope(l),t.call(s)}}),pt.add(74,(t,{op1:e})=>{let{manager:s,state:n}=t.fetchValue(e),i=t.elements().popBlock()
s.didRenderLayout(n,i),t.env.didCreate(n,s),t.updateWith(new Re(s,n,i))}),pt.add(72,t=>{t.commitCacheGroup()})
class De extends mt{constructor(t,e,s,n){super(),this.tag=t,this.component=e,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(t){let{component:e,manager:s,dynamicScope:n}=this
s.update(e,n)}}class Re extends mt{constructor(t,e,s){super(),this.manager=t,this.component=e,this.bounds=s,this.type="did-update-layout",this.tag=kt}evaluate(t){let{manager:e,component:s,bounds:n}=this
e.didUpdateLayout(s,n),t.env.didUpdate(s,e)}}let Me=function(t,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
class Fe{constructor(t,e,s){this.scope=t,this.locals=o()
for(let n=0;n<s.length;n++){let i=s[n],r=e[i-1],a=t.getSymbol(i)
this.locals[r]=a}}get(t){let e,{scope:s,locals:n}=this,i=t.split("."),[r,...a]=t.split("."),l=s.getEvalScope()
return"this"===r?e=s.getSelf():n[r]?e=n[r]:0===r.indexOf("@")&&l[r]?e=l[r]:(e=this.scope.getSelf(),a=i),a.reduce((t,e)=>t.get(e),e)}}pt.add(77,(t,{op1:e,op2:s})=>{let n=t.constants.getStringArray(e),i=t.constants.getArray(s),r=new Fe(t.scope(),n,i)
Me(t.getSelf().value(),t=>r.get(t).value())}),pt.add(75,(t,{op1:e,op2:s,op3:n})=>{let{constants:i,constants:{resolver:r},stack:a}=t,l=a.pop().value(),h=i.getSerializable(e),u=i.getStringArray(s),c=i.getArray(n),p=r.lookupPartial(l,h),d=r.resolve(p),{symbolTable:m,handle:f}=d.getPartial()
{let e=m.symbols,s=t.scope(),n=t.pushRootScope(e.length,!1)
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(s.getEvalScope()),n.bindSelf(s.getSelf())
let i=o()
for(let t=0;t<c.length;t++){let e=c[t],n=u[e-1],r=s.getSymbol(e)
i[n]=r}let r=s.getEvalScope()
for(let t=0;t<e.length;t++){let s=t+1,i=r[e[t]]
void 0!==i&&n.bind(s,i)}n.bindPartialMap(i),t.pushFrame(),t.call(f)}})
class Pe{constructor(t){this.tag=t.tag,this.artifacts=t}value(){return!this.artifacts.isEmpty()}}pt.add(55,t=>{let e=t.stack,s=e.pop(),n=e.pop(),i=t.env.iterableFor(s,n.value()),r=new Rt(i)
e.push(r),e.push(new Pe(r.artifacts))}),pt.add(53,(t,{op1:e})=>{t.enterList(e)}),pt.add(54,t=>{t.exitList()}),pt.add(56,(t,{op1:e})=>{let s=t.stack.peek().next()
if(s){let e=t.iterate(s.memo,s.value)
t.enterItem(s.key,e)}else t.goto(e)})
class Ie{constructor(t,e){this.element=t,this.nextSibling=e}}class je{constructor(t,e,s){this.parentNode=t,this.first=e,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class Ve{constructor(t,e){this.parentNode=t,this.node=e}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}const ze="http://www.w3.org/2000/svg",He="http://www.w3.org/2000/svg",Ue={foreignObject:1,desc:1,title:1},$e=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(t=>$e[t]=1)
let Ge="undefined"==typeof document?null:document
class Ye{constructor(t){this.document=t,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(t,e){let s,n
if(e?(s=e.namespaceURI===He||"svg"===t,n=Ue[e.tagName]):(s="svg"===t,n=!1),s&&!n){if($e[t])throw new Error(`Cannot create a ${t} inside an SVG context`)
return this.document.createElementNS(He,t)}return this.document.createElement(t)}insertBefore(t,e,s){t.insertBefore(e,s)}insertHTMLBefore(t,e,s){return function(t,e,s,n){let i,r=e,a=t,l=s,o=l?l.previousSibling:r.lastChild
if(null===n||""===n)return new je(r,null,null)
null===l?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):l instanceof HTMLElement?(l.insertAdjacentHTML("beforebegin",n),i=l.previousSibling):(r.insertBefore(a,l),a.insertAdjacentHTML("beforebegin",n),i=a.previousSibling,r.removeChild(a))
let h=o?o.nextSibling:r.firstChild
return new je(r,h,i)}(this.uselessElement,t,e,s)}createTextNode(t){return this.document.createTextNode(t)}createComment(t){return this.document.createComment(t)}}var We;(function(t){class e extends Ye{createElementNS(t,e){return this.document.createElementNS(t,e)}setAttribute(t,e,s,n=null){n?t.setAttributeNS(n,e,s):t.setAttribute(e,s)}}t.TreeConstruction=e
let s=e
s=T(Ge,s),s=O(Ge,s,He),t.DOMTreeConstruction=s})(We||(We={}))
class Xe extends Ye{constructor(t){super(t),this.document=t,this.namespace=null}setAttribute(t,e,s){t.setAttribute(e,s)}removeAttribute(t,e){t.removeAttribute(e)}insertAfter(t,e,s){this.insertBefore(t,e,s.nextSibling)}}let qe=Xe
qe=T(Ge,qe)
var Ke=qe=O(Ge,qe,He)
const Je=We.DOMTreeConstruction,Qe=["javascript:","vbscript:"],Ze=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],ts=["EMBED"],es=["href","src","background","action"],ss=["src"],ns={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
class is{constructor(t){this.attribute=t}}class rs extends is{set(t,e,s){let n=j(e)
if(null!==n){let{name:e,namespace:s}=this.attribute
t.__setAttribute(e,n,s)}}update(t,e){let s=j(t),{element:n,name:i}=this.attribute
null===s?n.removeAttribute(i):n.setAttribute(i,s)}}class as extends is{set(t,e,s){if(null!==e&&void 0!==e){let{name:s}=this.attribute
this.value=e,t.__setProperty(s,e)}}update(t,e){let{element:s,name:n}=this.attribute
this.value!==t&&(s[n]=this.value=t,null!==t&&void 0!==t||this.removeAttribute())}removeAttribute(){let{element:t,name:e,namespace:s}=this.attribute
s?t.removeAttributeNS(s,e):t.removeAttribute(e)}}class ls extends as{set(t,e,s){let{element:n,name:i}=this.attribute,r=M(s,n,i,e)
super.set(t,r,s)}update(t,e){let{element:s,name:n}=this.attribute,i=M(e,s,n,t)
super.update(i,e)}}class os extends rs{set(t,e,s){let{element:n,name:i}=this.attribute,r=M(s,n,i,e)
super.set(t,r,s)}update(t,e){let{element:s,name:n}=this.attribute,i=M(e,s,n,t)
super.update(i,e)}}class hs extends as{set(t,e){t.__setProperty("value",k(e))}update(t){let e=this.attribute.element,s=e.value,n=k(t)
s!==n&&(e.value=n)}}class us extends as{set(t,e){null!==e&&void 0!==e&&!1!==e&&t.__setProperty("selected",!0)}update(t){let e=this.attribute.element
e.selected=!!t}}class cs{constructor(t,e,s,n){this.slots=t,this.callerScope=e,this.evalScope=s,this.partialMap=n}static root(t,e=0){let s=new Array(e+1)
for(let n=0;n<=e;n++)s[n]=Vt
return new cs(s,null,null,null).init({self:t})}static sized(t=0){let e=new Array(t+1)
for(let s=0;s<=t;s++)e[s]=Vt
return new cs(e,null,null,null)}init({self:t}){return this.slots[0]=t,this}getSelf(){return this.get(0)}getSymbol(t){return this.get(t)}getBlock(t){return this.get(t)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(t,e){this.set(t,e)}bindSelf(t){this.set(0,t)}bindSymbol(t,e){this.set(t,e)}bindBlock(t,e){this.set(t,e)}bindEvalScope(t){this.evalScope=t}bindPartialMap(t){this.partialMap=t}bindCallerScope(t){this.callerScope=t}getCallerScope(){return this.callerScope}child(){return new cs(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(t){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
return this.slots[t]}set(t,e){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
this.slots[t]=e}}class ps{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(t,e){this.createdComponents.push(t),this.createdManagers.push(e)}didUpdate(t,e){this.updatedComponents.push(t),this.updatedManagers.push(e)}scheduleInstallModifier(t,e){this.scheduledInstallManagers.push(e),this.scheduledInstallModifiers.push(t)}scheduleUpdateModifier(t,e){this.scheduledUpdateModifierManagers.push(e),this.scheduledUpdateModifiers.push(t)}didDestroy(t){this.destructors.push(t)}commit(){let{createdComponents:t,createdManagers:e}=this
for(let h=0;h<t.length;h++){let s=t[h]
e[h].didCreate(s)}let{updatedComponents:s,updatedManagers:n}=this
for(let h=0;h<s.length;h++){let t=s[h]
n[h].didUpdate(t)}let{destructors:i}=this
for(let h=0;h<i.length;h++)i[h].destroy()
let{scheduledInstallManagers:r,scheduledInstallModifiers:a}=this
for(let h=0;h<r.length;h++){let t=r[h],e=a[h]
t.install(e)}let{scheduledUpdateModifierManagers:l,scheduledUpdateModifiers:o}=this
for(let h=0;h<l.length;h++){let t=l[h],e=o[h]
t.update(e)}}}class ds{constructor({appendOperations:t,updateOperations:e}){this._transaction=null,this.appendOperations=t,this.updateOperations=e}toConditionalReference(t){return new $t(t)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(t){return l(t)+""}begin(){this._transaction=new ps}get transaction(){return this._transaction}didCreate(t,e){this.transaction.didCreate(t,e)}didUpdate(t,e){this.transaction.didUpdate(t,e)}scheduleInstallModifier(t,e){this.transaction.scheduleInstallModifier(t,e)}scheduleUpdateModifier(t,e){this.transaction.scheduleUpdateModifier(t,e)}didDestroy(t){this.transaction.didDestroy(t)}commit(){let t=this.transaction
this._transaction=null,t.commit()}attributeFor(t,e,s,n=null){return P(t,e)}}class ms{constructor(t){this.trusting=t}retry(t,e){let{bounds:s}=this,n=s.parentElement(),i=N(s),r=Ss.forInitialRender(t,{element:n,nextSibling:i})
return this.trusting?r.__appendTrustingDynamicContent(e):r.__appendCautiousDynamicContent(e)}}class fs{constructor(t){this.inner=t,this.bounds=t.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(t,e){let s=this.inner=this.inner.update(t,e)
return this.bounds=s.bounds,this}}class gs extends ms{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let{lastValue:s}=this
if(e===s)return this
if(_(e)||S(e))return this.retry(t,e)
let n
if((n=w(e)?"":C(e)?e:String(e))!==s){this.bounds.firstNode().nodeValue=this.lastValue=n}return this}}class bs extends ms{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let{lastValue:s}=this
return e===s?this:this.retry(t,e)}}class ys extends ms{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let{lastValue:s}=this
return e===s?this:S(e)&&e.toHTML()===s.toHTML()?(this.lastValue=e,this):this.retry(t,e)}}class vs extends ms{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let{lastValue:s}=this
if(e===s)return this
return function(t){return w(t)?"":C(t)?t:S(t)?t.toHTML():_(t)?t:String(t)}(e)===s?this:this.retry(t,e)}}class ks{constructor(t){this.node=t}firstNode(){return this.node}}class ws{constructor(t){this.node=t}lastNode(){return this.node}}class Ss{constructor(t,e,s){this.constructing=null,this.operations=null,this.cursorStack=new at,this.blockStack=new at,this.pushElement(e,s),this.env=t,this.dom=t.getAppendOperations(),this.updateOperations=t.getDOM()}static forInitialRender(t,e){let s=new this(t,e.element,e.nextSibling)
return s.pushSimpleBlock(),s}static resume(t,e,s){let n=new this(t,e.parentElement(),s)
return n.pushSimpleBlock(),n.pushBlockTracker(e),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(t){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new _s(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new Cs(this.element))}pushBlockList(t){return this.pushBlockTracker(new xs(this.element,t))}pushBlockTracker(t,e=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(t),e||s.didAppendBounds(t)),this.__openBlock(),this.blockStack.push(t),t}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(t){let e=this.__openElement(t)
return this.constructing=e,e}__openElement(t){return this.dom.createElement(t,this.element)}flushElement(){let t=this.element,e=this.constructing
this.__flushElement(t,e),this.constructing=null,this.operations=null,this.pushElement(e,null),this.didOpenElement(e)}__flushElement(t,e){this.dom.insertBefore(t,e,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(t,e,s=null){this.__pushRemoteElement(t,e,s)}__pushRemoteElement(t,e,s){this.pushElement(t,s)
let n=new Es(t)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(t,e){this.cursorStack.push(new Ie(t,e))}didAddDestroyable(t){this.block().newDestroyable(t)}didAppendBounds(t){return this.block().didAppendBounds(t),t}didAppendNode(t){return this.block().didAppendNode(t),t}didOpenElement(t){return this.block().openElement(t),t}willCloseElement(){this.block().closeElement()}appendText(t){return this.didAppendNode(this.__appendText(t))}__appendText(t){let{dom:e,element:s,nextSibling:n}=this,i=e.createTextNode(t)
return e.insertBefore(s,i,n),i}__appendNode(t){return this.dom.insertBefore(this.element,t,this.nextSibling),t}__appendFragment(t){let e=t.firstChild
if(e){let s=function(t,e,s){return new je(t,e,s)}(this.element,e,t.lastChild)
return this.dom.insertBefore(this.element,t,this.nextSibling),s}return x(this.element,this.__appendComment(""))}__appendHTML(t){return this.dom.insertHTMLBefore(this.element,this.nextSibling,t)}appendTrustingDynamicContent(t){let e=new fs(this.__appendTrustingDynamicContent(t))
return this.didAppendBounds(e),e}__appendTrustingDynamicContent(t){if(C(t))return this.trustedContent(t)
if(w(t))return this.trustedContent("")
if(S(t))return this.trustedContent(t.toHTML())
if(E(t)){let e=this.__appendFragment(t)
return new bs(e,t,!0)}if(_(t)){let e=this.__appendNode(t)
return new bs(x(this.element,e),e,!0)}return this.trustedContent(String(t))}appendCautiousDynamicContent(t){let e=new fs(this.__appendCautiousDynamicContent(t))
return this.didAppendBounds(e.bounds),e}__appendCautiousDynamicContent(t){if(C(t))return this.untrustedContent(t)
if(w(t))return this.untrustedContent("")
if(E(t)){let e=this.__appendFragment(t)
return new bs(e,t,!1)}if(_(t)){let e=this.__appendNode(t)
return new bs(x(this.element,e),e,!1)}if(S(t)){let e=t.toHTML(),s=this.__appendHTML(e)
return new ys(s,t,!1)}return this.untrustedContent(String(t))}trustedContent(t){let e=this.__appendHTML(t)
return new vs(e,t,!0)}untrustedContent(t){let e=this.__appendText(t),s=x(this.element,e)
return new gs(s,t,!1)}appendComment(t){return this.didAppendNode(this.__appendComment(t))}__appendComment(t){let{dom:e,element:s,nextSibling:n}=this,i=e.createComment(t)
return e.insertBefore(s,i,n),i}__setAttribute(t,e,s){this.dom.setAttribute(this.constructing,t,e,s)}__setProperty(t,e){this.constructing[t]=e}setStaticAttribute(t,e,s){this.__setAttribute(t,e,s)}setDynamicAttribute(t,e,s,n){let i=this.constructing,r=new(this.env.attributeFor(i,t,s,n))({element:i,name:t,namespace:n||null})
return r.set(this,e,this.env),r}}class _s{constructor(t){this.parent=t,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let{destroyables:t}=this
if(t&&t.length)for(let e=0;e<t.length;e++)t[e].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(t){this.didAppendNode(t),this.nesting++}closeElement(){this.nesting--}didAppendNode(t){0===this.nesting&&(this.first||(this.first=new ks(t)),this.last=new ws(t))}didAppendBounds(t){0===this.nesting&&(this.first||(this.first=t),this.last=t)}newDestroyable(t){this.destroyables=this.destroyables||[],this.destroyables.push(t)}finalize(t){this.first||t.appendComment("")}}class Es extends _s{destroy(){super.destroy(),N(this)}}class Cs extends _s{reset(t){let{destroyables:e}=this
if(e&&e.length)for(let n=0;n<e.length;n++)t.didDestroy(e[n])
let s=N(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class xs{constructor(t,e){this.parent=t,this.boundList=e,this.parent=t,this.boundList=e}destroy(){this.boundList.forEachNode(t=>t.destroy())}parentElement(){return this.parent}firstNode(){let t=this.boundList.head()
return t&&t.firstNode()}lastNode(){let t=this.boundList.tail()
return t&&t.lastNode()}openElement(t){}closeElement(){}didAppendNode(t){}didAppendBounds(t){}newDestroyable(t){}finalize(t){}}class As{constructor(t,e,{alwaysRevalidate:s=!1}){this.frameStack=new at,this.env=t,this.constants=e.constants,this.dom=t.getDOM(),this.alwaysRevalidate=s}execute(t,e){let{frameStack:s}=this
for(this.try(t,e);;){if(s.isEmpty())break
let t=this.frame.nextStatement()
null!==t?t.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(t){this.frame.goto(t)}try(t,e){this.frameStack.push(new Bs(this,t,e))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Ns extends mt{constructor(t,e,s,n){super(),this.start=t,this.state=e,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(t){t.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class Os extends Ns{constructor(t,e,s,n){super(t,e,s,n),this.type="try",this.tag=this._tag=At.create(kt)}didInitializeChildren(){this._tag.inner.update(d(this.children))}evaluate(t){t.try(this.children,this)}handleException(){let{state:t,bounds:e,children:s,start:n,prev:i,next:r}=this
s.clear()
let a=Ss.resume(t.env,e,e.reset(t.env)),l=Ms.resume(t,a),o=new ot
l.execute(n,e=>{e.stack=Rs.restore(t.stack),e.updatingOpcodeStack.push(o),e.updateWith(this),e.updatingOpcodeStack.push(s)}),this.prev=i,this.next=r}}class Ts{constructor(t,e){this.opcode=t,this.marker=e,this.didInsert=!1,this.didDelete=!1,this.map=t.map,this.updating=t.children}insert(t,e,s,n){let{map:i,opcode:r,updating:a}=this,l=null,o=null
l=n?(o=i[n]).bounds.firstNode():this.marker
let h=r.vmForInsertion(l),u=null,{start:c}=r
h.execute(c,n=>{i[t]=u=n.iterate(s,e),n.updatingOpcodeStack.push(new ot),n.updateWith(u),n.updatingOpcodeStack.push(u.children)}),a.insertBefore(u,o),this.didInsert=!0}retain(t,e,s){}move(t,e,s,n){let{map:i,updating:r}=this,a=i[t],l=i[n]||null
n?A(a,l.firstNode()):A(a,this.marker),r.remove(a),r.insertBefore(a,l)}delete(t){let{map:e}=this,s=e[t]
s.didDestroy(),N(s),this.updating.remove(s),delete e[t],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Ls extends Ns{constructor(t,e,s,n,i){super(t,e,s,n),this.type="list-block",this.map=o(),this.lastIterated=1,this.artifacts=i
let r=this._tag=At.create(kt)
this.tag=m([i.tag,r])}didInitializeChildren(t=!0){this.lastIterated=this.artifacts.tag.value(),t&&this._tag.inner.update(d(this.children))}evaluate(t){let{artifacts:e,lastIterated:s}=this
if(!e.tag.validate(s)){let{bounds:s}=this,{dom:n}=t,i=n.createComment("")
n.insertAfter(s.parentElement(),i,s.lastNode())
let r=new Ts(this,i)
new Ft({target:r,artifacts:e}).sync(),this.parentElement().removeChild(i)}super.evaluate(t)}vmForInsertion(t){let{bounds:e,state:s}=this,n=Ss.forInitialRender(s.env,{element:e.parentElement(),nextSibling:t})
return Ms.resume(s,n)}}class Bs{constructor(t,e,s){this.vm=t,this.ops=e,this.exceptionHandler=s,this.vm=t,this.ops=e,this.current=e.head()}goto(t){this.current=t}nextStatement(){let{current:t,ops:e}=this
return t&&(this.current=e.nextNode(t)),t}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ds{constructor(t,e,s,n){this.env=t,this.program=e,this.updating=s,this.bounds=n}rerender({alwaysRevalidate:t=!1}={alwaysRevalidate:!1}){let{env:e,program:s,updating:n}=this
new As(e,s,{alwaysRevalidate:t}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),N(this.bounds)}}class Rs{constructor(t,e,s){this.stack=t,this.fp=e,this.sp=s}static empty(){return new this([],0,-1)}static restore(t){return new this(t.slice(),0,t.length-1)}push(t){this.stack[++this.sp]=t}dup(t=this.sp){this.push(this.stack[t])}pop(t=1){let e=this.stack[this.sp]
return this.sp-=t,e}peek(t=0){return this.stack[this.sp-t]}get(t,e=this.fp){return this.stack[e+t]}set(t,e,s=this.fp){this.stack[s+e]=t}slice(t,e){return this.stack.slice(t,e)}capture(t){let e=this.sp+1,s=e-t
return this.stack.slice(s,e)}reset(){this.stack.length=0}toArray(){return this.stack.slice(this.fp,this.sp+1)}}class Ms{constructor(t,e,s,n,i){this.program=t,this.env=e,this.elementStack=i,this.dynamicScopeStack=new at,this.scopeStack=new at,this.updatingOpcodeStack=new at,this.cacheGroups=new at,this.listBlockStack=new at,this.stack=Rs.empty(),this._pc=-1,this.ra=-1,this.currentOpSize=0,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=e,this.heap=t.heap,this.constants=t.constants,this.elementStack=i,this.scopeStack.push(s),this.dynamicScopeStack.push(n)}get pc(){return this._pc}set pc(t){this._pc=t}get fp(){return this.stack.fp}set fp(t){this.stack.fp=t}get sp(){return this.stack.sp}set sp(t){this.stack.sp=t}fetch(t){this.stack.push(this[ft[t]])}load(t){this[ft[t]]=this.stack.pop()}fetchValue(t){return this[ft[t]]}loadValue(t,e){this[ft[t]]=e}pushFrame(){this.stack.push(this.ra),this.stack.push(this.fp),this.fp=this.sp-1}popFrame(){this.sp=this.fp-1,this.ra=this.stack.get(0),this.fp=this.stack.get(1)}goto(t){let e=this.pc+t-this.currentOpSize
this.pc=e}call(t){this.ra=this.pc,this.pc=this.heap.getaddr(t)}returnTo(t){let e=this.pc+t-this.currentOpSize
this.ra=e}return(){this.pc=this.ra}static initial(t,e,s,n,i,r,a){let l=t.heap.scopesizeof(a),o=cs.root(s,l),h=new Ms(t,e,o,i,r)
return h.pc=h.heap.getaddr(a),h.updatingOpcodeStack.push(new ot),h}static resume({program:t,env:e,scope:s,dynamicScope:n},i){return new Ms(t,e,s,n,i)}capture(t){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(t)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let t=new xe("END"),e=this.updating(),s=this.cacheGroups.pop(),n=s?e.nextNode(s):e.head(),i=e.tail(),r=d(new ht(n,i)),a=new Ee(r,t)
e.insertBefore(a,n),e.append(new Ce(a)),e.append(t)}enter(t){let e=new ot,s=this.capture(t),n=this.elements().pushUpdatableBlock(),i=new Os(this.heap.gethandle(this.pc),s,n,e)
this.didEnter(i)}iterate(t,e){let s=this.stack
s.push(e),s.push(t)
let n=this.capture(2),i=this.elements().pushUpdatableBlock()
return new Os(this.heap.gethandle(this.pc),n,i,new ot)}enterItem(t,e){this.listBlock().map[t]=e,this.didEnter(e)}enterList(t){let e=new ot,s=this.capture(0),n=this.elements().pushBlockList(e),i=this.stack.peek().artifacts,r=this.pc+t-this.currentOpSize,a=this.heap.gethandle(r),l=new Ls(a,s,n,e,i)
this.listBlockStack.push(l),this.didEnter(l)}didEnter(t){this.updateWith(t),this.updatingOpcodeStack.push(t.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop()
this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(t){this.updating().append(t)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let t=this.dynamicScope().child()
return this.dynamicScopeStack.push(t),t}pushRootScope(t,e){let s=cs.sized(t)
return e&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(t){this.scopeStack.push(t)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(t){this.elements().didAddDestroyable(t)}getSelf(){return this.scope().getSelf()}referenceForSymbol(t){return this.scope().getSymbol(t)}execute(t,e){this.pc=this.heap.getaddr(t),e&&e(this)
let s
for(;;)if((s=this.next()).done)break
return s.value}next(){let t,{env:e,program:s,updatingOpcodeStack:n,elementStack:i}=this,r=this.nextStatement()
return null!==r?(pt.evaluate(this,r,r.type),t={done:!1,value:null}):(this.stack.reset(),t={done:!0,value:new Ds(e,s,n.pop(),i.popBlock())}),t}nextStatement(){let{pc:t,program:e}=this
if(-1===t)return null
let{size:s}=this.program.opcode(t),n=this.currentOpSize=s
return this.pc+=n,e.opcode(t)}bindDynamicScope(t){let e=this.dynamicScope()
for(let s=t.length-1;s>=0;s--){let n=this.constants.getString(t[s])
e.set(n,this.stack.pop())}}}class Fs{constructor(t){this.vm=t}next(){return this.vm.next()}}let Ps=0
class Is{constructor(t,e){this.options=t,this.parsedLayout=e,this.layout=null,this.partial=null
let{block:s}=e
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=e.referrer,this.id=e.id||`client-${Ps++}`}renderLayout(t){let{env:e,self:s,dynamicScope:n,args:i=ye,builder:r}=t,a=this.asLayout().compile(),l=Ms.initial(this.options.program,e,s,i,n,r,a)
return new Fs(l)}asLayout(){return this.layout?this.layout:this.layout=V(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=V(this.parsedLayout,this.options,!0)}}class js{constructor(t,e){this.cache=z,this.inner=null,this.chains=null,this.lastParentValue=z,this._guid=0,this.tag=wt,this.parent=t,this.property=e}value(){let{lastParentValue:t,property:e,inner:s}=this,n=this._parentValue()
if(null===n||void 0===n)return this.cache=void 0
if(t===n)s=this.inner
else{let t="object"==typeof n?Ws.for(n).referenceTypeFor(e):Xs
s=this.inner=new t(n,e,this)}return this.cache=s.value()}get(t){let e=this._getChains()
return t in e?e[t]:e[t]=new js(this,t)}label(){return"[reference Direct]"}_getChains(){return this.chains?this.chains:this.chains=o()}_parentValue(){let t=this.parent.value()
return this.lastParentValue=t,t}}class Vs{constructor(t){this.chains=o(),this.tag=wt,this.object=t}value(){return this.object}update(t){this.object=t}get(t){let e=this.chains
return t in e?e[t]:e[t]=new js(this,t)}chainFor(t){let e=this.chains
return t in e?e[t]:null}path(t){return this.referenceFromParts(t.split("."))}referenceFromParts(t){return t.reduce((t,e)=>t.get(e),this)}label(){return"[reference Root]"}}const zs={destroy(){}}
class Hs{constructor(t,e){this.tag=wt,this.parent=t}chain(){return zs}notify(){}value(){return this.parent[this.property]}get(t){return new Hs(this.parent[this.property],t)}}class Us{constructor(t){this.tag=wt,this.inner=t}update(t){this.inner=t}chain(){return zs}notify(){}value(){return this.inner}referenceFromParts(t){throw new Error("Not implemented")}chainFor(t){throw new Error("Not implemented")}get(t){return new Hs(this.inner,t)}}class $s{constructor(t){this.object=t}root(){return new Us(this.object)}}const Gs="df8be4c8-4e89-44e2-a8f9-550c8dacdca7",Ys=Object.hasOwnProperty
class Ws{constructor(t,{RootReferenceFactory:e,DefaultPathReferenceFactory:s}){this.references=null,this.slots=null,this.referenceTypes=null,this.propertyMetadata=null,this.object=t,this.RootReferenceFactory=e||Vs,this.DefaultPathReferenceFactory=s||Xs}static for(t){if(null===t||void 0===t)return new Ws(t,{})
if(Ys.call(t,"_meta")&&t._meta)return t._meta
if(!Object.isExtensible(t))return new $s(t)
let e=Ws
if(t.constructor&&t.constructor[Gs]){e=t.constructor[Gs].InstanceMetaConstructor}else t[Gs]&&(e=t[Gs].InstanceMetaConstructor)
return t._meta=new e(t,{})}static exists(t){return"object"==typeof t&&t._meta}static metadataForProperty(t){return null}addReference(t,e){let s=this.references=this.references||o();(s[t]=s[t]||new rt).add(e)}addReferenceTypeFor(t,e){this.referenceTypes=this.referenceTypes||o(),this.referenceTypes[t]=e}referenceTypeFor(t){return this.referenceTypes?this.referenceTypes[t]||Xs:Xs}removeReference(t,e){if(!this.references)return
this.references[t].delete(e)}getReferenceTypes(){return this.referenceTypes=this.referenceTypes||o(),this.referenceTypes}referencesFor(t){return this.references?this.references[t]:null}getSlots(){return this.slots=this.slots||o()}root(){return this.rootCache=this.rootCache||new this.RootReferenceFactory(this.object)}}class Xs{constructor(t,e,s){this.tag=wt,this.object=t,this.property=e}value(){return this.object[this.property]}label(){return"[reference Property]"}}class qs{constructor(t,e){this._registry=t,this._resolver=e}register(t,e,s){let n=this._toAbsoluteSpecifier(t)
this._registry.register(n,e,s)}registration(t){let e=this._toAbsoluteSpecifier(t)
return this._registry.registration(e)}unregister(t){let e=this._toAbsoluteSpecifier(t)
this._registry.unregister(e)}registerOption(t,e,s){let n=this._toAbsoluteOrTypeSpecifier(t)
this._registry.registerOption(n,e,s)}registeredOption(t,e){let s=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOption(s,e)}registeredOptions(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOptions(e)}unregisterOption(t,e){let s=this._toAbsoluteOrTypeSpecifier(t)
this._registry.unregisterOption(s,e)}registerInjection(t,e,s){let n=this._toAbsoluteOrTypeSpecifier(t),i=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(n,e,i)}registeredInjections(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredInjections(e)}_toAbsoluteSpecifier(t,e){return this._resolver.identify(t,e)}_toAbsoluteOrTypeSpecifier(t){return function(t){return-1===t.indexOf(":")}(t)?t:this._toAbsoluteSpecifier(t)}}class Ks{constructor(t=null){this.bucket=t?i({},t):{}}get(t){return this.bucket[t]}set(t,e){return this.bucket[t]=e}child(){return new Ks(this.bucket)}}class Js{constructor(t){this.tags=o(),this.computedPropertyTags=o(),this.trackedProperties=t?Object.create(t.trackedProperties):o(),this.trackedPropertyDependencies=t?Object.create(t.trackedPropertyDependencies):o()}tagFor(t){let e=this.tags[t]
if(e)return e
let s
return(s=this.trackedPropertyDependencies[t])?this.tags[t]=function(t,e,s){let n=[t.dirtyableTagFor(e)]
if(s&&s.length)for(let i=0;i<s.length;i++)n.push(t.tagFor(s[i]))
return m(n)}(this,t,s):this.tags[t]=_t.create()}dirtyableTagFor(t){let e
return this.trackedPropertyDependencies[t]?(e=this.computedPropertyTags[t])||(this.computedPropertyTags[t]=_t.create()):(e=this.tags[t])||(this.tags[t]=_t.create())}}let Qs=Symbol("ember-object"),Zs=Object.prototype.hasOwnProperty,tn=function(){}
class en extends Error{constructor(t,e,s){super(s),this.target=t,this.key=e}static for(t,e){return new en(t,e,`The property '${e}' on ${t} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}class sn{constructor(t){this.debugName=null,this.__args__=null,Object.assign(this,t)}get element(){let{bounds:t}=this
return n(t&&t.firstNode===t.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),t.firstNode}get args(){return this.__args__}set args(t){this.__args__=t,$(this).dirtyableTagFor("args").inner.dirty()}static create(t){return new this(t)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const nn={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class rn{constructor(t,e,s,n){this.name=t,this.manager=e,this.ComponentClass=s,this.layout=n,this.state={name:t,capabilities:nn,ComponentClass:s,layout:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class an{constructor(t){this._bounds=t}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}class ln{get(t){return un.create(this,t)}}class on extends ln{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let{tag:t,_lastRevision:e,_lastValue:s}=this
return e&&t.validate(e)||(s=this._lastValue=this.compute(),this._lastRevision=t.value()),s}}class hn extends Lt{constructor(){super(...arguments),this.children=o()}get(t){let e=this.children[t]
return e||(e=this.children[t]=new cn(this.inner,t)),e}}class un extends on{static create(t,e){return u(t)?new cn(t.value(),e):new pn(t,e)}get(t){return new pn(this,t)}}class cn extends un{constructor(t,e){super(),this._parentValue=t,this._propertyKey=e,this.tag=G(t,e)}compute(){return this._parentValue[this._propertyKey]}}class pn extends un{constructor(t,e){super()
let s=t.tag,n=At.create(kt)
this._parentReference=t,this._parentObjectTag=n,this._propertyKey=e,this.tag=m([s,n])}compute(){let{_parentReference:t,_parentObjectTag:e,_propertyKey:s}=this,n=t.value()
return e.inner.update(G(n,s)),"string"==typeof n&&"length"===s?n.length:"object"==typeof n&&n?n[s]:void 0}}class dn extends ln{constructor(t){super(),this.tag=_t.create(),this._value=t}value(){return this._value}update(t){let{_value:e}=this
t!==e&&(this.tag.inner.dirty(),this._value=t)}}class mn{constructor(t,s,n){let i=t.ComponentClass,r=t.name
this.args=s
let a={debugName:r,args:this.namedArgsSnapshot()}
e(a,n),this.component=i.create(a)}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}class fn{static create(t){return new fn(t)}constructor(t){this.env=t.env}prepareArgs(t,e){return null}getCapabilities(t){return t.capabilities}getLayout({name:t,layout:e},s){return s.compileTemplate(t,e)}create(e,s,n,i,r,a){let l=t(this.env)
return new mn(s,n.capture(),l)}getSelf(t){return new hn(t.component)}didCreateElement(t,e){}didRenderLayout(t,e){t.component.bounds=new an(e)}didCreate(t){t&&t.component.didInsertElement()}getTag({tag:t}){return t}update(t,e){t.component.args=t.namedArgsSnapshot()}didUpdateLayout(){}didUpdate({component:t}){t.didUpdate()}getDestructor(t){return t.component}}class gn{constructor(t,e){this.position=0,this.array=t,this.keyFor=e}isEmpty(){return 0===this.array.length}next(){let{position:t,array:e,keyFor:s}=this
if(t>=e.length)return null
let n=e[t],i=s(n,t),r=t
return this.position++,{key:i,value:n,memo:r}}}class bn{constructor(t,e,s){this.position=0,this.keys=t,this.values=e,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let{position:t,keys:e,values:s,keyFor:n}=this
if(t>=e.length)return null
let i=s[t],r=e[t],a=n(i,r)
return this.position++,{key:a,value:i,memo:r}}}class yn{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}const vn=new yn
class kn{constructor(t,e){this.tag=t.tag,this.ref=t,this.keyFor=e}iterate(){let{ref:t,keyFor:e}=this,s=t.value()
if(Array.isArray(s))return s.length>0?new gn(s,e):vn
if(void 0===s||null===s)return vn
if(void 0!==s.forEach){let t=[]
return s.forEach(function(e){t.push(e)}),t.length>0?new gn(t,e):vn}if("object"==typeof s){let t=Object.keys(s)
return t.length>0?new bn(t,t.map(t=>s[t]),e):vn}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(t){return new dn(t.value)}updateValueReference(t,e){t.update(e.value)}memoReferenceFor(t){return new dn(t.memo)}updateMemoReference(t,e){t.update(e.memo)}}const wn={},Sn=Object.freeze([])
class _n{constructor(){this.strings=[],this.arrays=[Sn],this.tables=[],this.handles=[],this.serializables=[],this.resolved=[],this.floats=[],this.negatives=[]}float(t){let e=this.floats.indexOf(t)
return e>-1?e:this.floats.push(t)-1}negative(t){return this.negatives.push(t)-1}string(t){let e=this.strings.indexOf(t)
return e>-1?e:this.strings.push(t)-1}stringArray(t){let e=new Array(t.length)
for(let s=0;s<t.length;s++)e[s]=this.string(t[s])
return this.array(e)}array(t){if(0===t.length)return 0
let e=this.arrays.indexOf(t)
return e>-1?e:this.arrays.push(t)-1}table(t){let e=this.tables.indexOf(t)
return e>-1?e:this.tables.push(t)-1}handle(t){return this.resolved.push(wn),this.handles.push(t)}serializable(t){let e=this.serializables.indexOf(t)
return e>-1?e:this.serializables.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,tables:this.tables,handles:this.handles,serializables:this.serializables,floats:this.floats,negatives:this.negatives}}}class En extends _n{constructor(t,e){super(),this.resolver=t,e&&(this.strings=e.strings,this.arrays=e.arrays,this.tables=e.tables,this.handles=e.handles,this.serializables=e.serializables,this.floats=e.floats,this.negatives=e.negatives,this.resolved=this.handles.map(()=>wn))}getFloat(t){return this.floats[t]}getNegative(t){return this.negatives[t]}getString(t){return this.strings[t]}getStringArray(t){let e=this.getArray(t),s=new Array(e.length)
for(let n=0;n<e.length;n++){let t=e[n]
s[n]=this.getString(t)}return s}getArray(t){return this.arrays[t]}getSymbolTable(t){return this.tables[t]}resolveHandle(t){let e=t-1,s=this.resolved[e]
if(s===wn){let t=this.handles[e]
s=this.resolved[e]=this.resolver.resolve(t)}return s}getSerializable(t){return this.serializables[t]}}class Cn extends En{constructor(){super(...arguments),this.others=[]}getOther(t){return this.others[t-1]}other(t){return this.others.push(t)}}class xn{constructor(t){this.heap=t,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}var An;(function(t){t[t.Allocated=0]="Allocated",t[t.Freed=1]="Freed",t[t.Purged=2]="Purged",t[t.Pointer=3]="Pointer"})(An||(An={}))
class Nn{constructor(t){if(this.offset=0,this.handle=0,t){let{buffer:e,table:s,handle:n}=t
this.heap=new Uint16Array(e),this.table=s,this.offset=this.heap.length,this.handle=n}else this.heap=new Uint16Array(1048576),this.table=[]}push(t){this.heap[this.offset++]=t}getbyaddr(t){return this.heap[t]}setbyaddr(t,e){this.heap[t]=e}malloc(){this.table.push(this.offset,0)
let t=this.handle
return this.handle+=2,t}finishMalloc(t,e){let s=this.table[t],n=Y(this.offset-s,e,An.Allocated)
this.table[t+1]=n}size(){return this.offset}getaddr(t){return this.table[t]}gethandle(t){this.table.push(t,Y(0,0,An.Pointer))
let e=this.handle
return this.handle+=2,e}sizeof(t){return-1}scopesizeof(t){return(1073676288&this.table[t+1])>>16}free(t){let e=this.table[t+1]
this.table[t+1]=W(e,An.Freed)}compact(){let t=0,{table:e,table:{length:s},heap:n}=this
for(let i=0;i<s;i+=2){let s=e[i],r=e[i+1],a=65535&r,l=-1&r
if(l!==An.Purged)if(l===An.Freed)e[i+1]=W(r,An.Purged),t+=a
else if(l===An.Allocated){for(let e=s;e<=i+a;e++)n[e-t]=n[e]
e[i]=s-t}else l===An.Pointer&&(e[i]=s-t)}this.offset=this.offset-t}capture(){let t=function(t,e,s){if(t instanceof Uint16Array){if(void 0!==t.slice)return t.slice(e,s).buffer
let n=new Uint16Array(s)
for(;e<s;e++)n[e]=t[e]
return n.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:t}}}class On{constructor(t=new _n,e=new Nn){this.constants=t,this.heap=e,this._opcode=new xn(this.heap)}opcode(t){return this._opcode.offset=t,this._opcode}}class Tn extends On{}class Ln{constructor(){this.byName=o(),this.byHandle=o()}hasName(t){return t in this.byName}getHandle(t){return this.byName[t]}hasHandle(t){return t in this.byHandle}getByHandle(t){return this.byHandle[t]}register(t,e,s){this.byHandle[t]=s,this.byName[e]=t}}class Bn{constructor(t,e){this.tag=wt,this.parent=t,this.property=e}value(){return this.parent.value()[this.property]}get(t){return new Bn(this,t)}}class Dn{constructor(t,e){this.tag=wt,this.helper=t,this.args=e.capture()}value(){let{helper:t,args:e}=this
return t(e.positional.value(),e.named.value())}get(t){return new Bn(this,t)}}class Rn{constructor(t){this.owner=t,this.handleLookup=[],this.cache={component:new Ln,template:new Ln,compiledTemplate:new Ln,helper:new Ln,manager:new Ln,modifier:new Ln}}setCompileOptions(t){this.templateOptions=t}lookup(t,e,s){return this.cache[t].hasName(e)?this.cache[t].getHandle(e):null}register(t,e,s){let n=this.cache[t],i=this.handleLookup.length
return this.handleLookup.push(n),this.cache[t].register(i,e,s),i}lookupModifier(t,e){let s=this.lookup("modifier",t)
if(null===s)throw new Error(`Modifier for ${t} not found.`)
return s}compileTemplate(t,e){if(!this.cache.compiledTemplate.hasName(t)){let s=this.resolve(e),{block:n,meta:i,id:r}=s,a=JSON.parse(n),l=new Is(this.templateOptions,{id:r,block:a,referrer:i}).asLayout(),o={handle:l.compile(),symbolTable:l.symbolTable}
return this.register("compiledTemplate",t,o),o}let s=this.lookup("compiledTemplate",t)
return this.resolve(s)}registerHelper(t,e){return this.register("helper",t,(t,s)=>new Dn(e,s))}registerInternalHelper(t,e){this.register("helper",t,e)}registerComponent(t,e,s,n){let i=this.registerTemplate(e,n),r=this.managerFor(i.meta.managerId),a=new rn(t,r,s,i.handle)
return this.register("component",t,a)}lookupComponentHandle(t,e){return this.cache.component.hasName(t)||this.lookupComponent(t,e),this.lookup("component",t,e)}managerFor(t="main"){let e
if(this.cache.manager.hasName(t)){let e=this.cache.manager.getHandle(t)
return this.cache.manager.getByHandle(e)}{let{rootName:s}=this.owner
if(!(e=this.owner.lookup(`component-manager:/${s}/component-managers/${t}`)))throw new Error(`No component manager found for ID ${t}.`)
return this.register("manager",t,e),e}}registerTemplate(t,e){return{name:t,handle:this.register("template",t,e),meta:e.meta}}lookupComponent(t,e){let s
if(this.cache.component.hasName(t))s=this.lookup("component",t,e)
else{let n=function(t,e){if(null===t||void 0===t)throw new Error(e)
return t}(this.identifyComponent(t,e),`Could not find the component '${t}'`),i=this.owner.lookup("template",n),r=this.owner.identify("component",n),a=null
a=void 0!==r?this.owner.factoryFor(r):{create:t=>sn.create(t)},s=this.registerComponent(t,n,a,i)}return this.resolve(s)}lookupHelper(t,e){if(!this.cache.helper.hasName(t)){let s=this.owner,n=`helper:${t}`,i=e.specifier,r=s.identify(n,i)
if(void 0===r)return null
let a=this.owner.lookup(r,e.specifier)
return this.registerHelper(t,a)}return this.lookup("helper",t,e)}lookupPartial(t,e){throw new Error("Partials are not available in Glimmer applications.")}resolve(t){return this.handleLookup[t].getByHandle(t)}identifyComponent(t,e){let s=this.owner,n=`template:${t}`,i=e.specifier,r=s.identify(n,i)
if(void 0===r&&s.identify(`component:${t}`,i))throw new Error(`The component '${t}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}var Mn={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
class Fn{constructor(t){this.resolver=t}getComponentDefinition(t){let e=this.resolver.resolve(t)
return n(!!e,`Couldn't find a template for ${t}`),e}getCapabilities(t){let e=this.getComponentDefinition(t),{manager:s,state:n}=e
return s.getCapabilities(n)}getLayout(t){let e=this.getComponentDefinition(t),{manager:s}=e,n=s.getLayout(e,this.resolver)
return{compile:()=>n.handle,symbolTable:n.symbolTable}}lookupHelper(t,e){return this.resolver.lookupHelper(t,e)}lookupModifier(t,e){return this.resolver.lookupModifier(t,e)}lookupComponentSpec(t,e){return this.resolver.lookupComponentHandle(t,e)}lookupPartial(t,e){return this.resolver.lookupPartial(t,e)}}class Pn extends ds{static create(t={}){return t.document=t.document||self.document,t.appendOperations=t.appendOperations||new Je(t.document),new Pn(t)}constructor(s){super({appendOperations:s.appendOperations,updateOperations:new Ke(s.document||document)}),e(this,t(s))
let n=this.resolver=new Rn(t(this)),i=this.program=new Tn(new Cn(n)),r=new te,a=new Fn(n)
this.compileOptions={program:i,macros:r,lookup:a,Builder:oe},this.resolver.setCompileOptions(this.compileOptions),n.registerTemplate("main",Mn),n.registerInternalHelper("action",X),n.registerHelper("if",t=>t[0]?t[1]:t[2]),this.uselessAnchor=s.document.createElement("a")}protocolForURL(t){return this.uselessAnchor.href=t,this.uselessAnchor.protocol}iterableFor(t,e){let s
if(!e)throw new Error("Must specify a key for #each")
switch(e){case"@index":s=((t,e)=>String(e))
break
case"@primitive":s=(t=>String(t))
break
default:s=(t=>t[e])}return new kn(t,s)}}class In{constructor(t){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=t.rootName,this.resolver=t.resolver,this.document=t.document||"undefined"!=typeof window&&window.document}renderComponent(t,e,s=null){this._roots.push({id:this._rootsIndex++,component:t,parent:e,nextSibling:s}),this.scheduleRerender()}boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,requestAnimationFrame(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1}))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(t){this._initializers.push(t)}initRegistry(){let t=this._registry=new et,e=new qs(this._registry,this.resolver)
t.register(`environment:/${this.rootName}/main/main`,Pn),t.registerOption("helper","instantiate",!1),t.registerOption("template","instantiate",!1),t.register(`document:/${this.rootName}/main/main`,this.document),t.registerOption("document","instantiate",!1),t.registerInjection("environment","document",`document:/${this.rootName}/main/main`),t.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let n=0;n<s.length;n++)s[n].initialize(e)
this._initialized=!0}initContainer(){this._container=new tt(this._registry,this.resolver),this._container.defaultInjections=(t=>{let s={}
return e(s,this),s})}get mainLayout(){return function({id:t,meta:e,block:s}){let n,r=t||`client-${Ps++}`
return{id:r,meta:e,create:(t,a)=>{let l=a?i({},a,e):e
return n||(n=JSON.parse(s)),new Is(t,{id:r,block:n,referrer:l})}}}(Mn).create(this.env.compileOptions)}get templateIterator(){let{env:t,mainLayout:e}=this,s=new Vs({roots:this._roots}),n=new Ks,i={element:this.document.body,nextSibling:null}
return e.renderLayout({env:t,self:s,dynamicScope:n,builder:function(t,e){return Ss.forInitialRender(t,e)}(t,i)})}_rerender(){let{env:t,_result:e}=this
if(!e)throw new Error("Cannot re-render before initial render has completed")
try{t.begin(),e.rerender(),t.commit(),this._didRender()}catch(t){this._didError(t)}}_render(){let{env:t,templateIterator:e}=this
try{t.begin()
let s
do{s=e.next()}while(!s.done)
t.commit(),this._result=s.value,this._didRender()}catch(t){throw this._didError(t),t}}_didRender(){this._rendered=!0
let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[0]())}_didError(t){let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[1](t))}identify(t,e){return this.resolver.identify(t,e)}factoryFor(t,e){return this._container.factoryFor(this.identify(t,e))}lookup(t,e){return this._container.lookup(this.identify(t,e))}}class jn{constructor(t,e){this.config=t,this.registry=e}identify(t,e){if(function(t){let[e,s]=t.split(":")
return!!(e&&s&&0===s.indexOf("/")&&s.split("/").length>3)}(t))return t
let s,n=J(t)
if(e){let t=J(e)
if(q(t)){Q("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=t.rootName,n.collection=t.collection
let e=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=t.namespace,n.name=t.name,this._serializeAndVerify(n)
if(n.namespace=t.namespace?t.namespace+"/"+t.name:t.name,function(t){let{namespace:e,collection:s}=t,n=e.lastIndexOf("/-")
if(n>-1){n+=2
let t=e.indexOf("/",n)
s=e.slice(n,t>-1?t:void 0)}return s}(n)===e&&(s=this._serializeAndVerify(n)))return s
if(e&&(n.namespace+="/-"+e,s=this._serializeAndVerify(n)))return s
n.rootName=n.collection=n.namespace=void 0}else Q('Referrer must either be "absolute" or include a `type` to determine the associated type',t.type),n.collection=this._definitiveCollection(t.type),Q(`'${t.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Q(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(n))return s
let t
n.namespace?(t=this.config.addons&&this.config.addons[n.namespace],n.rootName=n.namespace,n.namespace=void 0):(t=this.config.addons&&this.config.addons[n.name],n.rootName=n.name,n.name="main")}return(s=this._serializeAndVerify(n))?s:void 0}retrieve(t){return this.registry.get(t)}resolve(t,e){let s=this.identify(t,e)
if(s)return this.retrieve(s)}_definitiveCollection(t){let e=this.config.types[t]
return Q(`'${t}' is not a recognized type`,e),e.definitiveCollection}_serializeAndVerify(t){let e=K(t)
if(this.registry.has(e))return e}}class Vn{constructor(t={}){this._entries=t}has(t){return t in this._entries}get(t){return this._entries[t]}}class zn extends sn{constructor(){super(...arguments),this.tagName=""}}var Hn=function(t,e,s,n){var i,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,n)
else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(a=(r<3?i(a):r>3?i(e,s,a):i(e,s))||a)
return r>3&&a&&Object.defineProperty(e,s,a),a}
let Un,$n,Gn=function(t){Un=performance.now(),$n=t},Yn=function(){let t=$n
$n&&window.setTimeout(function(){$n=null
let e=performance.now()
console.log(t+" took "+(e-Un))},0)}
class Wn extends sn{constructor(){super(...arguments),this.maxId=1,this.selected=void 0,this.rows={selected:void 0,data:[]}}buildData(t=1e3){let e=["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"],s=["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"],n=["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"],i=[]
for(let r=0;r<t;r++)i.push({id:this.maxId++,label:e[Z(e.length)]+" "+s[Z(s.length)]+" "+n[Z(n.length)]})
return i}run(){Gn("run"),this.rows={selected:void 0,data:this.buildData(1e3)},Yn()}runLots(){Gn("runLots"),this.rows={selected:void 0,data:this.buildData(1e4)},Yn()}add(){Gn("add"),this.rows=Object.assign({},this.rows,{data:this.rows.data.concat(this.buildData(1e3))}),Yn()}update(){Gn("update")
let t=this.rows.data.map((t,e)=>e%10==0?Object.assign({},t,{label:`${t.label} !!!`}):t)
this.rows=Object.assign({},this.rows,{data:t}),Yn()}clear(){Gn("clear"),this.rows={selected:void 0,data:[]},Yn()}swapRows(){if(Gn("swapRows"),this.rows.data.length>998){let t=this.rows.data,e=t[1]
t[1]=t[998],t[998]=e,this.rows=Object.assign({},this.rows,{data:t})}Yn()}select(t){Gn("select")
let e={selected:t}
this.rows=Object.assign({},this.rows,{selected:e}),Yn()}delete(t){Gn("delete")
let e=this.rows.data.findIndex(e=>e.id===t),s=this.rows.data
s.splice(e,1),this.rows={selected:void 0,data:s},Yn()}}Hn([H],Wn.prototype,"selected",void 0),Hn([H],Wn.prototype,"rows",void 0)
class Xn extends sn{constructor(){super(...arguments),this.tagName="",this.row={id:void 0,label:void 0}}}(function(t,e,s,n){var i,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,n)
else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(a=(r<3?i(a):r>3?i(e,s,a):i(e,s))||a)
r>3&&a&&Object.defineProperty(e,s,a)})([H],Xn.prototype,"row",void 0)
var qn={"component:/glimmer-app/components/MyRow":zn,"template:/glimmer-app/components/MyRow":{id:"g4TeELTG",block:'{"symbols":["@selected","@id","@select","@label","@delete"],"statements":[[6,"tr"],[11,"class",[26,"if-eq",[[21,2,[]],[21,1,[]],"danger"],null],null],[8],[0,"\\n    "],[6,"td"],[10,"class","col-md-1"],[8],[1,[21,2,[]],false],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-4"],[8],[0,"\\n        "],[6,"a"],[11,"onclick",[26,"action",[[21,3,[]],[21,2,[]]],null],null],[8],[1,[21,4,[]],false],[9],[0,"\\n    "],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-1"],[8],[6,"a"],[11,"onclick",[26,"action",[[21,5,[]],[21,2,[]]],null],null],[8],[6,"span"],[10,"class","glyphicon glyphicon-remove"],[10,"aria-hidden","true"],[8],[9],[9],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-6"],[8],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/glimmer-app/components/MyRow"}},"helper:/glimmer-app/components/if-eq":function([t,e,s]){return!!e&&(t===e?s:"")},"component:/glimmer-app/components/my-table":Wn,"template:/glimmer-app/components/my-table":{id:"WTJDyLNu",block:'{"symbols":["row"],"statements":[[6,"div"],[10,"class","jumbotron"],[8],[0,"\\n    "],[6,"div"],[10,"class","row"],[8],[0,"\\n        "],[6,"div"],[10,"class","col-md-6"],[8],[0,"\\n            "],[6,"h1"],[8],[0,"Glimmer 0.8.0"],[9],[0,"\\n        "],[9],[0,"\\n        "],[6,"div"],[10,"class","col-md-6"],[8],[0,"\\n            "],[6,"div"],[10,"class","row"],[8],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","run"],[11,"onclick",[26,"action",[[22,["run"]]],null],null],[8],[0,"Create 1,000 rows"],[9],[0,"\\n                "],[9],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","runlots"],[11,"onclick",[26,"action",[[22,["runLots"]]],null],null],[8],[0,"Create 10,000 rows"],[9],[0,"\\n                "],[9],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","add"],[11,"onclick",[26,"action",[[22,["add"]]],null],null],[8],[0,"Append 1,000 rows"],[9],[0,"\\n                "],[9],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","update"],[11,"onclick",[26,"action",[[22,["update"]]],null],null],[8],[0,"Update every 10th row"],[9],[0,"\\n                "],[9],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","clear"],[11,"onclick",[26,"action",[[22,["clear"]]],null],null],[8],[0,"Clear"],[9],[0,"\\n                "],[9],[0,"\\n                "],[6,"div"],[10,"class","col-sm-6 smallpad"],[8],[0,"\\n                    "],[6,"button"],[10,"type","button"],[10,"class","btn btn-primary btn-block"],[10,"id","swaprows"],[11,"onclick",[26,"action",[[22,["swapRows"]]],null],null],[8],[0,"Swap Rows"],[9],[0,"\\n                "],[9],[0,"\\n            "],[9],[0,"\\n        "],[9],[0,"\\n    "],[9],[0,"\\n"],[9],[0,"\\n"],[6,"table"],[10,"class","table table-hover table-striped test-data"],[8],[0,"\\n    "],[6,"tbody"],[8],[0,"\\n"],[4,"each",[[22,["rows","data"]]],[["key"],["id"]],{"statements":[[0,"        "],[5,"MyRow",[],[["@id","@label","@selected","@select","@delete"],[[21,1,["id"]],[21,1,["label"]],[22,["rows","selected"]],[20,"select"],[20,"delete"]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[1]},null],[0,"    "],[9],[0,"\\n"],[9],[0,"\\n"],[6,"span"],[10,"class","preloadicon glyphicon glyphicon-remove"],[10,"aria-hidden","true"],[8],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-app/components/my-table"}},"component:/glimmer-app/components/table-row":Xn,"template:/glimmer-app/components/table-row":{id:"t3BpyElU",block:'{"symbols":["@select","@delete"],"statements":[[0,"ewrewrwre\\n\\nw"],[6,"tr"],[11,"class",[26,"if-eq",[[22,["row","id"]],[22,["rows","selected"]],"danger"],null],null],[8],[0,"\\n    "],[6,"td"],[10,"class","col-md-1"],[8],[1,[22,["row","id"]],false],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-4"],[8],[0,"\\n        "],[6,"a"],[11,"onclick",[26,"action",[[21,1,[]],[22,["row","id"]]],null],null],[8],[1,[22,["row","label"]],false],[9],[0,"\\n    "],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-1"],[8],[6,"a"],[11,"onclick",[26,"action",[[21,2,[]],[22,["row","id"]]],null],null],[8],[6,"span"],[10,"class","glyphicon glyphicon-remove"],[10,"aria-hidden","true"],[8],[9],[9],[9],[0,"\\n    "],[6,"td"],[10,"class","col-md-6"],[8],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/glimmer-app/components/table-row"}}},Kn={app:{name:"glimmer-app",rootName:"glimmer-app"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
class Jn extends In{constructor(){let t=new Vn(qn),e=new jn(Kn,t)
super({rootName:Kn.app.rootName,resolver:e})}}const Qn=new Jn,Zn=document.getElementById("app");(function(t){tn=t})(()=>{Qn.scheduleRerender()}),Qn.registerInitializer({initialize(t){t.register(`component-manager:/${Qn.rootName}/component-managers/main`,fn)}}),Qn.renderComponent("my-table",Zn,null),Qn.boot()})
