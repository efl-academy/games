<template>
  <div id="app">
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    />
    <welcome-page v-if="currentStateValue === 'welcome'" @start-game="startGame" />
    <picture-page v-if="currentStateValue === 'getready'" state="getready" @next="onNextPage" />
    <picture-page v-if="currentStateValue === 'computershot'" state="computershot" @next="onNextPage" />
    <div v-if="currentStateValue === 'question'">
      <typerighter
        v-if="questionType === 'typing'"
        @answered="onTyperighterAnswer"
      />
      <options-question
        v-if="questionType === 'options'"
        :holder="currentHolder"
        @shot="onQuizAnswer"
      />
    </div>
    <picture-page v-if="currentStateValue === 'goal'" state="goal" @next="onNextPage" />
    <picture-page v-if="currentStateValue === 'miss'" state="miss" @next="onNextPage" />
    <score-page v-if="currentStateValue === 'score'" :score="score" @next="onNextPage" />
    <score-page v-if="currentStateValue === 'victory'" state="victory" @next="onNextPage" />
    <score-page v-if="currentStateValue === 'defeat'" state="defeat" @next="onNextPage" />
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

  const fsm = Machine({
    id: 'pages',
    initial: 'welcome',
    states: {
      welcome: {
        on: { GETREADY: 'getready' },
      },
      getready: {
        on: { QUESTION: 'question' },
      },
      question: {
        on: {
          SCORE: 'score',
          RESULTS: 'results',
          GETREADY: 'getready',
          GOAL: 'goal',
          MISS: 'miss',
        },
      },
      shot: {
        on: {
          SCORE: 'score',
          RESULTS: 'results',
        },
      },
      goal: {
        on: {
          SCORE: 'score',
        },
      },
      miss: {
        on: {
          SCORE: 'score',
        },
      },
      computershot: {
        on: {
          SCORE: 'score',
        },
      },
      score: {
        on: {
          VICTORY: 'victory',
          DEFEAT: 'defeat',
          RESULTS: 'results',
          GETREADY: 'getready',
          QUESTION: 'question',
          COMPUTERSHOT: 'computershot',
        },
      },
      victory: {
        on: {
          RESULTS: 'results',
        },
      },
      defeat: {
        on: {
          RESULTS: 'results',
        },
      },
      results: {
        on: { QUESTION: 'question'},
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
            this.switchHolder();
            if (this.isGameFinished) {
              const winner = this.calculateWinner();
              if (winner === 'PLAYER') {
                this.fsmService.send('VICTORY');
              } else {
                this.fsmService.send('DEFEAT');
              }
            } else if (this.currentHolder === 'BOT') {
              this.fsmService.send('COMPUTERSHOT');
            } else {
              this.fsmService.send('GETREADY');
            }
            break;
          case 'getready':
            this.fsmService.send('QUESTION');
            break;
          case 'goal':
            this.fsmService.send('SCORE');
            break;
          case 'miss':
            this.fsmService.send('SCORE');
            break;
          case 'computershot':
            const computerAnswer = Math.random() < 0.5;

            this.$set(this.score[this.currentHolder], this.scoreIndex, computerAnswer);
            this.onAnswer();

            this.fsmService.send('SCORE');
            break;
          case 'victory':
            this.fsmService.send('RESULTS');
            break;
          case 'defeat':
            this.fsmService.send('RESULTS');
            break;
          default:
            break;
        }
      },

      calculateWinner() {
        const playerScore = this.score['PLAYER'].reduce((score, value) => score += +value, 0);
        const botScore = this.score['BOT'].reduce((score, value) => score += +value, 0);

        return playerScore >= botScore ? "PLAYER" : 'BOT';
      },

      startGame() {
        this.fsmService.send('GETREADY');
      },

      resetGame() {
        Object.assign(this.$data, initialState());
        this.fsmService.send('WELCOME');
      },

      onAnswer() {
        this.shotsCount++;

        if (this.shotsCount % 2 === 0) {
          if (this.scoreIndex + 1 === 5) {
            this.isGameFinished = true;
          } else {
            this.scoreIndex++;
          }
        }
      },

      onQuizAnswer(data) {
        this.$set(this.score[this.currentHolder], this.scoreIndex, !!data.isCorrect);
        this.onAnswer();
      },

      onTyperighterAnswer(isCorrect) {
        this.$set(this.score[this.currentHolder], this.scoreIndex, isCorrect);
        this.onAnswer();

        if (this.currentHolder === 'PLAYER') {
          if (isCorrect) {
            this.fsmService.send('GOAL');
          } else {
            this.fsmService.send('MISS');
          }
        }
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
