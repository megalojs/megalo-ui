<template>
  <div class="page">
    <doc-header title="NoticeBar 通告栏" ></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">文字</div>
        <div class="panel__content">
          <div class="bar-item">
            <mg-noticebar :single="true" >[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar >[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">跑马灯</div>
        <div class="panel__content">
          <div class="bar-item">
            <mg-noticebar :marquee="true" >[纯文字]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :marquee="true"  icon="volume-plus">[带icon]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :marquee="true" >[超长文本]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]</mg-noticebar>
          </div>
        </div>
      </div>
      <div class="panel">
          <div class="panel__title">图标</div>
          <div class="panel__content">
            <div class="bar-item">
              <mg-noticebar icon="volume-plus"  :single="true">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
            </div>
            <div class="bar-item">
              <mg-noticebar icon="volume-plus" >[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
            </div>
          </div>
      </div>
      <div class="panel">
        <div class="panel__title">查看更多</div>
        <div class="panel__content">
          <div class="bar-item">
            <mg-noticebar :showMore="true"  :single="true" @ongotomore="onGotoMore">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :showMore="true"  icon="volume-plus" :single="true" @ongotomore="onGotoMore">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :showMore="true"  moreText="更多内容" @ongotomore="onGotoMore" >[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :showMore="true"  moreText="更多内容" icon="volume-plus" @ongotomore="onGotoMore">[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">关闭按钮</div>
        <div class="panel__content">
          <div class="bar-item">
            <mg-noticebar :close="true"  :single="true">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true"  icon="volume-plus" :single="true">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true"  moreUrl="https://taro.aotu.io/" :single="true">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true"  icon="volume-plus" moreUrl="https://taro.aotu.io/" :single="true">[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true" >[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true"  moreUrl="https://taro.aotu.io/">[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
          <div class="bar-item">
            <mg-noticebar :close="true"  icon="volume-plus" moreUrl="https://taro.aotu.io/">[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏</mg-noticebar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docHeader from '../../components/doc-header';
import mgNoticebar from '../../../components/noticebar';
import { isMINIAPP, isWEB } from '../../../util';   
export default {
  components: {
    docHeader,
    mgNoticebar
  },
  methods: {
    onGotoMore() {
      if(isMINIAPP) {
        Megalo.showModal({ content: '点击了更多！' })
      } else if(isWEB) {
        alert('点击了更多！');
      }
    }
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
