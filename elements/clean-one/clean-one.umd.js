!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-git-corner.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-print-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu-button.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js"),require("@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-search.js"),require("lit-element/lit-element.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSLitElementTheme.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSThemeParts.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSMobileMenu.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSUserStylesMenu.js"),require("@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js"),require("mobx"),require("@lrnwebcomponents/scroll-button/scroll-button.js"),require("@lrnwebcomponents/utils/utils.js")):"function"==typeof define&&define.amd?define(["exports","@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-git-corner.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-rss-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-print-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/navigation/site-menu-button.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js","@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-search.js","lit-element/lit-element.js","@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSLitElementTheme.js","@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSThemeParts.js","@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSMobileMenu.js","@lrnwebcomponents/haxcms-elements/lib/core/utils/HAXCMSUserStylesMenu.js","@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js","mobx","@lrnwebcomponents/scroll-button/scroll-button.js","@lrnwebcomponents/utils/utils.js"],e):e((n=n||self).CleanOne={},null,null,null,null,null,n.$$0,n.litElement_js,n.HAXCMSLitElementTheme_js,n.HAXCMSThemeParts_js,n.HAXCMSMobileMenu_js,n.HAXCMSUserStylesMenu_js,n.haxcmsSiteStore_js,n.mobx,null,n.utils_js)}(this,function(n,e,t,o,i,s,r,l,a,c,h,m,u,p,b,d){"use strict";function f(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function g(n,e,t){return e&&f(n.prototype,e),t&&f(n,t),n}function x(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function y(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,o)}return t}function v(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?y(Object(t),!0).forEach(function(e){x(n,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))})}return n}function w(n){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function k(n,e){return(k=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,e)}function j(n,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):e}function z(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var t,o=w(n);if(e){var i=w(this).constructor;t=Reflect.construct(o,arguments,i)}else t=o.apply(this,arguments);return j(this,t)}}function M(n,e,t){return(M="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(n,e,t){var o=function(n,e){for(;!Object.prototype.hasOwnProperty.call(n,e)&&null!==(n=w(n)););return n}(n,e);if(o){var i=Object.getOwnPropertyDescriptor(o,e);return i.get?i.get.call(t):i.value}})(n,e,t||n)}function S(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function O(n){return function(n){if(Array.isArray(n))return C(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"==typeof n)return C(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(n);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return C(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,o=new Array(e);t<e;t++)o[t]=n[t];return o}function A(){var n=S(['\n        :host {\n          color: #242A31;\n          width: 100%;\n          margin: 0;\n          display: flex;\n          padding: 0;\n          background: #F5F7F9;\n          min-height: 100vh;\n          flex-direction: column;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n          --haxcms-base-styles-body-font-size:14px;\n          --hax-base-styles-a-font-size: 14px;\n          --hax-base-styles-p-font-size: 14px;\n          --hax-base-styles-list-font-size: 14px;\n          --haxcms-base-styles-body-font-family: "Helvetica Neue",Helvetica,Arial,sans-serif\n          --haxcms-base-styles-body-line-height: 1.7;\n          --hax-base-styles-list-line-height: 1.7;\n          --hax-base-styles-p-line-height: 1.7;\n          --hax-base-styles-p-letter-spacing: .2px;\n          --haxcms-base-styles-body-letter-spacing : .2px;\n          --hax-base-styles-p-min-height: auto;\n          --hax-base-styles-list-max-width: auto;\n          --haxcms-base-styles-p-min-height: auto;\n          --hax-base-styles-list-padding-bottom: auto;\n          --hax-base-styles-h1-font-size: inherit;\n          --hax-base-styles-h2-font-size: inherit;\n          --hax-base-styles-h3-font-size: inherit;\n          --hax-base-styles-h4-font-size: inherit;\n          --hax-base-styles-h5-font-size: inherit;\n          --hax-base-styles-h6-font-size: inherit;\n          --simple-tooltip-background: #000000;\n          --simple-tooltip-opacity: 1;\n          --simple-tooltip-text-color: #ffffff;\n          --simple-tooltip-delay-in: 0;\n          --simple-tooltip-border-radius: 0;\n        }\n        site-git-corner {\n          --site-git-corner-background: black;\n        }\n        simple-tooltip {\n          --simple-tooltip-background: var(\n            --haxcms-tooltip-background-color,\n            #000000\n          );\n          --simple-tooltip-text-color: var(\n            --haxcms-tooltip-color,\n            #ffffff\n          );\n          --simple-tooltip-opacity: 1;\n          --simple-tooltip-delay-in: 0;\n          --simple-tooltip-border-radius: 0;\n        }\n\n        :host([hidden]) {\n          display: none;\n        }\n        [hidden] {\n          display: none;\n        }\n        site-menu-button:not(:defined) {\n          display: none;\n        }\n        .btn-container {\n          z-index: 2;\n          height: 50px;\n          padding: 6px;\n        }\n        simple-tooltip {\n          --simple-tooltip-background: var(--haxcms-user-styles-color-theme-color-1);\n          --simple-tooltip-text-color: var(--haxcms-user-styles-color-theme-color-2);\n        }\n        site-menu {\n          --site-menu-active-color: var(--haxcms-user-styles-color-theme-color-3);\n          --site-menu-item-active-item-color: var(--haxcms-user-styles-color-theme-color-4);\n          --haxcms-tooltip-color: var(--haxcms-user-styles-color-theme-color-2);\n          --haxcms-tooltip-background-color: var(--haxcms-user-styles-color-theme-color-1);\n        }\n        scroll-button {\n          --scroll-button-color: var(--haxcms-user-styles-color-theme-color-1);\n          --scroll-button-background-color: var(--haxcms-user-styles-color-theme-color-2);\n          --scroll-button-tooltip-background-color:var(--haxcms-user-styles-color-theme-color-1);\n          --scroll-button-tooltip-color: var(--haxcms-user-styles-color-theme-color-2);\n        }\n        simple-icon-button,\n        simple-icon-button-lite,\n        site-rss-button,\n        site-print-button,\n        site-git-corner {\n          color: var(--site-print-button-color, black);\n          --site-git-corner-background: var(--haxcms-user-styles-color-theme-color-1);\n          --site-git-corner-color: var(--haxcms-user-styles-color-theme-color-2);\n          --simple-icon-fill-color: var(--haxcms-user-styles-color-theme-color-1);\n          --haxcms-tooltip-color: var(--haxcms-user-styles-color-theme-color-2);\n          --haxcms-tooltip-background-color: var(--haxcms-user-styles-color-theme-color-1);\n        }\n        site-menu-button {\n          --site-menu-button-icon-fill-color: var(--haxcms-user-styles-color-theme-color-1);\n          --haxcms-tooltip-color: var(--haxcms-user-styles-color-theme-color-2);\n          --haxcms-tooltip-background-color: var(--haxcms-user-styles-color-theme-color-1);\n        }\n        * {\n          -webkit-box-sizing: border-box;\n          -moz-box-sizing: border-box;\n          box-sizing: border-box;\n          -webkit-overflow-scrolling: touch;\n          -webkit-tap-highlight-color: transparent;\n          -webkit-text-size-adjust: none;\n          -webkit-touch-callout: none;\n          -webkit-font-smoothing: antialiased;\n        }\n        /* links */\n        \n        a {\n          text-decoration: none;\n        }\n        a:hover,\n        a:focus,\n        a:active {\n          outline: thin dotted;\n        }\n        a:-webkit-any-link {\n          color: -webkit-link;\n          cursor: pointer;\n          text-decoration: underline;\n        }\n        :host([menu-open]) .menu-outline {\n          left: 0;\n        }\n        :host([is-logged-in][menu-open]) .menu-outline {\n          left: 48px;\n        }\n        .menu-outline {\n          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n          position: absolute;\n          top: 0;\n          left: -300px;\n          bottom: 0;\n          z-index: 1;\n          overflow-y: auto;\n          width: 300px;\n          color: #364149;\n          background: #fafafa;\n          border-right: 1px solid rgba(0,0,0,.07);\n          transition: left 250ms ease;\n        }\n        /* content */\n        .main-content>:first-child {\n          margin-top: 0!important;\n        }\n        .main-section h1 {\n          font-size: 2em;\n        }\n        :host([edit-mode]) .main-section {\n          outline: 1px solid grey;\n          outline-offset: 20px;\n        }\n        .main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content h6 {\n          margin-top: 1.275em;\n          margin-bottom: .85em;\n          font-weight: 700;\n        }\n        .main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5 {\n          page-break-after: avoid;\n        }\n        .pull-right {\n          float: right;\n        }\n        .main-content *,\n        .main-content ::slotted(*) {\n          box-sizing: border-box;\n          -webkit-box-sizing: border-box;\n          font-size: inherit;\n        }\n        @media (prefers-reduced-motion: reduce) {\n          #site-search-input,\n          .site-body,\n          .navigation,\n          .site-header site-active-title h1,\n          .menu-outline {\n            transition: none !important;\n          }\n        }\n\n        :host([menu-open]) .site-body {\n          left: 300px;\n        }\n        :host([is-logged-in][menu-open]) .site-body {\n          left: 348px;\n        }\n        :host([is-logged-in]) .site-body {\n          left: 48px;\n        }\n        .site-body {\n          position: absolute;\n          top: 0;\n          right: 0;\n          left: 0;\n          bottom: 0;\n          min-width: 400px;\n          overflow-y: auto;\n          transition: left 250ms ease;\n        }\n        :host([responsive-size="xs"]) .site-body,\n        :host([responsive-size="sm"]) .site-body {\n          overflow-x: hidden;\n          position: fixed;\n        }\n        :host([responsive-size="xs"]) .main-content,\n        :host([responsive-size="sm"]) .main-content {\n          overflow-x: hidden;\n        }\n        :host([responsive-size="xs"]) .site-inner {\n          max-width: 100vw;\n        }\n        :host([responsive-size="xs"]) .page-inner {\n          overflow-x: auto;\n        }\n        h1 {\n          font-size: 2em;\n          margin: .67em 0;\n        }\n        .main-content h2 {\n          font-size: 1.75em;\n        }\n        .main-content h3 {\n          font-size: 1.5em;\n        }\n        .main-content h4 {\n          font-size: 1.25em;\n        }\n        .main-content h5 {\n          font-size: 1em;\n        }\n        .main-content h6 {\n          font-size: 1em;\n          color: #777;\n        }\n        .main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content h6 {\n          margin-top: 1.275em;\n          margin-bottom: .85em;\n          font-weight: 700;\n        }\n\n        .main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5 {\n          page-break-after: avoid;\n        }\n        .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content p {\n          orphans: 3;\n          widows: 3;\n        }\n        .main-content blockquote, .main-content dl, .main-content ol, .main-content p, .main-content table, .main-content ul {\n          margin-top: 0;\n          margin-bottom: .85em;\n        }\n        .main-content ol, .main-content ul {\n          padding: 0;\n          margin: 0;\n          margin-bottom: .85em;\n          padding-left: 2em;\n        }\n        .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content p {\n          orphans: 3;\n          widows: 3;\n        }\n        article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {\n          display: block;\n        }\n        .site-header {\n          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\n          overflow: visible;\n          height: 50px;\n          padding: 0 8px;\n          z-index: 2;\n          font-size: .85em;\n          color: #7e888b;\n          background: 0 0;\n        }\n        .site-header site-active-title h1 {\n          color: inherit;\n          text-decoration: none;\n          position: absolute;\n          z-index: 1;\n          top: 0;\n          left: 0;\n          right: 0;\n          margin: 10px 200px;\n          font-size: 20px;\n          font-weight: 200;\n          text-align: center;\n          line-height: 50px;\n          opacity: 0;\n          transition: opacity .2s ease;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n        .site-header site-active-title h1:hover {\n          opacity: 1;\n        }\n        @media (max-width: 700px){\n          .link-actions {\n            display: none;\n          }\n        }\n        @media (max-width: 1000px){\n          .site-header site-active-title {\n              display: none;\n          }\n        }\n        @media (max-width: 1240px){\n          .site-body .body-inner {\n            position: static;\n            min-height: calc(100% - 50px);\n          }\n        }\n        @media (max-width: 1240px){\n          .site-body {\n            transition: transform 200ms ease;\n            padding-bottom: 20px;\n          }\n        }\n        .site-body .site-inner {\n          position: relative;\n          top: 0;\n          right: 0;\n          left: 0;\n          bottom: 0;\n          overflow-y: auto;\n        }\n        .main-content * {\n          box-sizing: border-box;\n          -webkit-box-sizing: border-box;\n          font-size: inherit;\n        }\n        .page-wrapper {\n          position: relative;\n          outline: 0;\n        }\n        .page-inner {\n          position: relative;\n          max-width: 800px;\n          margin: 0 auto;\n          min-height: 90vh;\n          padding: 20px 15px 40px 15px;\n        }\n        .main-section {\n          display: block;\n          word-wrap: break-word;\n          color: var(--haxcms-user-styles-color-theme-color-color);\n          line-height: 1.7;\n          text-size-adjust: 100%;\n          -ms-text-size-adjust: 100%;\n          -webkit-text-size-adjust: 100%;\n          -moz-text-size-adjust: 100%;\n        }\n        /* Navigation arrows */\n        site-menu-button {\n          --site-menu-button-icon-width: 64px;\n          --site-menu-button-icon-height: 64px;\n        }\n        :host([is-logged-in][menu-open]) site-menu-button[type="prev"] {\n          left: 348px;\n        }\n        :host([is-logged-in]) site-menu-button[type="prev"] {\n          left: 48px;\n        }\n        :host([menu-open]) site-menu-button[type="prev"] {\n          left: 300px;\n        }\n        site-menu-button[type="prev"] {\n          left: 0;\n        }\n        site-menu-button[type="next"] {\n          right: 0;\n        }\n        .navigation {\n          position: fixed;\n          top: 50px;\n          bottom: 0;\n          margin: 0 20px;\n          max-width: 150px;\n          min-width: 90px;\n          display: flex;\n          justify-content: center;\n          align-content: center;\n          flex-direction: column;\n          font-size: 40px;\n          color: #ccc;\n          text-align: center;\n          transition: all .35s ease;\n        }\n        @media (max-width: 1240px) {\n          .navigation {\n            position: static;\n            top: auto;\n            max-width: calc(50vw - 70px);\n            width: calc(50vw - 70px);\n            display: inline-block;\n            float: left;\n          }\n        }\n        /* color,font,size switchers */\n          \n          .site-header .font-settings .font-enlarge {\n            line-height: 30px;\n            font-size: 1.4em;\n          }\n          .site-header .font-settings .font-reduce {\n            line-height: 30px;\n            font-size: 1em;\n          }\n          .site-header .font-settings .font-reduce {\n            line-height: 30px;\n            font-size: 1em;\n          }\n\n          .site-body {\n            color: var(--haxcms-user-styles-color-theme-color-color);\n            background: var(--haxcms-user-styles-color-theme-color-background);\n          }\n          :host([color-theme="1"]) .site-header {\n            color: #afa790;\n            background: transparent;\n          }\n          :host([color-theme="1"]) .site-header .btn {\n            color: black;\n          }\n          :host([color-theme="1"]) .site-header .btn:hover,\n          :host([color-theme="1"]) .site-header .btn:focus,\n          :host([color-theme="1"]) .site-header .btn:active {\n            color: #eee8e0;\n            background: none;\n          }\n          :host([color-theme="1"]) .site-header site-active-title {\n            color: #704214;\n          }\n          :host([color-theme="2"]) .site-header {\n            color: #7e888b;\n            background: transparent;\n          }\n          :host([color-theme="2"]) .site-header .btn {\n            color: white;\n          }\n          :host([color-theme="2"]) .site-header .btn:hover,\n          :host([color-theme="2"]) .site-header .btn:focus,\n          :host([color-theme="2"]) .site-header .btn:active {\n            color: #fffff5;\n            background: none;\n          }\n          :host([color-theme="2"]) .site-header site-active-title {\n            color: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n          }\n          :host([color-theme="1"]) .site-body .navigation {\n            color: #afa790;\n          }\n          :host([color-theme="1"]) .site-body .navigation:hover,\n          :host([color-theme="1"]) .site-body .navigation:focus,\n          :host([color-theme="1"]) .site-body .navigation:active {\n            color: #eee8e0;\n          }\n          :host([color-theme="2"]) .site-body .navigation {\n            color: #383f52;\n          }\n          :host([color-theme="2"]) .site-body .navigation:hover,\n          :host([color-theme="2"]) .site-body .navigation:focus,\n          :host([color-theme="2"]) .site-body .navigation:active {\n            color: #fffff5;\n          }\n          /*\n          * Theme 1\n          */\n          :host([color-theme="1"]) .menu-outline {\n            color: #afa790;\n            background: #111111;\n            border-right: 1px solid rgba(0, 0, 0, 0.07);\n          }\n          :host([color-theme="1"]) .menu-outline ul.summary li.divider {\n            background: #7e888b;\n            box-shadow: none;\n          }\n          :host([color-theme="1"]) .menu-outline ul.summary li.done > a {\n            color: #877f6a;\n          }\n          :host([color-theme="1"]) .menu-outline ul.summary li a,\n          :host([color-theme="1"]) .menu-outline ul.summary li span {\n            color: #877f6a;\n            background: transparent;\n            font-weight: normal;\n          }\n          :host([color-theme="1"]) .menu-outline ul.summary li.active > a,\n          :host([color-theme="1"]) .menu-outline ul.summary li a:hover,\n          :host([color-theme="1"]) .menu-outline ul.summary li a:focus,\n          :host([color-theme="1"]) .menu-outline ul.summary li a:active {\n            color: #704214;\n            background: transparent;\n            font-weight: normal;\n          }\n          /*\n          * Theme 2\n          */\n          :host([color-theme="2"]) .menu-outline {\n            color: #bcc1d2;\n            background: #2d3143;\n            border-right: none;\n          }\n          :host([color-theme="2"]) .menu-outline ul.summary li.divider {\n            background: #272a3a;\n            box-shadow: none;\n          }\n          :host([color-theme="2"]) .menu-outline ul.summary li.done > a {\n            color: #62687f;\n          }\n          :host([color-theme="2"]) .menu-outline ul.summary li a,\n          :host([color-theme="2"]) .menu-outline ul.summary li span {\n            color: #c1c6d7;\n            background: transparent;\n            font-weight: 600;\n          }\n          :host([color-theme="2"]) .menu-outline ul.summary li.active > a,\n          :host([color-theme="2"]) .menu-outline ul.summary li a:hover,\n          :host([color-theme="2"]) .menu-outline ul.summary li a:focus,\n          :host([color-theme="2"]) .menu-outline ul.summary li a:active {\n            color: #f4f4f5;\n            background: #252737;\n            font-weight: 600;\n          }\n          button, select {\n            text-transform: none;\n          }\n           button, input {\n            line-height: normal;\n          }\n          button, input, select, textarea {\n            font-family: inherit;\n            font-size: 100%;\n            margin: 0;\n          }\n          scroll-button {\n            position: absolute;\n            bottom: 0;\n            right: 16px;\n          }\n          .link-actions {\n            top: 0;\n            right: 16px;\n          }\n          #site-search-input {\n            padding: 6px;\n            background: 0 0;\n            transition: top .5s ease;\n            background: #fff;\n            border-bottom: 1px solid rgba(0,0,0,.07);\n            border-top: 1px solid rgba(0,0,0,.07);\n            margin-bottom: 10px;\n            margin-top: -1px;\n          }\n          #site-search-input input, #site-search-input input:focus, #site-search-input input:hover {\n            width: 100%;\n            background: 0 0;\n            border: 1px solid transparent;\n            box-shadow: none;\n            outline: 0;\n            line-height: 22px;\n            padding: 7px 7px;\n            color: inherit;\n          }\n          site-search {\n            height: auto;\n            width: auto;\n            font-size: inherit;\n          }\n          :host([color-theme="0"]) site-search {\n            color: #252737;\n            --site-search-result-background-color: transparent;\n            --site-search-result-background-color-hover: #F5F5F5;\n            --site-search-link-color-hover: #252737;\n            --site-search-link-text-color: #252737;\n            --site-search-link-color: #252737;\n            --site-search-result-color: #252737;\n          }\n          :host([color-theme="1"]) site-search {\n            color: #704214;\n            --site-search-result-background-color: transparent;\n            --site-search-result-background-color-hover: transparent;\n            --site-search-link-color-hover: #704214;\n            --site-search-link-text-color: #704214;\n            --site-search-link-color: #704214;\n            --site-search-result-color: #704214;\n          }\n          :host([color-theme="2"]) site-search {\n            color: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n            --site-search-result-background-color: transparent;\n            --site-search-result-background-color-hover: transparent;\n            --site-search-link-color-hover: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n            --site-search-link-text-color: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n            --site-search-link-color: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n            --site-search-result-color: var(--simple-colors-default-theme-light-blue-1,#CFD4E3);\n          }\n      ']);return A=function(){return n},n}function P(){var n=S(['\n      <div class="site">\n        <div class="menu-outline">\n          <div id="site-search-input" role="search">\n            <input\n              type="text"\n              aria-label="Search site content"\n              placeholder="Type to search"\n              .value="','"\n              id="search"\n              @input="','"\n            />\n          </div>\n          ','\n        </div>\n        <div id="body" class="site-body">\n          <div id="top"></div>\n          <div class="site-inner">\n            <div\n              class="site-header"\n              role="navigation"\n              .part="','"\n            >\n              <div class="btn-container">\n                '," ",'\n                <div class="pull-right link-actions">\n                  <site-print-button\n                    class="btn js-toolbar-action"\n                  ></site-print-button>\n                  <site-rss-button\n                    type="rss"\n                    class="btn js-toolbar-action"\n                  ></site-rss-button>\n                  <site-git-corner size="small"></site-git-corner>\n                </div>\n              </div>\n              <site-active-title></site-active-title>\n            </div>\n            <div class="page-wrapper" role="main">\n              <div class="main-content page-inner">\n                <section class="normal main-section">\n                  <site-search\n                    hide-input\n                    search="','"\n                    ?hidden="','"\n                  ></site-search>\n                  <div\n                    id="contentcontainer"\n                    ?hidden="','"\n                  >\n                    <div id="slot">\n                      <slot></slot>\n                    </div>\n                  </div>\n                </section>\n              </div>\n            </div>\n          </div>\n          \x3c!-- These two buttons allow you to go left and right through the pages in the manifest --\x3e\n          <site-menu-button\n            type="prev"\n            position="right"\n            class="navigation"\n          ></site-menu-button>\n          <site-menu-button\n            type="next"\n            position="left"\n            class="navigation"\n          ></site-menu-button>\n        </div>\n        <scroll-button\n          .part="','"\n        ></scroll-button>\n      </div>\n    ']);return P=function(){return n},n}var _=function(n){!function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&k(n,e)}(t,c.HAXCMSThemeParts(m.HAXCMSUserStylesMenuMixin(h.HAXCMSMobileMenuMixin(a.HAXCMSLitElementTheme))));var e=z(t);function t(){var n;return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),(n=e.call(this)).HAXCMSThemeSettings.autoScroll=!0,n.__disposer=n.__disposer?n.__disposer:[],p.autorun(function(e){n.activeManifestIndex=p.toJS(u.store.activeManifestIndex),n.searchTerm="",n.__disposer.push(e)}),n}return g(t,[{key:"render",value:function(){return l.html(P(),this.searchTerm,this.searchChanged,this.HAXCMSMobileMenu(),this.editMode?"edit-mode-active":"",this.HAXCMSMobileMenuButton(),this.HAXCMSUserStylesMenu(),this.searchTerm,""==this.searchTerm,""!=this.searchTerm,this.editMode?"edit-mode-active":"")}},{key:"searchChanged",value:function(n){var e=this,t=d.normalizeEventPath(n)[0];t.value?Promise.resolve(r).then(function(){e.searchTerm=t.value}):this.searchTerm=""}}],[{key:"styles",get:function(){return[].concat(O(M(w(t),"styles",this)),[l.css(A())])}},{key:"properties",get:function(){return v(v({},M(w(t),"properties",this)),{},{searchTerm:{type:String}})}},{key:"tag",get:function(){return"clean-one"}}]),g(t,[{key:"firstUpdated",value:function(n){M(w(t.prototype),"firstUpdated",this)&&M(w(t.prototype),"firstUpdated",this).call(this,n),this.HAXCMSThemeSettings.scrollTarget=this.shadowRoot.querySelector("#body"),this.shadowRoot.querySelector("scroll-button").target=this.shadowRoot.querySelector("#top")}},{key:"disconnectedCallback",value:function(){for(var n in this.__disposer)this.__disposer[n].dispose();M(w(t.prototype),"disconnectedCallback",this).call(this)}},{key:"prevPage",value:function(n){M(w(t.prototype),"prevPage",this).call(this,n)}},{key:"nextPage",value:function(n){M(w(t.prototype),"nextPage",this).call(this,n)}}]),t}();window.customElements.define(_.tag,_),n.CleanOne=_,Object.defineProperty(n,"__esModule",{value:!0})});
