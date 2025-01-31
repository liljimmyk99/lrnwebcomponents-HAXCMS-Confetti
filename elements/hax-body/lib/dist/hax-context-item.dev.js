"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HaxContextItem = void 0;

var _litElement = require("lit");

var _haxToolbarItem = require("@lrnwebcomponents/hax-body/lib/hax-toolbar-item.js");

require("@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js");

var _haxStore = require("./hax-store.js");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

/**
 * `hax-context-item`
 * A single button in the hax context menu for consistency.
 *
 * @element hax-context-item
 * @extends HaxToolbarItemBehaviors
 *
 * @microcopy - the mental model for this element
 * - context - menu in the page the user can select an item from, this being 1 option in that list
 * - button - an item that expresses what interaction you will have with the content.
 */
var HaxContextItem =
  /*#__PURE__*/
  (function (_HaxToolbarItemBehavi) {
    _inherits(HaxContextItem, _HaxToolbarItemBehavi);

    function HaxContextItem() {
      var _this;

      _classCallCheck(this, HaxContextItem);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(HaxContextItem).call(this)
      );
      _this.haxUIElement = true;
      _this.action = false;
      _this.more = false;
      _this.eventName = "button";
      _this.inputMethod = null;
      _this.propertyToBind = null;
      _this.slotToBind = null;
      _this.value = "";
      return _this;
    }

    _createClass(
      HaxContextItem,
      [
        {
          key: "_handleMousedown",

          /**
           * Store the selection object. This helps fix issues with safari
           * and holding focus on non-text elements actually stealing
           * the selection priority, making it impossible to know what's
           * been selected if clicking a button to try and apply something to.
           */
          value: function _handleMousedown(e) {
            if (!this.disabled)
              _haxStore.HAXStore._tmpSelection =
                _haxStore.HAXStore.getSelection();
          },
          /**
           * Fire an event that includes the eventName of what was just pressed.
           */
        },
        {
          key: "_handleClick",
          value: function _handleClick(e) {
            if (!this.disabled) {
              this.dispatchEvent(
                new CustomEvent("hax-context-item-selected", {
                  bubbles: true,
                  cancelable: true,
                  composed: true,
                  detail: {
                    target: this,
                    eventName: this.eventName,
                    value: this.value,
                  },
                })
              );
            }
          },
        },
      ],
      [
        {
          key: "tag",
          get: function get() {
            return "hax-context-item";
          },
        },
        {
          key: "properties",
          get: function get() {
            return _objectSpread(
              {},
              _get(_getPrototypeOf(HaxContextItem), "properties", this),
              {
                /**
                 * more implies there's an action after pressing the button
                 * so it'll put a visual indicator as such
                 */
                more: {
                  type: Boolean,
                },
                action: {
                  type: Boolean,
                },

                /**
                 * Label for the button.
                 */
                label: {
                  type: String,
                  reflect: true,
                },

                /**
                 * Method of input to display when activated. This is
                 * only used when triggered as part of haxProperties
                 */
                inputMethod: {
                  type: String,
                  reflect: true,
                  attribute: "input-method",
                },

                /**
                 * Optional slot to bind this value to.
                 */
                propertyToBind: {
                  type: String,
                  reflect: true,
                  attribute: "property-to-bind",
                },

                /**
                 * Optional slot to bind this value to.
                 */
                slotToBind: {
                  type: String,
                  reflect: true,
                  attribute: "slot-to-bind",
                },

                /**
                 * Optional description for this item.
                 */
                description: {
                  type: String,
                  reflect: true,
                },

                /**
                 * Is this button concidered a primary interaction
                 */
                default: {
                  type: Boolean,
                },

                /**
                 * an optional value to send along in the press. Allows for
                 * reusing events more easily
                 */
                value: {
                  type: String,
                },
              }
            );
          },
        },
      ]
    );

    return HaxContextItem;
  })((0, _haxToolbarItem.HaxToolbarItemBehaviors)(_litElement.LitElement));

exports.HaxContextItem = HaxContextItem;
window.customElements.define(HaxContextItem.tag, HaxContextItem);
