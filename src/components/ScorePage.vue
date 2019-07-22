<template>
  <div class="score-page">
    <score
      class="score"
      :player="score['PLAYER']"
      :bot="score['BOT']"
      :renderPending="renderPending"
      @score-action-rendered="actionRendered"
    />
  </div>
</template>

<script>
  import Score from '@/components/Score.vue';

  export default {
    name: 'score-page',

    props: {
      score: Object,
      renderPending: Object,
    },

    components: {
      Score,
    },

    mounted() {
      setTimeout(() => {
        this.$emit('next', 'score');
      }, settings.pictureFrameLifetime);
    },

    methods: {
      actionRendered() {
        this.$emit('score-action-rendered');
      },
    },
  }
</script>

<style lang="less" scoped>
  .score-page {
    display: flex;
    justify-content: center;

    .score {
      margin-top: 140px;
    }
  }
</style>
