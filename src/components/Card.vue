<template>
  <div class="card">
    <div class="sentence-container">
      <p class="sentence">{{sentence}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['sentence'],
}
</script>

<style lang="less">
.card {
  width: 90vw;
  max-width: 340px;
  height: 410px;
  background-color: rgb(125, 207, 162);
  position: absolute;
  display: flex;
  align-items: center;
  will-change: transform, opacity;
  transition: all 0.3s ease-in-out;
  user-select: none;
  touch-action: pan-y;
  border-radius: 10px;
  font-size: x-large;

  &.moving {
    transition: none;
  }

  &.static {
    pointer-events: none;
  }

  .sentence-container {
    background-color: #424242;
    font-weight: 500;
    width: 100%;
    pointer-events: none;
    line-height: normal;
    padding: 10px 8px;

    .sentente {
      pointer-events: none;
    }
  }
}
</style>

