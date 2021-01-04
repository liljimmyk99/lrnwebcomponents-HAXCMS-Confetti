!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-search.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-git-corner.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/layout/site-modal.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-print-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js"),require("lit-element/lit-element.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSLitElementTheme.js"),require("@polymer/app-layout/app-drawer/app-drawer.js"),require("@polymer/app-layout/app-drawer-layout/app-drawer-layout.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-title.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu.js"),require("@lrnwebcomponents/simple-icon/simple-icon.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icons.js"),require("@lrnwebcomponents/simple-icon/lib/simple-icon-button.js"),require("@polymer/polymer/lib/elements/custom-style.js")):"function"==typeof define&&define.amd?define(["exports","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-search.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-git-corner.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/layout/site-modal.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-print-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-breadcrumb.js","lit-element/lit-element.js","@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSLitElementTheme.js","@polymer/app-layout/app-drawer/app-drawer.js","@polymer/app-layout/app-drawer-layout/app-drawer-layout.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-title.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu.js","@lrnwebcomponents/simple-icon/simple-icon.js","@lrnwebcomponents/simple-icon/lib/simple-icons.js","@lrnwebcomponents/simple-icon/lib/simple-icon-button.js","@polymer/polymer/lib/elements/custom-style.js"],n):n((e=e||self).LearnTwoTheme={},null,null,null,null,null,null,null,e.litElement_js,e.HAXCMSLitElementTheme_js)}(this,function(e,n,t,o,i,r,a,s,l,u){"use strict";function c(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,n,t){return n&&c(e.prototype,n),t&&c(e,t),e}function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,o)}return t}function b(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach(function(n){m(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,n){return(h=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function w(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function g(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var t,o=f(e);if(n){var i=f(this).constructor;t=Reflect.construct(o,arguments,i)}else t=o.apply(this,arguments);return w(this,t)}}function y(e,n,t){return(y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,n,t){var o=function(e,n){for(;!Object.prototype.hasOwnProperty.call(e,n)&&null!==(e=f(e)););return e}(e,n);if(o){var i=Object.getOwnPropertyDescriptor(o,n);return i.get?i.get.call(t):i.value}})(e,n,t||e)}function v(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function x(){var e=v(['\n:host {\n  --__learn-two-theme-default-font-family: var(--learn-two-theme-default-font-family,"Muli, Helvetica, Tahoma, Geneva, Arial, sans-serif");\n  --__learn-two-theme-default-background: var(--learn-two-theme-default-background, #ffffff);\n  display: block;\n  font-family: var(\n  --learn-two-theme-font-family,\n  var(--__learn-two-theme-default-font-family)\n);\n  letter-spacing: var(--learn-two-theme-letter-spacing, -0.03rem);\n  font-weight: var(--learn-two-theme-font-weight, 400);\n  background: var( --learn-two-theme-background, var(--__learn-two-theme-default-background));\n}\n\nhtml,body {\n  background: var( --learn-two-theme-html-body-background, var(--__learn-two-theme-default-background));\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: var(\n  --learn-two-theme-headers-font-family,\n  var(--__learn-two-theme-default-font-family)\n);\n  font-weight: var(--learn-two-theme-headers-font-weight, 400);\n  text-rendering: var(\n  --learn-two-theme-headers-text-rendering,\n  optimizeLegibility\n);\n  line-height: var(--learn-two-theme-headers-line-height, 150%);\n  letter-spacing: var(--learn-two-theme-headers-letter-spacing, 150%);\n}\n\n:host([hidden]) {\n  display: none;\n}\n\n:host([edit-mode]) #slot {\n  display: none;\n}\n\n#contentcontainer {\n  padding: var(--learn-two-theme-contentcontainer-padding, 48px 96px);\n  max-width: var(--learn-two-theme-contentcontainer-max-width, 900px);\n  margin: var(--learn-two-theme-contentcontainer-margin, auto);\n}\n\n.header {\n  background: #747474;\n  color: #fafafa;\n  text-align: center;\n  padding: 0rem 1rem 2rem 1rem;\n}\n\nsite-git-corner {\n  top: 0;\n  right: 0;\n  position: absolute;\n  z-index: 1000;\n}\n\nsimple-icon-button:not(:defined),\nsite-breadcrumb:not(:defined),\nsite-rss-button:not(:defined),\nsite-print-button:not(:defined),\nsite-menu-button:not(:defined),\nsite-modal:not(:defined),\nsite-git-corner:not(:defined),\nsite-menu-button:not(:defined) {\n  display: none;\n}\n\nsite-rss-button {\n  color: white;\n}\n\nsite-menu::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 4px rgba(56, 63, 69, 0.9);\n  border-radius: 0;\n  background-color: #383f45;\n}\n\nsite-menu::-webkit-scrollbar {\n  width: 2px;\n  background-color: #383f45;\n}\n\nsite-menu::-webkit-scrollbar-thumb {\n  border-radius: 1px;\n  -webkit-box-shadow: inset 0 0 4px #747474;\n  background-color: #383f45;\n}\n\n.rss-buttons {\n  justify-content: space-evenly;\n  display: flex;\n  color: white;\n}\n\nsite-print-button {\n  color: var(--site-print-button-color, white);\n}\n\nsimple-icon-button,\nsite-rss-button,\nsite-print-button {\n  color: white;\n  --simple-icon-fill-color: white;\n  --haxcms-tooltip-color: #F5F5F5;\n  --haxcms-tooltip-background-color: #252737;\n}\n\nh-a-x {\n  padding: 0 !important;\n}\n\n:host([edit-mode]) {\n  opacity: 1;\n}\n\n:host([edit-mode]) app-drawer {\n  opacity: 0.2;\n  pointer-events: none;\n}\n\n:host([is-logged-in]) app-drawer {\n  left: 48px;\n}\n\n:host([is-logged-in]) app-drawer-layout[narrow] {\n  margin: 0 0 0 48px;\n}\n\ngit-corner {\n  float: right;\n}\n\napp-drawer {\n  opacity: 1;\n  transition: 0.2s linear all;\n  box-shadow: 0 0 6px -3px var(--haxcms-color, black);\n  overflow: hidden;\n  width: 300px;\n}\n\napp-drawer-layout[narrow] #contentcontainer {\n  padding: 0 16px;\n}\n\n#menubutton,\n#menubutton2 {\n  display: none;\n}\n\napp-drawer-layout[narrow] #menubutton {\n  display: block;\n}\n\napp-drawer-layout[narrow] #menubutton2 {\n  display: block;\n  position: absolute;\n  z-index: 1;\n}\n\napp-drawer-layout[narrow] .header {\n  padding: 0;\n}\n\n:host([is-logged-in]) site-menu-button[type="prev"] {\n  left: 348px;\n}\n\nsite-menu-button:not([disabled]):hover,\nsite-menu-button:not([disabled]):active,\nsite-menu-button:not([disabled]):focus {\n  opacity: 1;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\napp-drawer-layout[narrow] site-menu {\n  max-height: calc(100vh - 160px);\n}\n\nsite-menu-button[type="next"] {\n  right: 0;\n  left: unset;\n}\n\n:host([is-logged-in]) app-drawer-layout[narrow] site-menu-button[type="prev"],\napp-drawer-layout[narrow] site-menu-button[type="prev"] {\n  left: unset;\n}\n\n:host([opened]) app-drawer-layout[narrow] site-menu-button[type="prev"],\n:host([opened])\napp-drawer-layout[narrow]\nsite-menu-button[type="next"] {\n  display: none;\n}\n\nsite-title {\n  position: relative;\n  overflow: hidden;\n  color: white;\n}\n\nsite-menu {\n  background-color: #383f45;\n  color: #ffffff;\n  padding: 0;\n  overflow: scroll;\n  max-height: calc(100vh - 200px);\n  --site-menu-active-color: #ffffff;\n  --site-menu-item-active-item-color: goldenrod;\n}\n\napp-drawer-layout {\n  min-height: 100vh;\n  min-height: -moz-available;\n  min-height: -webkit-fill-available;\n  min-height: fill-available;\n  --app-drawer-width: 300px;\n  --app-drawer-scrim-background: rgba(80, 80, 80, 0.8);\n}\n\nsite-menu-button {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 300px;\n  z-index: 1;\n  --site-menu-button-icon-width: 64px;\n  --site-menu-button-icon-height: 64px;\n  --site-menu-button-icon-fill-color: #2d3237;\n}\n\napp-drawer-layout[narrow] site-menu-button {\n  bottom: 0;\n  top: unset;\n}\n\nsite-menu,\nmap-menu,\nmap-menu * {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  --map-menu-items-list-display: flex;\n  --map-menu-items-list-flex-direction: column;\n  --map-menu-items-list-flex: 1 1 auto;\n  --map-menu-container-display: flex;\n  --map-menu-container-flex-direction: column;\n  --map-menu-container-flex: 1 1 auto;\n}\n      ']);return x=function(){return e},e}function j(){var e=v(['\n\n<custom-style>\n  <style>\n    site-active-title {\n      font-family: var(--__learn-two-theme-default-font-family);\n      font-size: 52px;\n      line-height: 78px;\n      margin-bottom: 27.2px;\n      margin-top: 13.6px;\n      text-align: center;\n      text-rendering: optimizelegibility;\n      font-weight: 100;\n    }\n    site-title {\n      color: #fafafa;\n      --site-title-link-display: inline-block;\n      --site-title-link-text-decoration: none;\n      --site-title-heading-font-family: var(--__learn-two-theme-default-font-family);\n      --site-title-heading-font-size: 28px;\n      --site-title-heading-margin: 0;\n      --site-title-heading-padding: 0;\n      --site-title-heading-text-align: center;\n      --site-title-heading-text-rendering: optimizelegibility;\n      --site-title-heading-font-weight: 100;\n    }\n    site-menu {\n      --site-menu: {\n        background-color: #383f45;\n      }\n      --site-menu-container: {\n        padding: 0;\n        background-color: #2d3237;\n      }\n    }\n    app-drawer-layout {\n      --app-drawer-content-container: {\n        overflow: hidden;\n        background-color: #383f45;\n        position: relative;\n      }\n    }\n    site-menu-button {\n      --site-menu-button-button: {\n        background-color: rgba(0, 0, 0, 0);\n        width: 64px;\n        height: 100vh;\n        border-radius: 0;\n        transition: 0.4s all ease-in-out;\n        transition-delay: 0.2s;\n        margin: 0;\n        padding: 0;\n        opacity: 0.8;\n        -webkit-transition: 0.4s all ease-in-out;\n        -moz-transition: 0.4s all ease-in-out;\n        -ms-transition: 0.4s all ease-in-out;\n        -o-transition: 0.4s all ease-in-out;\n      }\n    }\n    app-drawer-layout[narrow] site-menu-button {\n      --site-menu-button-button: {\n        background-color: transparent !important;\n        width: 64px;\n        height: 64px;\n      }\n    }\n  </style>\n</custom-style>\n<app-drawer-layout responsive-width="900px">\n  <simple-icon-button id="menubutton" icon="menu" @click="','" title="Toggle site menu"></simple-icon-button>\n  <app-drawer swipe-open slot="drawer" .opened="','" @opened="','">\n    <simple-icon-button id="menubutton2" icon="menu" @click="','" title="Toggle site menu"></simple-icon-button>\n    <div class="header-wrapper">\n      <div class="header">\n        <site-title ?disabled="','"></site-title>\n        <site-modal @site-modal-click="','" ?disabled="','" icon="icons:search" title="Search site" button-label="Search">\n          <site-search></site-search>\n        </site-modal>\n      </div>\n    </div>\n    <site-menu></site-menu>\n    <div class="rss-buttons">\n      <site-rss-button ?disabled="','" type="atom"></site-rss-button>\n      <site-rss-button ?disabled="','" type="rss"></site-rss-button>\n      <site-print-button ?disabled="','" position="top"></site-print-button>\n    </div>\n  </app-drawer>\n  <div>\n    <site-menu-button type="prev"></site-menu-button>\n    <div id="contentcontainer">\n      <site-git-corner></site-git-corner>\n      <site-breadcrumb></site-breadcrumb>\n      <site-active-title></site-active-title>\n      <div id="slot">\n        <slot></slot>\n      </div>\n    </div>\n    <site-menu-button type="next"></site-menu-button>\n  </div>\n</app-drawer-layout>']);return j=function(){return e},e}var k=function(e){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&h(e,n)}(t,u.HAXCMSLitElementTheme);var n=g(t);function t(){var e;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),(e=n.call(this)).HAXCMSThemeSettings.autoScroll=!0,setTimeout(function(){},0),e}return p(t,[{key:"render",value:function(){return l.html(j(),this.toggleDrawer,this.opened,this.__openedChanged,this.toggleDrawer,this.editMode,this.siteModalClick,this.editMode,this.editMode,this.editMode,this.editMode)}}],[{key:"styles",get:function(){return[l.css(x())]}},{key:"properties",get:function(){return b({},y(f(t),"properties",this))}}]),p(t,[{key:"siteModalClick",value:function(e){}},{key:"__openedChanged",value:function(e){this.opened=e.detail.value}},{key:"toggleDrawer",value:function(e){this.shadowRoot.querySelector("app-drawer").toggle()}}],[{key:"tag",get:function(){return"learn-two-theme"}},{key:"properties",get:function(){return b(b({},y(f(t),"properties",this)),{},{opened:{type:Boolean,reflect:!0}})}}]),t}();window.customElements.define(k.tag,k),e.LearnTwoTheme=k,Object.defineProperty(e,"__esModule",{value:!0})});
