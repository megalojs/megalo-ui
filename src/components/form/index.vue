<template>
  <form
      :class="resClassName"
      :style="customStyle"
      :report-submit="reportSubmit"
      :report-submit-timeout="reportSubmitTimeout"
      @submit.prevent="handleSubmit"
      @reset.prevent="handleReset"
  >
      <slot></slot>
  </form>
</template>

<script>
import { mixin } from '../../mixins';
import { isMINIAPP } from '../../util';

export default {
  mixins: [mixin],
    data() {
        return {
            isMINIAPP,
        }
    },
    props: {
        reportSubmit: {
            type: Boolean,
            default: false,
        },
        reportSubmitTimeout: {
            type: Number,
            default: 0,
        },
    },
  computed: {
    resClassName() {
      return `mg-form${this.rootClassName}`
    },
  },
  methods: {
      handleSubmit(e) {
          let formDom = this.$el
          let elements = []
          let tagElements = formDom.getElementsByTagName('input')
          for (let j = 0; j < tagElements.length; j++) {
              elements.push(tagElements[j])
          }
          let formItem = {}
          let hash = {}
          elements.forEach(item => {
              // 获取switch的值 暂时不支持switch 先注释掉
              // if (item.className.indexOf('weui-switch') !== -1) {
              //     formItem[item.name] = item.checked
              //     return
              // }
              if (item.type === 'radio') {
                  if (item.checked) {
                      hash[item.name] = true
                      formItem[item.name] = item.value
                  } else {
                      if (!hash[item.name]) {
                          formItem[item.name] = ''
                      }
                  }
                  return
              }

              if (item.type === 'checkbox') {
                  if (item.checked) {
                      if (hash[item.name]) {
                          formItem[item.name].push(item.value)
                      } else {
                          hash[item.name] = true
                          formItem[item.name] = [item.value]
                      }
                  } else {
                      if (!hash[item.name]) {
                          formItem[item.name] = []
                      }
                  }
                  return
              }
              formItem[item.name] = item.value
          })

          let textareaElements = formDom.getElementsByTagName('textarea')
          let textareaEleArr = []

          for (let i = 0; i < textareaElements.length; i++) {
              textareaEleArr.push(textareaElements[i])
          }
          textareaEleArr.forEach(v => {
              formItem[v.name] = v.value
          })
          Object.defineProperty(e, 'detail', {
              enumerable: true,
              value: {
                  value: formItem
              }
          })
          this.$emit('submit', e);
      },
      handleReset(e) {
          this.$emit('reset', e);
      },
  }
}
</script>

<style lang="scss">
@import '../../style/theme/default.scss';

</style>
