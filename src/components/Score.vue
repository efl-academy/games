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
    ],
    data: () => ({
      playerName: PLAYER_NAME,
      botName: BOT_NAME,
    }),
  }
</script>

<style lang="less" scoped>
  .score {
    width: 230px;

    .row-container {
      display: flex;
      justify-content: space-between;

      .name {

      }

      .row {
        display: flex;

        .cell {
          border-radius: 50%;
          width: 20px;
          height: 20px;
          margin: 2px;

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

