<template>
  <div class="picture-page" ref="pictureContainer">
  </div>
</template>

<script>
  export default {
    name: 'picture-page',
    props: {
      state: String,
      images: Array,
      visible: Boolean,
    },

    data: () => {
      return {
        imageEl: null,
      }
    },

    created() {
      const imageIndex = Math.floor(Math.random() * (this.images.length));
      this.imageEl = this.images[imageIndex];
    },

    mounted() {
      setTimeout(() => {
        this.$emit('next', this.state);
      }, settings.pictureFrameLifetime);

      this.$refs.pictureContainer.appendChild(this.imageEl);

      if (window.innerWidth <= 400) {
        this.$refs.pictureContainer.children[0].style.width = '290px';
      } else if (window.innerWidth <= 480) {
        this.$refs.pictureContainer.children[0].style.width = '340px';
      }
    },
  }
</script>

<style lang="less" scoped>
  .picture-page {
    transition: display 1s;
    margin: 100px 0 100px;
  }

  // @media screen and (max-width: 320px) {
  //   .picture-page {
  //     img {
  //       width: 290px !important;
  //     }
  //   }
  // }
</style>
