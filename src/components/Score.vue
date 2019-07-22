<template>
  <div class="score">

    <div class="row-container">
      <div class="name">
        {{playerName}}
      </div>
      <div class="row">
        <div
          v-for="(item, index) in player"
          class="cell"
          :class="[
            item === null ? 'empty' : '',
            item === false ? 'failure' : '',
            item === true ? 'success' : '',
          ]"
          :key="index"
        >
        </div>
      </div>
    </div>

    <div class="row-container">
      <div class="name">
        {{botName}}
      </div>
      <div class="row">
        <div
          v-for="(item, index) in bot"
          class="cell"
          :class="[
            item === null ? 'empty' : '',
            item === false ? 'failure' : '',
            item === true ? 'success' : '',
          ]"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'player',
      'bot',
      'renderPending'
    ],

    data: () => ({
      playerName: settings.PLAYER_NAME,
      botName: settings.BOT_NAME,
    }),

    mounted() {
      if (this.renderPending) {
        setTimeout(() => {
          this.$emit('score-action-rendered');
        }, 350);
      }
    },
  }
</script>

<style lang="less" scoped>
  .score {
    font-size: 1.3em;

    .row-container {
      display: flex;
      justify-content: space-between;

      .row {
        margin-left: 10px;
        display: flex;

        .cell {
          border-radius: 50%;
          width: 26px;
          height: 26px;
          margin: 2px;
          transition: background-color 1s ease;

          &.failure {
            background-color: #fb4b4b;
          }

          &.empty {
            background-color: rgb(236, 236, 236);
          }

          &.success {
            background-color: rgb(86, 150, 86);
          }
        }
      }
    }
  }
</style>

