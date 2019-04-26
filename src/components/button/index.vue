<template>
  <button
      :class="resClassName"
      :disabled="disabled"
      :plain="plain"
      :type="type"
      :size="size"
      :style="customStyle"
      @click="handleClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
  >
      <img v-if="loading" class="mg-button_loading" src="./loading.svg"><slot></slot>
  </button>
</template>

<script>
import { mixin } from '../../mixins';

const BUTTON_SIZE = {
  default: 'default',
  mini: 'mini'
}
const BUTTON_TYPE  = {
  primary: 'primary',
  default: 'default',
  warn: 'warn',
}
const BUTTON_FORM_TYPE  = {
  submit: 'submit',
  reset: 'reset',
}

export default {
  mixins: [mixin],
  props: {
    size: {
      type: String,
      default: BUTTON_SIZE.default,
    },
    type: {
      type: String,
      default: BUTTON_TYPE.default
    },
    plain: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
    },
    hoverClass: {
      type: String,
      default: 'button-hover',
    },
    hoverStartTime: {
      type: Number,
      default: 20,
    },
    hoverStayTime:{
      type: Number,
      default: 70,
    },
  },
    data() {
        return {
          lastTouchStartTimestamp: null,
          lastTouch: null,
          hover: false,
            hoverTimer: null,
            cancelHoverTimer: null,
        }
    },
  computed: {
    resClassName() {
      return `mg-button${this.rootClassName} ${this.hover ? this.hoverClass : ''}`
    },
  },
  methods: {
      handleClick(e) {
          if (this.formType !== 'submit') {
              e.preventDefault();
          }
          !this.disabled && this.$emit('click')
      },
      handleTouchStart(e) {
          if (this.disabled) {
              return;
          }

          clearTimeout(this.cancelHoverTimer)
          this.lastTouchStartTimestamp = new Date().getTime()
          this.lastTouch = e.touches[0]
          this.hoverTimer = setTimeout(() => this.hover = true, this.hoverStartTime)
      },
      handleTouchMove(e) {
          if (this.disabled) {
              return;
          }

          // const touch = e.touches[0];
          this.hover = false;
          clearTimeout(this.hoverTimer)
      },
      handleTouchEnd() {
          if (this.disabled) {
              return;
          }

          this.cancelHoverTimer = setTimeout(() => this.hover = false, this.hoverStayTime)
      },
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(-360deg);
    }
}

.mg-button {
    width: 100%;
    outline: none;
    padding: 0 14px;
    border: none;

    position:relative;
    display:block;
    margin-left:auto;
    margin-right:auto;
    box-sizing:border-box;
    font-size:18px;
    text-align:center;
    text-decoration:none;
    line-height:2.55555556;
    border-radius:5px;
    -webkit-tap-highlight-color:transparent;
    overflow:hidden;
    color:#000000;
    background-color:#F8F8F8;

    &[size=mini] {
        width: auto;
        display:inline-block;
        line-height:2.3;
        font-size:13px;
        padding:0 1.34em;
    }

    &:not([plain=true])::after {
        content: "";
        width: 100%;
        height: 100%;
        box-sizing:border-box;
        position: absolute;
        border-radius:5px;
        left: 0;
        top: 0;
        border: 1px solid #c1c1c1; // 颜色要确认一下

        @media screen and (-webkit-min-device-pixel-ratio: 2) {
            & {
                border-width: 0.5px;
            }
        }
        @media screen and (-webkit-min-device-pixel-ratio: 3) {
            & {
                border-width: 0.333333px;
            }
        }
    }

    &[type=default] {
        &[disabled] {
            color:rgba(0, 0, 0, 0.3);
            background-color:#F7F7F7;
        }

        &[plain] {
            border: 1px solid #000;
            color: #000;
            background-color: #fff;
        }
    }

    &[type=primary] {
        background-color: #1AAD19;
        color: #fff;

        &[disabled] {
            color:rgba(255, 255, 255, 0.6);
            background-color: #9ED99D;
        }

        &:not([disabled]) {
            &.button-hover {
                color: hsla(0,0%,100%,.6);
                background-color: #179b16;
            }

            &[plain] {
                border: 1px solid #1AAD19;
                color: #1AAD19;
                background-color: #fff;

                &.button-hover {
                    border: 1px solid #179b16;
                    color: #179b16;
                }
            }
        }
    }

    &[type=warn] {
        background-color: #E64340;
        color: #fff;

        &[disabled] {
            color:rgba(255, 255, 255, 0.6);
            background-color: #EC8B89;
        }

        &:not([disabled]) {
            &.button-hover {
                color: hsla(0,0%,100%,.6);
                background-color: #ce3c39;
            }

            &[plain] {
                border: 1px solid #E64340;
                color: #E64340;
                background-color: #fff;

                &.button-hover {
                    border: 1px solid #ce3c39;
                    color: #ce3c39;
                }
            }
        }
    }

    &[plain][disabled] {
        color:rgba(0, 0, 0, 0.2);
        border-color:rgba(0, 0, 0, 0.2);
    }
}

.mg-button_loading {
    vertical-align: middle;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    animation: rotate 1s linear infinite;
}
</style>



size | 支持 | 支持 |
type | 支持 | 支持 |
plain | 支持 | 支持 |
disabled | 支持 | 支持 |
loading | 支持 | 支持 |
form-type | 支持 | 支持 |
open-type | 支持 | 支持 |
hover-class | 支持 | 支持 |
hover-stop-propagation | 支持 | 支持 |
hover-start-time | 支持 | 支持 |
hover-stay-time | 支持 | 支持 |
lang | 支持 | 支持 |
session-from | 支持 | 支持 |
send-message-title | 支持 | 支持 |
send-message-path | 支持 | 支持 |
send-message-img | 支持 | 支持 |
app-parameter | 支持 | 支持 |
show-message-card | 支持 | 支持 |
bindgetuserinfo | 支持 | 支持 |
bindcontact | 支持 | 支持 |
bindgetphonenumber | 支持 | 支持 |
binderror | 支持 | 支持 |
bindopensetting | 支持 | 支持 |
bindlaunchapp | 支持 | 支持 |