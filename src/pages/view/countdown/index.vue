<template>
  <div class="page">
    <docs-header title="CountDown 倒计时" ></docs-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">一般用法</div>
        <div class="panel__content">
          <mg-countdown :minutes="1"  :seconds="10"></mg-countdown>
        </div>
        <div class="panel__content">
          <mg-countdown :isShowDay="true"  :hours="1" :minutes="1" :seconds="10"></mg-countdown>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义格式化</div>
        <div class="panel__content">
          <mg-countdown :format="format1"  :minutes="1" :seconds="10"></mg-countdown>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">卡片式</div>
        <div class="panel__content">
          <mg-countdown :isCard="true"  :minutes="1" :seconds="10"></mg-countdown>
        </div>
        <div class="panel__content">
          <mg-countdown :isCard="true"  :isShowDay="true" :day="1" :minutes="1" :seconds="10" :format="format2"></mg-countdown>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义倒计时回调事件</div>
        <div class="panel__content">
          <mg-countdown :format="format3"  :seconds="10" @ontimeup="onTimeUp"></mg-countdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mgCountdown from '../../../components/countdown';
import docHeader from '../../components/doc-header';

export default {
  data() {
    return {
      format1: { hours: ':', minutes: ':', seconds: '' },
      format2: { day: '天', hours: ':', minutes: ':', seconds: '' },
      format3: { hours: ':', minutes: ':', seconds: '' }
    }
  },
  components: {
    mgCountdown,
    docHeader
  },
  methods: {
    onTimeup() {
      Megalo.showToast({
        title: '时间到',
        icon: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss">
</style>
