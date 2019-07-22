<template>
  <div class="welcome-page">
    <h1 class="heading">Soccer</h1>
    <p>Help your team win the cup!</p>
    <p>Answer questions correctly to score goals.</p>
    <div class="bottom">
      <button
      class="primary"
      @click="onStartGameClick"
    >Start Game</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'welcome-page',
    mounted() {

    },
    methods: {
      onStartGameClick() {
        this.$emit('start-game');
      },
    },
  }
</script>

<style lang="less" scoped>
  .welcome-page {
    .heading {
      margin-top: 100px;
    }

    p {
      font-size: 1.1em;
    }

    .bottom {
      margin-top: 100px
    }
  }
</style>
