<template>
  <div class="page page-index">
    <div class="logo">
      <image :src="logoImg" class="img" mode="widthFix" />
    </div>
    <div class="page-title">Megalo UI</div>
    <div class="module-list">
      <div 
        class="module-list__item"  
        @click="gotoPanel(item.id)"
        v-for="(item, index) in list" 
        :key="index">
        <div class="module-list__icon">
          <img :src="item.icon" class="img" mode="widthFix" />
        </div>
        <div class="module-list__info">
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
        <div class="module-list__arrow">
          <text class="at-icon at-icon-chevron-right"></text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iconView, logoImg } from '../constants/url.js'; 
export default {
  created() {
    console.log(Megalo)
  },
  data() {
    return {
      list: [{
        id: 'View',
        title: '视图',
        content: '包含通告栏、标签、徽标等',
        icon: iconView
      }],
      logoImg
    }
  },
  methods: {
    gotoPanel(id) {
      Megalo.navigateTo({url: `/pages/panel/index?id=${id.toLowerCase()}`})
    }
  }
}
</script>

<style lang="scss">
@import '../../style/icon/index.scss';

.page {
  position: relative;
  background-color: #f8f8f8;

  view {
    box-sizing: border-box;
  }
}

.page-index {
  padding-top: 60px;
  padding-bottom: 100px;

  .logo {
    margin: 0 auto;
    margin-top: 60px;
    font-size: 0;
    text-align: center;

    .img {
      width: 264px;
      height: 180px;
    }
  }

  .page-title {
    margin-top: 24px;
    color: #333;
    font-size: 36px;
    text-align: center;
  }

  .module-list {
    margin-top: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 40px;
      padding: 0 30px;
      width: 90%;
      height: 144px;
      background: #fff;
      box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.04);
      border-radius: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      // color: #78A4FA;
      color: #00c97f;
      text-align: center;
      border: 5px solid rgba(120, 164, 250, 0.16);
      border-radius: 50%;

      .img {
        width: 30px;
        height: 30px;
      }
    }

    &__info {
      flex: 1;
      text-align: left;
      margin-left: 24px;

      .title {
        color: #6A6A77;
        font-size: 28px;
        font-weight: bold;
      }

      .content {
        color: #88889C;
        font-size: 22px;
      }
    }

    &__arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 62px;
      height: 62px;
      color: #fff;
      text-align: center;
      // background: #78A4FA;
      background: #00c97f;
      box-shadow: 4px 10px 30px 0 rgba(120, 164, 250, 0.30);
      border-radius: 50%;
    }
  }
}

.page-body {
  padding: 40px;
}

.component-group {
  font-size: 32px;
}

.group-item {
  padding: 0 30px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;

  &:first-child {
    margin-top: 0;
  }
}

.group-info {
  padding: 30px 0;
  display: flex;
  align-items: center;
  transition: opacity 0.3s;

  &-title {
    opacity: 0.5;
  }
}

.group-list {
  font-size: 28px;

  .list-component {
    padding: 20px 0;
    position: relative;
    align-items: center;

    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d8d8d8;
      color: #d8d8d8;
    }

    &:first-child::before {
      display: none;
    }

    &-info {
      width: 100%;
    }

    &-arrow {
      display: inline-block;
      height: 18px;
      width: 18px;
      border-width: 2px 2px 0 0;
      border-color: #888;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) translate(-50%);
      position: absolute;
      top: 50%;
      right: 0;
    }
  }
}
</style>
