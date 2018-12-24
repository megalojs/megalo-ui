<template>
  <div class="page">
    <doc-header title="Tag 标签" ></doc-header>
    <div class="doc-body">
      <div class="panel">
        <div class="panel__title">空心标签</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag :circle="true" >标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag >标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag :circle="true"  :active="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag :active="true" >标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">实心标签</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag type="primary"  :circle="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag type="primary" >标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag type="primary"  :circle="true" :active="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag type="primary"  :active="true">标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">点击事件</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem" :key="index" v-for="(item, index) in resTagList">
              <mg-tag :name="item.name"  type="primary" :active="item.active"
                :circle="item.circle" @onclick="onClick(item)">tag-{{index
                + 1}}</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">不可点击态</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag type="primary"  :circle="true" :disabled="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag type="primary"  :disabled="true">标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">空心标签（小）</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag size="small"  :circle="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small" >标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  :circle="true" :active="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  :active="true">标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">实心标签（小）</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag size="small"  type="primary" :circle="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  type="primary">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  type="primary" :circle="true" :active="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  type="primary" :active="true">标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel__title">不可点击态（小）</div>
        <div class="panel__content">
          <div class="example-item">
            <div class="subitem">
              <mg-tag size="small"  type="primary" :circle="true" :disabled="true">标签</mg-tag>
            </div>
            <div class="subitem">
              <mg-tag size="small"  type="primary" :disabled="true">标签</mg-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import { isMINIAPP, isWEB } from '../../../util';
  import mgTag from '../../../components/tag';

  export default {
    data() {
      return {
        tagList: [
          {
            name: 'tag-1',
            active: false
          }, 
          {
            name: 'tag-2',
            active: false
          }, 
          {
            name: 'tag-3',
            active: true
          }, 
          {
            name: 'tag-4',
            active: true
          }, 
        ]
      }
    },
    computed: {
      resTagList() {
        return this.tagList.map((item, index) => {
          item.circle = index % 2 === 0;
          return item;
        });
      }
    },
    components: {
      docHeader,
      mgTag
    },
    methods: { 
      onClick(data) {
        const { tagList } = this;
        const findIndex = tagList.findIndex((item) => {
          return item.name === data.name;
        });
        const active = !tagList[findIndex].active;
        tagList[findIndex].active = active;
        const content = `\u60A8\u70B9\u51FB\u7684 tag \u6807\u7B7E\u540D\u662F\uFF1A${data.name}\uFF0C\u70B9\u51FB\u524D\u662F\u5426\u9009\u4E2D\uFF1A${data.active}\uFF0C\u70B9\u51FB\u540E\uFF1A${active}`;
        this.tagList = tagList;
        if(isMINIAPP) {
          Megalo.showModal({ content, showCancel:false });
        } else if(isWEB) {
          alert(content);
        }
      }
    }
  }
</script>

<style lang="scss">
</style>