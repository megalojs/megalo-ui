<template>
  <div :class="resClassName" :style="customStyle">
    <slot></slot>
      <template v-if="dot">
        <div class="mg-badge__dot"></div>
      </template>
      <template v-else-if="val !== ''">
          <div class="mg-badge__num">{{val}}</div>
      </template>
  </div>
</template>

<script>
import { mixin } from '../../mixins';
export default {
  mixins: [mixin],
  props: {
    dot: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxValue: {
      type: Number,
      default: 99
    }
  },
  computed: {
    resClassName() {
      return `mg-badge${this.rootClassName}`;
    },
    val() {
      const { value, maxValue } = this;
      if(value === '' || value === null) {
        return '';
      }
      const numValue = +value;
      if(isNaN(numValue)) {
        return value;
      }
      return numValue > maxValue ? maxValue + "+" : numValue;
    }
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';

$badge-box-shadow: 0 4px 8px 0 rgba(233, 59, 61, 0.20);
$badge-height: 28px;
$badge-border-radius: 14px;
$badge-dot-size: 20px;

.mg-badge {
  position: relative;
  display: inline-block;
  font-size: 0;
  vertical-align: middle;

  &__dot {
    position: absolute;
    right: -6px;
    top: -6px;
    width: $badge-dot-size;
    height: $badge-dot-size;
    border-radius: 50%;
    overflow: hidden;
    background: $color-error;
    box-shadow: $badge-box-shadow;
  }

  &__num {
    font-size: $font-size-xs;
    color: #fff;
    height: $badge-height;
    line-height: $badge-height;
    position: absolute;
    right: -6PX;
    top: -$badge-border-radius;
    transform: translate(50%, 0);
    padding: 0 $spacing-h-sm;
    border-radius: $badge-border-radius $badge-border-radius $badge-border-radius 0;
    overflow: hidden;
    background: $color-error;
    box-shadow: $badge-box-shadow;
    z-index: 1;
  }
}
</style>
