<template>
  <text :class="resClassName" :style="resCustomStyle" @click="handleClick"></text>
</template>

<script>
import { mixin } from '../../mixins';
export default {
  mixins: [mixin],
  props: {
    prefixClass: {
      type: String,
      default: 'at-icon'
    },
    value: String,
    color: String,
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    resClassName() {
      const { rootClassName, prefixClass, value } = this;
      return `at-icon ${prefixClass}-${value}${rootClassName}`;
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
