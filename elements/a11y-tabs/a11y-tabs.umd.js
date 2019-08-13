!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@polymer/polymer/polymer-element.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@lrnwebcomponents/responsive-utility/responsive-utility.js"),require("@polymer/paper-button/paper-button.js"),require("@polymer/iron-icons/iron-icons.js"),require("@polymer/paper-tooltip/paper-tooltip.js"),require("@polymer/iron-a11y-keys/iron-a11y-keys.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-element.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@lrnwebcomponents/responsive-utility/responsive-utility.js","@polymer/paper-button/paper-button.js","@polymer/iron-icons/iron-icons.js","@polymer/paper-tooltip/paper-tooltip.js","@polymer/iron-a11y-keys/iron-a11y-keys.js"],e):e((t=t||self).A11yTabs={},t.polymerElement_js)}(this,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function o(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t,e,n){return(b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var a=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=i(t)););return t}(t,e);if(a){var o=Object.getOwnPropertyDescriptor(a,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function c(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function p(){var t=c(['\n      <style>\n        :host {\n          display: block;\n          @apply --a11y-tab-content;\n        }\n        :host([flag]) {\n          @apply --a11y-tab-flagged-content;\n        }\n        :host([hidden]) {\n          display: none;\n        }\n        :host .sr-only {\n          position: absolute;\n          left: -99999px;\n          height: 0;\n          overflow: hidden;\n        }\n      </style>\n      <span class="sr-only">Tab [[__xOfY]]</span>\n      <slot></slot>\n      <span class="sr-only"\n        >End of tab [[__xOfY]]. Back to <a href$="[[__toTop]]">tabs</a>.</span\n      >\n    ']);return p=function(){return t},t}var u=function(t){function a(){return n(this,a),l(this,i(a).apply(this,arguments))}return r(a,e.PolymerElement),o(a,[{key:"connectedCallback",value:function(){var t=this;b(i(a.prototype),"connectedCallback",this).call(this),this.__target=this,this.addEventListener("a11y-tab-flag",function(e){t.flag=e.detail.flag,t.flagIcon=e.detail.flagIcon})}},{key:"_tabChanged",value:function(t){this.dispatchEvent(new CustomEvent("a11y-tab-changed",{bubbles:!0,cancelable:!0,composed:!1,detail:this}))}}],[{key:"template",get:function(){return e.html(p())}},{key:"properties",get:function(){return{id:{name:"id",type:String,value:null,observer:"_tabChanged"},flag:{name:"flag",type:String,value:null,observer:"_tabChanged",reflectToAttribute:!0},flagIcon:{name:"flagIcon",type:String,value:null,observer:"_tabChanged"},icon:{name:"id",type:String,value:null,observer:"_tabChanged"},label:{name:"label",type:String,value:null,observer:"_tabChanged"},hidden:{name:"hidden",type:Boolean,value:!1,reflectToAttribute:!0},__toTop:{name:"__toTop",type:String,value:null},__xOfY:{name:"__xOfY",type:String,value:null}}}},{key:"tag",get:function(){return"a11y-tab"}}]),a}();function d(){var t=c(['\n<style>:host {\n  display: block;\n  --a11y-tabs-border-radius: 2px;\n  --a11y-tabs-justify-tabs: flex-start;\n  --ally-tabs-wrap: unset;\n  --a11y-tabs-background: white;\n  --a11y-tabs-border-color: #ddd;\n  --a11y-tabs-color: #222;\n  --a11y-tabs-focus-color: #000;\n  --a11y-tabs-faded-background: #eee;\n  --a11y-tabs-content-padding: 16px;\n  --a11y-tabs-button-padding: 0.7em 0.57em;\n  --a11y-tabs-vertical-button-padding: unset;\n  --a11y-tabs-horizontal-border-radius: unset;\n  --a11y-tabs-vertical-border-radius: unset;\n  --a11y-tabs-horizontal-button-padding: 2px 5px;\n}\n:host([vertical]) {\n  border: 1px solid var(--a11y-tabs-border-color);\n  border-radius: var(--a11y-tabs-vertical-border-radius, var(--a11y-tabs-border-radius));\n  display: flex;\n  justify-content: space-between;\n  align-items: stretch;\n  @apply --a11y-tabs-vertical;\n}\n:host(:not([vertical])) {\n  @apply --a11y-tabs-horizontal;\n}\n:host([hidden]) {\n  display: none;\n}\n:host #tabs {\n  align-items: stretch;\n  flex-wrap: var(--ally-tabs-wrap, unset);\n  margin: 0;\n  display: flex;\n  list-style: none;\n  padding: 0;\n  @apply --a11y-tabs-tabs;\n}\n:host([vertical]) #tabs {\n  background-color: var(--a11y-tabs-border-color);\n  justify-content: var(--a11y-tabs-vertical-justify-tabs, var(--a11y-tabs-justify-tabs, flex-start));\n  flex-wrap: var(--ally-tabs-vertical-wrap, var(--ally-tabs-wrap, unset));\n  border-left: none;\n  flex: 0 1 auto;\n  flex-direction: column;\n  @apply --a11y-tabs-vertical-tabs;\n}\n:host(:not([vertical])) #tabs {\n  justify-content: var(--a11y-tabs-horizontal-justify-tabs, var(--a11y-tabs-justify-tabs, flex-start));\n  @apply --a11y-tabs-horizontal-tabs;\n}\n:host #tabs .flag-type {\n  position: absolute;\n  left: -99999px;\n  height: 0; \n  overflow: hidden;\n}\n:host #content {\n  padding: var(--a11y-tabs-content-padding);\n  background-color: var(--a11y-tabs-background);\n  border: 1px solid var(--a11y-tabs-border-color);\n  @apply --a11y-tabs-content;\n}\n:host([vertical]) #content {\n  flex: 1 0 auto;\n  border: none;\n  @apply --a11y-tabs-vertical-content;\n}\n:host(:not([vertical])) #content {\n  border-radius: var(--a11y-tabs-horizontal-border-radius, var(--a11y-tabs-border-radius));\n  margin-top: -1px;\n  @apply --a11y-tabs-horizontal-content;\n}\n:host #tabs paper-button {\n  margin: 0;\n  text-transform: unset;\n  color: var(--a11y-tabs-color);\n  background-color: var(--a11y-tabs-faded-background);\n  border: 1px solid var(--a11y-tabs-border-color);\n  padding: var(--a11y-tabs-button-padding, 0.7em 0.57em);\n  @apply --a11y-tabs-button;\n}\n:host([vertical]) #tabs paper-button {\n  border-top: none;\n  border-left: none;\n  border-radius: 0; \n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--a11y-tabs-vertical-button-padding, var(--a11y-tabs-button-padding));\n  @apply --a11y-tabs-vertical-button;\n}\n:host(:not([vertical])) #tabs paper-button {\n  width: 100%;\n  border-bottom: none;\n  border-radius: \n    var(--a11y-tabs-horizontal-border-radius, var(--a11y-tabs-border-radius))\n    var(--a11y-tabs-horizontal-border-radius, var(--a11y-tabs-border-radius))\n    0 \n    0; \n  padding: var(--a11y-tabs-horizontal-button-padding, var(--a11y-tabs-button-padding));\n  @apply --a11y-tabs-horizontal-button;\n}\n:host(:not([vertical])) #tabs li:not(:first-of-type) paper-button {\n  border-left: none;\n}\n:host  #tabspaper-button:active,\n:host #tabs paper-button:focus,\n:host #tabs paper-button:hover {\n  color: var(--a11y-tabs-focus-color);\n  background-color: var(--a11y-tabs-faded-background);\n}\n:host #tabs paper-button:focus {\n  @apply --a11y-tabs-button-focus;\n}\n:host #tabs paper-button:active {\n  @apply --a11y-tabs-button-active;\n}\n:host #tabs paper-button:hover {\n  @apply --a11y-tabs-button-hover;\n}\n:host #tabs paper-button[disabled] {\n  color: var(--a11y-tabs-focus-color);\n  background-color: var(--a11y-tabs-background);\n  @apply --a11y-tabs-active-button;\n}\n:host([vertical]) #tabs paper-button[disabled] {\n  border-right-color: var(--a11y-tabs-background);;\n  @apply --a11y-tabs-vertical-active-button;\n}\n:host(:not([vertical])) #tabs paper-button[disabled] {\n  border-bottom: 1px solid var(--a11y-tabs-background);\n  @apply --a11y-tabs-horizontal-active-button;\n}\n:host #tabs span.label,\n:host #tabs .flag-icon {\n  margin-right: 8px;\n}\n:host([icons-only]) #tabs paper-button {\n  justify-content: center;\n}\n:host([icons-only]) #tabs span.label {\n  display:none;\n}\n:host(:not([icons-only])) #tabs paper-tooltip {\n  display:none;\n}\n:host #tabs paper-button[flag] {\n  @apply --a11y-tab-flagged-tab;\n}\n:host #tabs .flag-icon {\n  @apply --a11y-tab-flag-icon;\n}\n</style>\n<ul id="tabs">\n  <template is="dom-repeat" items="[[__items]]" as="tab">\n    <li>\n      <paper-button \n        id$="[[tab.id]]-button" \n        flag$="[[tab.flag]]"\n        disabled$="[[_isActiveTab(tab.id,activeTab)]]" \n        controls$="[[tab.id]]" \n        on-tap="_handleTab">\n        <iron-icon \n          class="flag-icon" \n          hidden$="[[!tab.flagIcon]]" \n          icon$="[[tab.flagIcon]]">\n        </iron-icon>\n        <span class="label">[[tab.label]]</span> \n        <span \n          class="flag-type" \n          hidden!="[[!tab.flag]]">\n          [[tab.flag]]\n        </span>\n        <iron-icon \n          class="icon" \n          hidden$="[[!tab.icon]]" \n          icon$="[[tab.icon]]">\n        </iron-icon>\n      </paper-button>\n      <paper-tooltip for="[[tab.id]]-button">[[tab.label]]</paper-tooltip>\n    </li>\n  </template>\n</ul>\n<div id="content">\n  <slot></slot>\n</div>']);return d=function(){return t},t}window.customElements.define(u.tag,u);var y=function(t){function a(){return n(this,a),l(this,i(a).apply(this,arguments))}return r(a,e.PolymerElement),o(a,[{key:"connectedCallback",value:function(){b(i(a.prototype),"connectedCallback",this).call(this);var t=this;this.updateItems(),this.__observer=new MutationObserver(function(e,n){t.updateItems()}),this.__observer.observe(this,{attributes:!1,childList:!0,subtree:!1}),this.addEventListener("a11y-tab-changed",function(e){t.updateItems()}),window.ResponsiveUtility.requestAvailability(),this._breakpointChanged()}},{key:"disconnectedCallback",value:function(){var t=this;this.__observer&&this.__observer.disconnect&&this.__observer.disconnect(),this.removeEventListener("a11y-tab-changed",function(e){t.updateItems()}),window.dispatchEvent(new CustomEvent("responsive-element-deleted",{bubbles:!0,cancelable:!0,composed:!0,detail:t})),b(i(a.prototype),"disconnectedCallback",this).call(this)}},{key:"selectTab",value:function(t){var e=this.querySelectorAll("a11y-tab"),n=t&&this.querySelector("a11y-tab#".concat(t))?this.querySelector("a11y-tab#".concat(t)):this.querySelector("a11y-tab");n&&n.id!==t?this.activeTab=n.id:e&&e.length>0&&e.forEach(function(e){e.hidden=e.id!==t})}},{key:"updateItems",value:function(t){var e=this;this.set("__items",[]);var n=this.querySelectorAll("a11y-tab");this.__hasIcons=!0,this.id||(this.id=this._generateUUID()),n&&n.length>0&&n.forEach(function(t){e.push("__items",{id:t.id||"tab-".concat(1),flag:t.flag,flagIcon:t.flagIcon,icon:t.icon,label:t.label||"Tab ".concat(1)}),t.icon||(e.__hasIcons=!1),t.__xOfY="".concat(1," of ").concat(n.length),t.__toTop=e.id}),this.selectTab(this.activeTab)}},{key:"_activeTabChanged",value:function(t){this.selectTab(t)}},{key:"_breakpointChanged",value:function(t){var e=this.layoutBreakpoint>-1?this.layoutBreakpoint:0,n=this.iconBreakpoint>-1?this.iconBreakpoint:0,a=n>e?e:n,o=n>e?n:e,r=Math.max(n,e)+1,i=Math.max(n,e)+2;window.dispatchEvent(new CustomEvent("responsive-element-deleted",{bubbles:!0,cancelable:!0,composed:!0,detail:this})),window.dispatchEvent(new CustomEvent("responsive-element",{detail:{element:this,attribute:"responsive-size",relativeToParent:!0,sm:a,md:o,lg:r,xl:i}}))}},{key:"_generateUUID",value:function(){return"ss-s-s-s-sss".replace(/s/g,Math.floor(65536*(1+Math.random())).toString(16).substring(1))}},{key:"_handleTab",value:function(t){t.model&&t.model.__data&&t.model.__data.tab&&(this.activeTab=t.model.__data.tab.id)}},{key:"_idChanged",value:function(t,e){t||(this.id="a11y-tabs"+this._generateUUID())}},{key:"_isActiveTab",value:function(t,e){return t===e}},{key:"_isVertical",value:function(t,e,n){return-1===e||t>e?"xs"===n:n.indexOf("s")>-1}},{key:"_showIcons",value:function(t,e,n,a){return t&&-1!==e&&("xs"===a||e>n&&"sm"===a)}}],[{key:"template",get:function(){return e.html(d())}},{key:"haxProperties",get:function(){}},{key:"properties",get:function(){return{activeTab:{name:"activeTab",type:String,value:null,observer:"selectTab"},disabled:{name:"disabled",type:Boolean,value:!1,reflectToAttribute:!0},hidden:{name:"hidden",type:Boolean,value:!1,reflectToAttribute:!0},iconBreakpoint:{name:"iconBreakpoint",type:Number,value:400,observer:"_breakpointChanged"},iconsOnly:{name:"iconsOnly",type:Boolean,computed:"_showIcons(__hasIcons,iconBreakpoint,layoutBreakpoint,responsiveSize)",reflectToAttribute:!0},id:{name:"id",type:String,value:null,reflectToAttribute:!0,observer:"_idChanged"},layoutBreakpoint:{name:"layoutBreakpoint",type:Number,value:600,observer:"_breakpointChanged"},responsiveSize:{name:"responsiveSize",type:String,value:"xs"},vertical:{name:"vertical",type:Boolean,computed:"_isVertical(iconBreakpoint,layoutBreakpoint,responsiveSize)",reflectToAttribute:!0},__hasIcons:{name:"__hasIcons",type:Boolean,value:!1},__items:{name:"__items",type:Array,value:[]},__observer:{name:"__observer",type:Object,value:null}}}},{key:"tag",get:function(){return"a11y-tabs"}}]),a}();window.customElements.define(y.tag,y),t.A11yTabs=y,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=a11y-tabs.umd.js.map
