<template>
  <div :class="resClassName" :style="customStyle">
    <div :class="item.itemRootClassName" :key="index" v-for="(item, index) in resItems">
      <div class="mg-timelineitem__tail"></div>
      <div :class="item.dotClass">
        <template v-if="item.icon">
          <mg-icon :value="item.icon" :size="16"></mg-icon>
        </template>
      </div>
      <div class="mg-timelineitem__content">
        <div class="mg-timelineitem__content-item">{{item.title}}</div>
        <div class="mg-timelineitem__content-item mg-timelineitem__content--sub" :key="subIndex" v-for="(sub, subIndex) in item.content">{{sub}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mixin } from '../../mixins';
  import mgIcon from '../icon';
  export default {
    mixins: [mixin],
    props: {
      pending: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: []
      }
    },
    computed: {
      resClassName() {
        const { pending, rootClassName } = this;
        return `mg-timeline${pending ? ' mg-timeline--pending' : ''}${rootClassName}`;
      },
      resItems() {
        const { items } = this;
        return items.map((item, index) => {
          const { color, icon, title, content } = item;
          item.title = title === undefined ? '' : title;
          item.content = content === undefined ? [] : content;
          item.itemRootClassName = `mg-timelineitem${color ? ' mg-timelineitem--' + color : ''}`;
          item.dotClass = `mg-timelineitem__dot${icon ? ' mg-timelineitem__icon' : ''}`;
          return item;
        })
      }
    },
    components: {
      mgIcon
    }
  }
</script>

<style lang="scss">
  @import '../../style/theme/default.scss';

  $timeline-margin-left: 40px;
  $timeline-dot-size: 24px;

  .mg-timelineitem {
    position: relative;
    padding: 0 0 $spacing-v-sm;

    &__content {
      margin-left: $timeline-margin-left;
      min-height: 56px;
      color: $color-grey-0;
      font-size: $font-size-base;
      line-height: $line-height-zh;
      text-align: left;

      &--sub {
        color: $color-grey-1;
        font-size: $font-size-sm;
      }
    }

    &__dot,
    &__icon {
      position: absolute;
      left: 0;
      top: 5px;
      width: 32px;
      height: 32px;
      font-size: 0;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      background-color: $color-bg;
      z-index: 1;
    }

    &__dot {
      left: -1px;

      &::after {
        content: '';
        margin-top: 5px;
        display: inline-block;
        box-sizing: border-box;
        width: $timeline-dot-size;
        height: $timeline-dot-size;
        border: 1PX solid transparent;
        border-radius: $border-radius-circle;
        border-color: $color-info;
      }

      &.mg-timelineitem__icon {
        &::after {
          display: none;
        }
      }
    }

    &__icon {
      left: -4px;
      color: $color-info;
    }

    &--blue {
      .mg-timelineitem__icon {
        color: $color-blue;
      }

      .mg-timelineitem__dot {
        &::after {
          border-color: $color-blue;
        }
      }
    }

    &--red {
      .mg-timelineitem__icon {
        color: $color-error;
      }

      .mg-timelineitem__dot {
        &::after {
          border-color: $color-error;
        }
      }
    }

    &--yellow {
      .mg-timelineitem__icon {
        color: $color-warning;
      }

      .mg-timelineitem__dot {
        &::after {
          border-color: $color-warning;
        }
      }
    }

    &__tail {
      position: absolute;
      top: 18px;
      bottom: -10px;
      left: 10px;
      border-left: 2px solid $color-border-lighter;
    }
  }

  .mg-timeline {
    .mg-timelineitem:last-child {
      .mg-timelineitem__tail {
        display: none;
      }
    }

    &--pending {
      .mg-timelineitem:nth-last-child(2) {
        .mg-timelineitem__content {
          min-height: 80px;
        }

        .mg-timelineitem__tail {
          border-left-style: dotted;
        }
      }
    }
  }
</style>