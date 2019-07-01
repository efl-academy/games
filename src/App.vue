<template>
  <div id="app">
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    ></score>
    <welcome-page v-if="currentStateValue === 'welcome'" @start-game="startGame"></welcome-page>
    <div v-if="currentStateValue === 'question'">
      <type-question v-if="questionType === 'typing'"></type-question>
      <options-question
        v-if="questionType === 'options'"
        :holder="currentHolder"
        @shot="handleShot"
      />
    </div>
    <score-page v-if="currentStateValue === 'score'"></score-page>
    <results-page v-if="currentStateValue === 'results'"></results-page>
  </div>
</template>

<script>
  import { Machine, interpret } from 'xstate';
  import Score from './components/Score.vue';
  import WelcomePage from './components/WelcomePage.vue';
  import PicturePage from './components/PicturePage.vue';
  import ScorePage from './components/ScorePage.vue';
  import ResultsPage from './components/ResultsPage.vue';
  import TypeQuestion from './components/TypeQuestion.vue';
  import OptionsQuestion from './components/options-question/OptionsQuestion.vue';

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
        on: { SHOT: 'shot'}
      },
      shot: {
        on: { SCORE: 'score'}
      },
      score: {
        on: { START: 'question'}
      },
      results: {
        on: { START: 'question'}
      },
    },
  });

  const initialState = () => ({
    score: {
      PLAYER: [null, null, null, null, null],
      BOT: [null, null, null, null, null],
    },
    currentStateValue: fsm.initialStateValue,
    questionType: 'options',
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
      TypeQuestion,
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

      nextIteration() {
        this.scoreIndex++;

        if (this.scoreIndex === 5) {
          this.fsmService.send('GETREADY');
        }
      },

      handleShot(data) {
        this.shotsCount++;
        this.$set(this.score[this.currentHolder], this.scoreIndex, !!data.isCorrect);
        console.log(this.score[this.currentHolder]);

        if (this.shotsCount % 2 === 0) {
          console.log('next');
          this.nextIteration();
        }

        this.switchHolder();

        // this.nextIteration();
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
