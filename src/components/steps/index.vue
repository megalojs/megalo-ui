<template>
  <div :class="resClassName" :style="customStyle">
    <div :key="item.title" :class="item.itemStyle" @click="handleClick(i)" v-for="(item, i) in resItems">
      <div class="at-steps__circular-wrap">
        <template v-if="i !== 0">
          <div class="at-steps__left-line"></div>
        </template>
        <template v-if="item.success || item.error">
          <mg-icon :value="item.success ? 'check-circle' : 'close-circle'" :color="item.success ? '#6190E8' : '#FF4949'"
            size="28"></mg-icon>
        </template>
        <template v-else>
          <div class="at-steps__circular">
            <template v-if="item.icon">
              <mg-icon :value="item.icon.value" :color="i === current ? item.icon.activeColor : item.icon.inactiveColor"
                :size="item.icon.size"></mg-icon>
            </template>
            <template v-else>
              <text class="at-steps__num">{{i + 1}}</text>
            </template>
          </div>
        </template>
        <template v-if="i !== items.length - 1">
          <div class="at-steps__right-line"></div>
        </template>
      </div>
      <div class="at-steps__title">{{item.title}}</div>
      <div class="at-steps__desc">{{item.desc}}</div>
    </div>
  </div>
</template>

<script>
  import { mixin } from '../../mixins';
  import mgIcon from '../icon';
  export default {
    mixins: [mixin],
    props: {
      current: {
        type: Number,
        default: 0
      },
      items: {
        type: Array,
        default: []
      }
    },
    computed: {
      resClassName() {
        return `at-steps${this.rootClassName}`;
      },
      resItems() {
        const { current, items } = this; 
        return items.map((item, i) => {
          item.itemStyle = `at-steps__item${i === current ? ' at-steps__item--active' : ' at-steps__item--inactive'}`;
          return item;
        });
      }
    },
    components: {
      mgIcon
    },
    methods: {
      handleClick(i) {
        this.$emit('onchange', {current: i});
      }
    }
  }
</script>

<style lang="scss">
@import '../../style/mixins/index.scss';
@import '../../style/theme/default.scss';

$circularH: 28PX;

.at-steps {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;

  &__circular {
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    line-height: $circularH;
    // 为了让图标垂直水平居中
    font-size: 0;
    height: $circularH;
    width: $circularH;
    text-align: center;
    z-index: $zindex-steps;
    transition: all 0.3s;
  }

  &__item {
    position: relative;
    flex: 1;
    width: 33%;
    text-align: center;

    &--active {
      .at-steps__circular {
        color: $color-white;
        background-color: $color-brand;
      }
    }

    &--inactive {
      .at-steps__circular {
        color: $color-grey-2;
        background-color: $color-grey-4;
      }
    }
  }

  &__circular-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
  }

  &__left-line {
    position: absolute;
    width: 30%;
    top: 50%;
    right: 70%;
    height: 1Px;
    background-color: $color-grey-3;
    z-index: $zindex-steps - 1;
  }

  &__right-line {
    position: absolute;
    width: 30%;
    top: 50%;
    left: 70%;
    height: 1Px;
    background-color: $color-grey-3;
    z-index: $zindex-steps - 1;
  }

  &__num {
    font-size: $font-size-sm;
  }

  &__title {
    padding: $spacing-v-sm 0;
    font-size: $font-size-lg;
    color: $color-black-0;
    @include line(1);
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-grey-3;
    @include line(2);
  }
}
</style>