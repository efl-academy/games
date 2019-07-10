<template>
  <div id="app">
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    ></score>
    <welcome-page v-show="currentStateValue === 'welcome'" @start-game="startGame"></welcome-page>
    <div v-show="currentStateValue === 'question'">
      <typerighter
        v-show="questionType === 'typing'"
        @answered="onAnswered"
      />
      <options-question
        v-show="questionType === 'options'"
        :holder="currentHolder"
        @shot="onShot"
      />
    </div>
    <score-page v-show="currentStateValue === 'score'"></score-page>
    <results-page v-show="currentStateValue === 'results'" @new-game="resetGame"></results-page>
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
        on: { GETREADY: 'question'}
      },
      getready: {
        on: { QUESTION: 'question'}
      },
      question: {
        on: { SHOT: 'shot', RESULTS: 'results' }
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

      onAnswered() {

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
