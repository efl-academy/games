<template>
  <div>
    {{state}}
  </div>
</template>

<script>
  export default {
    name: 'picture-page',
    props: {
      state: String,
    },

    mounted() {
      setTimeout(() => {
        this.$emit('next', this.state);
      }, pictureLifetime);
    }
  }
</script>

<style lang="less" scoped>

</style>
