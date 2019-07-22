<template>
  <div class="options-question">
    <div class="sentence-container">
      <div class="sentence">{{currentQuiz.question}}</div>
    </div>
    <div class="answers-container">
      <answer v-for="answer in answers"
        :key="answer"
        :answer="answer"
        :disabled="answered"
        @check-answer="checkAnswer"
      />
    </div>
  </div>
</template>

<script>
  import Answer from './Answer.vue';
  import Timer from '@/components/Timer.vue';
  import shuffle from '@/helpers/shuffle';

  const initialState = () => ({
    answered: false,
    answers: [],
  });

  export default {
    name: 'options-question',

    components: {
      Answer,
    },

    props: {
      holder: String,
      data: Array,
      currentIndex: Number,
    },

    data: () => ({
      ...initialState(),
    }),

    created() {
      this.setupDefaultState();
    },

    computed: {
      currentQuiz() {
        return this.data[this.currentIndex];
      },
    },

    methods: {
      setupDefaultState() {
        this.answers = this.generateAnswers();
      },

      generateAnswers() {
        const answers = this.data.map(q => q.answer);
        const shuffledAnswers = shuffle(answers);

        return shuffledAnswers.slice(0, 4);
      },

      nextQuestion() {
        this.answers = this.generateAnswers();
      },

      checkAnswer(answer) {
        this.answered = true;
        const correct = this.currentQuiz.answer === answer;

        setTimeout(() => {
          this.$emit('answered', correct);
        }, 500);
      },
    },
  }
</script>

<style lang="less" scoped>
  .options-question {
    .sentence-container {
      margin: 60px 0 120px;
      .sentence {
        font-size: 1.3em;
      }
    }
  }
</style>
