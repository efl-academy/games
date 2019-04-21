<template>
  <div class="result">
    <font-awesome-icon
      class="result-icon"
      :class="{'incorrect' : card.userAnswer !== card.valid}"
      size="lg"
      :icon="resultIcon"
    />
    <p class="sentence" v-if="card.valid">{{card.sentence}}</p>
    <p class="sentence" v-else v-html="highlightedSentence"></p>
    <div class="user-answer-container">
      <p>Your answer: </p>
      <p
        class="user-answer"
        :class="{'incorrect': card.userAnswer !== card.valid}"
      >
        {{userAnswer}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['card'],
  computed: {
    resultIcon() {
      return this.card.userAnswer === this.card.valid
        ? 'check-circle'
        : 'times-circle';
    },
    userAnswer() {
      return this.card.userAnswer
        ? 'Correct.'
        : 'Incorrect.'
    },
    highlightedSentence() {
      const correction = this.card.correction;
        const sentence = this.card.answer
          .replace(new RegExp(correction, 'i'), `<span class='highlight'>${correction}</span>`);

      return sentence;
    },
  },
}
</script>

<style lang="less">
.result {
  background-color: white;
  color: rgb(15, 15, 15);
  width: 90vw;
  max-width: 500px;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;
  padding: 8px 5px;
  box-shadow: 0 1px 4px #d0d0d0;

  .sentence {
    text-align: left;
    line-height: normal;
    margin: 18px;

    .highlight {
      background-color: rgb(206, 255, 196);
      border-radius: 3px;
    }
  }

  .user-answer-container {
    font-size: 0.8em;
    text-align: left;
    margin-left: 20px;

    & > * {
      display: inline;
    }

    .user-answer {
      padding: 0 4px;
      border-radius: 6px;
      background-color: rgb(237, 255, 234);
      font-weight: 500;
      color: rgb(92, 92, 92);

      &.incorrect {
        background-color: rgb(255, 239, 239);

      }
    }
  }

  .result-icon {
    position: absolute;
    top: -8px;
    left: -8px;
    color: rgb(77, 185, 77);

    &.incorrect {
      color: rgb(255, 92, 92);
    }
  }
}
</style>

