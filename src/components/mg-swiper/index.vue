<template>
  <swiper
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    :autoplay="autoplay"
    :current="current"
    :interval="interval"
    :duration="duration"
    :circular="circular"
    :vertical="vertical"
    :previous-margin="previousMargin"
    :next-margin="nextMargin"
  >
    <slot></slot>
  </swiper>
</template>

<script>

export default {
  props: {
    indicatorDots: {
      type: Boolean,
      default: false
    },
    indicatorColor: {
      type: String,
      default: 'rgba(0,0,.3)'
    },
    indicatorActiveColor: {
      type: String,
      default: '#000000'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 5000
    },
    duration: {
      type: Number,
      default: 500
    },
    circular: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    previousMargin: {
      type: String,
      default: "0px"
    },
    nextMargin: {
      type: String,
      default: "0px"
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>