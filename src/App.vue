<template>
  <div id="app">
    <score
      :player="playerScore"
      :bot="botScore"
    ></score>
    <welcome-page v-if="currentStateValue === 'welcome'" @start-game="startGame"></welcome-page>
    <div v-if="currentStateValue === 'question'">
      <type-question v-if="questionType === 'typing'"></type-question>
      <options-question v-if="questionType === 'options'"></options-question>
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
    wordIndex: 0,
    correctAnswerCount: 0,
    oWords,
    wordsSet: null,
    correctForm: null,
    answered: false,
    isNextQuestion: false,
    isGameFinished: false,
  });

  export default {
    name: 'app',
    data: () => ({
      playerScore: [null, null, null, null, null],
      botScore: [null, null, null, null, null],
      currentStateValue: fsm.initialStateValue,
      questionType: 'options',
      fsmService: interpret(fsm),
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
