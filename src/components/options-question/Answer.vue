<template>
  <button
    class="answer normal"
    :class="{success: status === 'success', error: status === 'error'}"
    :disabled="disabled"
    @click="onClick"
  >
    {{answer}}
  </button>
</template>

<script>
  export default {
    props: {
      answer: String,
      status: String,
      disabled: Boolean,
    },
    methods: {
      onClick() {
        this.$emit('check-answer', this.answer);
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
