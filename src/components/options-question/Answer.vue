<template>
  <button
    class="answer"
    :class="{'answered': answered}"
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

    data: () => ({
      answered: false,
    }),

    methods: {
      onClick() {
        this.answered = true;
        this.$emit('check-answer', this.answer);
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
