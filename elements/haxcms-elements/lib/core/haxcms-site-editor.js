/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html } from "lit";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import { autorun, toJS } from "mobx";
import "@polymer/iron-ajax/iron-ajax.js";
import "@lrnwebcomponents/jwt-login/jwt-login.js";
import "@lrnwebcomponents/h-a-x/h-a-x.js";
import "@lrnwebcomponents/simple-modal/simple-modal.js";
import "@lrnwebcomponents/simple-fields/lib/simple-fields-form.js";
import "./haxcms-site-dashboard.js";
import { HAXStore } from "@lrnwebcomponents/hax-body/lib/hax-store.js";
import { normalizeEventPath } from "@lrnwebcomponents/utils/utils.js";

/**
 * `haxcms-site-editor`
 * `haxcms editor element that provides all editing capabilities`
 *
 * @demo demo/index.html
 */

class HAXCMSSiteEditor extends LitElement {
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "haxcms-site-editor";
  }

  constructor() {
    super();
    this.__disposer = [];
    this.method = "POST";
    this.editMode = false;
    window.SimpleToast.requestAvailability();
    window.SimpleModal.requestAvailability();
    window.addEventListener(
      "jwt-login-refresh-error",
      this._tokenRefreshFailed.bind(this)
    );
    window.addEventListener("hax-store-ready", this._storeReadyToGo.bind(this));
    window.addEventListener(
      "json-outline-schema-active-item-changed",
      this._newActiveItem.bind(this)
    );
    window.addEventListener(
      "json-outline-schema-active-body-changed",
      this._bodyChanged.bind(this)
    );
    window.addEventListener("haxcms-save-outline", this.saveOutline.bind(this));
    window.addEventListener("haxcms-save-node", this.saveNode.bind(this));
    window.addEventListener(
      "haxcms-save-node-details",
      this.saveNodeDetails.bind(this)
    );
    window.addEventListener(
      "haxcms-save-site-data",
      this.saveManifest.bind(this)
    );
    window.addEventListener(
      "haxcms-load-node-fields",
      this.loadNodeFields.bind(this)
    );
    window.addEventListener(
      "haxcms-load-site-dashboard",
      this.loadSiteDashboard.bind(this)
    );
    window.addEventListener(
      "haxcms-load-user-data",
      this.loadUserData.bind(this)
    );
    window.addEventListener("haxcms-publish-site", this.publishSite.bind(this));
    window.addEventListener("haxcms-sync-site", this.syncSite.bind(this));
    window.addEventListener(
      "haxcms-git-revert-last-commit",
      this.revertCommit.bind(this)
    );
    window.addEventListener("haxcms-create-node", this.createNode.bind(this));
    window.addEventListener("haxcms-delete-node", this.deleteNode.bind(this));
  }
  // render function
  render() {
    return html`
      <style>
        haxcms-site-editor {
          display: block;
        }

        haxcms-site-editor[edit-mode] #editbutton {
          width: 100%;
          z-index: 100;
          right: 0;
          bottom: 0;
          border-radius: 0;
          height: 80px;
          margin: 0;
          padding: 8px;
          background-color: var(--paper-blue-500) !important;
        }
        h-a-x {
          margin: auto;
          display: none;
        }
        haxcms-site-editor[edit-mode] h-a-x {
          display: block;
        }
      </style>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="nodeupdateajax"
        .url="${this.saveNodePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @last-response-changed="${this._handleNodeResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="outlineupdateajax"
        .url="${this.saveOutlinePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleOutlineResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="manifestupdateajax"
        .url="${this.saveManifestPath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleManifestResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="publishajax"
        .loading="${this.publishing}"
        @loading-changed="${this.loadingChanged}"
        .url="${this.publishSitePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handlePublishResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="revertajax"
        .url="${this.revertSitePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleRevertResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="syncajax"
        .url="${this.syncSitePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleSyncResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="createajax"
        .url="${this.createNodePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleCreateResponse}"
        @last-error-changed="${this.lastErrorChanged}"
        @last-response-changed="${this.__createNodeResponseChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="deleteajax"
        .url="${this.deleteNodePath}"
        .method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleDeleteResponse}"
        @last-error-changed="${this.lastErrorChanged}"
        @last-response-changed="${this.__deleteNodeResponseChanged}"
      ></iron-ajax>
      <iron-ajax
        reject-with-request
        .headers='{"Authorization": "Bearer ${this.jwt}"}'
        id="getuserdata"
        url="${this.getUserDataPath}"
        method="${this.method}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleUserDataResponse}"
        @last-error-changed="${this.lastErrorChanged}"
      ></iron-ajax>
      <h-a-x
        id="hax"
        element-align="left"
        offset-margin="48px 0 0 0"
        hide-panel-ops="hide-panel-ops"
      ></h-a-x>
    `;
  }

  static get properties() {
    return {
      getUserDataPath: {
        type: String,
        attribute: "get-user-data-path",
      },

      /**
       * Allow method to be overridden, useful in local testing
       */
      method: {
        type: String,
      },

      /**
       * JSON Web token, it'll come from a global call if it's available
       */
      jwt: {
        type: String,
      },

      /**
       * end point for saving nodes
       */
      saveNodePath: {
        type: String,
        attribute: "save-node-path",
      },

      /**
       * end point for create new nodes
       */
      createNodePath: {
        type: String,
        attribute: "create-node-path",
      },

      /**
       * end point for delete nodes
       */
      deleteNodePath: {
        type: String,
        attribute: "delete-node-path",
      },

      /**
       * end point for saving manifest
       */
      saveManifestPath: {
        type: String,
        attribute: "save-manifest-path",
      },
      /**
       * end point for publishing
       */
      publishSitePath: {
        type: String,
        attribute: "publish-site-path",
      },
      /**
       * end point for revert
       */
      revertSitePath: {
        type: String,
        attribute: "revert-site-path",
      },
      appendTarget: {
        type: Object,
      },
      appElement: {
        type: Object,
      },

      /**
       * end point for sync
       */
      syncSitePath: {
        type: String,
        attribute: "sync-site-path",
      },

      /**
       * Publishing end point, this has CDN implications so show message
       */
      publishing: {
        type: Boolean,
      },

      /**
       * end point for saving outline
       */
      saveOutlinePath: {
        type: String,
        attribute: "save-outline-path",
      },

      /**
       * appStore object from backend
       */
      appStore: {
        type: Object,
      },

      /**
       * if the node is in an edit state or not
       */
      editMode: {
        type: Boolean,
        reflect: true,
        attribute: "edit-mode",
      },
      /**
       * Active item of the node being worked on, JSON outline schema item format
       */
      activeItem: {
        type: Object,
      },

      /**
       * Outline of items in json outline schema format
       */
      manifest: {
        type: Object,
      },
      getNodeFieldsPath: {
        type: String,
        attribute: "get-node-fields-path",
      },
      getSiteFieldsPath: {
        type: String,
        attribute: "save-site-fields-path",
      },
      getFormToken: {
        type: String,
        attribute: "get-form-token",
      },

      /**
       * Site dashboard element reference
       */
      siteDashboard: {
        type: Object,
      },
    };
  }

  __deleteNodeResponseChanged(e) {
    // show message
    if (e.detail.value && e.detail.value.data && e.detail.value.data.title) {
      store.toast(
        `Page deleted ${e.detail.value.data.title}, selecting another page`,
        4000
      );
      store.playSound('coin');
    }
  }

  __createNodeResponseChanged(e) {
    // sanity check we have a slug, move to this page that we just made
    if (e.detail.value && e.detail.value.data && e.detail.value.data.slug) {
      window.history.pushState({}, null, e.detail.value.data.slug);
      store.toast(
        `Created ${e.detail.value.data.title}!`,
        3000,
        { hat: 'random' }
      );
      store.playSound('coin');
    }
  }

  _handleUserDataResponse(e) {
    if (e.detail.response && e.detail.response.data) {
      store.userData = e.detail.response.data;
    }
  }

  /**
   * Handle the last error rolling in
   */
  lastErrorChanged(e) {
    if (e.detail.value) {
      console.error(e);
      var target = normalizeEventPath(e)[0];
      // check for JWT needing refreshed vs busted but must be 403
      switch (parseInt(e.detail.value.status)) {
        // cookie data not found, need to go get it
        // @notice this currently isn't possible but we could modify
        // the backend in the future to support throwing 401s dynamically
        // if we KNOW an event must expire the timing token
        case 401:
          this.dispatchEvent(
            new CustomEvent("jwt-login-logout", {
              composed: true,
              bubbles: true,
              cancelable: false,
              detail: {
                redirect: true,
              },
            })
          );
          break;
        case 403:
          // if this was a 403 it should be because of a bad jwt
          // or out of date one. This hopefully gets a new one if not
          // other listeners will ensure we redirect appropriately
          this.dispatchEvent(
            new CustomEvent("jwt-login-refresh-token", {
              composed: true,
              bubbles: true,
              cancelable: false,
              detail: {
                element: {
                  obj: this,
                  callback: "refreshRequest",
                  params: [target],
                },
              },
            })
          );
          break;
        default:
          store.toast(
            e.detail.value.status + " " + e.detail.value.statusText,
            5000,
            { fire: true}
          );
          store.playSound('error');
          break;
      }
    }
  }
  /**
   * Attempt to salvage the request that was kicked off
   * when our JWT needed refreshed
   */
  refreshRequest(jwt, element) {
    // force the jwt to be the updated jwt
    // this helps avoid any possible event timing issue
    this.jwt = jwt;
    element.body.jwt = jwt;
    element.headers = {
      Authorization: `Bearer ${this.jwt}`,
    };
    // again, sanity check on delay
    setTimeout(() => {
      element.generateRequest();
    }, 0);
  }
  loadingChanged(e) {
    this.loading = e.detail.value;
  }
  /**
   * Break the shadow root for this element (by design)
   */
  createRenderRoot() {
    return this;
  }
  /**
   * ready life cycle
   */
  firstUpdated(changedProperties) {
    autorun((reaction) => {
      this.editMode = toJS(store.editMode);
      // force import on editMode enabled
      if (this.editMode && toJS(HAXStore.activeHaxBody)) {
        HAXStore.activeHaxBody.importContent(toJS(store.activeItemContent));
      }
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.manifest = toJS(store.manifest);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.activeItem = toJS(store.activeItem);
      this.__disposer.push(reaction);
    });

    if (HAXStore.ready) {
      let detail = {
        detail: true,
      };

      this._storeReadyToGo(detail);
    }
    // fire event suggesting that we were authorized to have a site editor
    // so the UI and other pieces can react to this news
    // this tag is going to be added by a backend if it has determined we have a valid one

    window.dispatchEvent(
      new CustomEvent("haxcms-site-editor-loaded", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "appStore") {
        this.querySelector("#hax").setAttribute(
          "app-store",
          JSON.stringify(this[propName])
        );
      }
      if (propName == "publishing") {
        this._publishingChanged(this[propName], oldValue);
      } else if (propName == "activeItem") {
        this.dispatchEvent(
          new CustomEvent("manifest-changed", {
            detail: this[propName],
          })
        );

        this._activeItemChanged(this[propName], oldValue);
      } else if (propName == "manifest") {
        this.dispatchEvent(
          new CustomEvent("manifest-changed", {
            detail: this[propName],
          })
        );

        this._manifestChanged(this[propName], oldValue);
      }
    });
  }
  /**
   * Respond to a failed request to refresh the token by killing the logout process
   */
  _tokenRefreshFailed(e) {
    this.dispatchEvent(
      new CustomEvent("jwt-login-logout", {
        composed: true,
        bubbles: true,
        cancelable: false,
        detail: {
          redirect: true,
        },
      })
    );
  }
  /**
   * Detatched life cycle
   */

  disconnectedCallback() {
    if (this.siteDashboard) {
      this.siteDashboard.remove();
      delete this.siteDashboard;
    }

    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    window.removeEventListener(
      "jwt-login-refresh-error",
      this._tokenRefreshFailed.bind(this)
    );
    window.removeEventListener(
      "hax-store-ready",
      this._storeReadyToGo.bind(this)
    );
    window.removeEventListener(
      "haxcms-save-outline",
      this.saveOutline.bind(this)
    );
    window.removeEventListener("haxcms-save-node", this.saveNode.bind(this));
    window.removeEventListener(
      "haxcms-save-node-details",
      this.saveNodeDetails.bind(this)
    );
    window.removeEventListener(
      "haxcms-save-site-data",
      this.saveManifest.bind(this)
    );
    window.removeEventListener(
      "haxcms-publish-site",
      this.publishSite.bind(this)
    );
    window.removeEventListener("haxcms-sync-site", this.syncSite.bind(this));
    window.removeEventListener(
      "haxcms-git-revert-last-commit",
      this.revertCommit.bind(this)
    );
    window.removeEventListener(
      "json-outline-schema-active-item-changed",
      this._newActiveItem.bind(this)
    );
    window.removeEventListener(
      "json-outline-schema-active-body-changed",
      this._bodyChanged.bind(this)
    );
    window.removeEventListener(
      "haxcms-load-node-fields",
      this.loadNodeFields.bind(this)
    );
    window.removeEventListener(
      "haxcms-load-site-dashboard",
      this.loadSiteDashboard.bind(this)
    );
    window.removeEventListener(
      "haxcms-load-user-data",
      this.loadUserData.bind(this)
    );
    window.removeEventListener(
      "haxcms-create-node",
      this.createNode.bind(this)
    );
    window.removeEventListener(
      "haxcms-delete-node",
      this.deleteNode.bind(this)
    );
    super.disconnectedCallback();
  }
  /**
   * Load user data from backend
   */

  loadUserData(e) {
    this.querySelector("#getuserdata").body = {
      jwt: this.jwt,
    };
    this.querySelector("#getuserdata").generateRequest();
  }
  /**
   * Load and display node fields
   */

  loadNodeFields(e) {
    this.__nodeFieldsInvoked = e.detail;
    let form = document.createElement("simple-fields-form");
    form.style.margin = "0 0 50px 0";
    form.setAttribute("autoload", "autoload");
    form.method = this.method;
    form.headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    form.body = {
      jwt: this.jwt,
      token: this.getFormToken,
      site: {
        name: this.manifest.metadata.site.name,
      },
      node: {
        id: this.activeItem.id,
      },
    };
    form.loadEndpoint = this.getNodeFieldsPath;
    this.__fieldsForm = form;
    let b1 = document.createElement("button");
    let icon = document.createElement("simple-icon");
    icon.icon = "icons:save";
    b1.appendChild(icon);
    b1.appendChild(document.createTextNode("Save fields"));
    b1.style.color = "white";
    b1.style.backgroundColor = "#2196f3";
    b1.setAttribute("dialog-confirm", "dialog-confirm");
    b1.addEventListener("click", this._saveNodeFieldsTap.bind(this));
    let b2 = document.createElement("button");
    let icon2 = document.createElement("simple-icon");
    icon2.icon = "icons:cancel";
    b2.appendChild(icon2);
    b2.appendChild(document.createTextNode("cancel"));
    b2.setAttribute("dialog-dismiss", "dialog-dismiss");
    b2.addEventListener("click", () => store.playSound('error'));
    let b = document.createElement("div");
    b.style.position = "absolute";
    b.style.bottom = 0;
    b.style.left = 0;
    b.style.right = 0;
    b.style.zIndex = 1000000;
    b.appendChild(b1);
    b.appendChild(b2);
    const evt = new CustomEvent("simple-modal-show", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        title: "Edit " + store.activeTitle + " fields",
        styles: {
          "--simple-modal-z-index": "100000000",
          "--simple-modal-min-width": "75vw",
          "--simple-modal-min-height": "75vh",
        },
        elements: {
          content: form,
          buttons: b,
        },
        invokedBy: this.__nodeFieldsInvoked,
        clone: false,
        modal: true,
      },
    });
    window.dispatchEvent(evt);
  }
  /**
   * Load site fields
   */

  loadSiteDashboard(e) {
    this.__siteFieldsInvoked = e.detail; // ensure it exists as we do this on the fly and clean up constantly

    if (!this.siteDashboard) {
      let builder = document.getElementsByTagName("haxcms-site-builder")[0];
      this.siteDashboard = document.createElement("haxcms-site-dashboard");
      this.siteDashboard.headers = {
        Authorization: `Bearer ${this.jwt}`,
      };
      this.siteDashboard.loadEndpoint = this.getSiteFieldsPath;
      this.siteDashboard.method = this.method; // insert right before the builder, you sneaky thing you

      builder.parentNode.insertBefore(this.siteDashboard, builder);
    }

    this.siteDashboard.body = {
      jwt: this.jwt,
      token: this.getFormToken,
      site: {
        name: this.manifest.metadata.site.name,
      },
    };
    this.siteDashboard.headers = {
      Authorization: `Bearer ${this.jwt}`,
    };
    setTimeout(() => {
      store.dashboardOpened = !store.dashboardOpened;
    }, 300);
  }

  _schemaFormValueChanged(e) {
    let customTag = {
      property: "custom-theme-tag",
      title: "Custom theme tag",
      description: "Tag that supplies the custom theme",
      inputMethod: "textfield",
      required: true,
      validationType: "text",
    }; // @todo figure out why this isn't adding a field in on the fly

    /*if (e.target.value.theme === "haxcms-custom-theme") {
      e.target.addField(customTag.property, customTag);
      e.target.value[customTag.property] = customTag.property;
    } else {
      e.target.removeField(customTag.property);
      delete e.target.value[customTag.property];
    }*/
  }
  /**
   * Save the fields as we get tapped
   */

  _saveNodeFieldsTap(e) {
    let values = this.__fieldsForm.submit();
    values.id = this.activeItem.id; // fire event with details for saving

    window.dispatchEvent(
      new CustomEvent("haxcms-save-node-details", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: values,
      })
    ); // fire event to close the modal

    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {},
      })
    );
  }
  /**
   * Save the fields as we get tapped
   */

  _saveSiteFieldsTap(e) {
    // fire event with details for saving
    window.dispatchEvent(
      new CustomEvent("haxcms-save-site-data", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: this.querySelector("#siteform").submit(),
      })
    ); // fire event to close the modal

    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {},
      })
    );
  }
  /**
   * create node event
   */

  createNode(e) {
    if (e.detail.values) {
      var reqBody = e.detail.values;
      reqBody.jwt = this.jwt;
      reqBody.site = {
        name: this.manifest.metadata.site.name,
      };
      // store who sent this in-case of multiple instances
      this._originalTarget = e.detail.originalTarget;
      this.querySelector("#createajax").body = reqBody;
      this.querySelector("#createajax").generateRequest();
      const evt = new CustomEvent("simple-modal-hide", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {},
      });
      window.dispatchEvent(evt);
    }
  }

  _handleCreateResponse(response) {
    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent("haxcms-create-node-success", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: true,
          originalTarget: this._originalTarget,
        },
      })
    );
  }
  /**
   * delete the node we just got
   */

  deleteNode(e) {
    this.querySelector("#deleteajax").body = {
      jwt: this.jwt,
      site: {
        name: this.manifest.metadata.site.name,
      },
      node: {
        id: e.detail.item.id,
      },
    };
    this.querySelector("#deleteajax").generateRequest();
    const evt = new CustomEvent("simple-modal-hide", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {},
    });
    window.dispatchEvent(evt);
  }
  /**
   * node deleted response
   */

  _handleDeleteResponse(response) {
    // this will force ID to update and avoid a page miss
    // when we deleted the node
    window.history.replaceState({}, null, store.fallbackItemSlug());
    // delay ensures the fallback has been moved to prior to
    // rebuild of the manifest which should be lacking the deleted ID
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("haxcms-trigger-update", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: true,
        })
      );
    }, 100);
  }
  /**
   * Establish certain global settings in HAX once it claims to be ready to go
   */

  _storeReadyToGo(event) {
    if (event.detail) {
      HAXStore.connectionRewrites.appendJwt = "jwt";
      HAXStore.haxTray.hidePreferencesButton = true;
    }
  }
  /**
   * notice publishing callback changing state
   */

  _publishingChanged(newValue, oldValue) {
    if (newValue) {
      store.toast(
        `Publishing...`,
        0,
        { hat: 'random' }
      );
    } else if (!newValue && oldValue) {
      store.toast(
        `Publishing...`,
        2000,
        { hat: 'random' }
      );
    }
  }
  /**
   * react to manifest being changed
   */

  _manifestChanged(newValue) {
    if (this.activeItem && newValue.metadata) {
      // set upload manager to point to this location in a more dynamic fashion
      HAXStore.connectionRewrites.appendUploadEndPoint =
        "siteName=" +
        newValue.metadata.site.name +
        "&nodeId=" +
        this.activeItem.id;
    }
  }
  /**
   * update the internal active item
   */

  _newActiveItem(e) {
    this.activeItem = e.detail;
  }
  /**
   * active item changed
   */

  _activeItemChanged(newValue, oldValue) {
    if (newValue && this.manifest) {
      // set upload manager to point to this location in a more dynamic fashion
      HAXStore.connectionRewrites.appendUploadEndPoint =
        "siteName=" +
        this.manifest.metadata.site.name +
        "&nodeId=" +
        newValue.id;
    }
  }
  /**
   * handle update responses for nodes and outlines
   */

  _handleNodeResponse(e) {
    // node response may include the item that got updated
    // it also may be a new path so let's ensure that's reflected
    if (
      e.detail.value &&
      e.detail.value.data &&
      e.detail.value.data.slug &&
      this.activeItem.slug !== e.detail.value.data.slug
    ) {
      window.history.replaceState({}, null, e.detail.value.data.slug);
    }
    store.toast(
      `Page saved!`,
      3000,
      { hat: 'random' }
    );
    store.playSound('coin');

    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    ); // updates the node contents itself

    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update-node", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
  }

  _handleOutlineResponse(e) {
    // trigger a refresh of the data in node
    store.toast(
      `Outline saved!`,
      3000,
      { hat: 'random' }
    );
    store.playSound('coin');
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("haxcms-trigger-update", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: true,
        })
      );
    }, 100);
  }

  _handleManifestResponse(e) {
    // trigger a refresh of the data in node
    store.toast(
      `Site details saved, reloading to reflect changes!`,
      2000,
    );
    store.playSound('coin');
    store.dashboardOpened = false;
    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  /**
   * Tell the user we undid their last state of the site and trigger
   * everything to update to reflect this
   */

  _handleRevertResponse(e) {
    // trigger a refresh of the data in node
    store.toast(
      `Last save undone`,
      2000,
    );
    store.playSound('error');
    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
  }
  /**
   * Handle sync response that site may have changed or been updated
   */

  _handleSyncResponse(e) {
    store.toast(
      `Site synced`,
      2000,
      { hat: 'random' }
    );
    store.playSound('success');
    // trigger a refresh of the data in node
    this.dispatchEvent(
      new CustomEvent("haxcms-trigger-update", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
    store.dashboardOpened = false;
  }
  /**
   * Publish response
   */

  _handlePublishResponse(e) {
    let data = e.detail.response; // show the published response

    let content = document.createElement("span");
    content.innerHTML = `
    <a href="${data.url}" target="_blank">
      <button raised style="color:yellow;text-transform: none;font-weight: bold;">
      ${data.label}
      </button>
    </a>`;
    const evt = new CustomEvent("haxcms-toast-show", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        text: data.response,
        duration: 10000,
        slot: content.cloneNode(true),
      },
    });
    window.dispatchEvent(evt);
    store.dashboardOpened = false;
  }
  /**
   * Save node event
   */

  async saveNode(e) {
    // send the request
    if (this.saveNodePath) {
      let body = await HAXStore.activeHaxBody.haxToContent();
      this.querySelector("#nodeupdateajax").body = {
        jwt: this.jwt,
        site: {
          name: this.manifest.metadata.site.name,
        },
        node: {
          id: this.activeItem.id,
          body: body,
          schema: await HAXStore.htmlToHaxElements(body),
        },
      };
      this.querySelector("#nodeupdateajax").generateRequest();
    }
  }
  /**
   * Save node event
   */

  saveNodeDetails(e) {
    // send the request
    if (this.saveNodePath) {
      this.querySelector("#nodeupdateajax").body = {
        jwt: this.jwt,
        site: {
          name: this.manifest.metadata.site.name,
        },
        node: {
          id: e.detail.id,
          details: e.detail,
        },
      };
      this.querySelector("#nodeupdateajax").generateRequest();
    }
  }
  /**
   * Save the outline based on an event firing.
   */

  saveOutline(e) {
    if (this.saveOutlinePath) {
      this.querySelector("#outlineupdateajax").body = {
        jwt: this.jwt,
        site: {
          name: this.manifest.metadata.site.name,
        },
        items: e.detail,
      };
      this.querySelector("#outlineupdateajax").generateRequest();
    }
  }
  /**
   * Save the outline based on an event firing.
   */

  saveManifest(e) {
    // now let's work on the outline
    let values = e.detail; // if we have a cssVariable selected then generate a hexCode off of it

    if (values.cssVariable) {
      values.hexCode =
        window.SimpleColorsStyles.colors[
          values.cssVariable
            .replace("--simple-colors-default-theme-", "")
            .replace("-7", "")
        ][6];
    } // add in our standard pieces

    values.jwt = this.jwt;

    if (values.site) {
      values.site.name = this.manifest.metadata.site.name;
    } else {
      values.site = {
        name: this.manifest.metadata.site.name,
      };
    }
    if (this.saveManifestPath) {
      this.querySelector("#manifestupdateajax").body = values;
      this.querySelector("#manifestupdateajax").generateRequest();
    }
  }
  /**
   * Notice body of content has changed and import into HAX
   */

  _bodyChanged(e) {
    if (HAXStore.activeHaxBody) {
      HAXStore.activeHaxBody.importContent(e.detail);
    }
  }
  /**
   * Save the outline based on an event firing.
   */

  publishSite(e) {
    if (this.publishSitePath) {
      this.querySelector("#publishajax").body = {
        jwt: this.jwt,
        site: {
          name: this.manifest.metadata.site.name,
        },
      };
      this.querySelector("#publishajax").generateRequest();
    }
  }
  /**
   * Revert last commit
   */

  syncSite(e) {
    if (this.syncSitePath) {
      this.querySelector("#syncajax").body = {
        jwt: this.jwt,
        site: {
          name: store.manifest.metadata.site.name,
        },
      };
      this.querySelector("#syncajax").generateRequest();
    }
  }
  /**
   * Revert last commit
   */

  revertCommit(e) {
    if (this.revertSitePath) {
      this.querySelector("#revertajax").body = {
        jwt: this.jwt,
        site: {
          name: store.manifest.metadata.site.name,
        },
      };
      this.querySelector("#revertajax").generateRequest();
    }
  }
}

window.customElements.define(HAXCMSSiteEditor.tag, HAXCMSSiteEditor);
export { HAXCMSSiteEditor };
