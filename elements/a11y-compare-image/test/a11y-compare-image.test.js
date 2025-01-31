import { fixture, expect, html } from "@open-wc/testing";
import "../a11y-compare-image.js";

describe("Image comparison", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <a11y-compare-image opacity>
      <h2 slot="heading">Matterhorn comparison</h2>
      <p slot="description">
        The image on the top or when slider is moved all the way to the right is
        the <span id="cloudy">Matterhorn on a cloudy day without snow</span>. As
        you move the slider to the left, the image below it reveals the
        <span id="snowy">Matterhorn on a clear day with snow</span>.
      </p>
      <img
        slot="top"
        aria-describedBy="cloudy"
        .src="${new URL("../demo/images/Matterhorn01.png", import.meta.url)
          .href}"
        alt="Matterhorn without snow"
      />
      <img
        slot="bottom"
        aria-describedBy="snowy"
        .src="${new URL("../demo/images/Matterhorn02.png", import.meta.url)
          .href}"
        alt="Matterhorn with snow"
      />
    </a11y-compare-image>`);
  });
  it("slotted in text", () => {
    const slot = element.shadowRoot.querySelector('slot[name="heading"]');
    expect(slot).to.exist;
    expect(slot.assignedNodes({ flatten: true })[0].textContent).to.equal(
      "Matterhorn comparison"
    );
  });
  it("slot for description exists", () => {
    const slot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(slot).to.exist;
    expect(slot.assignedNodes({ flatten: true })[0]).to.exist;
  });
  it("renders top image", () => {
    const container = element.shadowRoot.querySelector("#container");
    expect(container).to.exist;
    expect(container.style.backgroundImage).to.contain(
      "images/Matterhorn01.png"
    );
  });
  it("renders bottom image", () => {
    const layer = element.shadowRoot.querySelector("#layer");
    expect(layer).to.exist;
    expect(layer.style.backgroundImage).to.contain("images/Matterhorn02.png");
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
