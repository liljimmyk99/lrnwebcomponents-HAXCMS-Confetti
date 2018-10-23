define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.SimpleConceptNetwork = void 0;
  function _templateObject_ca24fc70d70511e89dce5b69e7d2348f() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_ca24fc70d70511e89dce5b69e7d2348f = function() {
      return data;
    };
    return data;
  }
  var SimpleConceptNetwork = (function(_PolymerElement) {
    babelHelpers.inherits(SimpleConceptNetwork, _PolymerElement);
    function SimpleConceptNetwork() {
      babelHelpers.classCallCheck(this, SimpleConceptNetwork);
      return babelHelpers.possibleConstructorReturn(
        this,
        (
          SimpleConceptNetwork.__proto__ ||
          Object.getPrototypeOf(SimpleConceptNetwork)
        ).apply(this, arguments)
      );
    }
    babelHelpers.createClass(
      SimpleConceptNetwork,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                SimpleConceptNetwork.prototype.__proto__ ||
                  Object.getPrototypeOf(SimpleConceptNetwork.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              SimpleConceptNetwork.haxProperties,
              SimpleConceptNetwork.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_ca24fc70d70511e89dce5b69e7d2348f()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Simple concept-network",
                description: "Automated conversion of simple-concept-network/",
                icon: "icons:android",
                color: "green",
                groups: ["Concept"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "simple-concept-network";
          }
        }
      ]
    );
    return SimpleConceptNetwork;
  })(_polymerElement.PolymerElement);
  _exports.SimpleConceptNetwork = SimpleConceptNetwork;
  window.customElements.define(SimpleConceptNetwork.tag, SimpleConceptNetwork);
});
