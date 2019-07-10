<template>
  <div class="options-question">
    <div class="sentence-container">
      <div class="question">{{currentQuiz.question}}</div>
    </div>
    <div class="answers-container">
      <answer v-for="answer in answers"
        :key="answer"
        :answer="answer"
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
    quizData,
    timeLimit: quizTimeLimit,
    currentIndex: 0,
    answers: [],
  });

  export default {
    name: 'options-question',

    components: {
      Answer,
    },

    props: {
      holder: String,
    },

    data: () => ({
      ...initialState(),
    }),

    created() {
      this.setupDefaultState();
    },

    computed: {
      currentQuiz() {
        return this.quizData[this.currentIndex];
      },
    },

    methods: {
      setupDefaultState() {
        this.answers = this.generateAnswers();
      },

      generateAnswers() {
        const answers = this.quizData.map(q => q.answer);
        const shuffledAnswers = shuffle(answers);

        return shuffledAnswers.slice(0, 4);
      },

      nextQuestion() {
        this.answers = this.generateAnswers();
      },

      checkAnswer(data) {
        this.currentIndex++;
        const isNoQuiz = !this.currentQuiz;

        if (isNoQuiz) {
          this.quizData = shuffle(this.quizData);
          this.currentIndex = 0;
        }

        this.answers = this.generateAnswers();

        const isCorrect = this.currentQuiz.answer === data;
        const payload = {
          isCorrect,
        }
        this.$emit('shot', payload);
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
