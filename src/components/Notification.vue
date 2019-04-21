<template>
  <div class="notification">
    <p class="message">{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message'],
}
</script>

<style lang="less">
.notification {
  background-color: #fbfbfb;
  width: 160px;
  z-index: 1000;
  top: -15px;
  position: absolute;
  opacity: 0;
  transition: all 0.2s ease-in;
  border-radius: 8px;
  border: 2px solid #f1f1f1;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 10px 0;

  &.show {
    top: 15px;
    opacity: 1;
  }

  .message {
    font-size: 1em;
    color: rgb(20, 20, 20);
    margin: 0;
  }
}
</style>

