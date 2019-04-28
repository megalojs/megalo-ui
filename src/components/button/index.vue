<template>
    <button
        v-if="isMINIAPP"
        :class="resClassName"
        :disabled="disabled"
        :plain="plain"
        :type="type"
        :size="size"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :loading="loading"
        :form-type="formType"
        :open-type="openType"
        :hover-class="hoverClass"
        :hover-stop-propagation="hoverStopPropagation"
        :hover-start-time="hoverStartTime"
        :hover-stay-time="hoverStayTime"
        :style="customStyle"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
  <button
      v-else
      h5="true"
      :class="resClassName"
      :disabled="disabled"
      :loading="loading"
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
import { isMINIAPP } from '../../util';

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
          isMINIAPP,
          lastTouchStartTimestamp: null,
          lastTouch: null,
          hover: false,
            hoverTimer: null,
            cancelHoverTimer: null,
        }
    },
  computed: {
    resClassName() {
      return `mg-button${this.rootClassName} ${(this.hover || (this.loading && !this.plain)) ? this.hoverClass : ''}`
    },
  },
  methods: {
      handleClick(e) {
          if (this.disabled) {
              return;
          }

          if (this.formType !== BUTTON_FORM_TYPE.submit) {
              e.preventDefault();
          }
          if (this.formType === BUTTON_FORM_TYPE.reset) {
              let parentNode = this.$el.parentNode
              let formDom = false
              while (parentNode && parentNode !== document.body) {
                  if (parentNode.className.indexOf('mg-form') !== -1) {
                      formDom = parentNode;
                      break;
                  }
                  parentNode = parentNode.parentNode
              }
              if (formDom) {
                  formDom.reset();
              }
          }
          this.$emit('click', e);
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
      handleTouchMove() {
          if (this.disabled) {
              return;
          }

          this.hover = false
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

.mg-button[h5="true"] {
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
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, 0.2);
        transform: scale(0.5);
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 10px;

        /*content: "";*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*box-sizing:border-box;*/
        /*position: absolute;*/
        /*border-radius:5px;*/
        /*left: 0;*/
        /*top: 0;*/
        /*border: 1px solid rgba(0, 0, 0, .2);*/

        /*@media screen and (-webkit-min-device-pixel-ratio: 2) {*/
        /*    & {*/
        /*        border-width: 0.5px;*/
        /*    }*/
        /*}*/
        /*@media screen and (-webkit-min-device-pixel-ratio: 3) {*/
        /*    & {*/
        /*        border-width: 0.333333px;*/
        /*    }*/
        /*}*/
    }

    &[type=default] {
        &:not([plain]) {
            background-color: #F8F8F8;
            color: #000;

            &[disabled] {
                color:rgba(0, 0, 0, 0.3);
                background-color: #F7F7F7;
            }

            &.button-hover {
                color: rgba(0, 0, 0, .6);
                background-color: #DEDEDE;
            }
        }

        &[plain] {
            border: 1px solid #353535;
            color: #353535;
            background-color: transparent;

            &.button-hover {
                border-color: rgba(53, 53, 53, 0.6);
                color: rgba(53, 53, 53, 0.6);
            }

            &[disabled][loading] {
                color: #353535;
            }
        }
    }

    &[type=primary] {
        &:not([plain]) {
            background-color: #1AAD19;
            color: #fff;

            &[disabled] {
                color:rgba(255, 255, 255, 0.6);
                background-color: #9ED99D;
            }


            &.button-hover {
                color: rgba(255, 255, 255, .6);
                background-color: #179b16;
            }
        }

        &[plain] {
            border: 1px solid #1AAD19;
            color: #1AAD19;
            background-color: transparent;

            &.button-hover {
                border-color: rgba(26, 173, 25, 0.6);
                color: rgba(26, 173, 25, 0.6);
            }

            &[disabled][loading] {
                color: #1AAD19;
            }
        }
    }

    &[type=warn] {
        &:not([plain]) {
            background-color: #E64340;
            color: #fff;

            &[disabled] {
                color:rgba(255, 255, 255, 0.6);
                background-color: #EC8B89;
            }

            &.button-hover {
                color: rgba(255, 255, 255, .6);
                background-color: #ce3c39;
            }
        }

        &[plain] {
            border: 1px solid #E64340;
            color: #E64340;
            background-color: transparent;

            &.button-hover {
                border-color: rgba(230, 67, 64, 0.6);
                color: rgba(230, 67, 64, 0.6);
            }

            &[disabled][loading] {
                color: #E64340;
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