<template>
  <div
      ref="scrollView"
      :class="resClassName"
      :style="computedStyle"
      @scroll="handleScroll"
  >
    <slot></slot>
  </div>
</template>

<script>
  import {
    mixin
  } from '../../mixins';

  const EDGE_EVENT_THRESHOLD = 200;

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  function scrollTo(element, animation, options = {}, duration = 300) {
    const {
      scrollLeft,
      scrollTop
    } = options;
    const hasLeft = typeof scrollLeft === 'number';
    const hasTop = typeof scrollTop === 'number';

    if (!animation) {
      if (hasLeft) {
        element.scrollLeft = scrollLeft;
      }
      if (hasTop) {
        element.scrollTop = scrollTop;
      }
      return;
    }

    let currentTime = 0,
      increment = 20;
    let startLeft, changeLeft, startTop, changeTop;

    if (hasLeft) {
      startLeft = element.scrollLeft;
      changeLeft = scrollLeft - startLeft;
    }

    if (hasTop) {
      startTop = element.scrollTop;
      changeTop = scrollTop - startTop;
    }

    const animateScroll = function () {
      currentTime += increment;
      if (hasLeft) {
        element.scrollLeft = easeInOutQuad(currentTime, startLeft, changeLeft, duration);
      }
      if (hasTop) {
        element.scrollTop = easeInOutQuad(currentTime, startTop, changeTop, duration);
      }

      if (currentTime < duration) {
        if (window.requestAnimationFrame) {
          requestAnimationFrame(animateScroll);
        } else {
          setTimeout(animateScroll, increment);
        }
      }
    };
    animateScroll();
  }

  function cloneEvent(e) {
    const newEvent = {};
    for (let key in e) {
      newEvent[key] = e[key];
    }
    return newEvent;
  }

  export default {
    mixins: [mixin],
    props: {
      scrollX: {
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Boolean,
        default: false,
      },
      upperThreshold: {
        type: [Number, String],
        default: 50,
      },
      lowerThreshold: {
        type: [Number, String],
        default: 50,
      },
      scrollTop: {
        type: [Number, String],
      },
      scrollLeft: {
        type: [Number, String],
      },
      scrollIntoView: {
        type: String,
      },
      scrollWithAnimation: {
        type: Boolean,
        default: false,
      },
      enableBackToTop: {
        type: Boolean,
      },
    },
    data() {
      return {
        lastScrollLeft: 0,
        lastScrollTop: 0,
        lastToTopTimestamp: -EDGE_EVENT_THRESHOLD,
        lastToRightTimestamp: -EDGE_EVENT_THRESHOLD,
        lastToBottomTimestamp: -EDGE_EVENT_THRESHOLD,
        lastToLeftTimestamp: -EDGE_EVENT_THRESHOLD,
      };
    },
    computed: {
      resClassName() {
        return `mg-sroll-view${this.rootClassName}`;
      },
      computedStyle() {
        return {
          ...this.customStyle,
          overflowX: this.scrollX ? 'scroll' : 'hidden',
          overflowY: this.scrollY ? 'scroll' : 'hidden',
        };
      },
    },
    mounted() {
      if (this.scrollIntoView) {
        this.handleScrollIntoView(this.scrollIntoView);
        return;
      }

      // TODO: 单位处理
      this.scrollTo({
        scrollLeft: this.scrollLeft || 0,
        scrollTop: this.scrollTop || 0,
      });
    },
    methods: {
      handleScroll(e) {
        const {
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
          clientWidth,
          clientHeight,
        } = e.target;

        const deltaX = this.lastScrollLeft - scrollLeft;
        const deltaY = this.lastScrollTop - scrollTop;
        e.detail = {
          deltaX,
          deltaY,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }
        this.$emit('scroll', e);

        this.lastScrollLeft = scrollLeft;
        this.lastScrollTop = scrollTop;

        const scrollRight = scrollWidth - scrollLeft - clientWidth;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        if ((e.timeStamp - this.lastToTopTimestamp >= EDGE_EVENT_THRESHOLD) && deltaY > 0 && scrollTop <= this.upperThreshold) {
          this.lastToTopTimestamp = e.timeStamp;

          this.$emit('scrolltoupper', {
            ...cloneEvent(e),
            type: 'scrolltoupper',
            detail: {
              direction: 'top'
            },
          });
        }

        if ((e.timeStamp - this.lastToLeftTimestamp >= EDGE_EVENT_THRESHOLD) && deltaX > 0 && scrollLeft <= this.upperThreshold) {
          this.lastToLeftTimestamp = e.timeStamp;
          this.$emit('scrolltoupper', {
            ...cloneEvent(e),
            type: 'scrolltoupper',
            detail: {
              direction: 'left'
            },
          });
        }

        if ((e.timeStamp - this.lastToBottomTimestamp >= EDGE_EVENT_THRESHOLD) && deltaY < 0 && scrollBottom <= this.lowerThreshold) {
          this.lastToBottomTimestamp = e.timeStamp;
          this.$emit('scrolltolower', {
            ...cloneEvent(e),
            type: 'scrolltolower',
            detail: {
              direction: 'bottom'
            },
          });
        }

        if ((e.timeStamp - this.lastToRightTimestamp >= EDGE_EVENT_THRESHOLD) && deltaX < 0 && scrollRight <= this.lowerThreshold) {
          this.lastToRightTimestamp = e.timeStamp;
          this.$emit('scrolltolower', {
            ...cloneEvent(e),
            type: 'scrolltolower',
            detail: {
              direction: 'right'
            },
          });
        }
      },
      scrollTo(options = {}) {
        // TODO: 单位处理
        scrollTo(this.$refs.scrollView, this.scrollWithAnimation, options)
      },
      handleScrollIntoView(id) {
        const el = document.getElementById(id);
        if (!el) {
          return;
        }

        const {
          offsetLeft,
          offsetTop
        } = el;
        this.scrollTo({
          scrollLeft: offsetLeft,
          scrollTop: offsetTop
        });
      },
    },
    watch: {
      scrollTop(newValue) {
        // TODO: 单位处理
        if (Object.prototype.toString.call(newValue) !== "[object Number]") {
          return;
        }

        this.scrollTo({
          scrollTop: newValue
        });
      },
      scrollLeft(newValue) {
        // TODO: 单位处理
        if (Object.prototype.toString.call(newValue) !== "[object Number]") {
          return;
        }

        this.scrollTo({
          scrollLeft: newValue
        });
      },
      scrollIntoView(newValue) {
        this.handleScrollIntoView(newValue);
      },
    },
  }
</script>

<style lang="scss">
  @import '../../style/theme/default.scss';

  .mg-sroll-view {
    position: relative;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>