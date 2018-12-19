<template>
  <div class="page">
    <doc-header title="Badge 徽标"></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">数字</div>
        <div class="panel__content">
          <div class="badge-item">
            <div class="subitem">
              <mg-badge :value="10"  :maxValue="99">
                <button size="mini">按钮</button>
              </mg-badge>
            </div>
            <div class="subitem">
              <mg-badge :value="100"  :maxValue="99">
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">小红点</div>
        <div class="panel__content">
          <div class="badge-item">
            <div class="subitem">
              <mg-badge :dot="true" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
            <div class="subitem">
              <mg-badge :dot="true" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">文本</div>
        <div class="panel__content">
          <div class="badge-item">
            <div class="subitem">
              <mg-badge value="NEW" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
            <div class="subitem">
              <mg-badge value="NEW" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">省略号</div>
        <div class="panel__content">
          <div class="badge-item">
            <div class="subitem">
              <mg-badge :value="dot" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
            <div class="subitem">
              <mg-badge :value="dot" >
                <button size="mini" >按钮</button>
              </mg-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docHeader from '../../components/doc-header';
import mgBadge from '../../../components/badge';
export default {
  data() {
    return {
      dot: '···'
    }
  },
  components: {
    docHeader,
    mgBadge
  }
}
</script>

<style lang="scss">
.panel__content {
  .badge-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .subitem {
      display: inline-block;
      margin-left: 40px;
    }
  }
}
button {
  background-color: #fff
}
</style>
