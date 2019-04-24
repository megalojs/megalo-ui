<template>
    <!--TODO: 验证是否可用-->
    <swiper-slide :item-id="itemId" :class="resClassName" :style="customStyle">
        <slot></slot>
    </swiper-slide>
</template>

<script>
    import {mixin} from '../../mixins';

    import { swiperSlide } from 'vue-awesome-swiper';

    export default {
        mixins: [mixin],
        components: {
            swiperSlide
        },
        props: {
            itemId: {
                type: String,
            },
        },
        computed: {
            resClassName() {
                return `mg-swiper-item${this.rootClassName}`;
            },
        }
    }
</script>
