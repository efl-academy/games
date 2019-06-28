<template>
  <button
    class="answer normal"
    :class="{success: status === 'success', error: status === 'error'}"
    :disabled="disabled"
    @click="onClick"
  >

  </button>
</template>

<script>
  export default {
    props: {
      verb: String,
      id: Number,
      status: String,
      disabled: Boolean,
    },
    methods: {
      onClick() {
        this.$emit('check-answer', this.id);
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
