!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lit-element/lit-element.js")):"function"==typeof define&&define.amd?define(["exports","lit-element/lit-element.js"],t):t((e=e||self).CheckItOut={},e.litElement_js)}(this,function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=i(e);if(t){var o=i(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function a(e,t,n){return(a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=i(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function s(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function p(){var e=s(["\n:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n      "]);return p=function(){return e},e}function y(){var e=s(["\n\n<slot></slot>"]);return y=function(){return e},e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(f,t.LitElement);var n=l(f);function f(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),n.call(this)}return r(f,[{key:"render",value:function(){return t.html(y())}}],[{key:"styles",get:function(){return[t.css(p())]}},{key:"haxProperties",get:function(){return{canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Check it-out",description:"View codepen or stackblitz demos",icon:"icons:android",color:"green",groups:["It"],handles:[{type:"todo:read-the-docs-for-usage"}],meta:{author:"ckleest",owner:""}},settings:{configure:[],advanced:[]}}}},{key:"properties",get:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},a(i(f),"properties",this))}},{key:"tag",get:function(){return"check-it-out"}}]),r(f,[{key:"firstUpdated",value:function(e){}},{key:"updated",value:function(e){e.forEach(function(e,t){})}}]),f}();customElements.define(b.tag,b),e.CheckItOut=b,Object.defineProperty(e,"__esModule",{value:!0})});
