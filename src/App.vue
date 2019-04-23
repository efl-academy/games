<template>
  <div id="app">
    <div class="welcome-window" v-if="showWelcome">
      <p class="heading">Guess a word</p>
      <p>You have to guess the word in a question by definition gived. Solve as many words as you can before time runs out!</p>
      <button
        class="button"
        @click="start"
      >
        Start Game
      </button>
    </div>

    <div class="game-window" v-if="!showWelcome && !showResults">
      <div class="header">
        <div class="header-container">
          <Timer
            :time="timeLimit"
            @get-session-time="handleSessionTime"
            @time-is-up="showResults = true"
          />
          <button class="button" @click="skipQuestion">Skip</button>
        </div>
      </div>
      <div class="card">
        <div class="card-word">
          <p class="word">{{input.toLowerCase()}}</p>
        </div>
        <p class="card-definition">{{currentWord.def}}</p>
      </div>

      <div class="word-input">
        <input
          v-model="input"
          type="text"
          ref="input"
          placeholder="..."
          @input="handleChange"
        >
      </div>

      <ProgressBar
        :correct="progress.correct"
        :value="progress.value"
      />
    </div>

    <div class="result-window" v-if="showResults">
      <p class="heading">Your results</p>
      <div class="results-container">
        <div class="stats">
          <div class="stats-item">
            <p>Words answered</p>
            <p>{{answeredWords.length}}</p>
          </div>
          <div class="stats-item">
            <p>Elapsed time</p>
            <p>{{elapsedTime | prettifyTime}}</p>
          </div>
          <div class="stats-item">
            <p>Avg. time per word</p>
            <p>{{avgTimePerWord | prettifyTime}}</p>
          </div>
        </div>
        <div class="result" v-for="answer in answeredWords" :key="answer.word">
          <i class="fas fa-check-circle fa-lg success" v-if="answer.correct"></i>
          <i class="fas fa-times-circle fa-lg error" v-else></i>
          <p>{{answer.word}}</p>
        </div>
      </div>
      <button class="button new-game" @click="start">New Game</button>
    </div>
  </div>
</template>

<script>
  import ProgressBar from '@/components/ProgressBar';
  import Timer from '@/components/Timer';
  import shuffle from '@/helpers/shuffle';

  export default {
    name: 'app',
    components: {
      ProgressBar,
      Timer,
    },
    data: () => ({
      dataset,
      timeLimit: time,
      elapsedTime: null,
      avgTimePerWord: null,
      answeredWords: [],
      showWelcome: true,
      showResults: false,
      currentIndex: 0,
      progress: {
        value: 0,
        correct: true,
      },
      input: '',
      lastCorrectInput: '',
    }),
    mounted() {
      this.init();
    },
    filters: {
      prettifyTime(value) {
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}s`;
      },
    },
    computed: {
      currentWord() {
        return this.dataset[this.currentIndex];
      }
    },
    methods: {
      init() {
        this.currentIndex = 0;
        this.dataset = shuffle(dataset).map((item) => ({
          ...item,
          answered: false,
        }));
        this.answeredWords = [];
      },

      handleChange(e) {
        const value = e.target.value;
        const regexp = new RegExp(`^${value}`, 'i');
        const result = this.currentWord.word.match(regexp);

        this.progress.value = this.calculateProgress(result, value);
        this.inputPrev = value;
        const isGuessed = this.checkResult();

        if (isGuessed && this.dataset.length - 1 !== this.currentIndex) {
          this.answeredWords.push({...this.currentWord, correct: true});
          setTimeout(() => {
            this.goNextWord();
          }, 300);
        } else if (isGuessed) {
          this.answeredWords.push({...this.currentWord, correct: true});
          this.$root.$emit('end-game');
          setTimeout(() => {
            this.showResults = true;
          }, 300);
        }
      },

      calculateProgress(result) {
        if (result) {
          this.lastCorrectInput = result[0];
          this.progress.correct = true;
          return +((result[0].length / this.currentWord.word.length) * 100).toFixed(0);
        } else {
          if (this.lastCorrectInput.length) {
            this.progress.correct = false;
            return +(((this.lastCorrectInput.length) / this.currentWord.word.length) * 100).toFixed(0);
          }
          return 0;
        }
      },

      handleSessionTime(sessionTime) {
        const diff = this.timeLimit - sessionTime;
        this.elapsedTime = diff;
        if (this.answeredWords.length) {
          this.avgTimePerWord = diff / this.answeredWords.length;
        } else {
          this.avgTimePerWord = diff;
        }
      },

      goNextWord() {
        this.resetQuestion();
        this.currentIndex++;
        this.$nextTick(() => {
          if (!this.showResults) {
            this.$refs.input.focus();
          }
        });
      },

      skipQuestion() {
        this.answeredWords.push({...this.currentWord, correct: false});
        this.goNextWord();
        if (this.dataset.length === this.currentIndex) {
          this.$root.$emit('end-game');
          this.showResults = true;
        }
      },

      resetQuestion() {
        this.progress.value = 0;
        this.progress.correct = true;
        this.input = '';
        this.lastCorrectInput = '';
      },

      checkResult() {
        if (this.currentWord.word === this.input.toLowerCase()) {
          return true;
        }

        return false;
      },

      start() {
        this.showWelcome = false;
        this.showResults = false;
        this.init();
        this.resetQuestion();
        this.$nextTick(() => {
          this.$refs.input.focus()
        });
      }
    },
  }
</script>

<style lang="less" scoped>
  @import 'styles/normalize.css';
  @import 'styles/index.css';

  .button {
    padding: 10px 30px;
    background-color: #56a1d6;
    border-radius: 4px;
    border-style: none;
    user-select: none;
    outline: none;
    font-size: 1.1rem;
    color: white;
    font-weight: bold;

    &:active {
      background-color: #3d7399;
    }
  }

  #app {
    font-family: 'Cabin', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f9f9f9;
    min-height: 420px;

    .welcome-window {
      transform: translateY(50%);
      max-width: 400px;
      width: 90vw;
      margin: 0 auto;
    }

    .game-window {
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        z-index: 300;
        height: 60px;
        width: 100%;
        padding: 0 20px;
        background-color: white;
        box-shadow: 0 2px 12px 5px #cfd2d6;

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          max-width: 460px;
          width: 95vw;
          margin: 0 auto;
        }
      }

      .card {
        max-width: 290px;
        min-height: 330px;
        width: 96vw;
        background-color: rgb(255, 255, 255);
        z-index: 100;
        box-shadow: 0 2px 12px 5px #cfd2d6;
        position: relative;
        margin-top: 30px;
        user-select: none;

        .card-word {
          height: 1.6rem;
          text-align: left;
          margin-left: 20px;
          margin-bottom: 1rem;

          .word {
            font-size: 1.3rem;
            font-weight: bold;
          }
        }

        .card-definition {
          margin: 0 20px;
          line-height: 1.4rem;
          text-align: justify;
        }
      }

      .word-input {
        transform: translateY(-25px);
        z-index: 200;

        input {
          max-width: 397px;
          width: 96vw;
          border-style: none;
          background: none;
          outline: none;
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
        }
      }
    }

    .game-window:last-child {
      margin-bottom: 20px;
    }

    .result-window {
      display: flex;
      flex-direction: column;
      align-items: center;

      .results-container {
        padding: 20px 0;
        box-sizing: content-box;
        width: 96vw;
        max-width: 280px;
        margin: 30px 10px;
        background-color: white;
        box-shadow: 0 2px 12px 5px #e8e8e8;

        .stats {
          font-size: 1.1rem;
          margin: 0 20px;
          margin-bottom: 30px;

          .stats-item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(196, 196, 196);

            p {
              margin-bottom: 0;
            }
          }
        }

        .result {
          margin: 10px 24px;
          text-align: left;

          p {
            display: inline-block;
            margin: 6px;
            margin-left: 10px;
            font-size: 1.1rem;
          }
        }
      }

      .new-game {
        margin-bottom: 80px;
      }
    }
  }
</style>
