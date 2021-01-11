import e,{useState as r}from"react";import{Drawer as t,Collapse as n,Table as o}from"antd";function a(e,r){return e(r={exports:{}},r.exports),r.exports}var i=a((function(e){function r(){return e.exports=r=Object.assign||function(e){for(var r=arguments,t=1;t<arguments.length;t++){var n=r[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r.apply(this,arguments)}e.exports=r})),c=function(r){return e.createElement(t,i({},r,{className:"".concat(r.className||""," sidebar_containtcard"),mask:!1}),r.children)},u=function(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n},f="function"==typeof Symbol&&Symbol.for,s=f?Symbol.for("react.element"):60103,l=f?Symbol.for("react.portal"):60106,p=f?Symbol.for("react.fragment"):60107,y=f?Symbol.for("react.strict_mode"):60108,d=f?Symbol.for("react.profiler"):60114,m=f?Symbol.for("react.provider"):60109,b=f?Symbol.for("react.context"):60110,v=f?Symbol.for("react.async_mode"):60111,h=f?Symbol.for("react.concurrent_mode"):60111,g=f?Symbol.for("react.forward_ref"):60112,S=f?Symbol.for("react.suspense"):60113,O=f?Symbol.for("react.suspense_list"):60120,E=f?Symbol.for("react.memo"):60115,w=f?Symbol.for("react.lazy"):60116,j=f?Symbol.for("react.block"):60121,$=f?Symbol.for("react.fundamental"):60117,x=f?Symbol.for("react.responder"):60118,P=f?Symbol.for("react.scope"):60119;function N(e){if("object"==typeof e&&null!==e){var r=e.$$typeof;switch(r){case s:switch(e=e.type){case v:case h:case p:case d:case y:case S:return e;default:switch(e=e&&e.$$typeof){case b:case g:case w:case E:case m:return e;default:return r}}case l:return r}}}function I(e){return N(e)===h}var T={AsyncMode:v,ConcurrentMode:h,ContextConsumer:b,ContextProvider:m,Element:s,ForwardRef:g,Fragment:p,Lazy:w,Memo:E,Portal:l,Profiler:d,StrictMode:y,Suspense:S,isAsyncMode:function(e){return I(e)||N(e)===v},isConcurrentMode:I,isContextConsumer:function(e){return N(e)===b},isContextProvider:function(e){return N(e)===m},isElement:function(e){return"object"==typeof e&&null!==e&&e.$$typeof===s},isForwardRef:function(e){return N(e)===g},isFragment:function(e){return N(e)===p},isLazy:function(e){return N(e)===w},isMemo:function(e){return N(e)===E},isPortal:function(e){return N(e)===l},isProfiler:function(e){return N(e)===d},isStrictMode:function(e){return N(e)===y},isSuspense:function(e){return N(e)===S},isValidElementType:function(e){return"string"==typeof e||"function"==typeof e||e===p||e===h||e===d||e===y||e===S||e===O||"object"==typeof e&&null!==e&&(e.$$typeof===w||e.$$typeof===E||e.$$typeof===m||e.$$typeof===b||e.$$typeof===g||e.$$typeof===$||e.$$typeof===x||e.$$typeof===P||e.$$typeof===j)},typeOf:N},_=a((function(e,r){"production"!==process.env.NODE_ENV&&function(){var e="function"==typeof Symbol&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,o=e?Symbol.for("react.fragment"):60107,a=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,c=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,f=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,y=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,h=e?Symbol.for("react.responder"):60118,g=e?Symbol.for("react.scope"):60119;function S(e){if("object"==typeof e&&null!==e){var r=e.$$typeof;switch(r){case t:var y=e.type;switch(y){case f:case s:case o:case i:case a:case p:return y;default:var b=y&&y.$$typeof;switch(b){case u:case l:case m:case d:case c:return b;default:return r}}case n:return r}}}var O=s,E=u,w=c,j=t,$=l,x=o,P=m,N=d,I=n,T=i,_=a,C=p,k=!1;function A(e){return S(e)===s}r.AsyncMode=f,r.ConcurrentMode=O,r.ContextConsumer=E,r.ContextProvider=w,r.Element=j,r.ForwardRef=$,r.Fragment=x,r.Lazy=P,r.Memo=N,r.Portal=I,r.Profiler=T,r.StrictMode=_,r.Suspense=C,r.isAsyncMode=function(e){return k||(k=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),A(e)||S(e)===f},r.isConcurrentMode=A,r.isContextConsumer=function(e){return S(e)===u},r.isContextProvider=function(e){return S(e)===c},r.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===t},r.isForwardRef=function(e){return S(e)===l},r.isFragment=function(e){return S(e)===o},r.isLazy=function(e){return S(e)===m},r.isMemo=function(e){return S(e)===d},r.isPortal=function(e){return S(e)===n},r.isProfiler=function(e){return S(e)===i},r.isStrictMode=function(e){return S(e)===a},r.isSuspense=function(e){return S(e)===p},r.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===s||e===i||e===a||e===p||e===y||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===d||e.$$typeof===c||e.$$typeof===u||e.$$typeof===l||e.$$typeof===v||e.$$typeof===h||e.$$typeof===g||e.$$typeof===b)},r.typeOf=S}()})),C=a((function(e){e.exports="production"===process.env.NODE_ENV?T:_})),k=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;function M(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var V=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,r){for(var t,n,o=arguments,a=M(e),i=1;i<arguments.length;i++){for(var c in t=Object(o[i]))A.call(t,c)&&(a[c]=t[c]);if(k){n=k(t);for(var u=0;u<n.length;u++)R.call(t,n[u])&&(a[n[u]]=t[n[u]])}}return a},D="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",F=function(){};if("production"!==process.env.NODE_ENV){var z=D,W={},q=Function.call.bind(Object.prototype.hasOwnProperty);F=function(e){var r="Warning: "+e;"undefined"!=typeof console&&console.error(r);try{throw new Error(r)}catch(e){}}}function L(e,r,t,n,o){if("production"!==process.env.NODE_ENV)for(var a in e)if(q(e,a)){var i;try{if("function"!=typeof e[a]){var c=Error((n||"React class")+": "+t+" type `"+a+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[a]+"`.");throw c.name="Invariant Violation",c}i=e[a](r,a,n,t,null,z)}catch(e){i=e}if(!i||i instanceof Error||F((n||"React class")+": type specification of "+t+" `"+a+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof i+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),i instanceof Error&&!(i.message in W)){W[i.message]=!0;var u=o?o():"";F("Failed "+t+" type: "+i.message+(null!=u?u:""))}}}L.resetWarningCache=function(){"production"!==process.env.NODE_ENV&&(W={})};var U=L,J=Function.call.bind(Object.prototype.hasOwnProperty),B=function(){};function H(){return null}function K(){}function Y(){}"production"!==process.env.NODE_ENV&&(B=function(e){var r="Warning: "+e;"undefined"!=typeof console&&console.error(r);try{throw new Error(r)}catch(e){}}),Y.resetWarningCache=K,a((function(e){e.exports="production"!==process.env.NODE_ENV?function(e,r){var t="function"==typeof Symbol&&Symbol.iterator,n={array:c("array"),bool:c("boolean"),func:c("function"),number:c("number"),object:c("object"),string:c("string"),symbol:c("symbol"),any:i(H),arrayOf:function(e){return i((function(r,t,n,o,i){if("function"!=typeof e)return new a("Property `"+i+"` of component `"+n+"` has invalid PropType notation inside arrayOf.");var c=r[t];if(!Array.isArray(c))return new a("Invalid "+o+" `"+i+"` of type `"+f(c)+"` supplied to `"+n+"`, expected an array.");for(var u=0;u<c.length;u++){var s=e(c,u,n,o,i+"["+u+"]",D);if(s instanceof Error)return s}return null}))},element:i((function(r,t,n,o,i){var c=r[t];return e(c)?null:new a("Invalid "+o+" `"+i+"` of type `"+f(c)+"` supplied to `"+n+"`, expected a single ReactElement.")})),elementType:i((function(e,r,t,n,o){var i=e[r];return C.isValidElementType(i)?null:new a("Invalid "+n+" `"+o+"` of type `"+f(i)+"` supplied to `"+t+"`, expected a single ReactElement type.")})),instanceOf:function(e){return i((function(r,t,n,o,i){var c;return r[t]instanceof e?null:new a("Invalid "+o+" `"+i+"` of type `"+((c=r[t]).constructor&&c.constructor.name?c.constructor.name:"<<anonymous>>")+"` supplied to `"+n+"`, expected instance of `"+(e.name||"<<anonymous>>")+"`.")}))},node:i((function(e,r,t,n,o){return u(e[r])?null:new a("Invalid "+n+" `"+o+"` supplied to `"+t+"`, expected a ReactNode.")})),objectOf:function(e){return i((function(r,t,n,o,i){if("function"!=typeof e)return new a("Property `"+i+"` of component `"+n+"` has invalid PropType notation inside objectOf.");var c=r[t],u=f(c);if("object"!==u)return new a("Invalid "+o+" `"+i+"` of type `"+u+"` supplied to `"+n+"`, expected an object.");for(var s in c)if(J(c,s)){var l=e(c,s,n,o,i+"."+s,D);if(l instanceof Error)return l}return null}))},oneOf:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&B(arguments.length>1?"Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).":"Invalid argument supplied to oneOf, expected an array."),H;function r(r,t,n,i,c){for(var u=r[t],f=0;f<e.length;f++)if(o(u,e[f]))return null;var l=JSON.stringify(e,(function(e,r){return"symbol"===s(r)?String(r):r}));return new a("Invalid "+i+" `"+c+"` of value `"+String(u)+"` supplied to `"+n+"`, expected one of "+l+".")}return i(r)},oneOfType:function(e){if(!Array.isArray(e))return"production"!==process.env.NODE_ENV&&B("Invalid argument supplied to oneOfType, expected an instance of array."),H;for(var r=0;r<e.length;r++){var t=e[r];if("function"!=typeof t)return B("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+l(t)+" at index "+r+"."),H}return i((function(r,t,n,o,i){for(var c=0;c<e.length;c++)if(null==(0,e[c])(r,t,n,o,i,D))return null;return new a("Invalid "+o+" `"+i+"` supplied to `"+n+"`.")}))},shape:function(e){return i((function(r,t,n,o,i){var c=r[t],u=f(c);if("object"!==u)return new a("Invalid "+o+" `"+i+"` of type `"+u+"` supplied to `"+n+"`, expected `object`.");for(var s in e){var l=e[s];if(l){var p=l(c,s,n,o,i+"."+s,D);if(p)return p}}return null}))},exact:function(e){return i((function(r,t,n,o,i){var c=r[t],u=f(c);if("object"!==u)return new a("Invalid "+o+" `"+i+"` of type `"+u+"` supplied to `"+n+"`, expected `object`.");var s=V({},r[t],e);for(var l in s){var p=e[l];if(!p)return new a("Invalid "+o+" `"+i+"` key `"+l+"` supplied to `"+n+"`.\nBad object: "+JSON.stringify(r[t],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var y=p(c,l,n,o,i+"."+l,D);if(y)return y}return null}))}};function o(e,r){return e===r?0!==e||1/e==1/r:e!=e&&r!=r}function a(e){this.message=e,this.stack=""}function i(e){if("production"!==process.env.NODE_ENV);function r(r,t,n,o,i,c,u){if(o=o||"<<anonymous>>",c=c||n,u!==D){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}return null==t[n]?r?new a(null===t[n]?"The "+i+" `"+c+"` is marked as required in `"+o+"`, but its value is `null`.":"The "+i+" `"+c+"` is marked as required in `"+o+"`, but its value is `undefined`."):null:e(t,n,o,i,c)}var t=r.bind(null,!1);return t.isRequired=r.bind(null,!0),t}function c(e){return i((function(r,t,n,o,i,c){var u=r[t];return f(u)!==e?new a("Invalid "+o+" `"+i+"` of type `"+s(u)+"` supplied to `"+n+"`, expected `"+e+"`."):null}))}function u(r){switch(typeof r){case"number":case"string":case"undefined":return!0;case"boolean":return!r;case"object":if(Array.isArray(r))return r.every(u);if(null===r||e(r))return!0;var n=function(e){var r=e&&(t&&e[t]||e["@@iterator"]);if("function"==typeof r)return r}(r);if(!n)return!1;var o,a=n.call(r);if(n!==r.entries){for(;!(o=a.next()).done;)if(!u(o.value))return!1}else for(;!(o=a.next()).done;){var i=o.value;if(i&&!u(i[1]))return!1}return!0;default:return!1}}function f(e){var r=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,r){return"symbol"===e||!!r&&("Symbol"===r["@@toStringTag"]||"function"==typeof Symbol&&r instanceof Symbol)}(r,e)?"symbol":r}function s(e){if(null==e)return""+e;var r=f(e);if("object"===r){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return r}function l(e){var r=s(e);switch(r){case"array":case"object":return"an "+r;case"boolean":case"date":case"regexp":return"a "+r;default:return r}}return a.prototype=Error.prototype,n.checkPropTypes=U,n.resetWarningCache=U.resetWarningCache,n.PropTypes=n,n}(C.isElement):function(){function e(e,r,t,n,o,a){if(a!==D){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function r(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:Y,resetWarningCache:K};return t.PropTypes=t,t}()}));var G=function(t){var a,i,c,f,s,l=r([]),p=(s=2,function(e){if(Array.isArray(e))return e}(f=l)||function(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return t}}(f,s)||function(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}(f,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),y=p[0],d=p[1];return e.createElement("div",{className:"".concat(t.className||""," resources_list")},(i=(a=t.list).filter((function(e){return 1===e.pid})),c=[],i.forEach((function(r){var i=a.filter((function(e){return e.pid==r.id})),u=i.length;c.push(e.createElement(n.Panel,{header:e.createElement("div",null,r.name+" ("+u+")"),key:r.id},u>0?function(r){return e.createElement(o,{bordered:!1,pagination:!1,rowKey:"id",showHeader:!1,rowSelection:{onChange:function(e,r){d(e.map(Number))},selectedRowKeys:y,onSelect:function(e,r,n,o){t.onSelect(e,r)}},columns:[{title:"Name",dataIndex:"name",render:function(r){return e.createElement("a",null,r)}}],dataSource:r})}(i):null))})),e.createElement(n,{expandIconPosition:"right",bordered:!1},c)))};G.propTypes={};var Q=function(r){return e.createElement(c,r.sideprops,e.createElement(G,{list:r.data,onSelect:r.onSelect}))};export{Q as ResourceCatalog,G as ResourcesList,c as SideBar};