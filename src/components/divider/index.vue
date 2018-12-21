<template>
  <div :class="resClassName" :style="resCustomStyle">
    <div class="at-divider__content" :style="fontStyle">
        <template v-if="content === ''">
          <slot></slot>
        </template>
        <template v-else>{{content}}</template>
    </div>
    <div class="at-divider__line" :style="lineStyle"></div>
  </div>
</template>

<script>
import { mixin } from '../../mixins';

export default {
  mixins: [mixin],
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 112
    },
    fontColor: {
      type: String,
      default: '#6190E8'
    },
    fontSize: {
      type: Number,
      default: 32
    },
    lineColor: {
      type: String,
      default: '#CCC'
    }
  },
  computed: {
    resClassName() {
      return `at-divider${this.rootClassName}`
    },
    resCustomStyle() {
      const { customStyle, height } = this;
      return Object.assign({}, this.customStyle, { height: height + 'rpx' })
    },
    fontStyle() {
      const { fontColor, fontSize } = this;
      return {
        'color': fontColor,
        'font-size': fontSize + 'rpx'
      }
    },
    lineStyle() {
      return {
        'background-color': this.lineColor
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';
@import "../../style/mixins/index.scss";

.at-divider {
  width: 100%;
  height: 112px;
  text-align: center;
  font-size: $font-size-base;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    background: $color-bg;
    position: relative;
    display: inline-block;
    z-index: $zindex-divider + 1;
    padding: 0 $spacing-h-lg;
  }

  &__line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1PX;
    background-color: $color-brand;
    top: 50%;
    z-index: $zindex-divider;
  }
}
</style>