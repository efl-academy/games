Vue.component('fc-header', {
    data() {
      return {
        timer: new Timer(),
      };
    },
    mounted() {
      this.timer.addEventListener('secondsUpdated', () => {
        const timerElement = document.getElementById('timer');

        timerElement.innerText = this.timer.getTimeValues().toString(['minutes', 'seconds']);
      });

      this.$root.$on('timer-start', () => {
        this.timer.start();
      });

      this.$root.$on('timer-stop', () => {
        this.timer.stop();
      });

      this.$root.$on('timer-reset', () => {
        this.timer.stop();
        this.timer.start();
      });
    },
    template: `
      <div class="fc-header">
        <div id="timer">00:00</div>
        <p id="title">Find the synonyms</p>
      </div>
    `,
  });

  const fcCard = {
    name: 'fc-card',
    props: {
      id: Number,
      word: String,
      answered: Boolean,
      flipped: Boolean,
    },
    methods: {
      onCardClick() {
        const payload = {
          id: this.id,
          word: this.word,
        }

        if (!this.flipped && !this.answered) {
          this.$emit('flipped', payload);
        }
      }
    },
    template: `
      <div
        class="fc-card"
        :class="{answered}"
        @click="onCardClick"
      >
        <div
          class="card-flipper"
          ref="flipper"
          :class="{flipped}"
        >
          <div class="card-front"></div>
          <div class="card-back">
            <p class="verb">{{word}}</p>
          </div>
        </div>
      </div>
    `,
  };

  Vue.component('fc-board', {
    components: {
      'fc-card': fcCard,
    },
    mounted() {
      this.initBoard();
    },
    data() {
      return {
        fieldWidth: 4,
        selectedCards: [],
        cards: [],
        remainedCardsCount: null,
        isGameFinished: false,
        isGameStarted: false,
      }
    },
    methods: {
      initBoard() {
        const cardCover = new Image();
        cardCover.src = 'https://efl.academy/wp-content/uploads/2018/12/efl_academy_transparent-140x140.png';

        const randomVerbs = this.getRandomVerbsFromDataset(dataset);
        const verbPairs = this.createVerbPair(randomVerbs);
        let cards = this.createCards(verbPairs);
        this.cards = this.shuffle(cards);
        this.remainedCardsCount = this.cards.length;
      },

      startGame() {
        this.isGameStarted = true;
        this.$root.$emit('timer-start');
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

      onCardClick(e) {
        if (this.selectedCards.length > 1) {
          return;
        }

        const card = this.cards.find(c => c.word === e.word);

        card.flipped = true;
        this.selectedCards.push(card);

        if (this.selectedCards.length === 2) {
          setTimeout(() => this.checkMatch(), 1200);
          setTimeout(() => this.checkWin(), 1800);
        }
      },

      checkMatch() {
        const card1 = this.selectedCards[0];
        const card2 = this.selectedCards[1];

        if (card1.id === card2.id) {
          card1.answered = true;
          card2.answered = true;
          this.remainedCardsCount -= 2;
        } else {
          card1.flipped = false;
          card2.flipped = false;
        }

        this.selectedCards = [];
      },

      checkWin() {
        if (this.remainedCardsCount <= 0) {
          this.isGameFinished = true;
          this.$root.$emit('timer-stop');
        }
      },

      getRandomVerbsFromDataset(dataset) {
        const indices = [];
        const uniqueVerbsCount = this.fieldWidth * 2;

        while(indices.length < uniqueVerbsCount) {
          const randIdx = Math.floor(Math.random()*dataset.length);

          if (!indices.includes(randIdx)) {
            indices.push(randIdx);
          }
        }

        return indices.reduce((acc, cur) => {
          acc.push(dataset[cur]);
          return acc;
        }, []);
      },

      createVerbPair(dataset) {
        return dataset
          .map((verb, index) => {
            const pvCard = {
              word: verb.pv,
              id: index,
            }

            const synCard = {
              word: verb.syn,
              id: index,
            }

            return [pvCard, synCard];
          })
      },

      createCards(verbs) {
        return verbs
          .flat()
          .map((verb, idx) => ({
            ...verb,
            answered: false,
            flipped: false,
            key: idx,
          }));
      },

      resetGame() {
        this.selectedCards = [];
        this.isGameFinished = false;
        this.remainedCardsCount = null;
        this.$root.$emit('timer-reset');

        this.initBoard();
      },
    },
    template: `
      <div class="fc-board">
        <div
          class="cards-container"
          :class="{hidden: isGameFinished || !isGameStarted}"
        >
          <fc-card
            v-for="card in cards"
            :key="card.key"
            :id="card.id"
            :answered="card.answered"
            :flipped="card.flipped"
            :word="card.word"
            @flipped="onCardClick"
          />
        </div>

        <button
          class="centered new-game-btn"
          :class="{hidden: isGameStarted}"
          @click="startGame"
        >
          Start game
        </button>

        <div
          class="win-window centered"
          :class="{hidden: !isGameFinished}"
        >
          <h2 class="congrats">Congratulations!</h2>
          <button
            class="new-game-btn"
            @click="resetGame"
          >New Game</button>
        </div>
      </div>
    `,
  });

  new Vue({ el: '#root' });