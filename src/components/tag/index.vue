<template>
  <div :class="resClassName" :style="customStyle" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { mixin } from '../../mixins';

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}
const TYPE_CLASS = {
  primary: 'primary'
}

export default {
  mixins: [mixin],
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    circle: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    resClassName() {
      const { size, type, disabled, active, circle, rootClassName } = this;
      return `mg-tag mg-tag--${SIZE_CLASS[size]}${type ? ' mg-tag--' + type : ''}${disabled ? ' mg-tag--disabled' : ''}${active ? ' mg-tag--active' : ''}${circle ? ' mg-tag--circle' : ''}${rootClassName}`;
    }
  },
  methods: {
    onClick() {
      const { name, active } = this;
      if(!this.disabled) {
        this.$emit('onclick', {name, active});
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';
@import '../../style/mixins/index.scss';

.mg-tag {
  display: inline-block;
  padding: 0 $spacing-h-xl;
  height: 60px;
  color: $color-grey-1;
  font-size: $font-size-base;
  text-align: center;
  line-height: calc(60px - 2PX);
  vertical-align: middle;
  border: 1PX solid $color-grey-6;
  border-radius: $border-radius-md;
  background-color: $color-bg-grey;
  box-sizing: border-box;

  &--active {
    color: $color-brand-light;
    border: 1PX solid $color-brand-light;
    background-color: $color-bg;

    &.mg-tag--primary {
      color: $color-text-base-inverse;
      border: 1PX solid $color-brand-light;
      background-color: $color-brand-light;
    }
  }

  &--disabled {
    opacity: $opacity-disabled;
  }

  &--small {
    padding: 0 $spacing-h-md;
    height: 40px;
    font-size: $font-size-xs;
    line-height: calc(40px - 2PX);
  }

  &--circle {
    border-radius: 30px;
    background-clip: border-box;
    overflow: hidden;
  }
}
</style>
