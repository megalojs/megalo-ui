<template>
  <div class="page">
    <doc-header title="Curtain 幕帘" ></doc-header>
    <div class="doc-body">
      <mg-curtain :isOpened="isOpened"  :closeBtnPosition="closeBtnPosition" @onclose="onClose">
        <img style="width:100%;height:250px" :src="curtainPng" />
      </mg-curtain>
      <div class="panel">
        <div class="panel__title">右上关闭</div>
        <div class="panel__content">
          <div class="example-item">
            <button @click="handleChange({closeBtnPosition: 'top'})" >右上关闭幕帘</button>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">底部关闭</div>
        <div class="panel__content">
          <div class="example-item">
            <button @click="handleChange({closeBtnPosition: 'bottom'})" >底部关闭幕帘</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docHeader from '../../components/doc-header';
import mgCurtain from '../../../components/curtain';
import mgIcon from '../../../components/icon';
import { curtainPng } from '../../constants/url';
export default {
  data() {
    return {
      isOpened: false,
      closeBtnPosition: 'bottom',
      curtainPng
    }
  },
  components: {
    mgCurtain,
    mgIcon,
    docHeader
  },
  methods: {
    handleChange(options) {
      Object.keys(options).map((key) => {
        if(this[key] !== undefined) {
          this[key] = options[key];
        }
      })
      this.isOpened = true;
    },
    onClose() {
      this.isOpened = false;
    }
  }
}
</script>

<style lang="scss">
</style>
