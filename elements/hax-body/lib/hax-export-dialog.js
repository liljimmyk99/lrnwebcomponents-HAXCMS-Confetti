import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-modal/lib/simple-modal-template.js";
import "./hax-view-source.js";
import { HaxComponentStyles } from "./hax-ui-styles.js";
import { I18NMixin } from "@lrnwebcomponents/i18n-manager/lib/I18NMixin.js";
/**
 * `hax-export-dialog`
 * @element hax-export-dialog
 * `Export dialog with all export options and settings provided.`
 */
class HaxExportDialog extends I18NMixin(LitElement) {
  static get styles() {
    return [
      ...HaxComponentStyles,
      css`
        :host {
          display: none;
          --simple-modal-resize: both;
          --simple-modal-height: 100vh;
        }
      `,
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("simple-modal-show", this.modalToggle.bind(this));
  }
  disconnectedCallback() {
    window.removeEventListener(
      "simple-modal-show",
      this.modalToggle.bind(this)
    );
    super.disconnectedCallback();
  }
  /**
   * a bit hacky but gets around the cloning element and events issue
   */
  modalToggle(e) {
    if (e.detail.id == "hax-export") {
      e.detail.elements.custom.openSource();
    }
  }
  render() {
    return html`
      <simple-modal-template
        modal-id="hax-export"
        mode="hax-ui"
        id="dialog"
        .title="${this.t.viewPageSource}"
      >
        <hax-view-source slot="custom"></hax-view-source>
      </simple-modal-template>
    `;
  }
  static get tag() {
    return "hax-export-dialog";
  }

  constructor() {
    super();
    this.t = {
      viewPageSource: "View Page Source",
    };
    this.registerLocalization({
      context: this,
      namespace: "hax",
    });
  }
}
window.customElements.define(HaxExportDialog.tag, HaxExportDialog);
export { HaxExportDialog };
