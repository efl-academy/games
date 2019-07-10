<template>
  <div>
    <score
      :player="score['PLAYER']"
      :bot="score['BOT']"
    ></score>
  </div>
</template>

<script>
  import Score from '@/components/Score.vue';

  export default {
    name: 'score-page',

    props: {
      score: Object,
    },

    components: {
      Score,
    },

    mounted() {
      setTimeout(() => {
        this.$emit('next', 'score');
      }, pictureLifetime);
    },
  }
</script>

<style lang="less" scoped>

</style>
