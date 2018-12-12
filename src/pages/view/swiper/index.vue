<template>
  <section class="example-item">
    <mg-swiper
      class="swiper"
      indicatorColor="#999" 
      indicatorActiveColor="#333" 
      :current="current" 
      :duration="duration" 
      :interval="interval" 
      :circular="isCircular" 
      :autoplay="isAutoplay" 
      :indicatorDots="hasIndicatorDots"
    >
      <swiper-item 
        v-for="(item, index) in imgUrls"
        :key="index"
      >
        <img mode="widthFix" :src="item" class="slide-image"/>
      </swiper-item>
    </mg-swiper>
  </section>
</template>

<script>
import mgSwiper from '../../../components/mg-swiper'
export default {
  data() {
    return {
      current: 1,
        duration: 500,
        interval: 5000,
        isCircular: false,
        isAutoplay: false,
        hasIndicatorDots: true,
        imgUrls: ['https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180', 
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180', 
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180']
    }
  },
  components: {
    mgSwiper
  }
}
</script>

<style lang="scss">
.example-item {
  .control-cnt {
    margin-top: 40px;
  }

  .swiper {
    height: 180px;
  }

  .slide-image {
    width: 100%;
  }
}
</style>
