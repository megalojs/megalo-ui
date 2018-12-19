export const mixin = {
  props: {
    className: {
      type: [String, Array],
      default: ''
    },
    customStyle: {
      type: [String, Object],
      default: ''
    }
  },

  computed: {
    rootClassName() {
      const space = this.className.length ? ' ' : '';
      if(Array.isArray(this.className)) return this.className.join(' ') + space;
      return this.className.trim() + space;
    }
  }
}