<template>
  <div class="page">
    <doc-header title="Swiper 滑块视图容器"></doc-header>
    <div class="doc-body">
      <mySwiper
        style="height: 230px"
        :indicator-dots="indicatorDots"
        :circular="circular"
        :autoplay="autoplay"
        :displayMultipleItems="displayMultipleItems"
        :interval="interval"
        :vertical="vertical"
        previousMargin="20px"
        :nextMargin="nextMargin"
        :current="current"
        :currentItemId="currentItemId"
        @change="handleChange"
        @animationfinish="animationfinish"
        @transition="transition"
      >
        <mgSwiperItem v-for="i in slides" :item-id="i">
          <div @click="handleClick(i)" style="border: 1px solid yellow;height: 200px;background-color: #fff;">{{i}}</div>
        </mgSwiperItem>
      </mySwiper>
      <button @click="current = (current + 1) % slides.length">slide to next</button>
      <button @click="indicatorDots = !indicatorDots">indicatorDots</button>
      <button @click="autoplay = !autoplay">autoplay</button>
      <button @click="vertical = !vertical">vertical</button>
      <button @click="circular = !circular">circular</button>
      <button @click="interval += 1000">interval</button>
      <button @click="nextMargin = '20px'">nextMargin</button>
      <button @click="slides.push(slides.length)">add new slides</button>
      <button @click="slides = [7, 8]">change slides</button>
      <button @click="displayMultipleItems++">displayMultipleItems</button>
    </div>
  </div>
</template>

<script>
    import docHeader from '../../components/doc-header';
    import mySwiper from '../../../components/swiper';
    import mgSwiperItem from '../../../components/swiper-item';

    const order = ['red', 'yellow', 'blue', 'green', 'red']
    export default {
        name: 'home',
        components: {
            docHeader,
            mySwiper,
            mgSwiperItem,
        },
        data() {
            return {
                slides: [0, 1, 2],
                displayMultipleItems: 1,
                nextMargin: '10px',
                autoplay: true,
                vertical: false,
                circular: true,
                indicatorDots: true,
                interval: 1000,
                toView: 'red',
                current: 0,
                currentItemId: '',
                scrollTop: 100
            }
        },
        methods: {
            handleClick(i) {
                alert('swiper click ' + i);
            },
            handleChange(e) {
                // console.log(e);
            },
            animationfinish(e) {
                // console.log(e);
            },
            transition(e) {
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
        },
    }
</script>

<style lang="scss">

  .scroll-view-item_H {
    width: 5200px;
    height: 200px;
  }

  .scroll-view-item {
    width: 3300px;
    height: 200px;
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

  .bc_yellow {
    background-color: yellow;
  }
</style>
