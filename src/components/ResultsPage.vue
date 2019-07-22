<template>
  <div class="results-page">
    <h2 class="heading">{{resultsHeading}}</h2>
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    />
    <button class="primary" @click="$emit('new-game')">New Game</button>
  </div>
</template>

<script>
  import Score from '@/components/Score.vue';

  export default {
    name: 'results-page',

    components: {
      Score,
    },

    props: {
      resultsHeading: String,
      score: Object,
    },
  }
</script>

<style lang="less" scoped>
  .results-page {
    button {
      margin-top: 140px;
    }
  }
</style>
