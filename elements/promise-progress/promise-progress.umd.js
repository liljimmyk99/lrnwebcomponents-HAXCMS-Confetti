!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lit")):"function"==typeof define&&define.amd?define(["exports","lit"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).PromiseProgress={},t.lit)}(this,(function(t,e){"use strict";function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t){return n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(t)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=n(t);if(e){var u=n(this).constructor;r=Reflect.construct(o,arguments,u)}else r=o.apply(this,arguments);return i(this,r)}}function c(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=n(t)););return t}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=c(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},f.apply(this,arguments)}function l(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function a(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var p,y,d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&o(t,e)}(b,t);var i,c,s,d=u(b);function b(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,b),d.call(this)}return i=b,s=[{key:"styles",get:function(){var t=[];return f(n(b),"styles",this)&&(t=f(n(b),"styles",this)),[].concat(a(t),[e.css(y||(y=l(["\n      :host {\n        display: block;\n      }\n    "])))])}},{key:"tag",get:function(){return"promise-progress"}}],(c=[{key:"render",value:function(){return e.html(p||(p=l(["\n      <div>\n        <slot></slot>\n      </div>\n    "])))}},{key:"firstUpdated",value:function(t){f(n(b.prototype),"firstUpdated",this)&&f(n(b.prototype),"firstUpdated",this).call(this,t)}},{key:"updated",value:function(t){f(n(b.prototype),"updated",this)&&f(n(b.prototype),"updated",this).call(this,t),t.forEach((function(t,e){}))}}])&&r(i.prototype,c),s&&r(i,s),Object.defineProperty(i,"prototype",{writable:!1}),b}(e.LitElement);customElements.define(d.tag,d),t.PromiseProgress=d,Object.defineProperty(t,"__esModule",{value:!0})}));
