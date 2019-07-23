<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div v-if="currentStateValue === 'loading'" class="lds-dual-ring" key="loading"></div>

      <welcome-page v-if="currentStateValue === 'welcome'" @start-game="startGame" key="welcome"/>
      <picture-page v-if="currentStateValue === 'intro'" :visible="currentStateValue === 'intro'" :images="assets['intro']" state="intro" key="intro" @next="onNextPage" />
      <picture-page v-if="currentStateValue === 'getready'" :visible="currentStateValue === 'getready'" :images="assets['getready']" state="getready" key="getready" @next="onNextPage" />
      <picture-page v-if="currentStateValue === 'computershot'" :images="assets['computershot']" state="computershot" key="computershot" @next="onNextPage" />

      <div v-if="currentStateValue === 'question'" key="question">
        <timer
          :timeLimit="questionType === 'quiz' ? quizTimeLimit : typerTimeLimit"
          @time-is-up="onTimeIsUp"
        />

        <typerighter
          v-if="questionType === 'typing'"
          :data="typerData"
          :currentIndex="typerCurrentIndex"
          @answered="onTyperighterAnswer"
        />
        <options-question
          v-if="questionType === 'quiz'"
          :holder="currentHolder"
          :data="quizData"
          :currentIndex="quizCurrentIndex"
          @answered="onQuizAnswer"
        />
      </div>

      <picture-page v-if="currentStateValue === 'goal'" :images="assets['goal']" state="goal" key="goal" @next="onNextPage" />
      <picture-page v-if="currentStateValue === 'miss'" :images="assets['miss']" state="miss" key="miss" @next="onNextPage" />
      <picture-page v-if="currentStateValue === 'victory'" :images="assets['victory']" state="victory" key="victory" @next="onNextPage" />
      <picture-page v-if="currentStateValue === 'defeat'" :images="assets['defeat']" state="defeat" key="defeat" @next="onNextPage" />
      <score-page
        v-if="currentStateValue === 'score'"
        key="score"
        :score="scoreRender"
        :renderPending="scoreRenderPending"
        @next="onNextPage"
        @score-action-rendered="onScoreActionRendered"
      />
      <div v-if="currentStateValue === 'results'" key="results" class="results-page-container">
        <results-page
          :score="scoreRender"
          :resultsHeading="resultsHeading"
          @new-game="resetGame"
        />
      </div>

    </transition>
  </div>
</template>

<script>
  import { Machine, interpret } from 'xstate';
  import shuffle from '@/helpers/shuffle';
  import Score from './components/Score.vue';
  import Timer from './components/Timer.vue';
  import WelcomePage from './components/WelcomePage.vue';
  import PicturePage from './components/PicturePage.vue';
  import ScorePage from './components/ScorePage.vue';
  import ResultsPage from './components/ResultsPage.vue';
  import Typerighter from './components/typerighter/Typerighter.vue';
  import OptionsQuestion from './components/options-question/OptionsQuestion.vue';

  const fsm = Machine({
    id: 'pages',
    initial: 'loading',
    states: {
      loading: {
        on: { ASSETS_LOADED: 'welcome' },
      },
      welcome: {
        on: { INTRO: 'intro' },
      },
      intro: {
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
        on: { INTRO: 'intro'},
      },
    },
  });

  const ASSETS_COUNT = 19;
  const ASSETS_LOCATION_FOLDER = 'https://cdn.jsdelivr.net/gh/efl-academy/games@soccer-v8/dist/assets/';

  const initialState = () => ({
    score: {
      PLAYER: [null, null, null, null, null],
      BOT: [null, null, null, null, null],
    },
    scoreRender: {
      PLAYER: [null, null, null, null, null],
      BOT: [null, null, null, null, null],
    },
    scoreRenderPending: null,
    currentStateValue: fsm.initialStateValue,
    questionType: 'typing',
    currentHolder: 'PLAYER',
    isNextQuestion: false,
    isGameFinished: false,
    scoreIndex: 0,
    shotsCount: 0,
    typerData: typerighterData,
    quizData: quizData,
    quizTimeLimit: settings.quizTimeLimit,
    typerTimeLimit: settings.typerTimeLimit,
    typerCurrentIndex: 0,
    quizCurrentIndex: 0,
    states: {},
    assetsLoaded: false,
    assets: {},
    resultsHeading: '',
    assetsLoadedCount: 0,
  });

  export default {
    name: 'app',

    data: () => ({
      fsmService: interpret(fsm),
      ...initialState(),
    }),

    components: {
      Score,
      Timer,
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

      this.resetData();
    },

    mounted() {
      const assetsBaseLocation = process.env.NODE_ENV === 'development' ? './assets/' : ASSETS_LOCATION_FOLDER;

      Object.keys(fsm.states).map((state) => {
        this.assets[state] = [];

        // load up to 4 images for 1 state
        for (let i = 1; i < 5; i++) {
          const img = new Image();
          const assetsLocation = `${assetsBaseLocation}${state}/${state}${i}.jpg`;
          img.src = assetsLocation;
          img.onload = () => {
            this.assetsLoadedCount++
            this.assets[state].push(img);

            if (this.assetsLoadedCount >= ASSETS_COUNT) {
              this.fsmService.send('ASSETS_LOADED');
            }
          }
        }

        // this.switchQuestionType();
      });
    },

    methods: {
      onNextPage(currentPage) {
        switch(currentPage) {
          case 'score':
            this.switchHolder();
            this.switchQuestionType();

            if (this.isGameFinished) {
              const winner = this.calculateWinner();
              if (winner === 'PLAYER') {
                this.resultsHeading = 'Victory!'
                this.fsmService.send('VICTORY');
              }

              if (winner === 'BOT') {
                this.resultsHeading = 'Defeat'
                this.fsmService.send('DEFEAT');
              }

              if (!winner) {
                this.resultsHeading = 'Draw'
                this.fsmService.send('RESULTS');
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
          case 'intro':
            this.fsmService.send('GETREADY');
            break;
          case 'goal':
            this.fsmService.send('SCORE');
            break;
          case 'miss':
            this.fsmService.send('SCORE');
            break;
          case 'computershot':
            this.onAnswer(this.calculateComputerAnswerResult());
            this.fsmService.send('SCORE');
            break;
          case 'victory':
            this.fsmService.send('RESULTS');
            break;
          case 'defeat':
            this.fsmService.send('RESULTS');
            break;
          case 'resul':
            this.fsmService.send('RESULTS');
            break;
          default:
            break;
        }
      },

      onScoreActionRendered() {
        this.$set(
          this.scoreRender[this.scoreRenderPending.holder],
          this.scoreRenderPending.scoreIndex,
          this.scoreRenderPending.isCorrect,
        );

        this.scoreRenderPending = null;
      },

      onTimeIsUp() {
        if (this.questionType === 'quiz') {
          this.onQuizAnswer(false);
        } else {
          this.onTyperighterAnswer(false);
        }
      },

      calculateWinner() {
        const playerScore = this.score['PLAYER'].reduce((score, value) => score += +value, 0);
        const botScore = this.score['BOT'].reduce((score, value) => score += +value, 0);

        if (playerScore === botScore) {
          return null;
        }

        return playerScore > botScore ? 'PLAYER' : 'BOT';
      },

      startGame() {
        this.fsmService.send('INTRO');
      },

      resetData() {
        const assets = this.assets;
        Object.assign(this.$data, initialState());
        this.assets = assets;

        this.typerData = [...shuffle(this.typerData).map((item) => ({
          ...item,
          answered: false,
        }))];
        this.quizData = [...shuffle(this.quizData)];
      },

      resetGame() {
        this.resetData();
        this.fsmService.send('INTRO');
      },

      onAnswer(isCorrect) {
        const scoreAction = {
          holder: this.currentHolder,
          scoreIndex: this.scoreIndex,
          isCorrect,
        };

        this.scoreRenderPending = scoreAction;

        this.$set(this.score[this.currentHolder], this.scoreIndex, isCorrect);

        this.shotsCount++;

        if (this.shotsCount % 2 === 0) {
          if (this.scoreIndex + 1 === 5) {
            this.isGameFinished = true;
          } else {
            this.scoreIndex++;
          }
        }

        if (this.currentHolder === 'PLAYER') {
          if (isCorrect) {
            this.fsmService.send('GOAL');
          } else {
            this.fsmService.send('MISS');
          }
        }
      },

      onQuizAnswer(correct) {
        this.quizCurrentIndex++;
        if (!this.quizData[this.quizCurrentIndex]) {
          this.quizCurrentIndex = 0;
        }

        this.onAnswer(!!correct);
      },

      onTyperighterAnswer(correct) {
        this.typerCurrentIndex++;
        if (!this.typerData[this.typerCurrentIndex]) {
          this.typerCurrentIndex = 0;
        }

        this.onAnswer(correct);
      },

      switchHolder() {
        this.currentHolder = this.currentHolder === 'PLAYER' ? 'BOT' : 'PLAYER';
      },

      switchQuestionType() {
        this.questionType = Math.random() < 0.5 ? 'quiz' : 'typing';
      },

      calculateComputerAnswerResult() {
        return Math.random() <= settings.botDifficulty;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import 'styles/normalize.css';
  @import 'styles/global.css';

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    min-height: 900px;
    box-sizing: content-box;

    @media screen and(max-width: 2000px) {
      min-height: 600px;
    }

    @media screen and(max-width: 1200px) {
      min-height: 420px;
    }

    .results-page-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .lds-dual-ring {
      display: inline-block;
      width: 64px;
      height: 64px;
      margin-top: 100px;

      &::after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #fff;
        border-color: #257bb4 transparent #257bb4 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

  }
</style>
