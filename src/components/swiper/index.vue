<template>
    <swiper v-if="isMINIAPP"></swiper>
    <div v-else class="mg-swiper" :instance-id="id" :class="resClassName" :style="customStyle">
        <div v-html="indicatorStyle"></div>
        <swiper
            style="flex: 1;max-width: 100%;max-height: 100%;overflow: visible;"
            :style="computedStyle"
            :options="swiperOption" ref="swiper"
            @slideChange="handleSlideChange"
            @sliderMove="handleSlideMove"
            @transitionStart="handleTransitionStart"
            @transitionEnd="handleTransitionEnd"
            @touchStart="handleTouchStart"
        >
            <slot></slot>
            <div v-show="indicatorDots" class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {mixin} from '../../mixins';
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';


    let INSTANCE_ID = 0

    export default {
        mixins: [mixin],
        components: {
            swiper,
            swiperSlide
        },
        props: {
            indicatorDots: {
                type: Boolean,
                default: false
            },
            // TODO: 暂时不支持预定义的颜色 https://developers.weixin.qq.com/miniprogram/dev/api/Color.html
            indicatorColor: {
                type: String,
                default: 'rgba(0, 0, 0, .3)'
            },
            indicatorActiveColor: {
                type: String,
                default: '#000000'
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            current: {
                type: Number,
                default: 0
            },
            interval: {
                type: Number,
                default: 5000
            },
            duration: {
                type: Number,
                default: 500
            },
            circular: {
                type: Boolean,
                default: false
            },
            vertical: {
                type: Boolean,
                default: false
            },
            // TODO: 单位处理
            previousMargin: {
                type: String,
                default: "0px"
            },
            nextMargin: {
                type: String,
                default: "0px"
            },
            displayMultipleItems: {
                type: Number,
                default: 1
            },
            // TODO: 无用属性
            skipHiddenItemLayout: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                lastTranslate: 0,
                isTransition: false,
                lastCurrent: 0,
                id: INSTANCE_ID++,
            };
        },
        computed: {
            requestAnimationFrame() {
                const hackRequestAnimationFrame = (cb) => setTimeout(cb, 16);
                return window.requestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || hackRequestAnimationFrame;
            },
            swiperOption() {
                let self = this;
                return {
                    loop: this.circular,
                    pagination: {el: '.swiper-pagination'}, // TODO: 好像不支持动态修改
                    autoplay: this.autoplay && {delay: this.interval, disableOnInteraction: false},
                    speed: this.duration,
                    direction: this.vertical ? 'vertical' : 'horizontal',
                    slidesPerView: this.displayMultipleItems,
                    centeredSlides: true,
                    loopedSlides: 2,
                    on: {
                        // click: function (e) {
                        //         let el = e.target;
                        //         while (el && el.className.indexOf('swiper-slide') === -1) {
                        //             el = el.parentNode;
                        //         }
                        //         // TODO: 找到对应元素 模拟点击
                        //         if (el.className.indexOf('swiper-slide-duplicate') !== -1) {
                        //             console.log(self.$slots.default[0].child.$slots.default[0].data.on.click(12));
                        //         }
                        // },
                        tap: function (e) {
                            let el = e.target;
                            while (el && el.className.indexOf('swiper-slide') === -1) {
                                el = el.parentNode;
                            }
                            // TODO: 找到对应元素 模拟点击
                            if (el.className.indexOf('swiper-slide-duplicate') !== -1) {
                                console.log(self.$slots.default[0].child.$slots.default[0].data.on.click(12));
                            }
                        }
                    },
                };
            },
            indicatorStyle() {
                return `<style type="text/css">
                    .${this.resClassName}[instance-id="${this.id}"] .swiper-pagination-bullet {
                        background-color: ${this.indicatorColor};
                    }
                    .${this.resClassName}[instance-id="${this.id}"] .swiper-pagination-bullet-active {
                        background-color: ${this.indicatorActiveColor};
                    }
                </style>`
            },
            resClassName() {
                return `mg-swiper${this.rootClassName}`;
            },
            computedStyle() {
                if (this.vertical) {
                    return {
                        ...this.customStyle,
                        paddingTop: this.previousMargin,
                        paddingBottom: this.nextMargin,
                    }
                }

                return {
                    ...this.customStyle,
                    paddingLeft: this.previousMargin,
                    paddingRight: this.nextMargin,
                };
            },
            animating() {
                return this.$refs.swiper.swiper.animating;
            },
        },
        mounted() {
             if (this.current) {
                this.scrollToIndex(this.current, false);
            }
        },
        methods: {
            handleTransitionEnd() {
                this.$emit('animationfinish', this.getSwiperEvent('animationfinish'));
            },
            // swiper有时候会很奇怪的连续触发两次transitionStart, 需要过滤一下
            handleTransitionStart(recursion) {
                if (this.isTransition && !recursion){
                    return;
                }
                this.isTransition = true;
                const swiper = this.$refs.swiper.swiper;
                const requestAnimationFrame = this.requestAnimationFrame;
                requestAnimationFrame(() => {
                    this.handleSlideMove();
                    if (swiper.animating) {
                        this.handleTransitionStart(true);
                    } else {
                        this.isTransition = false;
                        this.lastTranslate = this.$refs.swiper.swiper.getTranslate();
                    }
                });
            },
            handleTouchStart() {
                this.lastTranslate = this.$refs.swiper.swiper.getTranslate();
            },
            getSwiperEvent(type, detail) {
                const swiper = this.$refs.swiper.swiper;

                return {
                    target: {},
                    currentTarget: {},
                    detail: detail || {
                        current: swiper.realIndex,
                        currentItemId: swiper.slides[swiper.activeIndex].getAttribute('item-id') || '',
                        source: 'autoplay',
                    },
                    timeStamp: new Date().getTime(),
                    type,
                };
            },
            handleSlideMove() {
                const translate = this.$refs.swiper.swiper.getTranslate();
                let delta = this.lastTranslate - translate;
                if (Math.abs(delta) > this.$refs.swiper.swiper.width) {
                    this.lastTranslate = translate;
                    delta = this.lastTranslate - translate;
                }
                const dx = this.vertical ? 0 : delta;
                const dy = this.vertical ? delta : 0;
                this.$emit('transition', this.getSwiperEvent('transition', {dx, dy}));
            },
            handleSlideChange() {
                if (this.lastCurrent === this.$refs.swiper.swiper.realIndex) {
                    return;
                }
                this.lastCurrent = this.$refs.swiper.swiper.realIndex;
                this.$emit('change', this.getSwiperEvent('change'));
            },
            scrollToIndex(index, animation) {
                if (!index && index !== 0) {
                    return;
                }

                this.$refs.swiper.swiper.slideToLoop(index, animation ? this.duration : 0);
            },
        },
        watch: {
            autoplay(newValue) {
                const autoplay = this.$refs.swiper.swiper.autoplay;
                if (newValue) {
                    autoplay.start();
                } else {
                    autoplay.stop();
                }
            },
            vertical(newValue) {
                this.$refs.swiper.swiper.changeDirection(newValue ? 'vertical' : 'horizontal');
            },
            current(newValue) {
                this.scrollToIndex(newValue, true);
            },
        },
        updated() {
            const swiper = this.$refs.swiper.swiper
            if (swiper) {
                this.$nextTick(() => {
                    if (this.circular) {
                        // https://github.com/surmon-china/vue-awesome-swiper/issues/397
                        // 解决slot元素更新, 导致在loop模式下, 复制的dom节点不更新的问题
                        swiper.loopDestroy()
                        swiper.loopCreate()
                    }

                    swiper.update()
                })
            }
        },
        beforeDestroy() {
            const swiper = this.$refs.swiper.swiper
            if (swiper) {
                swiper.destroy()
            }
        }
    }
</script>

<style lang="scss">
    @import '../../style/theme/default.scss';

    * {
        box-sizing: border-box;
    }

    .mg-swiper {
        display: flex;
        margin: 0 auto;
        overflow: hidden;

        .swiper-pagination-bullet {
            opacity: 1;
        }
    }
</style>
