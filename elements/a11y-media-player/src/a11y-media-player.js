/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { html, css } from "lit-element/lit-element.js";
import { ifDefined } from "lit-element/node_modules/lit-html/directives/if-defined.js";
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";
import "@lrnwebcomponents/responsive-utility/responsive-utility.js";
import "@lrnwebcomponents/anchor-behaviors/anchor-behaviors.js";
import "@lrnwebcomponents/es-global-bridge/es-global-bridge.js";
import "@lrnwebcomponents/simple-search/simple-search.js";
import "./lib/a11y-media-state-manager.js";
import "./lib/a11y-media-button.js";
import "./lib/a11y-media-transcript-cue.js";

/**
 * `a11y-media-player`
 * an accessible video player
 *
 * @extends A11yMediaBehaviors
 * @extends SimpleColorsPolymer
 * @customElement
 * @demo ./demo/index.html video demo
 * @demo ./demo/audio.html audio demo
 * @demo ./demo/youtube.html YouTube demo
 *
 */
class A11yMediaPlayer extends SimpleColors {
  /* REQUIRED FOR TOOLING DO NOT TOUCH */

  // simple path from a url modifier
  pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf("/") + 1);
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "a11y-media-player";
  }

  constructor() {
    super();
    this.audioOnly = false;
    this.autoplay = false;
    this.allowConcurrent = false;
    this.cc = false;
    this.__currentTime = 0;
    this.darkTranscript = false;
    this.disableFullscreen = false;
    this.disableInteractive = false;
    this.disablePrintButton = false;
    this.disableSearch = false;
    this.disableScroll = false;
    this.disableSeek = false;
    this.fullscreen = false;
    this.height = null;
    this.hideElapsedTime = false;
    this.hideTimestamps = false;
    this.hideTranscript = false;
    this.id = null;
    this.lang = "en";
    this.linkable = false;
    this.localization = {};
    this.loop = false;
    this.mediaTitle = "";
    this.mediaLang = "en";
    this.muted = false;
    this.preload = "metadata";
    this.playbackRate = 1;
    this.search = null;
    this.standAlone = false;
    this.responsiveSize = "xs";
    this.captionsTrack = null;
    this.transcriptTrack = null;
    this.sources = [];
    this.stackedLayout = false;
    this.sticky = false;
    this.stickyCorner = "top-right";
    this.thumbnailSrc = null;
    this.tracks = [];
    this.volume = 70;
    this.width = null;
    this.youtubeId = null;
    this.__cues = [];
    this.__captionsOption = -1;
    this.__loadedTracks = null;
    this.__playing = false;
    this.__seeking = false;
    this.__screenfullLoaded = false;
    this.__resumePlaying = false;
    this.__transcriptOption = -1;

    window.A11yMediaStateManager.requestAvailability();
    import("./lib/a11y-media-youtube.js");
    import("@polymer/paper-slider/paper-slider.js");
    import("@polymer/iron-icons/iron-icons.js");
    import("@polymer/iron-icons/av-icons.js");
    import("@polymer/paper-toast/paper-toast.js");
    import("@polymer/paper-listbox/paper-listbox.js");
    import("@polymer/paper-input/paper-input.js");
    import("@polymer/paper-item/paper-item.js");
    import("@polymer/paper-icon-button/paper-icon-button.js");
    import("@polymer/paper-menu-button/paper-menu-button.js");
    import("@polymer/paper-toggle-button/paper-toggle-button.js");
    import("@polymer/paper-tooltip/paper-tooltip.js");
    import("@lrnwebcomponents/dropdown-select/dropdown-select.js");
    import("@lrnwebcomponents/a11y-media-player/lib/a11y-media-play-button.js");
    if (typeof screenfull === "object") this._onScreenfullLoaded.bind(this);
    const basePath = this.pathFromUrl(decodeURIComponent(import.meta.url));
    const location = `${basePath}lib/screenfull/dist/screenfull.js`;
    window.ESGlobalBridge.requestAvailability();
    window.ESGlobalBridge.instance.load("screenfullLib", location);
    window.addEventListener(
      "es-bridge-screenfullLib-loaded",
      this._onScreenfullLoaded.bind(this)
    );
  }

  /** -------------------------- CALACULATED PROPERTIES ----------------- */

  /**
   * gets anchors from page and uses their timecodes
   * @readonly
   * @returns {number} media width divided by height
   */
  get anchor() {
    let anchor = window.AnchorBehaviors;
    /*
    
      if (
        this.anchor.target === this &&
        this.anchor.params !== {} &&
        this.isYoutube
      ) {
        let paramstring = Object.keys(this.anchor.params)
          .map(key => `${key}=${this.anchor.params[key]}`)
          .join("&");
          if(this.youtubeId) return this.youtubeId.replace(/[\?\&].*$/, ``);
    */

    return {
      target: anchor ? anchor.getTarget(this) : false,
      params: anchor ? anchor.params : {}
    };
  }

  /**
   * the aspect ratio of the media, or if unknown, `16/9`
   * @readonly
   * @returns {number} media width divided by height
   */
  get aspect() {
    let aspect =
      this.media && this.media.aspectRatio ? this.media.aspectRatio : 16 / 9;
    this.width !== null ? this.width : "100%";
    this.style.maxWidth = this.width;
    return aspect;
  }

  /**
   * returns true if an attribute is set to a value
   * @readonly
   * @returns {boolean} Should height of audio/thumbnail area be set to 0?
   */
  get audioNoThumb() {
    return (
      this.audioOnly &&
      (this.thumbnailSrc === null || this.thumbnailSrc === undefined)
    );
  }

  /**
   * returns buffered media
   * @readonly
   * @returns {number} seconds of buffered media
   */
  get buffered() {
    return this.media && this.media.buffered && this.media.buffered > 0
      ? this.media.buffered
      : 0;
  }

  /**
   * gets caption cues that should be visible for custom captions
   * @readonly
   * @returns {array} array of cues
   */
  get captionCues() {
    let cues = !this.captionsTrack
      ? []
      : this.isYoutube
      ? Object.keys(this.captionsTrack.cues).map(key => {
          let cue = this.captionsTrack.cues[key];
          if (
            cue.startTime <= this.currentTime &&
            cue.endTime >= this.currentTime
          )
            return cue;
          return {};
        })
      : this.captionsTrack.activeCues;
    return cues;
  }

  /**
   * `key` of selected textTrack based on `captionsTrack` and `cc` values
   */
  get captionsTrackKey() {
    return !this.cc ? -1 : this._getTrackId(this.captionsTrack);
  }

  /**
   * returns cues array
   */
  get cues() {
    return this.__cues;
  }

  /**
   * returns media duration
   * @readonly
   * @returns {number} media duration in seconds
   */
  get duration() {
    let duration =
      this.media && this.media.duration && this.media.duration > 0
        ? this.media.duration
        : 0;
    return duration;
  }

  /**
   * determines if player is in flex-layout mode
   * @returns {boolean} Is the video in flex layout mode?
   */
  get flexLayout() {
    if (
      !this.standAlone &&
      !this.hideTranscript &&
      !this.audioNoThumb &&
      !this.stackedLayout
    ) {
      this.setAttribute("flex-layout", true);
      return true;
    } else {
      this.removeAttribute("flex-layout");
      return true;
    }
  }

  /**
   * whether or not the fullscreen mode is be disabled
   * @returns {boolean}
   */
  get fullscreenButton() {
    if (typeof screenfull === "object") this._onScreenfullLoaded.bind(this);
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      this.disableFullscreen ||
      this.audioNoThumb ||
      !(typeof screenfull === "object")
    ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * whether the media has any tracks
   *
   * @readonly
   * @returns {boolean}
   */
  get hasCaptions() {
    return this.cues.length > 1;
  }

  /**
   * `style` for `#player-and-controls`
   * @readonly
   * @returns {string} value for style attribute
   */
  get mediaMaxWidth() {
    let maxWidth = this.fullscreen
      ? `unset`
      : `calc(${this.aspect * 100}vh - ${this.aspect * 80}px)`;
    return `max-width:${maxWidth};`;
  }

  /**
   * whether media is YouTube
   * @readonly
   * @returns {boolean}
   */
  get isYoutube() {
    return this.youtubeId ? true : false;
  }

  /**
   * HTML `audio` or `video` tag where textTracks, if any, can be found
   * @readonly
   * @returns {object} HTML tag
   */
  get loadedTracks() {
    return this.__loadedTracks;
  }

  /**
   * object that contains default localization
   *
   * @readonly
   * @returns {object} default localization object
   */
  get localizationDefaults() {
    return {
      audio: {
        label: "Audio",
        notSupported: "HTML5 video is not supported."
      },
      autoScroll: {
        label: "Scroll Transcript",
        icon: "swap-vert"
      },
      captions: {
        label: "Closed Captions",
        icon: "av:closed-caption",
        off: "Off"
      },
      download: {
        label: "Download Transcript",
        icon: "file-download"
      },
      forward: {
        label: "Forward",
        icon: "av:fast-forward"
      },
      fullscreen: {
        label: "Fullscreen",
        icon: "fullscreen"
      },
      copyLink: {
        label: "Copy Media Link",
        icon: "link"
      },
      closeLink: {
        label: "Close",
        icon: "close"
      },
      loading: {
        label: "Loading..."
      },
      loop: {
        label: "Loop Playback"
      },
      mute: {
        label: "Mute",
        icon: "av:volume-up"
      },
      nextResult: {
        label: "Next",
        icon: "arrow-forward"
      },
      pause: {
        label: "Pause",
        icon: "av:pause"
      },
      play: {
        label: "Play",
        icon: "av:play-arrow"
      },
      prevResult: {
        label: "Previous",
        icon: "arrow-back"
      },
      print: {
        label: "Print Transcript",
        icon: "print"
      },
      restart: {
        label: "Restart",
        icon: "av:replay"
      },
      rewind: {
        label: "Backward",
        icon: "av:fast-rewind"
      },
      search: {
        label: "Search the transcript.",
        icon: "search"
      },
      seekSlider: {
        label: "Seek Slider"
      },
      settings: {
        label: "Settings",
        icon: "settings"
      },
      speed: {
        label: "Speed %"
      },
      transcript: {
        label: "Transcript",
        icon: "description",
        loading: "Loading the transcript(s)...",
        off: "Off",
        skip: "Skip to the transcript."
      },
      unmute: {
        label: "Unmute",
        icon: "av:volume-off"
      },
      video: {
        label: "Video",
        notSupported: "HTML5 video is not supported."
      },
      volume: {
        label: "Volume"
      },
      youTubeLoading: {
        label: "Ready."
      },
      youTubeTranscript: {
        label: "Transcript will load once media plays."
      }
    };
  }

  /**
   * media used for playback
   * @readonly
   */
  get media() {
    return this.isYoutube ? this.youtube : this.loadedTracks;
  }

  /**
   * gets media caption
   * @readonly
   * @returns {string} the media caption
   */
  get mediaCaption() {
    let audioLabel = this._getLocal(this.localization, "audio", "label"),
      hasMediaTitle =
        this.mediaTitle !== undefined &&
        this.mediaTitle !== null &&
        this.mediaTitle !== "";
    if (this.audioOnly && hasMediaTitle) {
      return this.mediaTitle + " (" + audioLabel + ")";
    } else if (this.audioOnly) {
      return audioLabel;
    } else if (hasMediaTitle) {
      return this.mediaTitle;
    } else {
      return undefined;
    }
  }

  /**
   * gets media media time if set
   * @readonly
   * @returns {number} end time in seconds
   */
  get mediaEnd() {
    return this.mediaSeekable && this.media.seekable.end(0)
      ? this.media.seekable.end(0)
      : false;
  }

  /**
   * whether media has a seekable time range
   * @readonly
   * @returns {boolean}
   */
  get mediaSeekable() {
    return this.media && this.media.seekable
      ? this.media.seekable.length > 0
      : false;
  }

  /**
   * gets media start time
   * @readonly
   * @returns {number} start time in seconds
   */
  get mediaStart() {
    return this.mediaSeekable && this.media.seekable.start(0)
      ? this.media.seekable.start(0)
      : 0;
  }

  /**
   * whether media is currently playing
   * @readonly
   * @returns {boolean}
   */
  get playing() {
    return this.__playing;
  }

  /**
   * `style` for `#player`
   * @readonly
   * @returns {string} value for style attribute
   */
  get playerStyle() {
    let audio = this.audioOnly && !this.thumbnailSrc && !this.height,
      height = audio ? "60px" : "unset",
      paddingTop = this.fullscreen ? `unset` : `${100 / this.aspect}%`,
      thumbnail =
        this.poster && (this.isYoutube || this.audioOnly)
          ? `background-image:url(${this.poster});`
          : ``;
    return `height:${height};padding-top:${paddingTop};${thumbnail}`;
  }

  get poster() {
    if (this.thumbnailSrc) {
      return this.thumbnailSrc;
    } else if (this.youtubeId) {
      return `https://img.youtube.com/vi/${this.youtubeId.replace(
        /[\?&].*/,
        ""
      )}/hqdefault.jpg`;
    }
  }

  /**
   * gets print caption
   * @readonly
   * @returns {string} the media caption when the page is printed
   */
  get printCaption() {
    let audioLabel = this._getLocal(this.localization, "audio", "label"),
      videoLabel = this._getLocal(this.localization, "video", "label"),
      hasMediaTitle =
        this.mediaTitle !== undefined &&
        this.mediaTitle !== null &&
        this.mediaTitle !== "";
    if (this.audioOnly && hasMediaTitle) {
      return this.mediaTitle + " (" + audioLabel + ")";
    } else if (this.audioOnly) {
      return audioLabel;
    } else if (hasMediaTitle) {
      return this.mediaTitle + " (" + videoLabel + ")";
    } else {
      return videoLabel;
    }
  }

  /**
   * returns the current playback progress or slider position
   * @readonly
   * @returns {number} media duration in seconds
   */
  get currentTime() {
    let currentTime =
      this.__seeking === true
        ? this.shadowRoot.querySelector("#slider").immediateValue
        : this.__currentTime;
    return currentTime;
  }

  /**
   * gets transcript cues that should be visible
   * @readonly
   * @returns {array} array of cues
   */
  get transcriptCues() {
    let cues = this.cues.slice();
    return cues.filter(cue => cue.track === this.transcriptTrack);
  }

  /**
   * `key` of selected textTrack based on `transcriptTrack` and `hide-transcript` values
   */
  get transcriptTrackKey() {
    return this.hideTranscript ? -1 : this._getTrackId(this.transcriptTrack);
  }

  /**
   * gets the link for sharing the video at a specific timecode
   * @readonly
   * @returns {string} url for sharing the video
   */
  get shareLink() {
    let url = window.location.href.split(/[#?]/)[0],
      id = this.id ? `?id=${this.id}` : ``,
      currentTime =
        id !== "" && this.currentTime && this.currentTime !== 0
          ? `&t=${this.currentTime}`
          : ``;
    return `${url}${id}${currentTime}`;
  }

  /**
   * Show custom CC (for audio and YouTube)?
   * @returns {boolean} Should the player show custom CC?
   */
  get showCustomCaptions() {
    return (this.isYoutube || this.audioOnly) && this.hasCaptions && this.cc;
  }

  /**
   * gets playback status text
   *
   * @readonly
   * @returns {string} status, as either a localized loading message or progress/duration
   */
  get status() {
    return this.duration > 0
      ? html`
          ${this._getHHMMSS(this.currentTime, this.duration)}/${this._getHHMMSS(
            this.duration
          )}
        `
      : this.isYoutube
      ? this._getLocal(this.localization, "youTubeLoading", "label")
      : this._getLocal(this.localization, "loading", "label");
  }

  /**
   * youtube embed element
   * @readonly
   * @returns {object} a11y-media-youtube element
   */
  get youtube() {
    return this.shadowRoot.querySelector("a11y-media-youtube") !== null
      ? this.shadowRoot.querySelector("a11y-media-youtube")
      : false;
  }

  /**
   * YouTube ID without query perameters
   * @readonly
   * @returns {string} YouTube ID
   */
  get videoId() {
    if (this.isYoutube) return this.youtubeId.replace(/[\?\&].*$/, ``);
  }

  connectedCallback() {
    let root = this;
    super.connectedCallback();
    this.__loadedTracks = this.getloadedTracks();
    this._handleMediaLoaded();
    this.__loadedTracks.addEventListener("loadedmetadata", e =>
      root._handleMediaLoaded(e)
    );
    this.__loadedTracks.addEventListener("timeupdate", e =>
      root._handleTimeUpdate(e)
    );
    this._addResponsiveUtility();
    /**
     * Fires when a new player is ready for a11y-media-state-manager
     * @event a11y-player
     */
    window.dispatchEvent(
      new CustomEvent("a11y-player", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
    this.__playerReady = true;
  }

  /**
   * life cycle, element is removed from the DOM
   */
  disconnectedCallback() {
    window.removeEventListener(
      "es-bridge-screenfullLib-loaded",
      this._onScreenfullLoaded.bind(this)
    );
    super.disconnectedCallback();
  }

  /**
   * @param {map} changedProperties the properties that have changed
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      //console.log('updated',propName,oldValue);
      if (this.media) this._updateMediaProperties(propName);
      if (propName === "id" && this.id === null)
        this.id = "a11y-media-player" + Date.now();

      /* updates captions */
      if (propName === "__captionsOption") this._captionsOptionChanged();
      if (["cc", "captionsTrack"].includes(propName)) this._captionsChanged();

      this.dispatchEvent(
        new CustomEvent(
          `${propName
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
            .toLowerCase()}-changed`,
          { detail: { value: this[propName] } }
        )
      );
    });
  }

  /**
   * updates track mode & `__captionsOption` when `captionsTrack` or `cc` changes
   */
  _captionsChanged() {
    let ccNum = -1;
    Object.keys(this.loadedTracks.textTracks).forEach(key => {
      let showing =
        this.cc && this.loadedTracks.textTracks[key] === this.captionsTrack;
      this.loadedTracks.textTracks[key].mode = showing ? "showing" : "hidden";
      if (showing) ccNum = key;
    });
    this.__captionsOption = ccNum;
  }

  /**
   * updates track mode & `captionsTrack` when `__captionsOption` changes
   */
  _captionsOptionChanged() {
    this.cc = this.__captionsOption > -1;
    Object.keys(this.loadedTracks.textTracks).forEach(key => {
      let showing = parseInt(key) == parseInt(this.__captionsOption);
      this.loadedTracks.textTracks[key].mode = showing ? "showing" : "hidden";
      if (showing) this.captionsTrack = this.loadedTracks.textTracks[key];
    });
  }

  /**
   * handles mute change
   */
  _handleMuteChanged() {
    this.media.muted = this.muted;
    /**
     * Fires when closed caption is toggled
     * @event mute-changed
     */
    window.dispatchEvent(
      new CustomEvent("mute-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * determine which button was clicked and act accordingly
   */
  _handleSettingsChanged(e) {
    if (
      this.shadowRoot &&
      this.shadowRoot.querySelector("#settings") &&
      this.shadowRoot.querySelector("#settings").close &&
      !e.path[0].opened
    )
      this.shadowRoot.querySelector("#settings").close();
  }

  /**
   * gets download data for the active transcript
   * @param {string} the title of the media
   */
  download() {
    let a = document.createElement("a"),
      title =
        this.mediaTitle && this.mediaTitle.trim() != ""
          ? `${this.mediaTitle} (${this._getLocal(
              this.localization,
              "transcript",
              "label"
            )})`
          : this._getLocal(this.localization, "transcript", "label"),
      filename = title.replace(/[^\w\d]/g, ""),
      cues = this.transcriptTrack.cues,
      data = Object.keys(cues)
        .map(
          key =>
            `${this._getHHMMSS(cues[key].startTime)} - ${this._getHHMMSS(
              cues[key].endTime
            )}: \t${cues[key].text.replace(/[\n\r\s*]/g, " ")}\n`
        )
        .join("");
    a.setAttribute(
      "href",
      "data:text/plain;charset=UTF-8," + encodeURIComponent(title + "\n" + data)
    );
    a.setAttribute("download", filename + ".txt");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    /**
     * Fires when transcript is downloaded
     * @event transcript-downloaded
     */
    this.dispatchEvent(
      new CustomEvent("transcript-downloaded", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * prints the active transcript
   * @param {string} the title of the media
   */
  print() {
    let cues = this.transcriptTrack.cues,
      title =
        this.mediaTitle && this.mediaTitle.trim() != ""
          ? `${this.mediaTitle} (${this._getLocal(
              this.localization,
              "transcript",
              "label"
            )})`
          : this._getLocal(this.localization, "transcript", "label"),
      print = window.open(
        "",
        "",
        "left=0,top=0,width=552,height=477,toolbar=0,scrollbars=0,status =0"
      );
    print.document.body.innerHTML = `
    <h1>${title}</h1>
    ${Object.keys(cues)
      .map(
        key =>
          `<div style="display: table-row;">
        ${
          this.hideTimestamps
            ? ``
            : `
            <span style="display: table-cell;
              font-size: 80%;
              padding: 0 16px;
              white-space: nowrap;
              font-family: monospace;">
              ${this._getHHMMSS(cues[key].startTime)} - 
              ${this._getHHMMSS(cues[key].endTime)}:
            </span>`
        }
        <span style="display: table-cell; line-height: 200%;">
          ${cues[key].text}
        </span>
      </div>`
      )
      .join("")}
    `;
    print.document.close();
    print.focus();
    print.print();
    print.close();

    /**
     * Fires when transcript is printed
     * @event transcript-printed
     */
    this.dispatchEvent(
      new CustomEvent("transcript-printed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * plays the media
   */
  play() {
    this.__playing = true;
    if (this.media && this.media.play) this.media.play();
    /**
     * Fires when media plays
     * @event play
     */
    window.dispatchEvent(
      new CustomEvent("play", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
    /**
     * DEPRECATED: Fires when media plays
     * @event a11y-player-playing
     */
    window.dispatchEvent(
      new CustomEvent("a11y-player-playing", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * pauses the media
   */
  pause() {
    /*console.log(
      '----->',
      this.media.seekable,
      this.duration,
      this.media.duration,
      this.currentTime,
      this.__currentTime,
      this.media.currentTime);*/
    this.__playing = false;
    if (this.media && this.media.pause) this.media.pause();
    /**
     * Fires when media pauses
     * @event pause
     */
    window.dispatchEvent(
      new CustomEvent("pause", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * stops the media
   */
  stop() {
    this.pause();
    this.seek(0);
    /**
     * Fires when media stops
     * @event stop
     */
    window.dispatchEvent(
      new CustomEvent("stop", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * restarts the media
   */
  restart() {
    this.seek(0);
    this.play();
    /**
     * Fires when media retarts
     * @event restart
     */
    window.dispatchEvent(
      new CustomEvent("restart", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * seeks media backward at a set increment
   * @param {float} the elepsed time, in seconds
   */
  rewind(amt) {
    amt = amt !== undefined ? amt : this.duration / 20;
    this.__resumePlaying = this.__playing;
    this.seek(this.currentTime - amt, 0);
    if (this.__resumePlaying) this.play();
    this.__resumePlaying = false;
    /**
     * Fires when media moves backward
     * @event backward
     */
    window.dispatchEvent(
      new CustomEvent("backward", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * seeks media forward at a set increment
   * @param {float} the elepsed time, in seconds
   */
  forward(amt) {
    amt = amt !== undefined ? amt : this.duration / 20;
    this.__resumePlaying = this.__playing;
    this.seek(this.currentTime + amt);
    if (this.__resumePlaying) this.play();
    this.__resumePlaying = false;
    /**
     * Fires when media moves forward
     * @event forward
     */
    window.dispatchEvent(
      new CustomEvent("forward", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * seeks to a specific time
   * @param {float} the time, in seconds, to seek
   */
  seek(time = 0) {
    console.log("seek", this, time, this.mediaSeekable, this.duration);
    if (this.mediaSeekable && time > 0 && time < this.duration) {
      console.log("seeking", this, time, this.media);
      this.media.seek(time);
      this._handleTimeUpdate();
      /**
       * Fires when media seeks
       * @event seek
       */
      window.dispatchEvent(
        new CustomEvent("seek", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: this
        })
      );
    }
  }

  /**
   * selects `captionsTrack` by key and adjusts `cc` accordingly
   */
  selectCaptionByKey(id) {
    id = parseInt(id);
    if (id > -1) this.captionsTrack = this.loadedTracks.textTracks[id];
    this.cc = id > -1;
  }

  /**
   * selects `transcriptTrack` by key and adjusts `hideTranscript` accordingly
   */
  selectTranscriptByKey(id) {
    id = parseInt(id);
    if (id > -1) this.transcriptTrack = this.loadedTracks.textTracks[id];
    this.hideTranscript = id < 0;
  }

  /**
   * media tag where sources and tracks can be found
   * @readonly
   */
  getloadedTracks() {
    let media = this.querySelectorAll("audio,video"),
      primary = null;
    media.forEach(medium => {
      medium.removeAttribute("autoplay");
      medium.setAttribute("preload", "metadata");
    });

    if (media.length > 0) {
      primary = media[0];
      this.audioOnly = primary.tagName === "AUDIO";
    } else {
      primary = document.createElement(
        this.querySelectorAll('source[type*="audio"]').length > 0
          ? "audio"
          : "video"
      );
      this.querySelectorAll("source,track").forEach(node => {
        if (node.parentNode === this) primary.appendChild(node);
      });
      primary.setAttribute("preload", "metadata");
      this.appendChild(primary);
    }
    primary.style.width = "100%";
    primary.style.maxWidth = "100%";

    /* handle deprecated tracks */
    this.tracks.forEach(track => {
      let node = document.createElement("track");
      Object.keys(track).forEach(key => node.setAttribute(key, track[key]));
      primary.appendChild(node);
    });

    /* handle deprecated sources */
    this.sources.forEach(source => {
      let node = document.createElement("source");
      Object.keys(source).forEach(key => node.setAttribute(key, source[key]));
      primary.appendChild(node);
    });
    /* provides a seek function for primary media */
    primary.seek = time => (primary.currentTime = time);
    return primary;
  }
  /**
   *
   *
   * @param {*} id
   * @param {*} thumb
   * @returns
   * @memberof A11yMediaPlayer
   */
  _getSrcDoc(id, thumb) {
    return !id
      ? ``
      : `<style>
        *{padding:0;margin:0;overflow:hidden}
        html,body{height:100%}
        img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
        span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}
        </style><a href=https://www.youtube.com/embed/${id}?autoplay=1></a>`;
  }

  /**
   * selects a specific transcript track
   * @param {track} track text track
   */
  _getTrack(track) {
    if (!track) {
      let defaultTracks = this.loadedTracks.textTracks.filter(
        track => track.default === true
      );
      return defaultTracks
        ? defaultTracks[0].track
        : this.loadedTracks.textTracks[0].track;
    }
    return track;
  }

  /**
   * selects a specific track as transcript
   * @param {track} track text track
   */
  selectTranscript(track) {
    this.transcriptTrack = this._getTrack(track);
  }

  /**
   * set speed/playback rate of media
   * @param {float} the playback rate, where 1 = 100%
   */
  setPlaybackRate(value) {
    value = value !== null ? value : 1;
    this.media.playbackRate = value !== null ? value : 1;
    /**
     * Fires when video playback rate changes
     * @event playback-rate-changed
     */
    window.dispatchEvent(
      new CustomEvent("playback-rate-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * set volume of media
   * @param {integer} the volume level from 0-100
   */
  setVolume(value = 70) {
    this.volume = Math.max(0, Math.min(value, 100));
    this.media.volume = value / 100;
    /**
     * Fires when video volume changes
     * @event volume-changed
     */
    window.dispatchEvent(
      new CustomEvent("volume-changed", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles captions
   * @param {boolean} Toggle CC on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleCC(mode) {
    this.cc = typeof mode === typeof undefined ? !this.cc : mode;

    /**
     * Fires when closed caption is toggled
     * @event cc-toggle
     */
    window.dispatchEvent(
      new CustomEvent("cc-toggle", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles fullscreen
   * @param {boolean} Toggle fullscreen on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleFullscreen(mode) {
    if (screenfull && this.fullscreenButton) {
      this.fullscreen = mode === undefined ? !this.loop : mode;
      this.toggleTranscript(this.fullscreen);
      screenfull.toggle(this.shadowRoot.querySelector("#player-section"));

      /**
       * Fires when fullscreen is toggled
       * @event fullscreen-toggle
       */
      window.dispatchEvent(
        new CustomEvent("fullscreen-toggle", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: this
        })
      );
    }
  }

  /**
   * toggles looping
   * @param {boolean} Toggle looping on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleLoop(mode) {
    this.loop = mode === undefined ? !this.loop : mode;
    this.media.loop = mode === true;

    /**
     * Fires when looping is toggled
     * @event loop-toggle
     */
    window.dispatchEvent(
      new CustomEvent("loop-toggle", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles play
   * @param {boolean} Toggle play/pause? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  togglePlay() {
    if (this.__playing) {
      this.pause();
    } else {
      this.play();
    }
    /**
     * Fires when play/pause is toggled
     * @event play-toggle
     */
    window.dispatchEvent(
      new CustomEvent("play-toggle", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles mute
   * @param {boolean} Toggle mute on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleMute(mode) {
    this.muted = typeof mode === typeof undefined ? !this.muted : mode;
    /**
     * Fires when mute is toggled
     * @event muted-toggle
     */
    window.dispatchEvent(
      new CustomEvent("muted-toggle", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles sticky attribute
   * @param {boolean} Toggle sticky mode on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleSticky(mode) {
    mode = mode === undefined ? !this.sticky : mode;
    this.sticky = mode;
    /**
     * Fires when video video's sticky behavior is toggled
     * @event player-sticky
     */
    this.dispatchEvent(
      new CustomEvent("player-sticky", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * toggles transcript
   * @param {boolean} Toggle transcript on? `true` is on, `false` is off, and `null` toggles based on current state.
   */
  toggleTranscript(mode) {
    mode = mode === undefined ? this.hideTranscript : mode;
    this.hideTranscript = !mode;
    /**
     * Fires when transcript toggles
     * @event transcript-toggle
     */
    this.dispatchEvent(
      new CustomEvent("transcript-toggle", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: this
      })
    );
  }

  /**
   * loads a track's cue metadata
   */
  _addSourcesAndTracks(media) {
    media.style.width = "100%";
    media.style.maxWidth = "100%";
    this.loadedTracks.textTracks.onremovetrack = e => {
      this.loadedTracks.textTracks.filter(track => track !== e.track);
      this.__cues = this.cues.filter(cue => cue.track !== e.track);
    };
    this.loadedTracks.textTracks.onaddtrack = e => {
      if (this.captionsTrack === null) this.captionsTrack = e.track;
      e.track.mode = "hidden";
      let loadCueData = setInterval(() => {
        if (e.track.cues && e.track.cues.length > 0) {
          clearInterval(loadCueData);
          let cues = Object.keys(e.track.cues).map(key => e.track.cues[key]);
          this.__cues = this.cues.concat(cues).sort((a, b) => {
            let start = a.startTime - b.startTime,
              end = a.endTime - b.endTime;
            return start !== 0 ? start : end !== 0 ? end : a.track - b.track;
          });
        }
      });
    };

    let d = this.loadedTracks.querySelector("track[default]")
        ? this.loadedTracks.querySelector("track[default]")
        : this.loadedTracks.querySelector("track"),
      defaultTrack =
        Object.keys(this.loadedTracks.textTracks).find(key => {
          return (
            d.label === this.loadedTracks.textTracks[key].label &&
            d.kind === this.loadedTracks.textTracks[key].kind &&
            d.srclang === this.loadedTracks.textTracks[key].scrlang
          );
        }) || 0;
    this.captionsTrack = this.loadedTracks.textTracks[defaultTrack];
    this.transcriptTrack = this.captionsTrack;
    this._handleTimeUpdate();
  }

  /**
   * handles closing the share link toast
   */
  _handleCloseLink() {
    if (
      this.shadowRoot.querySelector("#link") &&
      this.shadowRoot.querySelector("#link").close
    )
      this.shadowRoot.querySelector("#link").close();
    if (this.__resumePlaying) this.play();
    this.__resumePlaying = false;
  }

  /**
   * handles copying the share link
   */
  _handleCopyLink() {
    let el = document.createElement("textarea");
    this.__resumePlaying = this.__playing;
    this.pause;
    el.value = this.shareLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.shadowRoot.querySelector("#link").open();
  }

  /**
   * handles the seek function when a transcript cue is activated
   *
   * @param {event} e seek event
   */
  _handleCueSeek(cue) {
    if (!this.standAlone) {
      this.__resumePlaying = this.__playing;
      this.seek(cue.startTime);
    }
  }

  /**
   * handles media metadata when media is loaded
   */
  _handleMediaLoaded() {
    this._handleTimeUpdate();
    let timecode = this.anchor.params.t || this.anchor.params.start;
    /* if this video is part of the page's query string or anchor and not youtube, seek the video */
    if (this.anchor.target === this && timecode) {
      this.seek(this._getSeconds(timecode));
    } else if (this.isYoutube) {
      let ytQuery = this.youtubeId.split(/[\?\&]/);
      ytQuery.forEach(yt => {
        let param = yt.split(/=/);
        if (param.length > 1 && (param[0] === "t" || param[0] === "start")) {
          console.log(param, yt);
          this.seek(this._getSeconds(param[1]));
        }
      });
    }
  }

  /**
   * sets search the simple-search element
   * @param {event} e searchbar event
   */
  _handleSearchAdded(e) {
    this.search = e.detail;
  }

  /**
   * handles speed slider change thhat sets playback rate
   * @param {event} e slider event
   */
  _handleSpeedChanged(e) {
    this.setPlaybackRate(e.path[0].value);
  }

  /**
   * handles duration slider dragging with a mouse
   * @param {event} e slider start event
   */
  _handleSliderStart(e) {
    this.__resumePlaying = this.__playing;
    this.pause();
    this.__seeking = true;
  }

  /**
   * handles duration slider dragging with a mouse
   */
  _handleSliderStop(e) {
    this.seek(e.path[4].immediateValue);
    this.__seeking = false;
    if (this.__resumePlaying) {
      this.play();
      this.__resumePlaying = false;
    }
  }

  /**
   * handles time updates
   */
  _handleTimeUpdate() {
    //console.log('_handleTimeUpdate',this,this.media,this.media.duration);
    /* update current time with media's current time property */
    this.__currentTime =
      this.media && this.media.currentTime && this.media.currentTime > 0
        ? this.media.currentTime
        : 0;
  }

  /**
   * gets `key` of given track
   *
   * @param {object} track textTrack
   * @returns {number} key
   */
  _getTrackId(track) {
    return (
      Object.keys(this.loadedTracks.textTracks).find(
        key => this.loadedTracks.textTracks[key] === track
      ) || -1
    );
  }

  /**
   * handles volume slider change
   * @param {event} e volume change event
   */
  _handleVolumeChanged(e) {
    this.volume = e.path[0].value;
  }

  /**
   * determine which button was clicked and act accordingly
   * @param {event} e controls change event
   */
  _onControlsChanged(e) {
    if (this.shadowRoot && this.shadowRoot.querySelector("#settings"))
      this.shadowRoot.querySelector("#settings").close();
  }

  /**
   * sets the element's __screenfullLoaded variable to true once screenfull is loaded
   * and adds an event listener for screenfull
   * @param {event} e screenfull load
   */
  _onScreenfullLoaded(e) {
    let root = this;
    this.__screenfullLoaded = true;

    // handles fullscreen
    if (screenfull) {
      screenfull.on("change", () => {
        if (screenfull.enabled) root.fullscreen = screenfull.isFullscreen;
      });
    }
  }

  /**
   * on a cue.onenter event scrolls the first active cue to position
   * @param {event} e onenter event
   */
  _setActiveCue(e) {
    let cue = e.detail.element,
      transcript = cue.parentNode,
      offset =
        transcript !== null && transcript !== undefined
          ? transcript.offsetTop
          : 0;
    if (!this.disableScroll) {
      //javascript scrolling from:  https://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation#answer-8918062
      let scrollingTo = (element, to, duration) => {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = (difference / duration) * 10;

        setTimeout(() => {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop === to) return;
          scrollingTo(element, to, duration - 10);
        }, 10);
      };
      scrollingTo(cue.parentNode.parentNode, cue.offsetTop - offset, 250);
    }
  }

  /**
   * handles transcript scroll toggle
   * @param {event} e scroll event
   */
  _transcriptScroll(e) {
    this.disableScroll = !this.disableScroll;
  }

  /**
   * When relevant player properties change, updates properties of media
   * @param {string} propName the changed property
   */

  _updateMediaProperties(propName) {
    let setAttr = (attr, val = this[attr], yt = true) => {
      if (["__loadedTracks", "youtubeId", "media", attr].includes(propName)) {
        let media = yt && this.media ? this.media : this.__loadedTracks;
        if (val && this.media !== null) {
          media.setAttribute(attr, val);
        } else {
          media.removeAttribute(attr, val);
        }
      }
    };

    setAttr("cc", this.cc, false);
    setAttr("crossorigin");
    setAttr("hidden", this.isYoutube, false);
    setAttr("lang", this.mediaLang);
    setAttr("loop");
    setAttr("playbackRate");
    setAttr("poster", !this.isYoutube ? this.thumbnailSrc : false);
    if (propName === "__loadedTracks")
      this._addSourcesAndTracks(this.loadedTracks);
    if (["media", "muted"].includes(propName)) this._handleMuteChanged();
    if (["media", "volume"].includes(propName)) this.setVolume(this.volume);
    if (["media", "autoplay"].includes(propName) && this.autoplay) this.play();
  }

  /**
   * calls responsive-utility to get parent's responsive size
   *
   * @param {object} a set of responsive for options, eg: `{element: root, attribute: "responsive-size", relativeToParent: true}`
   */
  _addResponsiveUtility(options) {
    let root = this;
    window.ResponsiveUtility.requestAvailability();
    /**
     * Fires player needs the size of parent container to add responsive styling
     * @event responsive-element
     */
    window.dispatchEvent(
      new CustomEvent("responsive-element", {
        detail:
          options !== undefined
            ? options
            : {
                element: root,
                attribute: "responsive-size",
                relativeToParent: true
              }
      })
    );
  }

  /**
   * converts time in millesconds to HH:MM:SS
   *
   * @param {float} the progress, in seconds
   * @param {float} the duration, in seconds
   * @returns {string} a human-readable string of progress/duration in HH:MM:SS
   *
   */
  _getHHMMSS(val, max) {
    val = parseFloat(val);
    max = max === undefined ? val : parseFloat(max);
    let a = val => {
        return val < 10 ? `0${val}` : val;
      },
      b = (val, i, none) => {
        return max >= i ? a(Math.floor(val / i)) + ":" : none;
      },
      c = val => {
        return val < 100 ? val + "0" : val;
      };
    return (
      b(val, 3600, "") + b(val % 3600, 60, "00:") + a(Math.round(val % 60))
    );
  }
  /**
   * returns time in seconds of a string, such as 00:00:00.0, 0h0m0.0s, or 0hh0mm0.0ss
   * @param {string} time
   * @returns {float} seconds
   */
  _getSeconds(time = 0) {
    let units = time
        .replace(/[hm]{1,2}&?/g, ":0")
        .replace(/[s]{1,2}$/g, "")
        .split(/:/),
      hh = units.length > 2 ? parseInt(units[units.length - 3]) : 0,
      mm = units.length > 1 ? parseInt(units[units.length - 2]) : 0,
      ss = units.length > 0 ? parseFloat(units[units.length - 1]) : 0;
    console.log("_getSeconds", this, time);
    return hh * 3600 + mm * 60 + ss;
  }

  /**
   * gets the localization by compaing the localization set to the defaults
   *
   * @param {object} the localization object
   * @param {string} the key to search for
   * @param {string} the subkey to search for
   * @returns {string} the default value for [key][subkey], unless localization[key][subkey] exists
   */
  _getLocal(localization, key, subkey) {
    let local = "";
    if (
      localization !== undefined &&
      localization[key] !== undefined &&
      localization[key][subkey] !== undefined
    ) {
      local = localization[key][subkey];
    } else if (
      this.localizationDefaults !== undefined &&
      this.localizationDefaults[key] !== undefined &&
      this.localizationDefaults[key][subkey] !== undefined
    ) {
      local = this.localizationDefaults[key][subkey];
    }
    return local;
  }
}
window.customElements.define(A11yMediaPlayer.tag, A11yMediaPlayer);
export { A11yMediaPlayer };
