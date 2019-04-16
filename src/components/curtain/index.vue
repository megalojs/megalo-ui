<template>
  <div :class="resClassName" :style="customStyle">
    <div class="mg-curtain__container">
      <div class="mg-curtain__body">
        <slot></slot>
        <div :class="closeBox" @click="onClose">
          <mg-icon value="close-circle" color="#fff" :size="30"></mg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '../../mixins';
import mgIcon from '../icon';

export default {
  mixins: [mixin],
  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    closeBtnPosition: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    resClassName() {
      return `mg-curtain${!this.isOpened ? ' mg-curtain--closed' : ''}${this.rootClassName}`
    },
    closeBox() {
      return `mg-curtain__close-box${this.closeBtnPosition === 'top' ? ' mg-curtain__close-box--top' : ''}`
    }
  },
  components: {
    mgIcon
  },
  methods: {
    onClose() {
      this.$emit('onclose');
    }
  }
}
</script>

<style lang="scss">
@import "../../style/theme/default.scss";
@import "../../style/mixins/index.scss";

$spacing-v: 50PX;

.mg-curtain {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($color: #000, $alpha: 0.3);
  z-index: $zindex-toast;

  &__container {
    display: flex;
    position: relative;
    width: 80%;
    height: 100%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto;
    padding: $spacing-v * 2 0;
    opacity: 1;
  }

  &__body {
    position: relative;
    overflow: visible;
    min-height: 70%;
    width: 100%;
  }

  &__close-box {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: -$spacing-v;
    justify-content: center;
    align-items: center;
    z-index: $zindex-toast + 1;

    &--top {
      top: -$spacing-v;
      justify-content: flex-end;
      bottom: auto;
    }
  }

  &--closed {
    visibility: hidden;

    .mg-curtain__container {
      opacity: 0;
    }
  }
}
</style>
