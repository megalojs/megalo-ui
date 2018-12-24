<template>
  <div class="page">
    <doc-header title="Timeline 时间轴"></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">基础用法</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-timeline :items="items1"></mg-timeline>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义颜色</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-timeline :items="items2"></mg-timeline>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义图标</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-timeline :items="items3"></mg-timeline>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">幽灵节点</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-timeline :pending="true" :items="items4"></mg-timeline>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">丰富内容</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-timeline :pending="true" :items="items5"></mg-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mgTimeline from '../../../components/timeline';
  export default {
    data() {
      return {
        items1: [{
          title: '刷牙洗脸'
        }, {
          title: '吃早餐'
        }, {
          title: '上班'
        }, {
          title: '睡觉'
        }],
        items2: [{
          title: '刷牙洗脸'
        }, {
          title: '吃早餐',
          color: 'blue'
        }, {
          title: '上班',
          color: 'red'
        }, {
          title: '睡觉',
          color: 'yellow'
        }],
        items3: [{
          title: '刷牙洗脸',
          icon: 'check-circle'
        }, {
          title: '吃早餐',
          icon: 'clock'
        }, {
          title: '上班',
          icon: 'clock'
        }, {
          title: '睡觉',
          icon: 'clock'
        }],
        items4: [{
          title: '刷牙洗脸'
        }, {
          title: '吃早餐'
        }, {
          title: '上班'
        }, {
          title: '睡觉'
        }],
        items5: [{
          title: '刷牙洗脸',
          content: ['大概8:00'],
          icon: 'check-circle'
        }, {
          title: '吃早餐',
          content: ['牛奶+面包', '餐后记得吃药'],
          icon: 'clock'
        }, {
          title: '上班',
          content: ['查看邮件', '写PPT', '发送PPT给领导'],
          icon: 'clock'
        }, {
          title: '睡觉',
          content: ['不超过23:00'],
          icon: 'clock'
        }]
      }
    },
    components: {
      docHeader,
      mgTimeline
    }
  }
</script>

<style lang="scss">
</style>