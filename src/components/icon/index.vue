<template>
  <span :class="resClassName" :style="resCustomStyle" @click="handleClick"></span>
</template>

<script>
import { mixin } from '../../mixins';
export default {
  mixins: [mixin],
  props: {
    prefixClass: {
      type: String,
      default: 'mg-icon'
    },
    value: String,
    color: String,
    size: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    resClassName() {
      const { rootClassName, prefixClass, value } = this;
      return `mg-icon ${prefixClass}-${value}${rootClassName}`;
    },
    resCustomStyle() {
      const { customStyle, size, color } = this;
      return Object.assign({}, customStyle, {fontSize: size + 'px', color});
    }
  },
  methods: {
    handleClick() {
      this.$emit('onclick');
    }
  }
}
</script>

<style lang="scss">
@import '../../style/icon/index.scss';
</style>
