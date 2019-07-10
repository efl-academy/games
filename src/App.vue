<template>
  <div id="app">
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    />
    <welcome-page v-if="currentStateValue === 'welcome'" @start-game="startGame" />
    <picture-page v-if="currentStateValue === 'getready'" state="getready" @next="onNextPage" />
    <div v-if="currentStateValue === 'question'">
      <typerighter
        v-if="questionType === 'typing'"
        @answered="onTyperighterAnswer"
      />
      <options-question
        v-if="questionType === 'options'"
        :holder="currentHolder"
        @shot="onShot"
      />
    </div>
    <score-page v-if="currentStateValue === 'score'" :score="score" @next="onNextPage" />
    <results-page v-show="currentStateValue === 'results'" @new-game="resetGame" />
  </div>
</template>

<script>
  import { Machine, interpret } from 'xstate';
  import Score from './components/Score.vue';
  import WelcomePage from './components/WelcomePage.vue';
  import PicturePage from './components/PicturePage.vue';
  import ScorePage from './components/ScorePage.vue';
  import ResultsPage from './components/ResultsPage.vue';
  import Typerighter from './components/typerighter/Typerighter.vue';
  import OptionsQuestion from './components/options-question/OptionsQuestion.vue';

  /**
   * pictures:
   * - int
   * - opponent takes a shot
   * - goal!
   * - shot
   * - saved/miss
   * - victory/defeat
   */

  const fsm = Machine({
    id: 'pages',
    initial: 'welcome',
    states: {
      welcome: {
        on: { GETREADY: 'getready' }
      },
      getready: {
        on: { QUESTION: 'question' }
      },
      question: {
        on: { SCORE: 'score', RESULTS: 'results', GETREADY: 'getready' }
      },
      shot: {
        on: {
          SCORE: 'score',
          RESULTS: 'results',
        }
      },
      score: {
        on: { RESULTS: 'results' },
      },
      results: {
        on: { QUESTION: 'question'}
      },
    },
  });

  const initialState = () => ({
    score: {
      PLAYER: [null, null, null, null, null],
      BOT: [null, null, null, null, null],
    },
    currentStateValue: fsm.initialStateValue,
    questionType: 'typing',
    currentHolder: 'PLAYER',
    isNextQuestion: false,
    isGameFinished: false,
    scoreIndex: 0,
    shotsCount: 0,
  });

  export default {
    name: 'app',

    data: () => ({
      fsmService: interpret(fsm),
      ...initialState(),
    }),

    components: {
      Score,
      WelcomePage,
      PicturePage,
      ScorePage,
      ResultsPage,
      Typerighter,
      OptionsQuestion,
    },

    created() {
      this.fsmService
        .onTransition(state => {
          this.currentStateValue = state.value;
        })
        .start();
    },

    mounted() {
    },

    methods: {
      onNextPage(currentPage) {
        switch(currentPage) {
          case 'score':
            console.log(this.currentHolder);
            // this.fsmService.send('QUESTION');
            break;
          case 'getready':
            this.fsmService.send('QUESTION');
            break;
          default:
            break;
        }
      },

      changePicture(pictureState) {
        switch(pictureState) {
          case 'getready':
            this.fsmService.send('QUESTION');
            break;
          default:
            break;
        }
      },

      startGame() {
        this.fsmService.send('GETREADY');
      },

      resetGame() {
        Object.assign(this.$data, initialState());
        this.fsmService.send('QUESTION');
      },

      nextIteration() {
        this.scoreIndex++;

        if (this.scoreIndex === 5) {
          this.fsmService.send('RESULTS');
        }
      },

      onShot(data) {
        this.shotsCount++;
        this.$set(this.score[this.currentHolder], this.scoreIndex, !!data.isCorrect);

        if (this.shotsCount % 2 === 0) {
          this.nextIteration();
        }

        this.switchHolder();
      },

      onTyperighterAnswer(isCorrect) {
        this.shotsCount++;
        this.$set(this.score[this.currentHolder], this.scoreIndex, isCorrect);
        
        if (this.shotsCount % 2 === 0) {
          this.nextIteration();
        }

        this.switchHolder();

        this.fsmService.send('SCORE');
      },

      switchHolder() {
        this.currentHolder = this.currentHolder === 'PLAYER' ? 'BOT' : 'PLAYER';
      }
    },
  }
</script>

<style lang="less" scoped>
  @import 'styles/normalize.css';
  @import 'styles/global.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
