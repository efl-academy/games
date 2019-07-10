<template>
  <div class="timer">
    <span class="time">{{remainedTime | prettifyTime}}</span>
  </div>
</template>

<script>
export default {
  props: {
    timeLimit: Number,
  },

  data: () => ({
    timerId: null,
    remainedTime: null,
  }),

  mounted() {
    this.init();
    this.start();
  },

  filters: {
    prettifyTime(value) {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },

  methods: {
    init() {
      this.remainedTime = this.timeLimit;
    },

    start() {
      this.timerId = setInterval(() => {
        if (this.remainedTime < 2) {
          // this.$emit('get-session-time', this.remainedTime - 1);
          this.$emit('time-is-up', false);
          clearInterval(this.timerId);
        }
        this.remainedTime--;
      }, 1000);
    },
  },
}
</script>

<style lang="less" scoped>
  .timer {
    .time {
      font-size: 24px;
    }
  }
</style>
