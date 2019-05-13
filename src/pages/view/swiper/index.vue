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
            :currentItemId="''+currentItemId"
            @change="handleChange"
            @animationfinish="animationfinish"
            @transition="transition"
      >
        <mgSwiperItem v-for="i in slides" :key="'test' + i" :item-id="'div' + i">
          <div :key="i" class="swiper-item" :class="i" @click="handleClick(i)"></div>
        </mgSwiperItem>
      </mySwiper>
      <button @click="current = (current + 1) % slides.length">slide to next</button>
      <button @click="indicatorDots = !indicatorDots">indicatorDots</button>
      <button @click="autoplay = !autoplay">autoplay</button>
      <button @click="vertical = !vertical">vertical</button>
    </div>
  </div>
</template>

<script>
  import docHeader from '../../components/doc-header';
  import mySwiper from '../../../components/swiper';
  import mgSwiperItem from '../../../components/swiper-item';

  export default {
    name: 'home',
    components: {
      docHeader,
      mySwiper,
      mgSwiperItem,
    },
    data() {
      return {
        slides: ['bc_red', 'bc_yellow', 'bc_blue', 'bc_green'],
        displayMultipleItems: 1,
        nextMargin: '10px',
        autoplay: false,
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
    },
  }
</script>

<style lang="scss">
  .swiper-item {
    width: 3300px;
    height: 230px;
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
