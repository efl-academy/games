<template>
  <div id="app">
    <div class="welcome-window" v-if="showWelcome">
      <p class="heading">Guess a word</p>
      <p>guess a word by definition given. Time is limited!</p>
      <button
        @click="start"
      >
        Start game
      </button>
    </div>

    <div class="game-window" v-show="!showWelcome && !showResults">
      <div class="card">
        <p class="definition">{{currentWord.def}}</p>
      </div>
      
      <div class="word-input">
        <input
          v-model="input"
          type="text"
        >
        <ProgressBar/>
        {{input}}
      </div>
    </div>

    <div class="result-window" v-if="showResults">
      <p class="heading">Your results</p>
    </div>
  </div>
</template>

<script>
  import ProgressBar from '@/components/ProgressBar';
  import shuffle from '@/helpers/shuffle';

  export default {
    name: 'app',
    components: {
      ProgressBar,
    },
    data: () => ({
      dataset,
      showWelcome: true,
      showResults: false,
      currentIndex: 0,
      input: '',
    }),
    mounted() {
      this.init();
    },
    computed: {
      currentWord() {
        return this.dataset[this.currentIndex];
      }
    },
    methods: {
      init() {
        this.dataset = shuffle(dataset);
      },

      start() {
        this.showWelcome = false;
        this.showResults = false;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import 'styles/normalize.css';
  @import 'styles/index.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    .welcome-window {
      background-color: rgb(221, 238, 221);
    }

    .game-window {
      background-color: rgb(203, 207, 230);
      
      .word-input {

        .progress-container {

          .progress-bar {
            
          }
        }
      }
    }

    .result-window {
      background-color: rgb(204, 175, 190);
    }
  }
</style>