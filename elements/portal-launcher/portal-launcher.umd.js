!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).PortalLauncher={})}(this,function(t){"use strict";function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function a(t,e,n){return(a=i()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i}).apply(null,arguments)}function c(t){var e="function"==typeof Map?new Map:void 0;return(c=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,i)}function i(){return a(t,arguments,r(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),o(i,t)})(t)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){var e=i();return function(){var n,o,i,a=r(t);if(e){var c=r(this).constructor;n=Reflect.construct(a,arguments,c)}else n=a.apply(this,arguments);return o=this,!(i=n)||"object"!=typeof i&&"function"!=typeof i?u(o):i}}var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,c(HTMLElement));var e=l(r);function r(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(t=e.call(this)).tag=r.tag,t.querySelectorAll("a")&&t.querySelectorAll("a").forEach(function(e){e.addEventListener("click",t.click.bind(u(t)))}),t}return n(r,null,[{key:"tag",get:function(){return"portal-launcher"}}]),n(r,[{key:"normalizeEventPath",value:function(t){return t.composed&&t.composedPath?t.composedPath():t.path?t.path:t.originalTarget?[t.originalTarget]:[t.target]}},{key:"click",value:function(t){var e=t.target,n=this.normalizeEventPath(t);if("A"!==e.tagName&&n.forEach(function(t){"A"===t.tagName&&(e=t)}),e&&null!=e.getAttribute("href")&&"HTMLPortalElement"in window){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();var r=document.createElement("style");r.innerHTML="\n          portal {\n            position:fixed;\n            width: 100%;\n            height: 100%;\n            opacity: 0;\n            box-shadow: 0 0 20px 10px #999;\n            transform: scale(".concat(.2,");\n            bottom: calc(20px + 50% * ").concat(.2," - 50%);\n            right: calc(20px + 50% * ").concat(.2," - 50%);\n            z-index: 10000;\n          }\n          .portal-transition {\n            transition:\n              transform 0.4s,\n              bottom 0.7s,\n              left 0.7s,\n              opacity 1.0s;\n          }\n          @media (prefers-reduced-motion: reduce) {\n            .portal-transition {\n              transition: all 0.001s;\n            }\n          }\n          .portal-reveal {\n            transform: scale(1.0);\n            bottom: 0px;\n            left: 0px;\n          }\n          .fade-in {\n            opacity: 1.0;\n          }\n        ");var o=document.createElement("portal");o.src=e.getAttribute("href"),o.classList.add("portal-transition"),o.addEventListener("transitionend",function(t){"bottom"==t.propertyName&&o.activate()}),document.body.appendChild(r,o),setTimeout(function(t){return o.classList.add("fade-in")},250),setTimeout(function(t){return o.classList.add("portal-reveal")},500)}}}]),r}();window.customElements.define(f.tag,f),t.PortalLauncher=f,Object.defineProperty(t,"__esModule",{value:!0})});
