/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-modal/simple-modal.js";
/**
 * `editable-list`
 * `a listing of items that can be edited in place with operations`
 * @demo demo/index.html
 * @element editable-list
 */
class EditableList extends LitElement {
  //styles function
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        #list {
          height: 100%;
        }
      `,
    ];
  }

  // render function
  render() {
    return html` <div id="list">
      ${this.items.map(
        (item) => html`
          <editable-list-item
            ?edit-mode="${item.metadata.canEdit}"
            ?can-edit="${item.metadata.canEdit}"
            ?can-delete="${item.metadata.canDelete}"
            value="${item.title}"
          ></editable-list-item>
        `
      )}
    </div>`;
  }

  // properties available to the custom element for data binding
  static get properties() {
    return {
      ...super.properties,

      /**
       * ability to edit the items in the list
       */
      editMode: {
        type: Boolean,
        reflect: true,
        attribute: "edit-mode",
      },
      /**
       * items array
       */
      items: {
        type: Array,
        reflect: false,
      },
      /**
       * Active element being worked on in the list
       */
      activeElement: {
        type: Object,
      },
    };
  }

  /**
   * convention
   */
  static get tag() {
    return "editable-list";
  }
  /**
   * HTMLElement
   */
  constructor() {
    super();
    this.editMode = false;
    this.items = [];
    window.SimpleModal.requestAvailability();
    import("./lib/editable-list-item.js");
    setTimeout(() => {
      this.shadowRoot
        .querySelector("#list")
        .addEventListener(
          "editable-list-item-delete",
          this.triggerDeleteModal.bind(this)
        );
    }, 0);
  }
  /**
   * LitElement properties changed
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "items") {
        this._itemsChanged(this[propName], oldValue);
      }
      if (propName == "editMode") {
        this._editModeChanged(this[propName], oldValue);
        // notify
        this.dispatchEvent(
          new CustomEvent("edit-mode-changed", {
            detail: {
              value: this[propName],
            },
          })
        );
      }
    });
  }
  triggerDeleteModal(e) {
    this.activeElement = e.detail.element;
    let c = document.createElement("div");
    c.innerHTML = `<div>Are you sure you want to delete <strong>${e.detail.element.value}</strong>?</div>`;
    let button1 = document.createElement("button");
    button1.raised = true;
    button1.addEventListener("click", this._deleteItemConfirm.bind(this));
    button1.appendChild(document.createTextNode("Delete"));
    let button2 = document.createElement("button");
    button2.raised = true;
    button2.setAttribute("dialog-dismiss", "dialog-dismiss");
    button2.appendChild(document.createTextNode("cancel"));
    let b = document.createElement("div");
    b.appendChild(button1);
    b.appendChild(button2);
    const evt = new CustomEvent("simple-modal-show", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        title: `Delete ${e.detail.element.value}`,
        elements: {
          content: c,
          buttons: b,
        },
        styles: {
          "--simple-modal-width": "20vw",
          "--simple-modal-max-width": "20vw",
          "--simple-modal-z-index": "100000000",
          "--simple-modal-height": "20vh",
          "--simple-modal-max-height": "20vh",
        },
        invokedBy: e.detail.element.shadowRoot.querySelector("#delete"),
        clone: false,
      },
    });
    this.dispatchEvent(evt);
  }
  /**
   * Confirm deleting the active item
   */
  _deleteItemConfirm(e) {
    // @todo delete the thing
    const evt = new CustomEvent("simple-modal-hide", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {},
    });
    this.dispatchEvent(evt);
  }
  // Observer editMode for changes
  _editModeChanged(newValue, oldValue) {
    if (typeof newValue !== typeof undefined) {
      this._itemsChanged(this.items);
      for (var i in this.items) {
        if (this.items[i].metadata) {
          let tmp = this.items[i].metadata;
          tmp.canEdit = newValue;
          this.items[i].metadata = { ...tmp };
        }
      }
    }
  }
  // Observer items for changes
  _itemsChanged(newValue, oldValue) {
    // support for string evaluations
    if (typeof newValue !== typeof undefined && typeof newValue === "string") {
      this.items = [...JSON.parse(newValue)];
    }
  }
}
window.customElements.define(EditableList.tag, EditableList);
export { EditableList };
