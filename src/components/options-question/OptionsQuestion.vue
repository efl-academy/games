<template>
  <div>
    options-question
  </div>
</template>

<script>
  import Answer from './Answer.vue';

  function shuffle(array) {
    const arrayCopy = array.slice();
    let counter = arrayCopy.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);

      counter--;

      const temp = arrayCopy[counter];
      arrayCopy[counter] = arrayCopy[index];
      arrayCopy[index] = temp;
    }

    return arrayCopy;
  };

  export default {
    name: 'options-question',
    methods: {
      shuffle() {
        const arrayCopy = array.slice();
        let counter = arrayCopy.length;

        while (counter > 0) {
          const index = Math.floor(Math.random() * counter);

          counter--;

          const temp = arrayCopy[counter];
          arrayCopy[counter] = arrayCopy[index];
          arrayCopy[index] = temp;
        }

        return arrayCopy;
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
