<template>
  <div v-if="show" :class="resClassName" :style="customStyle">
    <template v-if="resClose">
      <div class="at-noticebar__close" @click="onClose">
        <mg-icon value="close"  :size="16" color="#ccc"></mg-icon>
      </div>
    </template>
    <div class="at-noticebar__content">
      <template wx-if="icon">
        <div class="at-noticebar__content-icon">
          <mg-icon :value="icon"  :size="16"></mg-icon>
        </div>
      </template>
      <div class="at-noticebar__content-text">
        <div :animation="animationData" :class="innerClassName" :style="styleObj">
          <slot></slot>
        </div>
      </div>
    </div>
    <template v-if="resShowMore">
      <div class="at-noticebar__more" @click="onGotoMore">
        <text class="text">{{moreText}}</text>
        <div class="at-noticebar__more-icon">
          <mg-icon value="chevron-right"  :size="16"></mg-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { isWEAPP, isWEB } from '../../util';
import { mixin } from '../../mixins';
import mgIcon from '../icon';

export default {
  mixins: [mixin],
  props: {
    close: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    marquee: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 100
    },
    moreText: {
      type: String,
      default: '查看详情'
    },
    showMore: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    mgIcon
  },
  data() {
    const animElemId = "J_" + Math.ceil(Math.random() * 10e5).toString(36);
    return {
      show: true,
      animElemId,
      dura: 15
    }
  },
  computed: {
    resShowMore() {
      return !this.single ? false : this.showMore;
    },
    innerClassName() {
      const { marquee, animElemId } = this;
      return `at-noticebar__content-inner${marquee ? ' ' + animElemId : ''}`;
    },
    resClose() {
      const { marquee, close } = this; 
      return marquee ? false : close;
    },
    styleObj() {
      const { marquee, dura } = this;
      return marquee ? { 'animation-duration': this.dura + "s" } : null;
    },
    resClassName() {
      const { marquee, resShowMore, single, rootClassName } = this;
      const classObj = {
        'at-noticebar': true,
        'at-noticebar--marquee': marquee,
        'at-noticebar--weapp': marquee && isWEAPP,
        'at-noticebar--more': !marquee && resShowMore,
        'at-noticebar--single': !marquee && single
      };
      const classArr = Object.entries(classObj).map(arr => {
        return arr[1] ? arr[0] : '';
      })
      classArr.push(rootClassName);
      return classArr;
    }
  },
  created() {
    if(!this.timeout) {
      this.interval && clearInterval(this.interval);
    }
  },
  mounted() {
    if(!this.marquee) return;
    this.initAnimation();
  },
  methods: {
    onClose() {
      this.show = false;
      this.$emit('onclose');
    },
    onGotoMore() {
      this.$emit('ongotomore');
    },
    initAnimation() {
      const self = this;
      this.timeout = setTimeout(() => {
        this.timeout = null;
        const { speed, animElemId } = this;
        if(isWEB) {
          const elem = document.querySelector(`.${animElemId}`);
          if(!elem) return;
          const width = elem.getBoundingClientRect().width;
          const dura = width / speed;
          this.dura = dura;
        } else if(isWEAPP) {
          const query = Megalo.createSelectorQuery();
          query.select(`.${this.animElemId}`).boundingClientRect((res) => {
            if(!res) return;
            const width = res.width;
            const dura = width / speed;
            const animation = Megalo.createAnimation({
              duration: dura * 1000,
              timingFunction: 'linear'
            });
            const resetAnimation = Megalo.createAnimation({
              duration: 0,
              timingFunction: 'linear'
            });
            const animBody = function animBody() {
              resetAnimation.translateX(0).step();
              self.animationData = resetAnimation.export();
              self.$forceUpdate();
              setTimeout(() => {
                animation.translateX(-width).step();
                self.animationData = animation.export();
                self.$forceUpdate();
              }, 100)
            };
            animBody();
            this.interval = setInterval(animBody, dura * 1000 + 100);
          }).exec();
        }
      }, 100);
    }
  }
}
</script>

<style lang="scss">
@import "../../style/theme/default.scss";
@import "../../style/mixins/index.scss";

$noticebar-color-bg: #FCF6ED;
$noticebar-color-font: #DE8C17;
$noticebar-icon-size: 26px;

.at-noticebar {
  position: relative;
  padding: $spacing-v-sm $spacing-h-lg;
  color: $noticebar-color-font;
  font-size: 0;
  background: $noticebar-color-bg;

  &__content {
    line-height: $line-height-zh;
    word-break: break-all;
    word-wrap: break-word;

    &-icon {
      display: inline-block;
      margin-right: 12px;
      vertical-align: top;
      margin-top: 4px;
    }

    &-text {
      display: inline;
      font-size: $font-size-sm;
    }

    &-inner {
      display: inline;
    }
  }

  &__close {
    width: $noticebar-icon-size;
    height: $noticebar-icon-size;
    position: absolute;
    left: $spacing-h-lg;
    top: 50%;
    margin-top: -($noticebar-icon-size / 2 + 4);

    + .at-noticebar__content {
      margin-left: 50px;
    }
  }

  &--marquee {
    .at-noticebar__content-text {
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      display: block;
    }

    .at-noticebar__content-icon {
      position: absolute;

      + .at-noticebar__content-text {
        margin-left: 45px;
      }
    }

    .at-noticebar__content-inner {
      display: inline-block;
      height: 36px;
      white-space: nowrap;
      animation: marquee 1s linear infinite both;
      transform: translateZ(0);
      padding-left: 100%;
    }
  }

  &--single {
    &.at-noticebar--more {
      .at-noticebar__content-text {
        display: inline-block;
        max-width: 525px;
        @include line(1);
      }

      .at-noticebar__content-icon + .at-noticebar__content-text {
        max-width: 475px;
      }
    }
  }

  &--more {
    .at-noticebar__content {
      max-width: 525px;
    }
  }

  &--weapp {
    .at-noticebar__content-inner {
      animation: none;
    }
  }

  &__more {
    position: absolute;
    right: $spacing-h-lg;
    top: $spacing-v-sm;
    color: $color-grey-2;
    font-size: 0;

    .text {
      font-size: $font-size-sm;
      line-height: $line-height-zh;
      vertical-align: middle;
    }

    &-icon {
      display: inline-block;
      width: $noticebar-icon-size;
      vertical-align: middle;
      overflow: hidden;
    }
  }
}

@keyframes marquee {
  100% {
    transform: translate3d(-100%, 0, 0);
    // transform: translateX(-100%);
  }
}
</style>
