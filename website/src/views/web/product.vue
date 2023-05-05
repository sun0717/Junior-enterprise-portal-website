<template>
    <div>
        <!-- <AwHeader class="product_header"></AwHeader> -->
        <div class="product">
            <ul class="product-fullpage-indicator">
                <li v-for="(item, index) in products" :key="item.id" class="product-fullpage-indicator-item"
                    :class="{ active: activeIndex === index }" @click="activeIndex = index">
                    <img class="product_logo" :src="item.product_logo" alt="产品 logo" />
                </li>
            </ul>
            <transition :duration="duration" :name="transitionName">
                <!-- ... the buttons ... -->
                <div :key="activeIndex" class="view-wrapper" v-if="!loading"
                    :style="`backgroundImage: url(${item.cover_img})`">
                    <div class="content">
                        <div class="logo">
                            <img :src="item.product_logo" alt="" />
                        </div>
                        <h2>{{ item.product_title }}</h2>
                        <div class="description">
                            <p>{{ item.product_desc }}</p>
                            <p>
                                {{ item.product_sub_desc }}
                            </p>
                            <p>更多信息，请访问：</p><a :href="item.link" target="_blank">{{ item.product_link }}</a>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getProductList } from '@/api/product';
import { useHeaderStore } from '@/stores/handleHead';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const store = useHeaderStore();
const loading = ref(false);
const products = ref<Array<any>>([]);
const activeIndex = ref(0);
const transitionName = ref('');
const scrolling = ref(false);
const duration = ref(1000);

const item = computed(() => products.value[activeIndex.value] || {});
// 产品的索引
watch(activeIndex, (newIndex, oldIndex) => {
    if (scrolling.value) {
        return;
    }
    // new: 0 < old: 1 ? 
    transitionName.value = newIndex < oldIndex ? 'move-down' : 'move-up';
})

onBeforeMount(async () => {
    store.setShadowActive(false);
    store.setNavDarkActive(true);
    store.setHeaderShow(false);
    loading.value = true;
    const { data: res } = await getProductList();
    if (res.status === 200) {
        products.value = res.data.list;
        loading.value = false;
    }
})

onMounted(() => {
    window.addEventListener('mousewheel', mousewheelHandler);
    window.addEventListener('DOMMouseScroll', mousewheelHandler);
})

onBeforeUnmount(() => {
    window.removeEventListener('mousewheel', mousewheelHandler);
    window.removeEventListener('DOMMouseScroll', mousewheelHandler);
})

function mousewheelHandler(e: Event) {
    if (scrolling.value) {
        return;
    }
    scrolling.value = true;
    // @ts-ignore
    if (e.wheelDelta > 0 || e.detail < 0) {
        // 列表向上滚动，即鼠标滚轮向上滚动
        transitionName.value = 'move-down';
        // 第一个向上滑动后滑动直接滑动到最后一项
        activeIndex.value =
            activeIndex.value === 0
                ? products.value.length - 1
                : activeIndex.value - 1
    } else {
        transitionName.value = 'move-up';
        activeIndex.value = (activeIndex.value + 1) % products.value.length;
    }
    setTimeout(() => {
        scrolling.value = false;
    }, duration.value);
}

onBeforeRouteLeave((to, from, next) => {
    if (from.name === 'product') {
        store.setNavDarkActive(false);
        next();
    }
})
</script>
<style lang="less" scoped>
.product_header {
    background-color: rgba(255, 255, 255, .7);
    // backdrop-filter属性可以用于在元素后面的区域应用图形效果，例如模糊或颜色偏移。因为它应用于元素后面的所有内容，所以要看到效果，必须使元素或其背景至少部分透明
    backdrop-filter: blur(10px);
}

.product {
    position: fixed;
    z-index: -1;
    top: 60px;
    right: 0;
    left: 0;
    bottom: 0;
    min-height: 600px;
    min-width: 700px;

    &-fullpage-indicator {
        position: absolute;
        z-index: 333;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);

        &-item {
            margin: 22px 0;
            width: 5vh;
            height: 5vh;
            min-height: 30px;
            min-width: 30px;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 50%;
            overflow: hidden;

            &:hover,
            &.active {
                transform: scale(1.3);

                box-shadow: 0 0 14px 0;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .view-wrapper {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: absolute;
        // vh->相对视口高度->1->块高度的1%  vw视口的初始包含块的高度->1->块宽度的1% 随用户的视口改变大小。视口大小的变化也会让盒子和字体的大小变化
        height: 100vh;
        width: 100%;
        padding-left: 100px;

        .content {
            width: 300px;
            transform: translateY(-60%);
            position: absolute;
            top: 50%;

            .logo {
                width: 80px;
                height: 80px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            h2 {
                margin-top: 32px;
                line-height: 32px;
                font-size: 28px;
                color: #1f2329;
            }

            .description {
                margin-top: 24px;
                line-height: 32px;
                font-size: 14px;
                color: #1f2329;

                p+p {
                    margin-top: 16px;
                }
            }
        }
    }
}

.move-up-leave-active {
    -webkit-animation: outUp .7s cubic-bezier(.66, 0, .34, 1);
    animation: outUp .7s cubic-bezier(.66, 0, .34, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -ms-transform: scale(1);
    transform: scale(1);
}

.move-up-enter-active {
    -webkit-animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
    animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

// move-down 

.move-down-leave-active {
    // ok
    -webkit-animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
    animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -ms-transform: translateY(0);
    transform: translateY(0);
}

.move-down-leave-to {
    // ok
    -webkit-animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
    animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -ms-transform: translateY(0);
    transform: translateY(0);
}

.move-down-enter-active {
    -webkit-animation: inDown .7s cubic-bezier(.66, 0, .34, 1);
    animation: inDown .7s cubic-bezier(.66, 0, .34, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -ms-transform: scale(.6);
    transform: scale(.6);
}

.move-up-enter {
    animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
    animation-fill-mode: forwards;
}



.move-up-enter-active,
.move-down-enter-active {
    .logo {
        -webkit-animation: slideUpIn30 .77s .4s;
        animation: slideUpIn30 .77s .4s;
    }

    h2 {
        -webkit-animation: slideUpIn150 .77s .4s;
        animation: slideUpIn150 .77s .4s;
    }

    .description {
        -webkit-animation: slidUpIn100px .77s .4s;
        animation: slidUpIn100px .77s .4s;
    }
}

@keyframes inUp {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    60% {
        opacity: 0.1;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes outUp {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
}

@keyframes inDown {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }

    60% {
        opacity: 0.1;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes outDown {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}

@keyframes slideUpIn30 {
    0% {
        transform: translate3d(0, 30%, 0);
        visibility: hidden;
    }

    100% {
        transform: translateZ(0);
        visibility: visible;
    }
}

@keyframes slideUpIn100px {
    0% {
        transform: translate3d(0, 100px, 0);
        visibility: hidden;
    }

    100% {
        transform: translateZ(0);
        visibility: visible;
    }
}
</style>