<template>
  <div class="page">
    <doc-header title="Divider 分隔线"></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">一般用法</div>
        <div class="panel__content no-padding">
          <mg-divider content="分割线"></mg-divider>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义颜色</div>
        <div class="panel__content no-padding">
          <mg-divider content="没有更多了" fontColor="#ed3f14" lineColor="#ed3f14"></mg-divider>
          <mg-divider content="没有更多了" fontColor="#ff9900" lineColor="#ff9900"></mg-divider>
          <mg-divider content="没有更多了" fontColor="#2d8cf0" lineColor="#2d8cf0"></mg-divider>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">自定义内容</div>
        <div class="panel__content no-padding">
          <mg-divider>
            <mg-icon value="check-circle"></mg-icon>
          </mg-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docHeader from '../../components/doc-header';
import mgIcon from '../../../components/icon';
import mgDivider from '../../../components/divider';

export default {
  components: {
    docHeader,
    mgIcon,
    mgDivider
  }
}
</script>

<style lang="scss">
.panel__content {
  .bar-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
