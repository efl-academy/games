<template>
  <div class="progress-bar-container">
    <div class="progress-bar" ref="progressBar"></div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      value: Number,
      correct: {
        type: Boolean,
        default: true,
      },
    },
    watch: {
      value(newValue) {
        this.$refs.progressBar.style.width = `${this.value}%`;
      },
      correct(newValue) {
        this.$refs.progressBar.style.backgroundColor = this.correct ? '#00ffa5' : '#ff3000';
      }
    },
  }
</script>

<style lang="less" scoped>
  .progress-bar-container {
    height: 6px;
    width: 90vw;
    max-width: 400px;
    margin: 10px auto;
    color: white;

    background-color: rgb(42, 43, 44);

    .progress-bar {
      width: 0%;
      height: 100%;
      background-color: rgb(0, 255, 165);
      transition: width .2s ease-in-out 0s;
    }
  }
</style>
