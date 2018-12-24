<template>
  <div class="page">
    <doc-header title="Steps 步骤条"></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">基础用法</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-steps :items="items1" :current="current1" @onchange="onChange(1, $event)"></mg-steps>
            <mg-steps :items="items2" :current="current2" @onchange="onChange(2, $event)"></mg-steps>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">带附加信息</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-steps :items="items3" :current="current3" @onchange="onChange(3, $event)"></mg-steps>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义图标</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-steps :items="items4" :current="current4" @onchange="onChange(4, $event)"></mg-steps>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">状态步骤条</div>
        <div class="panel__content">
          <div class="example-item">
            <mg-steps :items="items5" :current="current5" @onchange="onChange(5, $event)"></mg-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mgSteps from '../../../components/steps';
  export default {
    data() {
      return {
        current1: 0,
        current2: 0,
        current3: 0,
        current4: 0,
        current5: 1,
        items1: [{
          'title': '步骤一'
        }, {
          'title': '步骤二'
        }],
        items2: [{
          'title': '步骤一'
        }, {
          'title': '步骤二'
        }, {
          'title': '步骤三'
        }],

        items3: [{
          'title': '步骤一',
          'desc': '这里是额外的信息，最多两行'
        }, {
          'title': '步骤二',
          'desc': '这里是额外的信息，最多两行'
        }, {
          'title': '步骤三',
          'desc': '这里是额外的信息，最多两行'
        }],

        items4: [{
          'title': '步骤一',
          'desc': '这里是额外的信息，最多两行',
          'icon': {
            value: 'sound',
            activeColor: '#fff',
            inactiveColor: '#78A4FA',
            size: '14'
          }
        }, {
          'title': '步骤二',
          'desc': '这里是额外的信息，最多两行',
          'icon': {
            value: 'shopping-cart',
            activeColor: '#fff',
            inactiveColor: '#78A4FA',
            size: '14'
          }
        }, {
          'title': '步骤三',
          'desc': '这里是额外的信息，最多两行',
          'icon': {
            value: 'camera',
            activeColor: '#fff',
            inactiveColor: '#78A4FA',
            size: '14'
          }
        }],

        items5: [{
          'title': '步骤一',
          'desc': '这里是额外的信息，最多两行',
          'success': true
        }, {
          'title': '步骤二',
          'desc': '这里是额外的信息，最多两行'
        }, {
          'title': '步骤三',
          'desc': '这里是额外的信息，最多两行',
          'error': true
        }]
      }
    },
    components: {
      docHeader,
      mgSteps
    },
    methods: {
      onChange(i, e) {
        this[`current${i}`] = e.current;
      }
    }
  }
</script>

<style lang="scss">
</style>