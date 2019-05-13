<template>
  <div class="mg-swiper" :instance-id="id" :class="resClassName" :style="customStyle">
    <div v-html="indicatorStyle"></div>
    <swiper
      style="flex: 1;max-width: 100%;max-height: 100%;overflow: visible;"
      :style="computedStyle"
      :options="swiperOption" ref="swiper"
      @slideChange="handleSlideChange"
      @sliderMove="handleSlideMove"
      @transitionStart="handleTransitionStart"
      @transitionEnd="handleTransitionEnd"
      @touchStart="handleTouchStart"
    >
      <slot></slot>
      <div v-show="indicatorDots" class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {
    mixin
  } from '../../mixins';
  import 'swiper/dist/css/swiper.css';
  import {
    swiper
  } from 'vue-awesome-swiper';

  let INSTANCE_ID = 0

  export default {
    mixins: [mixin],
    components: {
      swiper,
    },
    props: {
      indicatorDots: {
        type: Boolean,
        default: false
      },
      // TODO: 暂时不支持预定义的颜色 https://developers.weixin.qq.com/miniprogram/dev/api/Color.html
      indicatorColor: {
        type: String,
        default: 'rgba(0, 0, 0, .3)'
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
      // TODO: 单位处理
      previousMargin: {
        type: String,
        default: "0px"
      },
      nextMargin: {
        type: String,
        default: "0px"
      },
      displayMultipleItems: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        lastTranslate: 0,
        isTransition: false,
        lastCurrent: 0,
        id: INSTANCE_ID++,
      };
    },
    computed: {
      requestAnimationFrame() {
        const hackRequestAnimationFrame = (cb) => setTimeout(cb, 16);
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          hackRequestAnimationFrame;
      },
      swiperOption() {
        return {
          loop: this.circular,
          pagination: {
            el: '.swiper-pagination'
          }, // TODO: 好像不支持动态修改
          autoplay: this.autoplay && {
            delay: this.interval,
            disableOnInteraction: false
          },
          speed: this.duration,
          direction: this.vertical ? 'vertical' : 'horizontal',
          slidesPerView: this.displayMultipleItems,
          centeredSlides: true,
          loopedSlides: 2,
          on: {
            // 受限于swiper的实现机制, loop模式下会克隆两边的dom节点
            // 导致原先通过vue绑定在dom上的事件不会在克隆的dom节点上触发
            // 只能通过找到相对应的vnode节点后, 代码调用相应事件
            // 暂时只实现了触发对应的swiperItem或者swiperItem第一个子元素的点击事件
            tap: e => {
              if (!this.circular) {
                return;
              }

              let el = e.target;
              while (el && el.className.indexOf('swiper-slide') === -1) {
                el = el.parentNode;
              }
              if (el && el.className.indexOf('swiper-slide-duplicate') !== -1) {
                const index = el.dataset.swiperSlideIndex
                const swiperItem = this.$slots.default[index];
                try {
                  swiperItem.child._events.click[0](e)
                } catch (e) {
                  try {
                    swiperItem.child.$slots.default[0].data.on.click(e)
                  } catch (e) {
                    // do nothing
                  }
                }
              }
            }
          },
        };
      },
      indicatorStyle() {
        return `<style type="text/css">
                .${this.resClassName}[instance-id="${this.id}"] .swiper-pagination-bullet {
                    background-color: ${this.indicatorColor};
                }
                .${this.resClassName}[instance-id="${this.id}"] .swiper-pagination-bullet-active {
                    background-color: ${this.indicatorActiveColor};
                }
            </style>`
      },
      resClassName() {
        return `mg-swiper${this.rootClassName}`;
      },
      computedStyle() {
        if (this.vertical) {
          return {
            ...this.customStyle,
            paddingTop: this.previousMargin,
            paddingBottom: this.nextMargin,
          }
        }

        return {
          ...this.customStyle,
          paddingLeft: this.previousMargin,
          paddingRight: this.nextMargin,
        };
      },
      animating() {
        return this.$refs.swiper.swiper.animating;
      },
    },
    mounted() {
      if (this.current) {
        this.scrollToIndex(this.current, false);
      }
    },
    methods: {
      handleTransitionEnd() {
        this.$emit('animationfinish', this.getSwiperEvent('animationfinish'));
      },
      // swiper有时候会很奇怪的连续触发两次transitionStart, 需要过滤一下
      handleTransitionStart(recursion) {
        if (this.isTransition && !recursion) {
          return;
        }
        this.isTransition = true;
        const swiper = this.$refs.swiper.swiper;
        const requestAnimationFrame = this.requestAnimationFrame;
        requestAnimationFrame(() => {
          this.handleSlideMove();
          if (swiper.animating) {
            this.handleTransitionStart(true);
          } else {
            this.isTransition = false;
            this.lastTranslate = this.$refs.swiper.swiper.getTranslate();
          }
        });
      },
      handleTouchStart() {
        this.lastTranslate = this.$refs.swiper.swiper.getTranslate();
      },
      getSwiperEvent(type, detail) {
        const swiper = this.$refs.swiper.swiper;

        let e
        try {
          e = new TouchEvent(type);
        } catch (e) {
          e = document.createEvent('Event');
          e.initEvent(type, true, true);
        }
        try {
          Object.defineProperty(e, 'detail', {
            enumerable: true,
            value: detail || {
              current: swiper.realIndex,
              currentItemId: swiper.slides[swiper.activeIndex].getAttribute('item-id') || '',
              source: 'autoplay',
            }
          });
        } catch (e) {
        }
        return e
      },
      handleSlideMove() {
        const translate = this.$refs.swiper.swiper.getTranslate();
        let delta = this.lastTranslate - translate;
        if (Math.abs(delta) > this.$refs.swiper.swiper.width) {
          this.lastTranslate = translate;
          delta = this.lastTranslate - translate;
        }
        const dx = this.vertical ? 0 : delta;
        const dy = this.vertical ? delta : 0;
        this.$emit('transition', this.getSwiperEvent('transition', {
          dx,
          dy
        }));
      },
      handleSlideChange() {
        if (this.lastCurrent === this.$refs.swiper.swiper.realIndex) {
          return;
        }
        this.lastCurrent = this.$refs.swiper.swiper.realIndex;
        this.$emit('change', this.getSwiperEvent('change'));
      },
      scrollToIndex(index, animation) {
        if (!index && index !== 0) {
          return;
        }

        this.$refs.swiper.swiper.slideToLoop(index, animation ? this.duration : 0);
      },
    },
    watch: {
      autoplay(newValue) {
        const autoplay = this.$refs.swiper.swiper.autoplay;
        if (newValue) {
          autoplay.start();
        } else {
          autoplay.stop();
        }
      },
      vertical(newValue) {
        this.$refs.swiper.swiper.changeDirection(newValue ? 'vertical' : 'horizontal');
      },
      current(newValue) {
        this.scrollToIndex(newValue, true);
      },
    },
    updated() {
      const swiper = this.$refs.swiper.swiper
      if (swiper) {
        this.$nextTick(() => {
          if (this.circular) {
            // https://github.com/surmon-china/vue-awesome-swiper/issues/397
            // 解决slot元素更新, 导致在loop模式下, 复制的dom节点不更新的问题
            swiper.loopDestroy()
            swiper.loopCreate()
          }

          swiper.update()
        })
      }
    },
    beforeDestroy() {
      const swiper = this.$refs.swiper.swiper
      if (swiper) {
        swiper.destroy()
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/theme/default.scss';

  * {
    box-sizing: border-box;
  }

  .mg-swiper {
    display: flex;
    margin: 0 auto;
    overflow: hidden;

    .swiper-pagination-bullet {
      opacity: 1;
    }
  }
</style>
