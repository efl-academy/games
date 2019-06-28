<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <score
      :player="playerScore"
      :bot="botScore"
    ></score>
  </div>
</template>

<script>
  import Score from './components/Score.vue';

  export default {
    name: 'app',
    data: () => ({
      playerScore: [1, 0, 1, null, null],
      botScore: [1, null, null, null, null],
    }),
    components: {
      Score,
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
