import { html } from "@polymer/polymer/polymer-element.js";
import { IronA11yKeysBehavior } from "@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import "@lrnwebcomponents/simple-progress/simple-progress.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
import { SimpleColorsPolymer } from "@lrnwebcomponents/simple-colors/lib/simple-colors-polymer.js";
import { SchemaBehaviors } from "@lrnwebcomponents/schema-behaviors/schema-behaviors.js";
/**
A custom audio player with material paper style and clean design.

Example:

    <paper-audio-player src="audio.mp3"></paper-audio-player>

### Styling the player:

This player has an accent color, and you have two option to modify it:

- **Option 1**: Using the *color property* on element. This one is handy if you need to modify the color dynamically.


    <paper-audio-player color="#F05C38" src="audio.mp3"></paper-audio-player>


- **Option 2**: Using the *custom CSS property*:



    paper-audio-player {
       --paper-audio-player-color: #e91e63;
    }

The following mixins are available for styling:

Custom property                             | Description                                 | Default
--------------------------------------------|---------------------------------------------|----------
--paper-audio-player-color                  | Color of the element                        | blueviolet

@element paper-audio-player
* @demo demo/index.html
*/
class PaperAudioPlayer extends mixinBehaviors(
  [IronA11yKeysBehavior],
  SchemaBehaviors(SimpleColorsPolymer)
) {
  static get template() {
    return html`
      <style include="simple-colors-shared-styles-polymer">
        :host {
          display: block;
          box-sizing: border-box;
          font-family: var(
            --paper-audio-player-font-family,
            "Roboto",
            "Noto",
            sans-serif
          );
          --paper-audio-player-color: var(
            --simple-colors-default-theme-accent-9
          );
          --paper-audio-player-text-color: var(
            --simple-colors-default-theme-grey-1
          );
          --paper-audio-player-shadow: var(
            --simple-colors-default-theme-grey-2
          );
          --paper-audio-player-background: var(
            --simple-colors-default-theme-grey-1
          );
          background-color: var(--paper-audio-player-background);
        }
        #wrapper {
          position: relative;
          cursor: pointer;
          height: 50px;
          box-shadow: 0 1px 2px var(--paper-audio-player-shadow);
        }
        #left,
        #center {
          border-right: 1px solid var(--paper-audio-player-shadow);
        }
        #left,
        #right {
          height: 50px;
          width: 50px;
          position: relative;
        }

        #left {
          opacity: 0.8;
          background-color: var(--paper-audio-player-color);
          transition: opacity 0.25s;
        }
        #left:focus,
        #left:hover {
          opacity: 1;
        }

        #right {
          background-color: var(--paper-audio-player-background);
        }

        simple-icon-button,
        simple-icon {
          color: var(--paper-audio-player-text-color);
        }

        #duration,
        #title,
        #progress2 {
          text-align: center;
          line-height: 50px;
        }

        #duration {
          font-size: 11px;
          color: var(--paper-audio-player-color);
        }

        simple-icon-button,
        simple-icon {
          margin: auto;
        }

        #replay {
          opacity: 0;
          color: var(--paper-audio-player-color);
        }

        #title,
        #progress2 {
          pointer-events: none;
          font-size: 15px;
        }

        #title {
          z-index: 2;
          color: var(--paper-audio-player-color);
        }

        #progress2 {
          width: 0px;
          z-index: 5;
          color: var(--paper-audio-player-text-color);
          overflow: hidden;
        }

        #center {
          position: relative;
          overflow: hidden;
          background-color: var(--paper-audio-player-background);
        }

        #progress {
          width: 100%;
          transform-origin: left;
          transform: scaleX(0);
          background-color: var(--paper-audio-player-color);
        }

        /* On hover */

        :host(:not(.cantplay)) #right:hover #replay {
          opacity: 1;
        }

        #right:hover #duration {
          opacity: 0;
        }

        #left:hover #play,
        #left:hover #pause {
          transform: scale3d(1.1, 1.1, 1.1);
          -ms-transform: scale3d(1.1, 1.1, 1.1);
          -webkit-transform: scale3d(1.1, 1.1, 1.1);
        }

        /* On Error */

        :host(.cantplay) #title {
          font-size: 12px;
        }

        :host(.cantplay) #wrapper {
          cursor: default;
        }

        :host(.cantplay) #play {
          opacity: 0;
        }

        /* Flexbox Helpers */

        .layout-horizontal {
          display: flex;
          display: -webkit-flex;
          display: -ms-flexbox;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }

        .flex {
          -ms-flex: 1;
          -webkit-flex: 1;
          flex: 1;
        }

        .fit {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .self-start {
          -ms-align-self: flex-start;
          -webkit-align-self: flex-start;
          align-self: flex-start;
        }

        .self-end {
          -ms-align-self: flex-end;
          -webkit-align-self: flex-end;
          align-self: flex-end;
        }
      </style>
      <div id="wrapper" class="layout-horizontal">
        <div id="left" class="self-start" on-click="playPause">
          <!-- Icon -->
          <simple-icon-button
            id="play"
            icon="paper-audio-icons:play-arrow"
            class="fit"
            hidden$="[[ _hidePlayIcon(isPlaying, canBePlayed) ]]"
            role="button"
            aria-label="Play Audio"
            tabindex="-1"
          ></simple-icon-button>
          <simple-icon-button
            id="pause"
            icon="paper-audio-icons:pause"
            class="fit"
            hidden$="[[ !isPlaying ]]"
            role="button"
            aria-label="Pause Audio"
            tabindex="-1"
          ></simple-icon-button>
          <simple-icon
            id="error"
            icon="paper-audio-icons:error-outline"
            class="fit"
            hidden$="[[ !error ]]"
          ></simple-icon>
        </div>
        <div id="center" class="flex" on-down="_onDown">
          <!-- Title -->
          <div id="title" class="fit" role="alert">[[title]]</div>
          <!-- Audio HTML5 element -->
          <audio
            id="audio"
            src$="[[src]]"
            preload$="[[ _setPreload(autoPlay, preload) ]]"
          ></audio>
          <!-- Progress bar -->
          <div id="progress" class="fit"></div>
          <!-- Secondary white title -->
          <div id="progress2" class="fit">
            <div id="title2" aria-hidden="true">[[title]]</div>
          </div>
        </div>
        <div id="right" class="self-end" on-click="restart">
          <!-- Duration -->
          <div id="duration" class="fit" hidden$="[[ended]]">
            <span class="fit" role="timer" aria-label="Audio Track Length"
              >[[ _convertSecToMin(timeLeft) ]]</span
            >
          </div>
          <!-- Icon -->
          <simple-icon-button
            id="replay"
            class="fit"
            icon="paper-audio-icons:replay"
            tabindex="-1"
            role="button"
            aria-label="Replay Audio"
          ></simple-icon-button>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "paper-audio-player";
  }
  // Define public properties
  static get properties() {
    return {
      ...super.properties,

      src: {
        type: String,
        observer: "_srcChanged",
      },
      title: {
        type: String,
        value: "Click to play this audio file",
      },
      autoPlay: {
        type: Boolean,
        value: false,
      },
      preload: {
        type: String,
        value: "auto",
      },
      currentTime: {
        type: Number,
        value: 0,
        notify: true,
      },
      timeLeft: {
        type: Number,
        value: 0,
      },
      smallSkip: {
        type: Number,
        value: 15,
      },
      largeSkip: {
        type: Number,
        value: 60,
      },
      error: {
        type: Boolean,
      },
      timeOffset: {
        type: Number,
        value: 0,
      },
    };
  }

  static get keyBindings() {
    return {
      space: "playPause",
      enter: "playPause",
      left: "_skipReverseByInterval",
      right: "_skipReverseByInterval",
      down: "_skipReverseByInterval",
      up: "_skipReverseByInterval",
    };
  }
  static get haxProperties() {
    return {
      canScale: true,
      canPosition: true,
      canEditSource: true,
      gizmo: {
        title: "Mini Audio player",
        description: "A very small audio player good for MP3s.",
        icon: "image:music-note",
        color: "green",
        groups: ["Audio", "Media"],
        handles: [
          {
            type: "audio",
            source: "src",
            title: "title",
            color: "color",
          },
        ],
        meta: {
          author: "ELMS:LN",
        },
      },
      settings: {
        configure: [
          {
            property: "src",
            title: "Source",
            description: "The URL for this audio file.",
            inputMethod: "haxupload",
            icon: "link",
            required: true,
            validationType: "url",
          },
          {
            property: "title",
            title: "Title",
            description: "Title of this sound track.",
            inputMethod: "textfield",
            icon: "av:video-label",
            required: false,
            validationType: "text",
          },
          {
            property: "accentColor",
            title: "Accent color",
            description: "Select the accent color use",
            inputMethod: "colorpicker",
            icon: "editor:format-color-fill",
          },
          {
            property: "dark",
            title: "Dark",
            description: "Use dark theme",
            inputMethod: "boolean",
            icon: "invert-colors",
          },
        ],
        advanced: [],
      },
    };
  }
  /**
   * attached life cycle
   */
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot
      .querySelector("#audio")
      .addEventListener("loadedmetadata", this._onCanPlay.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .addEventListener("playing", this._onPlaying.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .addEventListener("pause", this._onPause.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .addEventListener("ended", this._onEnd.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .addEventListener("error", this._onError.bind(this));

    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "application");
    this.setAttribute("aria-label", "Audio Player");
    this.setAttribute("aria-describedby", "title");
  }
  /**
   * detached life cycle
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot
      .querySelector("#audio")
      .removeEventListener("loadedmetadata", this._onCanPlay.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .removeEventListener("playing", this._onPlaying.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .removeEventListener("pause", this._onPause.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .removeEventListener("ended", this._onEnd.bind(this));
    this.shadowRoot
      .querySelector("#audio")
      .removeEventListener("error", this._onError.bind(this));
  }
  /**
   * ready life cycle
   */
  ready() {
    super.ready();
    var player = this;
    // create Player defaults
    player.canBePlayed = false;
    player.isPlaying = false;
    player.ended = false;
    player.error = false;
    player.shadowRoot.querySelector("#audio").currentTime = player.timeOffset; // apply the audio start time property
  }
  // Play/Pause controls
  playPause(e) {
    if (!!e) e.preventDefault();
    var player = this;

    if (player.canBePlayed) {
      if (player.isPlaying) {
        player._pause();
      } else {
        player._play();
      }
    } else if (player.preload === "none") {
      // If player can't be played, because audio wasn't pre-loaded
      // due to the preload="none" property set,
      // load the audio file at this point and start playing it immediately
      player.shadowRoot.querySelector("#audio").load();
      player._play();
    }
  }
  _play() {
    var player = this;
    player.shadowRoot.querySelector("#audio").play();
  }
  _pause() {
    var player = this;
    player.shadowRoot.querySelector("#audio").pause();
  }
  //
  // Restart audio
  restart(e) {
    if (!!e) e.preventDefault();
    var player = this;
    player.shadowRoot.querySelector("#audio").currentTime = 0;
    if (!player.isPlaying) player._play();
  }
  // when audio file can be played in user's browser
  _onCanPlay() {
    var player = this;
    player.canBePlayed = true;
    player.timeLeft = player.shadowRoot.querySelector("#audio").duration;

    // If player has a Time Offset specified
    // style the progress bar and title accordingly
    if (player.timeOffset > 0) {
      var percentagePlayed =
        player.timeOffset / player.shadowRoot.querySelector("#audio").duration;
      player._updateVisualProgress(percentagePlayed);
    }

    // If player has auto-play attribute set,
    // it ignores preload="none" property and starts playing on load.
    // This behavior corresponds to the native audio element behavior.
    if (player.autoPlay) player._play();
  }

  // when Player starts playing

  _onPlaying() {
    var player = this;
    player.ended = false;
    player.isPlaying = true;
    player.shadowRoot.querySelector("#replay").style = ""; // remove Replay inline styling
    player._startProgressTimer();
  }
  // Skip or reverse by pre-defined intervals
  _skipReverseByInterval(e) {
    if (!!e) e.preventDefault();

    var player = this,
      newTime = 0;

    switch (e.detail.key) {
      case "up":
        if (player.largeSkip < player.timeLeft)
          newTime = player.currentTime + player.largeSkip;
        break;
      case "down":
        if (player.currentTime - player.largeSkip > 0)
          newTime = player.currentTime - player.largeSkip;
        break;
      case "right":
        if (player.smallSkip < player.timeLeft)
          newTime = player.currentTime + player.smallSkip;
        break;
      default:
        if (player.currentTime - player.smallSkip > 0)
          newTime = player.currentTime - player.smallSkip;
    }

    player._updatePlayPosition(newTime);
    if (!player.isPlaying) player._play();
  }

  // starts Timer

  _startProgressTimer() {
    var player = this;
    player.timer = {};

    if (player.timer.sliderUpdateInterval) {
      clearInterval(player.timer.sliderUpdateInterval);
    }

    player.timer.sliderUpdateInterval = setInterval(function () {
      if (player.isPlaying) {
        player.currentTime =
          player.shadowRoot.querySelector("#audio").currentTime;
        player.timeLeft =
          player.shadowRoot.querySelector("#audio").duration -
          player.currentTime;

        var percentagePlayed =
          player.currentTime /
          player.shadowRoot.querySelector("#audio").duration;
        player._updateVisualProgress(percentagePlayed);
      } else {
        clearInterval(player.timer.sliderUpdateInterval);
      }
    }, 60);
  }

  // when Player is paused

  _onPause() {
    var player = this;
    player.isPlaying = false;
  }

  // when Player ended playing an audio file

  _onEnd() {
    var player = this;
    player.ended = true;
    player.isPlaying = false;
    player.shadowRoot.querySelector("#replay").style.opacity = 1; // display Replay icon
  }

  // on file load error

  _onError() {
    var player = this;
    player.classList.add("cantplay");
    player.title = "Sorry, can't play track: " + player.title;
    player.error = true;
    player.setAttribute("aria-invalid", "true");
  }

  // to convert seconds to 'm:ss' format

  _convertSecToMin(seconds) {
    if (seconds === 0) return "";

    var minutes = Math.floor(seconds / 60);
    var secondsToCalc = Math.floor(seconds % 60) + "";
    return (
      minutes +
      ":" +
      (secondsToCalc.length < 2 ? "0" + secondsToCalc : secondsToCalc)
    );
  }

  //
  // When user clicks somewhere on the progress bar

  _onDown(e) {
    e.preventDefault();
    var player = this;

    if (player.canBePlayed) {
      player._updateProgressBar(e);
      if (!player.isPlaying) {
        player._play();
      }
      // When preload="none" is being used,
      // player should first try to load the audio,
      // and when it's successfully loaded, recalculate the progress bar
    } else if (player.preload === "none") {
      player.shadowRoot.querySelector("#audio").load();
      player.shadowRoot.querySelector("#audio").addEventListener(
        "loadedmetadata",
        function () {
          player._updateProgressBar(e);
          if (!player.isPlaying) {
            player._play();
          }
        },
        false
      );
    }
  }

  //
  // Helper function
  // that recalculates the progress bar position
  // based on the event.click position

  _updateProgressBar(e) {
    var player = this;

    var x =
      e.detail.x -
      player.shadowRoot.querySelector("#center").getBoundingClientRect().left;
    var r =
      (x /
        player.shadowRoot.querySelector("#center").getBoundingClientRect()
          .width) *
      player.shadowRoot.querySelector("#audio").duration;

    this._updatePlayPosition(r);
  }

  //
  // Helper function
  // updates the current time based on a time variable

  _updatePlayPosition(newTime) {
    var player = this;
    player.currentTime = player.shadowRoot.querySelector("#audio").currentTime =
      newTime;

    var percentagePlayed =
      player.currentTime / player.shadowRoot.querySelector("#audio").duration;
    player._updateVisualProgress(percentagePlayed);
  }

  //
  // Helper function
  // updates the progress bar based on a percentage played

  _updateVisualProgress(percentagePlayed) {
    var player = this;

    player.shadowRoot.querySelector("#progress").style.transform =
      "scaleX(" + percentagePlayed + ")";
    player.shadowRoot.querySelector("#progress2").style.width =
      percentagePlayed * 100 + "%";
    player.shadowRoot.querySelector("#title2").style.width =
      (1 / percentagePlayed) * 100 + "%";
  }

  //
  // If src is changed when track is playing,
  // pause the track and start playing a new src

  _srcChanged(newValue, oldValue) {
    var player = this;

    if (player.isPlaying) {
      player._pause();
      player._play();
    }
  }

  //
  // If color property is changed,
  // update all the nodes with the new accent color

  _changeColor(newValue) {
    var player = this;
    player.shadowRoot.querySelector("#left").style.backgroundColor = newValue;
    player.shadowRoot.querySelector("#title").style.color = newValue;
    player.shadowRoot.querySelector("#duration").style.color = newValue;
    player.shadowRoot.querySelector("#progress").style.backgroundColor =
      newValue;
    player.shadowRoot.querySelector("#replay").style.color = newValue;
  }

  _hidePlayIcon(isPlaying, canBePlayed) {
    return isPlaying ? true : !(canBePlayed || this.preload === "none");
  }

  _setPreload(autoplay, preload) {
    return autoplay ? "auto" : preload;
  }
}
window.customElements.define(PaperAudioPlayer.tag, PaperAudioPlayer);
export { PaperAudioPlayer };
