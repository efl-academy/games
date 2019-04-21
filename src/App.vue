<template>
  <div id="app">
    <transition-group>
      <Notification v-for="(message, index) in notifications"
        :key="index + 1"
        :message="message"
      />
    </transition-group>
    <div id="top"></div>
    <div class="game-container" v-show="!showWelcome && !showResults">
      <div class="cards" ref="cards">
        <Card v-for="(card, index) in cards"
          :key="index"
          :sentence="card.sentence"
        />
      </div>
      <div class="controls" v-if="isDesktop">
        <button class="no-button" @click="onButtonClick" ref="invalidButton">
          <font-awesome-icon icon="times" size="2x" class="icon"/>
        </button>
        <button class="yes-button" @click="onButtonClick" ref="validButton">
          <font-awesome-icon icon="check" size="2x" class="icon"/>
        </button>
      </div>
    </div>

    <div class="welcome-container" v-if="showWelcome">
      <p class="instructions">Swipe a card to the right if a sentence is correct, and to the left if it is not.</p>
      <p>You win if get {{cardsToWin}} correct answers in a row.</p>
      <button class="new-game-button" @click="startGame">New Game</button>
    </div>

    <div class="results-container" v-if="showResults">
      <div class="results-header">
        <p class="heading">Your results</p>
        <p class="win-message" v-if="combo >= cardsToWin">Win! {{cardsToWin}} in a row!</p>
      </div>
      <Result v-for="(card, index) in cards.slice(0, cardIndex)"
        :key="index"
        :card="card"
      />
      <button class="new-game-button" @click="startGame">New Game</button>
    </div>
  </div>
</template>

<script>
import CARD_COLORS from '@/const/card-colors';
import Card from './components/Card.vue';
import Notification from './components/Notification.vue';
import Result from './components/Result.vue';
import Hummer from 'hammerjs';

export default {
  name: 'app',
  components: {
    Card,
    Notification,
    Result
  },

  data() {
    return {
      isDesktop: !(typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1),
      cards: [],
      cardIndex: 0,
      combo: 0,
      notifications: [],
      cardsToWin: cardsToWin || dataset.correct.length + dataset.incorrect.length,
      isDragging: false,
      startDragPositionX: null,
      frontCardEl: null,
      showWelcome: true,
      showResults: false,
    }
  },

  beforeMount() {
    this.formCards();
  },

  mounted() {
    this.initCards();
    this.setCardsSwipeHandlers();
    this.setCardsAppearance();
  },

  computed: {
    currentCard() {
      return this.cards[this.cardIndex];
    },
    notificationsMessage() {
      return (this.currentCard && this.currentCard.valid) == this.currentCard.userAnswer
        ? 'Correct!'
        : 'Incorrect.';
    },
  },

  methods: {
    initCards() {
      const isGameInProgress = !this.showWelcome && !this.showResults;

      if (!isGameInProgress) {
        document.querySelectorAll('.card').forEach((card) => {
          card.classList.remove('removed');
        });
      }

      const cardsContainer = document.querySelectorAll('.card:not(.removed)');
      const length = cardsContainer.length;
      this.frontCardEl = cardsContainer[0];

      if (cardsContainer.length <= 0) {
        this.showResults = true;
        return;
      }

      cardsContainer.forEach((card, index) => {
        card.classList.add('static');
        card.style.zIndex = length - index;
        card.style.opacity = index === 1 || index === 0 ? 1 : (10 - index) / 40;
        card.style.display = index > 3 ? 'none' : 'flex';
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      });

      this.frontCardEl.classList.remove('static');
    },

    setCardsSwipeHandlers() {
      document.querySelectorAll('.card').forEach((cardElement) => {
        const hammer = new Hammer(cardElement);

        hammer.on('pan', (e) => {
          if (e.center.x === 0 && e.center.y === 0) return;
          if (e.deltaX === 0) return;

          e.target.classList.add('moving');

          e.target.style.transform = 'translate(' + e.deltaX + 'px) rotate(' + e.deltaX / 20 + 'deg)';
        });

        hammer.on('panend', (e) => {
          let keep = true;
          const deltaX = Math.abs(e.deltaX);
          const velocityX = Math.abs(e.velocityX);

          if (velocityX < 0.5) {
            keep = true;
            if (deltaX > 150) {
              keep = false;
            }
          } else {
            keep = false;
          }

          e.target.classList.remove('moving');
          e.target.classList.toggle('removed', !keep);

          if (keep) {
            e.target.style.transform = '';
          } else {
            const moveOutWidth = document.body.clientWidth;
            const endX = Math.max(Math.abs(e.velocityX) * moveOutWidth, moveOutWidth);
            const toX = e.deltaX > 0 ? endX : -endX;
            const endY = Math.abs(e.velocityY) * moveOutWidth;
            const toY = e.deltaY > 0 ? endY : -endY;
            const xMulti = e.deltaX * 0.03;
            const yMulti = e.deltaY / 80;
            const rotate = xMulti * yMulti;

            e.target.style.transform = 'translate(' + toX + 'px, ' + (toY + e.deltaY) + 'px) rotate(' + rotate + 'deg)';
            e.target.style.opacity = 0;

            if (toX >= 0) {
              this.currentCard.userAnswer = true;
            } else {
              this.currentCard.userAnswer = false;
            }

            this.combo = this.currentCard.valid === this.currentCard.userAnswer? this.combo + 1 : 0;

            this.onCardSwiped();
          }
        });
      })
    },

    startGame() {
      this.cards = this.shuffle(this.cards);
      this.initCards();

      // document.getElementById('top').scrollIntoView(true);

      this.cardIndex = 0;
      this.combo = 0;
      this.showResults = false;
      this.showWelcome = false;
    },

    setCardsAppearance() {
      const cardsContainer = document.querySelectorAll('.card:not(.removed)');
      cardsContainer.forEach((card) => {
        card.style.backgroundColor = `${CARD_COLORS[this.getRandomInt(0, CARD_COLORS.length)]}`;
      });
    },

    onButtonClick(e) {
      const frontCardEl = document.querySelectorAll('.card:not(.removed)')[0];

      frontCardEl.style.opacity = '0';
      frontCardEl.classList.add('removed');

      if (e.target === this.$refs.validButton) {
        this.currentCard.userAnswer = true;
        frontCardEl.style.transform = 'translate(' + 600 + 'px) rotate(30deg)';
      } else {
        this.currentCard.userAnswer = false;
        frontCardEl.style.transform = 'translate(-' + 600 + 'px) rotate(-30deg)';
      }

      this.combo = this.currentCard.valid === this.currentCard.userAnswer ? this.combo + 1 : 0;

      this.onCardSwiped();
    },

    onCardSwiped() {
      const message = this.currentCard.userAnswer == this.currentCard.valid ? 'Correct' : 'Incorrect';
      this.showNotification(message);
      this.removeFrontCard();

      if (this.cards.length === this.cardIndex || this.combo === this.cardsToWin) {
        this.showResults = true;
        // document.getElementById('top').scrollIntoView(true);
      } else {
        this.initCards();
      }
    },

    showNotification(message) {
      this.notifications.push(message);
      this.$nextTick(() => {
        const notElements = document.querySelectorAll('.notification');
        const newNotElement = notElements[notElements.length - 1];

        newNotElement.style.zIndex = 1000 + this.notifications.length;
        newNotElement.classList.add('show');
        setTimeout(() => {
          newNotElement.classList.remove('show');
        }, 1400);
      });
    },

    formCards() {
      const correct = dataset.correct.map(sentence => ({
        sentence,
        valid: true,
      }));
      const incorrect = dataset.incorrect.map(item => ({
        sentence: item.sentence,
        answer: item.answer,
        correction: item.correction,
        valid: false,
      }));

      this.cards = this.shuffle([...correct, ...incorrect]);
    },

    removeFrontCard() {
      if (this.frontCardEl) {
        this.frontCardEl.classList.remove('front');
        this.frontCardEl = null;
        this.cardIndex++;
      }
    },

    shuffle(array) {
      const arrayCopy = array.slice();
      let counter = arrayCopy.length;

      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arrayCopy[counter];
        arrayCopy[counter] = arrayCopy[index];
        arrayCopy[index] = temp;
      }

      return arrayCopy;
    },

    getRandomRGBforCSS() {
      const red = this.getRandomInt(20, 230);
      const green = this.getRandomInt(20, 230);
      const blue = this.getRandomInt(20, 230);

      return `rgb(${red}, ${green}, ${blue})`;
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
}
</script>

<style lang="less">
@import 'styles/normalize.css';
@import 'styles/index.css';

@font-size: 1.5em;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2em;
  background-color: #f9f9f9;
  position: relative;

  .new-game-button {
    background-color: #39a2fd;
    color: white;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 1.2em;
    border-radius: 5px;
    outline: none;
    border-style: none;
    margin: 30px 0 60px;
    transition: 0.2s;
    box-shadow: 0 1px 8px 0 #9a9a9a;
    user-select: none;

    &:active {
      background-color: #1379d3;
      box-shadow: 0 1px 8px 0 #dddddd;
    }
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .cards {
      color: white;
      font-size: @font-size;
      flex-basis: 80%;
      height: 410px;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
    }

    .controls {
      margin-top: 20px;

      .yes-button, .no-button {
        background-color: #fafafa;
        border-style: none;
        outline: none;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        padding: 0;
        margin: 0 12px;
        box-shadow: 0 0 5px 4px #e4e4e4;
        transition: all 0.5s;

        &:active {
          box-shadow: 0 1px 5px 4px #d8d8d8;
          transform: translateY(2px);
        }

        .icon {
          pointer-events: none;
        }
      }

      .yes-button {
        color: rgb(143, 201, 141);
      }

      .no-button {
        color: rgb(255, 137, 137)
      }
    }
  }

  .welcome-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 10px;
    user-select: none;
    line-height: normal;

    & > p {
      margin-bottom: 10px;
    }
  }

  .results-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .results-header {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 1.4em;

      .win-message {
        background-color: rgb(237, 255, 234);
        padding: 10px 20px;
        border-radius: 10px;
        margin-bottom: 0.7em;
      }

      .heading {
        font-size: 1.5em;
        margin: 16px 0;
      }
    }
  }
}
</style>
