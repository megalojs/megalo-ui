<template>
  <div class="page">
    <div class="panel-header">
      <div class="panel-header__icon">
        <template v-if="icon">
          <img :src="icon" class="img" mode="widthFix" />
        </template>
        <template v-else>
          <span class="mg-icon mg-icon-list"></span>
        </template>
      </div>
      <div class="panel-header__title">{{title}}</div>
    </div>
    <div class="panel-body">
      <div class="component-list">
        <div class="component-list__item" :key="item.id" @click="gotoComponent(item.id)" v-for="item in itemList">
          <span class="name">{{item.id + ' ' + item.name}}</span>
          <span class="mg-icon mg-icon-chevron-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { iconView } from '../constants/url.js';
  import { isWEB } from '@/util';
  const panelNames = {
    view: {
      name: '视图',
      icon: iconView
    }
  }
  const list = {
    view: [{
        id: 'Avatar',
        name: '头像'
      },
      // {
      //   id: 'Article',
      //   name: '文章'
      // }, 
      {
        id: 'Badge',
        name: '徽标'
      }, {
        id: 'Button',
        name: '按钮'
      }, {
        id: 'CountDown',
        name: '倒计时'
      }, {
        id: 'Curtain',
        name: '幕帘'
      }, {
        id: 'Divider',
        name: '分割线'
      }, {
        id: 'Form',
        name: '表单'
      }, {
        id: 'NoticeBar',
        name: '通告栏'
      }, {
        id: 'Tag',
        name: '标签'
      }, {
        id: 'Timeline',
        name: '时间轴'
      }, {
        id: 'ScrollView',
        name: '可滚动视图区域'
      },
      // {
      //   id: 'Swiper',
      //   name: '滑块视图容器'
      // }, 
      // {
      //   id: 'Load-More',
      //   name: '页面提示'
      // }, 
      {
        id: 'Steps',
        name: '步骤条'
      }
    ]
  }
  export default {
    computed: {
      currentId() {
        let id = '';
        if(isWEB) {
          id = this.$route.query.id;
        } else {
          id = this.$mp.options.id;
        }
        return id.toLowerCase();
      },
      title() {
        const {
          currentId
        } = this;
        return panelNames[currentId] && panelNames[currentId].name || '';
      },
      icon() {
        const {
          currentId
        } = this;
        return panelNames[currentId] && panelNames[currentId].icon || '';
      },
      itemList() {
        const {
          currentId
        } = this;
        return list[currentId] || [];
      }
    },
    methods: {
      gotoComponent(id) {
        const url = `/pages/${this.currentId.toLowerCase()}/${id.toLowerCase()}/index`;
        Megalo.navigateTo({
          url
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/icon/index.scss';
  @import '../../style/mixins/index.scss';
  @import '../../style/theme/default.scss';

  /**
 * 分类页样式
 */
  .panel-header {
    display: flex;
    align-items: center;
    padding: 60px;
    height: 180px;

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      // color: #78A4FA;
      color: #00c97f;
      text-align: center;
      background: #fff;
      box-shadow: 0 20px 80px 0 rgba(0, 0, 0, 0.11);
      border-radius: 10px;

      .img {
        width: 36px;
        height: 36px;
      }
    }

    &__title {
      margin-left: 32px;
      // color: #78A4FA;
      color: #00c97f;
      font-size: 36px;
      font-weight: bold;
    }
  }

  .panel-body {
    min-height: calc(100vh - 180px);
    background: #fff;
    box-shadow: 0 26px 163px 0 rgba(0, 0, 0, 0.11);
  }

  .component-list {
    margin: 20px 60px 40px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 120px;
      @include hairline-bottom();

      .name {
        color: #1d1d26;
        font-size: 28px;
      }
    }
  }
</style>