<template>
  <div :class="resClassName" :style="customStyle">
    <template v-if="openData && openData.type === 'userAvatarUrl' && isWEAPP">
      <open-data :type="openData.type"></open-data>
    </template>
    <template v-else-if="image">
      <img class="at-avatar__img" :src="image" />
    </template>
    <text v-else class="at-avatar__text">{{letter}}</text>
  </div>
</template>

<script> 
import { isWEAPP } from '../../util'; 
import { mixin } from '../../mixins';

const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small'
}

export default {
  mixins: [mixin],
  props: {
    openData: Object,
    image: String,
    text: String,
    size: {
      type: String,
      default: 'normal'
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isWEAPP
    }
  },
  computed: {
    resClassName: function() {
      return `${this.rootClassName}at-avatar at-avatar--${SIZE_CLASS[this.size] + (this.circle ? ' at-avatar--circle' : '')}`;
    },
    letter: function() {
      return this.text ? this.text[0] : '';
    }
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';

$avatar-size-sm: 80px;
$avatar-size-md: 100px;
$avatar-size-lg: 120px;

.at-avatar {
  width: $avatar-size-md;
  height: $avatar-size-md;
  color: #fff;
  font-size: $font-size-xxl;
  line-height: $avatar-size-md;
  text-align: center;
  border-radius: $border-radius-md;
  background: $color-grey-4;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &__img {
    width: 100%;
    height: 100%;
  }

  &--large {
    width: $avatar-size-lg;
    height: $avatar-size-lg;
    font-size: 48px;
    line-height: $avatar-size-lg;
  }

  &--small {
    width: $avatar-size-sm;
    height: $avatar-size-sm;
    font-size: $font-size-lg;
    line-height: $avatar-size-sm;
  }

  &--circle {
    border-radius: 50%;
    background-clip: border-box;
    overflow: hidden;
  }
}
</style>
