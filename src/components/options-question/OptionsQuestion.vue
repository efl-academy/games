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

  function shuffle(array) {
    const arrayCopy = array.slice();
    let counter = arrayCopy.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);

      counter--;

      const temp = arrayCopy[counter];
      arrayCopy[counter] = arrayCopy[index];
      arrayCopy[index] = temp;
    }

    return arrayCopy;
  };

  const initialState = () => ({
    quizData,
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
        const shuffledAnswers = this.shuffle(answers);

        return shuffledAnswers.slice(0, 4);
      },

      nextQuestion() {
        this.answers = this.generateAnswers();
      },

      checkAnswer(data) {
        const isCorrect = this.currentQuiz.answer === data;

        const payload = {
          isCorrect,
        }
        
        this.$emit('shot', payload);
      },

      shuffle(array) {
        const arrayCopy = array.slice();
        let counter = arrayCopy.length;

        while (counter > 0) {
          const index = Math.floor(Math.random() * counter);

          counter--;

          const temp = arrayCopy[counter];
          arrayCopy[counter] = arrayCopy[index];
          arrayCopy[index] = temp;
        }

        return arrayCopy;
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
