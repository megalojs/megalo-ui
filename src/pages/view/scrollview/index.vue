<template>
  <div class="page">
    <doc-header title="ScrollView 可滚动视图区域"></doc-header>
    <mgScrollView
        scroll-x
        scroll-y
        style="height: 200px;display: flex;flex-direction: column;"
        @scroll="scroll"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        :scrollWithAnimation="false"
        :scroll-top="scrollTop"
        :scroll-into-view="toView"
    >
      <div id="green" class="scroll-view-item bc_green"></div>
      <div id="red" class="scroll-view-item bc_red"></div>
      <div id="yellow" class="scroll-view-item bc_yellow"></div>
      <div id="blue" class="scroll-view-item bc_blue"></div>
    </mgScrollView>
    <button size="mini" @click="tap">click me to scroll into view</button>
    <button size="mini" @click="tapMove">click me to scroll</button>

    <mgScrollView
        scroll-x
        style="height: 200px;flex-direction: row;display: flex;"
        @scroll="scroll"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        :scrollWithAnimation="false"
        :scroll-top="scrollTop"
        :scroll-into-view="toView"
    >
      <div class="scroll-view-item_H bc_green"></div>
      <div class="scroll-view-item_H bc_red"></div>
      <div class="scroll-view-item_H bc_yellow"></div>
      <div class="scroll-view-item_H bc_blue"></div>
    </mgScrollView>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mgIcon from '../../../components/icon';
  import mgScrollView from '../../../components/scrollview';

  const order = ['red', 'yellow', 'blue', 'green', 'red']
  export default {
    name: 'home',
    components: {
      docHeader,
      mgIcon,
      mgScrollView
    },
    data() {
      return {
        toView: 'red',
        scrollTop: 100
      }
    },
    methods: {
      scroll(e) {
        console.log(e);
      },
      tap(e) {
        for (let i = 0; i < order.length; ++i) {
          if (order[i] === this.toView) {
            this.toView = order[i + 1]
            break
          }
        }
      },
      upper(e) {
        console.log(e)
      },
      lower(e) {
        console.log(e)
      },
      tapMove(e) {
        this.scrollTop += 10;
      }
    },
  }
</script>

<style lang="scss">
  .scroll-view-item_H {
    height: 200px;
    min-width: 500px;
  }

  .scroll-view-item {
    width: 3300px;
    height: 200px;
    min-height: 200px;
  }

  .bc_green {
    background-color: green;
  }

  .bc_red {
    background-color: red;
  }

  .bc_yellow {
    background-color: yellow;
  }

  .bc_blue {
    background-color: blue;
  }
</style>
