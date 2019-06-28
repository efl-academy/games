<template>
  <div>
    <h2>Soccer</h2>
    <p>Help your team win the cup!</p>
    <p>Answer questions correctly to score goals.</p>
    <button
      class="primary"
      @click="onStartGameClick"
    >Start Game</button>
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

</style>
