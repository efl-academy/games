<template>
  <div class="results-page">
    <div class="header"></div>
    <div class="content"></div>
    <div class="footer">
      <button class="primary" @click="$emit('new-game')">New Game</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'results-page',
  }
</script>

<style lang="less" scoped>

</style>
