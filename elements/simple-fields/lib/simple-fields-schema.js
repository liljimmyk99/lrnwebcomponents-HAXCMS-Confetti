import { LitElement, html, css } from "lit-element/lit-element.js";
import "./simple-fields-array.js";
/**
 * `simple-fields-schema`
 * 
### Styling

`<simple-fields-schema>` provides the following custom properties
for styling:

Custom property | Description | Default
----------------|-------------|----------
`--simple-fields-schema-margin` | margin around the simple-fields-schema | 15px 0
 *
 * @demo ./demo/schema.html
 * @customElement simple-fields-schema
 */
class SimpleFieldsSchema extends LitElement {
  static get styles() {
    return [css``];
  }
  render() {
    return html`
      <div id="schema-fields" aria-live="polite">
        <slot></slot>
      </div>
    `;
  }
  constructor() {
    super();
    this.autofocus = false;
    this.codeTheme = "vs-light-2";
    this.jsonSchemaToHtml = {
      defaultSettings: {
        element: "paper-input",
        attributes: {
          type: "text"
        },
        properties: {
          label: "label",
          minLength: "minlength",
          maxLength: "maxlength"
        }
      },
      type: {
        array: {
          defaultSettings: {
            element: "simple-fields-array",
            child: {
              element: "simple-fields-array-item",
              properties: {
                label: "label",
                description: "description",
                previewBy: "previewBy",
                sortBy: "sortBy"
              }
            },
            sort: {
              element: "paper-input",
              attributes: {
                step: 1,
                type: "number"
              },
              properties: {
                label: "label",
                minimum: "min",
                maximum: "max",
                multipleOf: "step"
              }
            },
            properties: {
              label: "label",
              description: "description"
            }
          }
        },
        boolean: {
          defaultSettings: {
            element: "simple-fields-boolean",
            attributes: {
              value: false
            },
            properties: {
              label: "label"
            }
          }
        },
        file: {
          defaultSettings: {
            element: "simple-fields-file"
          }
        },
        integer: {
          defaultSettings: {
            element: "paper-input",
            attributes: {
              step: 1,
              type: "number"
            },
            properties: {
              label: "label",
              minimum: "min",
              maximum: "max",
              multipleOf: "step"
            }
          }
        },
        markup: {
          defaultSettings: {
            element: "simple-fields-markup"
          }
        },
        number: {
          defaultSettings: {
            element: "paper-input",
            type: "number",
            attributes: {
              type: "number"
            },
            properties: {
              label: "label",
              minimum: "min",
              maximum: "max",
              multipleOf: "step"
            }
          }
        },
        object: {
          defaultSettings: {
            element: "simple-fields-fieldset",
            properties: {
              label: "label",
              description: "description"
            }
          },
          format: {
            tabs: {
              defaultSettings: {
                element: "a11y-tabs",
                properties: {
                  label: "label",
                  description: "description"
                }
              }
            }
          }
        },
        string: {
          format: {
            "date-time": {
              defaultSettings: {
                element: "paper-input",
                attributes: {
                  type: "datetime-local"
                },
                properties: {
                  label: "label"
                }
              }
            },
            time: {
              defaultSettings: {
                element: "paper-input",
                attributes: {
                  type: "time"
                },
                properties: {
                  label: "label"
                }
              }
            },
            date: {
              defaultSettings: {
                element: "paper-input",
                attributes: {
                  type: "date"
                },
                properties: {
                  label: "label"
                }
              }
            },
            email: {
              defaultSettings: {
                element: "paper-input",
                attributes: {
                  type: "email"
                },
                properties: {
                  label: "label"
                }
              }
            },
            uri: {
              defaultSettings: {
                element: "paper-input",
                attributes: {
                  type: "url"
                },
                properties: {
                  label: "label"
                }
              }
            }
          }
        }
      }
    };
    this.language = "en";
    this.resources = {};
    this.value = {};
    setTimeout(() => {
      import("./simple-fields-fieldset.js");
      import("@polymer/iron-icons/iron-icons.js");
      import("@polymer/iron-icons/editor-icons.js");
      import("@polymer/paper-input/paper-input.js");
      import("@polymer/paper-icon-button/paper-icon-button.js");
      import("@lrnwebcomponents/simple-tooltip/simple-tooltip.js");
    }, 0);
  }

  static get tag() {
    return "simple-fields-schema";
  }

  static get properties() {
    return {
      ...super.properties,
      /**
       * automatically set focus on the first field if that field has autofocus
       */
      autofocus: {
        type: Boolean
      },
      /**
       * the name of the code-editor theme
       */
      codeTheme: {
        type: String
      },
      /** 
       *  conversion from JSON Schema to HTML ```
      type: {                  //convert based on te type attribute
        string: {              //if type is string  
          format: {            //check the format attribute
            "date-time": {     //if format is date-time
              element:         //HTML form element to create
              attributes:      //HTML attribute settings
              properties:      //Schema properties to map to attributes
              slots:           //HTML slot settings
            }
          },
          defaultSettings: {  //if there was no format match
            element:         //HTML form element to create
            attributes:      //HTML attribute settings
            properties:      //Schema properties to map to attributes
            slots:           //HTML slot settings
          }
        }
      }```
      */
      jsonSchemaToHtml: {
        type: Object
      },
      error: {
        type: Object
      },
      label: {
        type: String
      },
      language: {
        type: String,
        attribute: "lang",
        reflect: true
      },
      resources: {
        type: Object
      },
      schema: {
        type: Object
      },
      value: {
        type: Object
      },
      wizard: {
        type: Boolean
      }
    };
  }

  buildHtmlFromJsonSchema(
    schema = this.schema,
    target = this,
    prefix = "",
    child
  ) {
    let root = this,
      schemaProps = schema.properties,
      required = schema.required,
      schemaKeys = Object.keys(schemaProps || {});
    schemaKeys.forEach(key => {
      let data = child
        ? child
        : this._searchConversion(schemaProps[key], this.jsonSchemaToHtml);
      if (data && data.element) {
        let label =
            schemaProps[key].label ||
            schemaProps[key].title ||
            schemaProps[key].description ||
            key,
          desc =
            schemaProps[key].label || schemaProps[key].title
              ? schemaProps[key].description
              : undefined,
          element = document.createElement(data.element),
          value = this._getValue(`${prefix}${key}`),
          valueProperty = data.valueProperty || "value";
        element.name = `${prefix}${key}`;
        element[valueProperty] = value;
        console.log(element.name, data.element, schema, schemaProps[key], data);
        element.resources = this.resources;
        element.setAttribute("language", this.language);
        schemaProps[key].label = label;
        schemaProps[key].description = desc;
        //handle data type attributes
        Object.keys(data.attributes || {}).forEach(attr => {
          if (data.attributes[attr]) {
            element.setAttribute(attr, data.attributes[attr]);
          }
        });
        //handle data type properties
        Object.keys(data.properties || {}).forEach(prop => {
          if (data.properties[prop] && schemaProps[key][prop]) {
            element[data.properties[prop]] = schemaProps[key][prop];
          }
        });
        //handle required fields
        if (required && required.includes(key))
          element.setAttribute("required", true);
        //place the field in the correct slot of its parent
        if (target.slots && target.slots[key]) element.slot = target.slots[key];
        //handles arrays
        if (schemaProps[key].items) {
          console.log(
            "schemaProps[key].items",
            schemaProps[key].items,
            schemaProps[key].properties
          );
          if (value)
            value.forEach((item, i) => {
              let subschema = schemaProps[key];
              subschema.properties = {};
              subschema.properties[i] = schemaProps[key].items;
              subschema.properties[i].label = `${i + 1}`;
              console.log(
                "schemaProps[key].items",
                schemaProps[key].items,
                schemaProps[key].properties,
                subschema.properties[i]
              );
              this.buildHtmlFromJsonSchema(
                subschema,
                element,
                `${element.name}.`,
                data.child
              );
              element.addEventListener("add", e =>
                this._setValue(`${element.name}.${value.length}`, {})
              );
              element.addEventListener("remove", e => {
                let temp = this._deepClone(value);
                temp.splice(parseInt(e.detail.id.replace(/item-/, "")), 1);
                this._setValue(`${element.name}`, temp);
              });
            });
        }
        //handles objects
        else if (schemaProps[key].properties) {
          this.buildHtmlFromJsonSchema(
            schemaProps[key],
            element,
            `${element.name}.`
          );
        } else {
          if (value && !element.getAttribute(valueProperty))
            element.setAttribute(valueProperty, value);
        }
        //handles label
        if (label && (!data.properties || !data.properties.label)) {
          let labelEl = document.createElement("label");
          labelEl.innerHTML = label;
          labelEl.setAttribute("for", element.name);
          target.appendChild(labelEl);
        }
        target.appendChild(element);
        element.addEventListener(`${valueProperty}-changed`, e =>
          this._handleChange(element, valueProperty)
        );
      }
    });
  }
  _handleChange(element, valueProperty) {
    //console.log('_handleChange',this.value,this._getValue(element.name),element[valueProperty],element.value)
    //this._fireValueChanged();
  }

  _searchConversion(property, conversion, settings) {
    let propKeys = Object.keys(property || {}),
      convKeys = Object.keys(conversion || {}).filter(key =>
        propKeys.includes(key)
      );
    if (conversion.defaultSettings) settings = conversion.defaultSettings;
    convKeys.forEach(key => {
      let val = property[key],
        convData = conversion ? conversion[key] : undefined,
        convVal = !convData
          ? undefined
          : Array.isArray(val)
          ? convData[val[0]]
          : convData[val];
      if (convVal)
        settings = this._searchConversion(property, convVal, settings);
    });
    return settings;
  }

  /**
   * adds form element to page
   *
   * @param {object} config properties object for the element
   * @param {object} [parent=this] parent where element will be appended
   * @param {number} index if in array, element's index
   * @param {string} string name of slot
   * @returns {object} form element
   * /
  _buildFormElement(config, parent = this, index = -1, slot) {
    let el = document.createElement(config.component.type.element),
      elname =
        index > -1 ? config.name.replace("..", `.${index}.`) : config.name,
      elval = this._getValue(elname),
      keys = config.schema.properties
        ? Object.keys(config.schema.properties)
        : [];
    el.label = config.label || config.title;
    el.schema = config.schema;
    el.resources = this.resources;
    el.setAttribute("language", this.language);
    el.setAttribute("name", elname);
    Object.keys(config.component.type).forEach(key => {
      if (key !== "element" || "valueProperty")
        el.setAttribute(key, config.component.type[key]);
    });
    if (config.schema.hidden) el.setAttribute("hidden", true);
    if (slot) el.slot = slot;
    parent.append(el);
    if (config.component.type.isArray && index < 0) {
      el.addEventListener("add", e =>
        this._setValue(`${elname}.${elval.length}`, {})
      );
      el.addEventListener("remove", e => {
        let temp = this._deepClone(elval);
        temp.splice(parseInt(e.detail.id.replace(/item-/, "")), 1);
        console.log(temp, parseInt(e.detail.id.replace(/item-/, "")));
        this._setValue(`${elname}`, temp);
      });
      if (config.sortBy)
        elval = elval.sort((a, b) => {
          let i = 0,
            ai = 0,
            bi = 0;
          while (i < config.sortBy.length && ai === bi) {
            ai = a[config.sortBy[i]];
            bi = b[config.sortBy[i]];
            i++;
          }
          return ai === bi ? 0 : ai < bi ? -1 : 1;
        });
      /* gets array items * /
      if (elval)
        elval.forEach((item, i) => {
          /* gets array item config * /
          let id = `item-${i}`,
            child = el.buildItem(id),
            sortSlot = config.component.type.sortSlot,
            previewSlot = config.component.type.previewSlot,
            previewKeys = keys.filter(
              key => config.schema.properties[key].previewField === true
            );
          if (previewKeys.length < 1) previewKeys.push(keys[0]);
          /* adds fields to array items * /
          keys.forEach(key => {
            let childname = config.schema.properties[key].name.replace(
              `${elname}..`,
              ""
            );
            this._buildFormElement(
              config.schema.properties[key],
              child,
              i,
              sortSlot && config.sortBy[0] === childname
                ? sortSlot
                : previewKeys.includes(key)
                ? previewSlot
                : undefined
            );
          });
        });
    } else if (config.schema && config.schema.properties) {
      /* gets nested fields for a fieldset   /
      Object.keys(config.schema.properties).forEach(key =>
        this._buildFormElement(config.schema.properties[key], el)
      );
    } else {
      el[config.component.valueProperty] = elval;
      el.onchange = e =>
        this._setValue(elname, el[config.component.valueProperty]);
    }
  }

  /**
   * returns an array of properties for a given schema object
   * @param {object} target parent of nested properties
   * @returns {array} form properties
   * /
  _getProperties(target = this.schema, prefix) {
    //console.log('_getProperties',target);
    let root = this;
    return Object.keys(target.properties || []).map(key => {
      let schema = target.properties[key],
        property = {
          name: prefix ? `${prefix}.${key}` : key,
          schema: schema,
          component: schema.component || {},
          description: schema.description,
          label: schema.title || key,
          previewField: schema.previewField,
          sortBy: schema.sortBy
        };
      property.component.valueProperty =
        property.component.valueProperty || "value";
      property.component.slot = property.component.slot || "";

      /* match the schema type to the correct data type * /
      Object.keys(root.dataTypes).forEach(key => {
        if (
          (Array.isArray(schema.type) && schema.type.indexOf(key) !== -1) ||
          schema.type === key
        ) {
          property.component.type = this._deepClone(root.dataTypes[key]);
          property.component.type.element =
            property.component.name || property.component.type.element;
          property.component.type.type = schema.format;

          /* handle fieldsets by getting nested properties * /
          if (
            property.component.type.isFieldset ||
            property.component.type.isArray
          ) {
            if (!schema.items || !schema.items.properties)
              schema.items = {
                properties: schema.properties
                  ? this._deepClone(schema.properties)
                  : {}
              };
            if (schema.items && schema.items.properties) {
              //console.log('schema.items',schema.items);
              property.schema.properties = this._getProperties(
                schema.items,
                property.component.type.isArray
                  ? `${property.name}.`
                  : property.name
              );
            }
          }
        }
      });
      if (!property.component.type || !property.component.type.element)
        console.error("Unknown property type %s", schema.type);
      return property;
    });
  }

  /**
   * sets value of a property
   *
   * @param {string} propName property to set
   * @param {*} propVal value of the property
   */
  _setValue(propName, propVal) {
    //console.log('_setValue',propName,propVal);
    let oldValue = this._deepClone(this.value),
      newValue = this.value,
      props = propName.split("."),
      l = props.length;
    for (var i = 0; i < l - 1; i++) {
      let pointer = props[i];
      if (!newValue[pointer]) newValue[pointer] = {};
      newValue = newValue[pointer];
    }

    newValue[props[l - 1]] = propVal;
    this._valueChanged(this.value, oldValue);
  }

  /**
   * gets value of a property
   *
   * @param {string} propName property to set
   * @returns {*}
   */
  _getValue(propName) {
    let path = propName.split("."),
      pointer = this.value;
    path.forEach(prop => {
      //console.log('gv',path,pointer,prop,pointer[prop]);
      if (pointer && pointer[prop]) {
        pointer = pointer[prop];
      } else {
        pointer = undefined;
        return;
      }
    });
    return pointer;
  }

  /**
   * Updates a11y-collapse item when properties change
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      //console.log('changedProperties',propName,oldValue,this[propName]);
      if (propName === "schema") this._schemaChanged(this.schema, oldValue);
      if (propName === "value") this._valueChanged(this.value, oldValue);
    });
  }

  /**
   * clears the form
   */
  _clearForm() {
    this.querySelectorAll("*").forEach(child => child.remove());
  }

  /**
   * clones an object and all its subproperties
   * @param {object} o the object to clone
   * @returns {object} the cloned object
   */
  _deepClone(o) {
    return JSON.parse(JSON.stringify(o));
  }
  /**
   * clears and rebuilds the form
   */
  _rebuildForm() {
    //console.log("_rebuildForm",this.value,this.schema);
    this._clearForm();
    if (this.schema) {
      this.buildHtmlFromJsonSchema();
      //let formProperties = this._getProperties(this.schema);
      //formProperties.forEach(property => this._buildFormElement(property));
    }
  }

  /**
   * fires when the value changes
   * @event value-changed
   */
  _fireValueChanged() {
    console.log(
      "value-changed",
      this.value,
      new CustomEvent("value-changed", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: this
      })
    );
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: this
      })
    );
  }
  /**
   * updates the form  and fires event when the value changes
   * @param {object} newValue the new value for the schema
   * @param {object} oldValue the old value for the schema
   */
  _valueChanged(newValue, oldValue) {
    /*console.log('before sort',vals);
            sort = data.child && data.child.slots ? data.child.slots.sort : undefined
    if(sort && subschema.sortBy && vals) {
      vals = vals.sort((a, b) => {
        let i = 0,
          ai = 0,
          bi = 0;
        while (i < subschema.sortBy.length && ai === bi) {
          ai = a[subschema.sortBy[i]];
          bi = b[subschema.sortBy[i]];
          i++;
        }
        return ai === bi ? 0 : ai < bi ? -1 : 1;
      });
    }
    console.log('after sort',vals);
    Object.keys(data.child.slots || {}).forEach(key=>{
      let slot = data.child.slots[key];
      console.log('----->',element.name,schema,data,schema[key],subschema[key]);
    });
    */
    if (newValue && newValue !== oldValue) this._rebuildForm();
  }
  /**
   * updates the form and fires event when the schema changes
   * @param {object} newValue the new value for the schema
   * @param {object} oldValue the old value for the schema
   * @event schema-changed
   */
  _schemaChanged(newValue, oldValue) {
    //console.log("this._schemaChanged",this.schema,oldValue);
    if (newValue && newValue !== oldValue) {
      this._rebuildForm();

      this.dispatchEvent(
        new CustomEvent("schema-changed", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: this
        })
      );
    }
  }
  disconnectedCallback() {
    this._clearForm();
    super.disconnectedCallback();
  }
}
window.customElements.define(SimpleFieldsSchema.tag, SimpleFieldsSchema);
export { SimpleFieldsSchema };
