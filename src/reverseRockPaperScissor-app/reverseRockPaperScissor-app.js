import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-image/iron-image.js';

/**
 * @customElement
 * @polymer
 */
class ReverseRockPaperScissorApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .start-button {
          margin-left: 250px;
          margin-bottom: 50px;
        }
        .choice {
          height: 100px;
          width: 100px;
        }
        .pc-generate-container {
          margin-bottom: 100px;
          margin-left: 250px;
        }
        .count-down {
          margin: 20px;
          margin-left: 270px;
        }
      </style>
      <h2 hidden$="[[isStarted]]">Press "Start" button to start the game!</h2>
      <h2 hidden$="[[!isStarted]]">Press "Stop" button to stop the game!</h2>
      <paper-button class="start-button" hidden$="[[isStarted]]" raised on-tap="start">Start!</paper-button>
      <paper-button class="start-button" hidden$="[[!isStarted]]" raised on-tap="stop">Stop!</paper-button>

      <div class="pc-generate-container" hidden$="[[!isStarted]]">
        <iron-image class="choice" src="[[generatedChoice.src]]" data-index="[[generatedChoice.index]]" preload sizing="cover"></iron-image>
      </div>
      <div class="count-down">[[displayCountDown]]</div>
      <div class="choice-container" hidden$="[[!isStarted]]">
        <paper-button raised disabled="[[timeout]]" on-tap="rock"><iron-image class="choice" src="../../resource/rock.png" preload sizing="cover"></iron-image></paper-button>
        <paper-button raised disabled="[[timeout]]" on-tap="paper"><iron-image class="choice" src="../../resource/paper.png" preload sizing="cover"></iron-image></paper-button>
        <paper-button raised disabled="[[timeout]]" on-tap="scissor"><iron-image class="choice" src="../../resource/scissor.png" preload sizing="cover"></iron-image></paper-button>
      </div>
      <div>[[message]]</div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'reverseRockPaperScissor-app'
      },
      turnDuration: {
        type: Number,
        value: 5000
      },
      isStarted: {
        type: Boolean,
        value: false
      },
      win: {
        type: Boolean,
        value: false
      },
      message: {
        type: String,
        value: ''
      },
      timeout: {
        type: Boolean,
        value: false
      },
      generatedChoice: Object,
      __displayCountDown: {
        type: Number,
        observer: 'displayCountDownChanged'
      },
      displayCountDown: String,
      choices: {
        type: Array,
        value: () => {
          return [
            {
              src: '../../resource/rock.png',
              index: 0
            }, 
            {
              src: '../../resource/paper.png',
              index: 1
            }, 
            {
              src: '../../resource/scissor.png',
              index: 2
            }];
        }
      }

    };
  }

  start() {
    // timer start to countdown so the logic can valid
    // whether PC win or you win?
    if (this.countDownInterval) {
      window.clearInterval(this.countDownInterval);
    }
    this.displayCountDown = this.turnDuration;
    this.isStarted = true;
    this.timeout = false;
    this.message = '';
    this.countdown();
    this.generatedChoice = this.generateChoice();
    this.interval = window.setTimeout(() => {
      this.lost();
    }, this.turnDuration);
  }

  stop() {
    this.displayCountDown = null;
    this.isStarted = false;
    window.clearTimeout(this.interval);
    this.message = '';
    if (this.countDownInterval) {
      window.clearInterval(this.countDownInterval);
    }
  }

  lost() {
    this.timeout = true;
    this.win = false;
    this.message = `You Lost!`;
    if (this.countDownInterval) {
      window.clearInterval(this.countDownInterval);
    }
    this.displayCountDown = null;
  }
  won() {
    this.timeout = false;
    this.win = true;
    this.message = `You Won!`;
    if (this.countDownInterval) {
      window.clearInterval(this.countDownInterval);
    }
  }

  generateChoice() {
    let index = Math.floor(Math.random() * 3);
    return this.choices[index];
  }

  displayCountDownChanged(countdown) {
    if (countdown) {
      this.displayCountDown = (this.__displayCountDown/1000) + 's';
    }
  }

  rock() {
    // rock should win again scissor (reverse)
    // paper should win again rock (reverse)
    if (this.generatedChoice.index === 1) {
      this.win = true;
      this.message = `You Won!`;
    } else {
      this.win = false;
      this.message = `You Lost!`;
    }
    window.clearTimeout(this.interval);
    this.timeout = true;
    // if (this.countDownInterval) {
    //   window.clearInterval(this.countDownInterval);
    // }
    window.clearInterval(this.countDownInterval);
    this.displayCountDown = null;
  }
  paper() {
    // scissor should win again paper (reverse)
    // paper should win again rock (reverse)
    if (this.generatedChoice.index === 2) {
      this.win = true;
      this.message = `You Won!`;
    } else {
      this.win = false;
      this.message = `You Lost!`;
    }
    window.clearTimeout(this.interval);
    this.timeout = true;
    // if (this.countDownInterval) {
    //   window.clearInterval(this.countDownInterval);
    // }
    window.clearInterval(this.countDownInterval);
    this.displayCountDown = null;
  }
  scissor() {
    // scissor should win again paper (reverse)
    // rock should win again scissor (reverse)
    if (this.generatedChoice.index === 0) {
      this.win = true;
      this.message = `You Won!`;
    } else {
      this.win = false;
      this.message = `You Lost!`;
    }
    window.clearTimeout(this.interval);
    this.timeout = true;
    window.clearInterval(this.countDownInterval);
    this.displayCountDown = null;
  }
  countdown() {
    if (this.countDownInterval) {
      window.clearInterval(this.countDownInterval);
    }
    this.__displayCountDown = this.turnDuration;
    this.countDownInterval = window.setInterval( ()=> {
      this.__displayCountDown -= 1000;
    }, 1000);
  }
}

window.customElements.define('reverse-rock-paper-scissor-app', ReverseRockPaperScissorApp);
