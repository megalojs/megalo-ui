<template>
  <form :class="resClassName" :style="customStyle" @submit.prevent="handleSubmit">
      <slot></slot>
  </form>
</template>

<script>
import { mixin } from '../../mixins';

export default {
  mixins: [mixin],
  computed: {
    resClassName() {
      return `mg-form${this.rootClassName}`
    },
  },
  methods: {
      handleSubmit(e) {
          this.$emit('submit');
      },
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';

.mg-button {

}
</style>
