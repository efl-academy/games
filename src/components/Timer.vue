<template>
  <div class="timer">
    <span class="time">{{sessionTime | prettifyTime}}</span>
  </div>
</template>

<script>
  export default {
    name: 'Timer',
    props: {
      time: Number,
    },
    data: () => ({
      sessionTime: 0,
      timerId: null,
    }),
    mounted() {
      this.init();
      this.start();

      this.$root.$on('end-game', () => {
        this.$emit('get-session-time', this.sessionTime);
      });
    },
    filters: {
      prettifyTime(value) {
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      },
    },
    methods: {
      start() {
        this.timerId = setInterval(() => {
          if (this.sessionTime < 2) {
            this.$emit('get-session-time', this.sessionTime - 1);
            this.$emit('time-is-up');
            clearInterval(this.timerId);
          }
          this.sessionTime--;
        }, 1000);
      },

      init() {
        this.sessionTime = this.time;
      },
    },
  }
</script>

<style lang="less" scoped>
  .timer {
    width: 110px;

    .time {
      font-size: 2rem;
    }
  }
</style>
