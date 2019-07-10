<template>
  <div class="typerighter">
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

    <Progressbar
      :correct="progress.correct"
      :value="progress.value"
    />
  </div>
</template>

<script>
  import Progressbar from '@/components/typerighter/Progressbar';
  // import Timer from '@/components/Timer';
  import shuffle from '@/helpers/shuffle';

  export default {
    name: 'app',
    components: {
      Progressbar,
      // Timer,
    },
    data: () => ({
      dataset: typerighterData,
      timeLimit: typerighterTimeLimit,
      elapsedTime: null,
      avgTimePerWord: null,
      answeredWords: [],
      showWelcome: true,
      finishGame: false,
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
        this.dataset = shuffle(this.dataset).map((item) => ({
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
        if (isGuessed) {
          // this.answeredWords.push({...this.currentWord, correct: true});
          setTimeout(() => {
            this.goNextWord();
          }, 300);
        } else if (isGuessed) {
          // this.answeredWords.push({...this.currentWord, correct: true});
          this.$emit('answered');
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
  @import (css) 'https://fonts.googleapis.com/css?family=Cabin';

  .heading {
    font-size: 1.8rem !important;
  }

  .error {
    color: rgb(202, 203, 210);
  }

  .success {
    color: rgb(106, 173, 106);
  }

  p {
    margin: 1rem 0 !important;
    line-height: normal !important;
  }

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
    .typerighter {
      display: flex;
      flex-direction: column;
      align-items: center;

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
        display: flex;
        flex-direction: column;
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
          margin: 0 20px !important;
          line-height: 1.4rem !important;
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
          font-size: 2.5rem !important;
          font-weight: bold;
          padding: 0;
        }
      }
    }
    .game-window:last-child {
      margin-bottom: 20px;
    }
  }
</style>
