import { html, css, unsafeCSS } from "lit";
import { store } from "./haxcms-site-store.js";
import { HAXStore } from "@lrnwebcomponents/hax-body/lib/hax-store.js";
import { autorun, toJS } from "mobx";
import { localStorageSet } from "@lrnwebcomponents/utils/utils.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import { HAXCMSThemeParts } from "./utils/HAXCMSThemeParts.js";
import { HAXCMSI18NMixin } from "./utils/HAXCMSI18NMixin.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import '@lrnwebcomponents/app-hax/lib/v1/app-hax-top-bar.js';
import "@lrnwebcomponents/app-hax/lib/v1/app-hax-user-menu.js";
import "@lrnwebcomponents/app-hax/lib/v1/app-hax-user-menu-button.js";
import 'wired-elements/lib/wired-button.js';
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";
import "@lrnwebcomponents/simple-modal/simple-modal.js";
import "@lrnwebcomponents/simple-fields/lib/simple-fields-form.js";
import "./micros/haxcms-button-add.js";
import './haxcms-darkmode-toggle.js';
const haxLogo = new URL('../../../app-hax/lib/assets/images/HAXLogo.svg', import.meta.url).href;
const ButtonBGLight = new URL('../../../app-hax/lib/assets/images/ButtonBGLM.svg', import.meta.url).href;
const ButtonBGDark = new URL('../../../app-hax/lib/assets/images/ButtonBGDM.svg', import.meta.url).href;
const LogOut = new URL('../../../app-hax/lib/assets/images/Logout.svg', import.meta.url).href;
/**
 * `haxcms-site-editor-ui`
 * `haxcms editor element buttons that you see`
 *
 * @demo demo/index.html
 * @microcopy - the mental model for this element
 */
class HAXCMSSiteEditorUI extends HAXCMSThemeParts(HAXCMSI18NMixin(SimpleColors)) {
  static get styles() {
    return [...super.styles,
      css`
        :host *:not(:defined) {
          display: none;
        }
        :host {
          display: block;
          position: relative;
          height: 48px;
          left: 0;
          top: 0;
          right: 0;
          background-color: var(--haxcms-system-bg, #37474f);
          z-index: 10000;
          visibility: visible;
        }
        :host([edit-mode]) {
          z-index: 9999;
        }
        :host([dashboard-opened]) {
          left: 50vw;
        }
        /**
         * Dashboard open trumps all contextual settings
         */
        :host([dashboard-opened]) #editbutton,
        :host([dashboard-opened]) #editdetails,
        :host([dashboard-opened]) #deletebutton,
        :host([dashboard-opened]) #addbutton,
        :host([dashboard-opened]) #addbuttonchild,
        :host([dashboard-opened]) #duplicatebutton {
          display: none !important;
        }
        :host([edit-mode]) #editdetails {
          margin-left: 64px;
        }
        :host *[hidden] {
          display: none;
        }
        simple-tooltip:not(:defined) {
          display: none !important;
        }
        :host([painting]) {
          opacity: 0;
          visibility: hidden;
        }
        simple-icon-button {
          vertical-align: text-bottom;
          display: inline-flex;
          --simple-icon-width: 24px;
          --simple-icon-height: 24px;
          border-radius: 50%;
          border: none;
          background-color: black;
          color: white;
          text-align: center;
          line-height: 40px;
          min-width: unset;
          padding: 0;
          margin: 4px 2px;
          width: 40px;
          height: 40px;
          transition: 0.2s all ease-in-out;
          position: relative;
          box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12),
            0 5px 5px -3px rgba(0, 0, 0, 0.4);
        }
        haxcms-button-add {
          display: inline-flex;
          margin: 4px 2px;
          vertical-align: text-bottom;
        }
        .topbar-button:hover,
        .topbar-button:focus,
        .topbar-button:active {
          opacity: .8;
        }
        .topbar-button {
          background-image: url('${unsafeCSS(ButtonBGLight)}');
          background-color: var(--simple-colors-default-theme-accent-5, blue);
        }
        :host([dark-mode]) .topbar-button {
          background-image: url('${unsafeCSS(ButtonBGDark)}');
        }
        #cancelbutton {
          background-color: var(--haxcms-system-danger-color);
        }
        #editbutton {
          visibility: hidden;
          opacity: 0;
        }
        :host([page-allowed]) #editbutton,
        :host([page-allowed]) #editdetails,
        :host([page-allowed]) #deletebutton {
          visibility: visible;
          opacity: 1;
        }

        :host(:hover),
        :host(:active),
        :host(:focus) {
          opacity: 1;
        }
        simple-tooltip {
          --simple-tooltip-background: #000000;
          --simple-tooltip-opacity: 1;
          --simple-tooltip-text-color: #ffffff;
          --simple-tooltip-delay-in: 0;
          --simple-tooltip-duration-in: 200ms;
          --simple-tooltip-duration-out: 0;
          --simple-tooltip-border-radius: 0;
          --simple-tooltip-font-size: 14px;
          font-family: 'Press Start 2P', sans-serif;          
        }
        app-hax-top-bar {
          z-index: 1000;
          right: 0;
          left: 0;
          position: fixed;
        }
        app-hax-top-bar::part(top-bar) {
          grid-template-columns: 20% 60% 20%;
        }
        .haxLogo {
          color: var(--simple-colors-default-theme-accent-12, black);
        }
        .haxLogo:hover,
        .haxLogo:focus,
        .haxLogo:active {
          color: var(--haxcms-color);
        }
        .haxLogo simple-icon-lite {
          --simple-icon-height: 40px;
          --simple-icon-width: 40px;
          margin: 4px;
        }

        .space-hack {
          display: inline-flex;
          width: 64px;
          height: 48px;
        }
        .soundToggle {
          position: relative;
          display: inline-flex;
          vertical-align: top;
        }

        .soundToggle img {
          width: 24px;
          height: 24px;
        }

        app-hax-search-bar {
          vertical-align: middle;
          display: inline-flex;
        }
        .ops-panel {
          justify-content: space-around;
          display: flex;
          padding: 4px 0px;
        }

        .topbar-character {
          cursor: pointer;
          display: inline-block;
          border: none;
          border-radius: 0px;
          padding: 0 8px;
          margin: 0 0 0 16px;
          background-color: transparent;
          height: 48px;
          max-width: 160px;
        }
        .characterbtn-name {
          color: var(--simple-colors-default-theme-grey-12);
          font-family: "Press Start 2P", sans-serif;
          margin-left: 8px;
          font-size: 12px;
          vertical-align: bottom;
          line-height: 48px;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 48px;
          word-break: break-all;
        }
        .topbar-character:hover,
        .topbar-character:focus {
          background-color: var(--simple-colors-default-theme-light-blue-4);
          outline: var(--haxcms-color) solid 3px;
          outline-offset: -3px;
          height: 48px;
        }
        .topbar-character rpg-character {
          margin: -4px -14px 0px -10px;
          height: 52px;
          width: 64px;      
          display: inline-block;
        }

        .logout::part(menu-button) {
          background-image: url('${unsafeCSS(LogOut)}');
          background-repeat: no-repeat;
          background-position: center center;
          text-align: center;
          background-size: cover;
          border-top: 0px;
          border-bottom: 0px;
          padding: 10px;
          font-family: 'Press Start 2P', sans-serif;
        }
        app-hax-user-menu app-hax-user-menu-button::part(menu-button) {
          font-family: 'Press Start 2P', sans-serif;
          font-size: 12px;
        }
        

        @media screen and (max-width: 800px) {
          :host([dashboard-opened]) {
            left: 90vw;
          }
          :host([edit-mode]) {
            bottom: unset;
          }
        }
      `,
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "haxcms-site-editor-ui";
  }
  constructor() {
    super();
    this.rpgHat = "none";
    this.darkMode = false;
    this.userMenuOpen = false;
    this.soundIcon = '';
    this.__disposer = this.__disposer || [];
    this.t = this.t || {};
    this.t = {
      ...this.t,
      backToSiteList: "Back to site list",
      cancelEditing: "Cancel editing",
      editDetails: "Edit details",
      addPage: "Add page",
      deletePage: "Delete page",
      editSiteOutline: "Site outline",
      closeSiteSettings: "Close site settings",
      editSiteSettings: "Site settings",
      savePageContent: "Save page content",
      editPageContent: "Edit page content",
      newJourney: "New Journey",
      accountInfo: "Account Info",
      logOut: "Log out",
      menu: "Menu",
    };
    this.backText = "Site list";
    this.painting = true;
    this.pageAllowed = false;
    this.editMode = false;
    this.__editIcon = "hax:page-edit";
    this.icon = "hax:site-settings";
    this.manifestEditMode = false;
    this.backLink = '../../';
    if (window.appSettings && window.appSettings.backLink) {
      this.backLink = window.appSettings.backLink;
    }
    autorun(() => {
      const badDevice = toJS(store.badDevice);
      // good device, we can inject font we use
      if (badDevice === false) {
        const link = document.createElement("link");
        link.setAttribute(
          "href",
          "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        );
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("fetchpriority", "low");
        document.head.appendChild(link);
      } else if (badDevice === true) {
        document.body.classList.add("bad-device");
      }
    });
    autorun(() => {
      this.darkMode = toJS(store.darkMode);
      this.dark  = this.darkMode;
      if (toJS(store.darkMode)) {
        HAXStore.globalPreferences.haxUiTheme = 'haxdark';
      } else {
        HAXStore.globalPreferences.haxUiTheme = 'hax';
      }
    });
    autorun(() => {
      this.soundIcon = toJS(store.soundStatus) ? new URL('../../../app-hax/lib/assets/images/FullVolume.svg',import.meta.url).href : new URL('../../../app-hax/lib/assets/images/Silence.svg',import.meta.url).href;
    });
    setTimeout(() => {
      // prettier-ignore
      import(
        "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-outline-editor-dialog.js"
      );
      // prettier-ignore
      import(
        "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-dashboard.js"
      );
    }, 0);
  }

  soundToggle() {
    const status = !toJS(store.soundStatus);
    store.soundStatus = status
    localStorageSet('app-hax-soundStatus', status);
    if (!status) {
      store.toast("Sound off.. hey.. HELLO!?!", 2000, { fire: true});
    }
    else {
      store.toast("Can you hear me now? Good.", 2000,{ hat: 'random'});
      store.playSound('click');
    }
  }

  toggleMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    store.playSound('click');
  }
  // render function
  render() {
    return html`
      <app-hax-top-bar part="top-bar">
        <span slot="left">
          <a href="${this.backLink}" class="haxLogo" id="backtosites" part="hax-logo">
            <simple-icon-lite src="${haxLogo}"></simple-icon-lite>
          </a>
          <slot name="haxcms-site-editor-ui-prefix-avatar"></slot>
        </span>
      <span slot="center">
        <slot name="haxcms-site-editor-ui-prefix-buttons"></slot>
        <simple-icon-button
          hidden
          ?dark="${!this.darkMode}"
          id="editbutton"
          icon="${this.__editIcon}"
          @click="${this._editButtonTap}"
          label="${this.__editText}"
          voice-command="edit (this) page"
          class="topbar-button"
          accent-color="green"
        ></simple-icon-button>
        <simple-icon-button
          id="cancelbutton"
          ?dark="${!this.darkMode}"
          icon="icons:cancel"
          @click="${this._cancelButtonTap}"
          .hidden="${!this.editMode}"
          label="${this.t.cancelEditing}"
          voice-command="cancel (editing)"
          class="topbar-button"
          accent-color="red"
        ></simple-icon-button>
        <simple-icon-button
          ?dark="${!this.darkMode}"
          id="editdetails"
          hidden
          icon="hax:page-details"
          @click="${this._editDetailsButtonTap}"
          label="${this.t.editDetails}"
          voice-command="edit (page) details"
          class="topbar-button"
          accent-color="blue"
          part="detailsbtn ${this.editMode ? `edit-mode-active` : ``}"
          tabindex="${this.editMode ? "-1" : ""}"
        ></simple-icon-button>
        <simple-icon-button
          part="${this.editMode ? `edit-mode-active` : ``}"
          tabindex="${this.editMode ? "-1" : ""}"
          ?dark="${!this.darkMode}"
          id="deletebutton"
          hidden
          icon="icons:delete"
          @click="${this._deleteButtonTap}"
          label="${this.t.deletePage}"
          voice-command="delete page"
          class="topbar-button"
          accent-color="red"
        ></simple-icon-button>
        <haxcms-button-add
        hidden
        ?dark-mode="${this.darkMode}"
        accent-color="purple"
        id="addbutton"></haxcms-button-add>
        <haxcms-button-add
          hidden
          ?dark-mode="${this.darkMode}"
          id="addbuttonchild"
          type="child"
          accent-color="purple"
        ></haxcms-button-add>
        <haxcms-button-add
          hidden
          ?dark-mode="${this.darkMode}"
          type="duplicate"
          id="duplicatebutton"
          accent-color="purple"
        ></haxcms-button-add>
        <simple-tooltip for="backtosites" position="right"
          >${this.backText}</simple-tooltip
        >
        <simple-tooltip for="cancelbutton" position="bottom" offset="14"
          >${this.t.cancelEditing}</simple-tooltip
        >
        <simple-tooltip for="editbutton" position="bottom" offset="14"
          >${this.__editText}</simple-tooltip
        >
        <simple-tooltip for="editdetails" position="bottom" offset="14"
          >${this.t.editDetails}</simple-tooltip
        >
        <simple-tooltip for="deletebutton" position="bottom" offset="14"
          >${this.t.deletePage}</simple-tooltip
        >
        <slot name="haxcms-site-editor-ui-suffix-buttons"></slot>
      </span>

      <app-hax-user-menu slot="right" id="user-menu">
        <button class="topbar-character" slot="menuButton" @click="${this.toggleMenu}">
          <rpg-character
            seed="${this.userName}"
            width="68"
            height="68"
            part="rpgcharacter"
            aria-label="${this.t.menu}"
            hat="${this.rpgHat}"
          ></rpg-character>
          <span class="characterbtn-name">${this.userName}</span>
          <slot name="haxcms-site-editor-ui-topbar-character-button"></slot>
        </button>
        <div slot="pre-menu" class="ops-panel">
          <slot name="haxcms-site-editor-ui-pre-menu"></slot>
          <wired-button
            elevation="1"
            class="soundToggle"
            @click="${this.soundToggle}"
          >
            <simple-icon-lite src="${this.soundIcon}" loading="lazy" decoding="async"></simple-icon-lite>
          </wired-button>
          <haxcms-darkmode-toggle></haxcms-darkmode-toggle>
        </div>
        <!-- <app-hax-user-menu-button
          slot="main-menu"
          icon="face"
          label="${this.t.accountInfo}"
        ></app-hax-user-menu-button> -->
        <slot slot="main-menu" name="haxcms-site-editor-ui-main-menu"></slot>
        <app-hax-user-menu-button
          id="outlinebutton"
          @click="${this._outlineButtonTap}"
          slot="main-menu"
          icon="hax:site-map"
          part="outlinebtn"
          label="${this.t.editSiteOutline}"
        ></app-hax-user-menu-button>

        <app-hax-user-menu-button
          @click="${this._manifestButtonTap}"
          slot="main-menu"
          icon="${this.icon}"
          part="manifestbtn"
          label="${this.__settingsText}"
        ></app-hax-user-menu-button>

        <app-hax-user-menu-button
          slot="main-menu"
          icon="add"
          label="${this.t.newJourney}"
          part="newjourneybtn"
          @click="${this._addButtonTap}"
        ></app-hax-user-menu-button>
        <slot slot="post-menu" name="haxcms-site-editor-ui-post-menu"></slot>
        <app-hax-user-menu-button
          slot="post-menu"
          part="logoutbtn"
          class="logout"
          label="${this.t.logOut}"
          @click=${this._logout}
        ></app-hax-user-menu-button>
      </app-hax-user-menu>
    </app-hax-top-bar>
    `;
  }

  _logout() {
    window.dispatchEvent(
      new CustomEvent("jwt-login-logout", {
        composed: true,
        bubbles: true,
        cancelable: false,
        detail: true,
      })
    );
    this.__logoutUserAction = true;
  }
  // only care about logouts
  _jwtLoggedIn(e) {
    if (e.detail === false && this.__logoutUserAction) {
      this.__logoutUserAction = false;
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  /**
   * update buttons since these are triggered by a mix of
   * differnet backend types we can't leverage the store
   * since a CMS needs to just hardcode these at run time
   * for some environments
   */
  updateAvailableButtons() {
    if (this.shadowRoot) {
      setTimeout(() => {
        // backText
        if (window.appSettings && window.appSettings.backText) {
          this.backText = window.appSettings.backText;
        }
        let ary = [
          {
            varPath: "getNodeFieldsPath",
            selector: "#editdetails",
          },
          {
            varPath: "deleteNodePath",
            selector: "#deletebutton",
          },
          {
            varPath: "saveNodePath",
            selector: "#editbutton",
          },
          {
            varPath: "createNodePath",
            selector: "#addbutton",
          },
          {
            varPath: "createNodePath",
            selector: "#addbuttonchild",
          },
          {
            varPath: "createNodePath",
            selector: "#duplicatebutton",
          },
        ];
        // see which features should be enabled
        ary.forEach((pair) => {
          if (
            window.appSettings &&
            window.appSettings[pair.varPath] &&
            window.appSettings[pair.varPath] != null &&
            window.appSettings[pair.varPath] != "" &&
            window.appSettings[pair.varPath] != "null"
          ) {
            if (pair.dep) {
              if (
                window.appSettings[pair.dep] != null &&
                window.appSettings[pair.dep] != "" &&
                window.appSettings[pair.dep] != "null"
              ) {
                this.shadowRoot
                  .querySelector(pair.selector)
                  .removeAttribute("hidden");
              } else {
                // a dependency didn't meet the requirement
              }
            } else {
              this.shadowRoot
                .querySelector(pair.selector)
                .removeAttribute("hidden");
            }
          }
        });
      }, 100);
    }
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.updateAvailableButtons();
    // load user data
    this.dispatchEvent(
      new CustomEvent("haxcms-load-user-data", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: true,
      })
    );
    this.shadowRoot.querySelectorAll("[voice-command]").forEach((el) => {
      if (el.getAttribute("id") == "editbutton") {
        this.dispatchEvent(
          new CustomEvent("hax-add-voice-command", {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
              command: ":name: save (this) page",
              context: el,
              callback: "click",
            },
          })
        );
      }
      this.dispatchEvent(
        new CustomEvent("hax-add-voice-command", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            command: ":name: " + el.getAttribute("voice-command"),
            context: el,
            callback: "click",
          },
        })
      );
    });
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'userMenuOpen' && oldValue !== undefined) {
        if (this.userMenuOpen) {
          this.rpgHat = 'construction';
        }
        else {
          this.rpgHat = 'none';
        }
      }
      if (propName == "editMode") {
        if (this.editMode) {
          this.rpgHat = 'edit';
        }
        else {
          this.rpgHat = 'none';
        }
        // observer
        this._editModeChanged(this[propName], oldValue);
        // notify
        this.dispatchEvent(
          new CustomEvent("edit-mode-changed", {
            detail: this[propName],
          })
        );
      }
      if (propName == "manifestEditMode") {
        // observer
        this._manifestEditModeChanged(this[propName], oldValue);
        // notify
        this.dispatchEvent(
          new CustomEvent("manifest-edit-mode-changed", {
            detail: this[propName],
          })
        );
      }
      if (propName == "dashboardOpened" || propName == "t") {
        // observer
        this._dashboardOpenedChanged(this.dashboardOpened);
      }
      // make sure edit matches but state doesnt shift
      if (propName === "t") {
        if (this.editMode) {
          this.__editText = this.t.savePageContent;
        } else {
          this.__editText = this.t.editPageContent;
        }
      }
    });
  }
  static get properties() {
    return {
      ...super.properties,
      userName: {
        type: String,
        attribute: "user-name",
      },
      rpgHat: { type: String},
      userPicture: {
        type: String,
        attribute: "user-picture",
      },
      userMenuOpen: {
        type: Boolean,
      },
      soundIcon: { type: String },
      darkMode: { type: Boolean, reflect: true, attribute: 'dark-mode'},
      backLink: {
        type: String,
      },
      backText: {
        type: String,
      },
      __editIcon: {
        type: String,
      },
      __editText: {
        type: String,
      },
      __settingsText: {
        type: String,
      },
      /**
       * small visual lock that events break on initial paint
       */
      painting: {
        type: Boolean,
        reflect: true,
      },
      /**
       * page allowed
       */
      pageAllowed: {
        type: Boolean,
        attribute: "page-allowed",
        reflect: true,
      },
      /**
       * if the page is in an edit state or not
       */
      editMode: {
        type: Boolean,
        reflect: true,
        attribute: "edit-mode",
      },
      /**
       * Manifest editing state
       */
      manifestEditMode: {
        type: Boolean,
        attribute: "manifest-edit-mode",
        reflect: true,
      },
      activeTitle: {
        type: String,
        attribute: "active-title",
      },
      manifest: {
        type: Object,
      },
      icon: {
        type: String,
      },
      dashboardOpened: {
        type: Boolean,
        reflect: true,
        attribute: "dashboard-opened",
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("jwt-logged-in", this._jwtLoggedIn.bind(this));
    autorun((reaction) => {
      if (store.userData) {
        this.userName = toJS(store.userData.userName);
        this.userPicture = toJS(store.userData.userPicture);
        // update buttons to match since we got a state response
        this.updateAvailableButtons();
      }
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.editMode = toJS(store.editMode);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.manifest = toJS(store.manifest);
      this.icon = "hax:site-settings";
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.dashboardOpened = toJS(store.dashboardOpened);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      const activeItem = toJS(store.activeItem);
      // update buttons to match since we got a state response
      this.updateAvailableButtons();
      if (activeItem && activeItem.id) {
        this.activeTitle = activeItem.title;
        this.pageAllowed = true;
      } else {
        this.pageAllowed = false;
      }
      this.__disposer.push(reaction);
    });
  }
  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    window.removeEventListener("jwt-logged-in", this._jwtLoggedIn.bind(this));
    super.disconnectedCallback();
  }
  _dashboardOpenedChanged(newValue) {
    if (newValue) {
      this.__settingsText = this.t.closeSiteSettings;
      this.icon = "icons:cancel";
    } else if (!newValue) {
      this.__settingsText = this.t.editSiteSettings;
      this.icon = "hax:site-settings";
    }
  }
  /**
   * toggle state on button tap
   */
  _editButtonTap(e) {
    store.playSound('click');
    this.editMode = !this.editMode;
    // save button shifted to edit
    if (!this.editMode) {
      this.dispatchEvent(
        new CustomEvent("haxcms-save-node", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: store.activeItem,
        })
      );
    }
    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        cancelable: true,
        detail: {},
      })
    );
  }
  _editDetailsButtonTap(e) {
    store.playSound('click');
    const evt = new CustomEvent("haxcms-load-node-fields", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: e.target,
    });
    window.dispatchEvent(evt);
  }
  _cancelButtonTap(e) {
    this.editMode = false;
    store.playSound('error');
    this.dispatchEvent(
      new CustomEvent("hax-cancel", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: e.detail,
      })
    );
    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        cancelable: true,
        detail: {},
      })
    );
  }
  /**
   * create new item
   */
  _createNewItem(e) {
    const evt = new CustomEvent("haxcms-create-node", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        values: this.__newForm.value,
      },
    });
    this.dispatchEvent(evt);
  }
  /**
   * Fire item
   */
  _updateItem(e) {
    var local = e.target;
    var values;
    if (!local.__form) {
      values = local.parentNode.__form.value;
    } else {
      values = local.__form.value;
    }
    // fire event with details for saving
    window.dispatchEvent(
      new CustomEvent("haxcms-save-node-details", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: values,
      })
    );
    // fire event to close the modal
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
   * Delete button hit, confirm they want to do this
   */
  _deleteButtonTap(e) {
    store.playSound('click');
    let c = document.createElement("span");
    c.innerHTML = `"${store.activeItem.title}" will be removed from the outline but its content stays on the file system.`;
    let b1 = document.createElement("button");
    let icon = document.createElement("simple-icon");
    icon.icon = "icons:delete";
    b1.appendChild(icon);
    b1.appendChild(document.createTextNode("Confirm"));
    b1.style.color = "white";
    b1.style.backgroundColor = "#ee0000";
    b1.addEventListener("click", this._deleteActive.bind(this));
    let b2 = document.createElement("button");
    let icon2 = document.createElement("simple-icon");
    icon2.icon = "icons:cancel";
    b2.appendChild(icon2);
    b2.appendChild(document.createTextNode("cancel"));
    b2.addEventListener("click", () => store.playSound('error'));
    b2.setAttribute("dialog-dismiss", "dialog-dismiss");
    let b = document.createElement("span");
    b.appendChild(b1);
    b.appendChild(b2);
    const evt = new CustomEvent("simple-modal-show", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        title: "Are you sure you want to delete this page?",
        styles: {
          "--simple-modal-z-index": "100000000",
          "--simple-modal-min-width": "30vw",
          "--simple-modal-min-height": "30vh",
        },
        elements: { content: c, buttons: b },
        invokedBy: this.shadowRoot.querySelector("#deletebutton"),
        clone: false,
        modal: true,
      },
    });
    window.dispatchEvent(evt);
  }
  /**
   * delete active item
   */
  _deleteActive(e) {
    store.playSound('click');
    const evt = new CustomEvent("haxcms-delete-node", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        item: store.activeItem,
      },
    });
    this.dispatchEvent(evt);
  }
  /**
   * toggle state on button tap
   */
  _outlineButtonTap(e) {
    store.playSound('click');
    const evt = new CustomEvent("simple-modal-show", {
      bubbles: true,
      composed: true,
      cancelable: false,
      detail: {
        title: this.t.editSiteOutline,
        styles: {
          "--simple-modal-width": "70vw",
          "--simple-modal-max-width": "70vw",
          "--simple-modal-z-index": "100000000",
          "--simple-modal-height": "70vh",
          "--simple-modal-max-height": "70vh",
        },
        elements: {
          content: document.createElement("haxcms-outline-editor-dialog"),
        },
        invokedBy: this.shadowRoot.querySelector("#outlinebutton"),
        clone: false,
        modal: true,
      },
    });
    window.dispatchEvent(evt);
  }
  _addButtonTap() {
    store.playSound('click');
    setTimeout(() => {
      window.location = this.backLink + "createSite-step-1";      
    }, 100);
  }
  /**
   * toggle state on button tap
   */
  _manifestButtonTap(e) {
    store.playSound('click');
    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        cancelable: true,
        detail: {},
      })
    );
    window.dispatchEvent(
      new CustomEvent("haxcms-load-site-dashboard", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: e.target,
      })
    );
  }
  /**
   * Edit state has changed.
   */
  _editModeChanged(newValue, oldValue) {
    if (newValue) {
      // enable it some how
      this.__editIcon = "icons:save";
      this.__editText = this.t.savePageContent;
    } else {
      // disable it some how
      this.__editIcon = "hax:page-edit";
      this.__editText = this.t.editPageContent;
    }
    if (typeof oldValue !== typeof undefined) {
      store.editMode = newValue;
      // force tray status to be the opposite of the editMode
      // to open when editing and close when not
      HAXStore.haxTray.collapsed = !newValue;
    }
  }
  /**
   * Note changes to the outline / structure of the page's items
   */
  _outlineEditModeChanged(newValue, oldValue) {
    this.dispatchEvent(
      new CustomEvent("haxcms-outline-edit-mode-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: newValue,
      })
    );
  }
  /**
   * Note changes to the outline / structure of the page's items
   */
  _manifestEditModeChanged(newValue, oldValue) {
    this.dispatchEvent(
      new CustomEvent("haxcms-manifest-edit-mode-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: newValue,
      })
    );
  }
}
window.customElements.define(HAXCMSSiteEditorUI.tag, HAXCMSSiteEditorUI);
export { HAXCMSSiteEditorUI };