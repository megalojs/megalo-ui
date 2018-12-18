<template>
  <div class="page">
    <doc-header title="Avatar 头像"></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">圆形头像</div>
          <div class="panel__content">
            <div class="example-item">
              <div class="subitem">
                <mg-avatar :circle="true"  size="small" :image="avatarImg"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar :circle="true"  :image="avatarImg"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar :circle="true"  size="large" :image="avatarImg"></mg-avatar>
              </div>
            </div>
          </div>
      </div>
      <div class="panel">
        <div class="panel__title">圆角矩形头像</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
                <mg-avatar size="small"  :image="avatarImg"></mg-avatar>
            </div>
            <div class="subitem">
                <mg-avatar :image="avatarImg"></mg-avatar>
            </div>
            <div class="subitem">
                <mg-avatar size="large"  :image="avatarImg"></mg-avatar>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
          <div class="panel__title">圆形头像（支持文本）</div>
          <div class="panel__content">
            <div class="example-item">
              <div class="subitem">
                <mg-avatar :circle="true"  size="small" text="考拉"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar :circle="true"  text="考拉"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar :circle="true"  size="large" text="考拉"></mg-avatar>
              </div>
            </div>
          </div>
      </div>
      <div class="panel">
        <div class="panel__title">圆角矩形头像（支持文本）</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-avatar size="small"  text="考拉"></mg-avatar>
            </div>
            <div class="subitem">
              <mg-avatar text="考拉"></mg-avatar>
            </div>
            <div class="subitem">
              <mg-avatar size="large"  text="考拉"></mg-avatar>
            </div>
          </div>
        </div>
      </div>
      <template v-if="isWEAPP">
        <div class="panel">
          <div class="panel__title">openData 头像（仅小程序支持）</div>
          <div class="panel__content">
            <div class="example-item">
              <div class="subitem">
                <mg-avatar :openData="openData" size="small"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar :openData="openData"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar size="large" :openData="openData"></mg-avatar>
              </div>
              <div class="subitem">
                <mg-avatar size="large" circle="true" :openData="openData"></mg-avatar>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import docHeader from '../../components/doc-header';
import mgAvatar from '../../../components/mg-avatar';
import { isWEAPP } from '../../../util';

export default {
  data() {
    return {
      isWEAPP,
      openData: isWEAPP ? { type: 'userAvatarUrl' } : null,
      avatarImg: 'https://haitao.nos.netease.com/01497646-8232-4e79-9f5d-c6bd79b0a3b5_400_400.png'
    }
  },
  components: {
    mgAvatar,
    docHeader   
  }
}
</script>

<style lang="scss">
.panel__content .example-item .subitem {
  margin-left: 32px;
  vertical-align: middle; 
}
</style>
