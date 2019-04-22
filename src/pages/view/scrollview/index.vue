<template>
    <div class="page">
        <doc-header title="ScrollView 可滚动视图区域"></doc-header>
        <mgScrollView
                scroll-x
                scroll-y
                style="height: 200px;"
                @scroll="scroll"
                @scrolltoupper="upper"
                @scrolltolower="lower"
                :scrollWithAnimation="true"
                :scroll-top="scrollTop"
                :scrollIntoView="toView"
        >
            <div class="scroll-view-item bc_green">
                <button>click me to scroll into view</button>
            </div>
            <div class="scroll-view-item bc_red"></div>
            <div class="scroll-view-item bc_yellow"></div>
            <div class="scroll-view-item bc_blue"></div>
        </mgScrollView>

        <mgScrollView
                scroll-x
                scroll-y
                style="height: 200px;"
                @scroll="scroll"
                @scrolltoupper="upper"
                @scrolltolower="lower"
                :scrollWithAnimation="true"
                :scroll-top="scrollTop"
                :scrollIntoView="toView"
        >
            <div class="scroll-view-item bc_green">
                <button>click me to scroll into view</button>
            </div>
            <div class="scroll-view-item bc_red"></div>
            <div class="scroll-view-item bc_yellow"></div>
            <div class="scroll-view-item bc_blue"></div>
        </mgScrollView>
        <button size="mini" @click="tap">click me to scroll into view</button>
        <button size="mini" @click="tapMove">click me to scroll</button>
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
