<template>
    <div class="index">
        <div class="banner-wrap">
            <Banner :BannerHeight="store.getBannerHeight"></Banner>
            <over-lay></over-lay>
            <scroll-hint v-scroll-to="{ element: '.wrap-block', duration: 300, easing: 'ease', offset: 1 }"></scroll-hint>
        </div>
        <index-service></index-service>
    </div>
</template>
<script setup lang="ts">
import Banner from '@/components/web/Banner.vue';
import IndexService from '@/components/web/IndexService.vue';
import OverLay from '@/components/web/overLayText.vue';
import ScrollHint from '@/components/web/scrollHint.vue';
import { onMounted, onUnmounted, ref } from 'vue';

import { useHeaderStore } from '@/stores/handleHead';

const store = useHeaderStore();

let scrollTop = ref(0);
let oldScrollTop = ref(0);

onMounted(() => {
    window.addEventListener('resize', setBannerHeight);
    setBannerHeight();
    window.addEventListener('scroll', scrollHandle);
})

onUnmounted(() => {
    window.removeEventListener('resize', setBannerHeight)
    window.removeEventListener('scroll', scrollHandle)
})

function setBannerHeight() {
    store.setBannerHeight(window.innerHeight);
}

function scrollHandle() {
    scrollTop.value = document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
    scrollTop.value <= store.getBannerHeight - 35 ? commitValue(false) : commitValue(true);
    // 滚动条移动的距离
    let scrollStep = scrollTop.value - oldScrollTop.value;
    // 更新——滚动前，滚动条距文档顶部的距离
    oldScrollTop.value = scrollStep;
    scrollStep >= 40 ? store.setHeaderShow(true) : store.setHeaderShow(false);
}

function commitValue(value: boolean) {
    store.setShadowActive(value);
    store.setNavDarkActive(value);
}

</script>

<style lang="less" scoped>
.banner-wrap {
  overflow: hidden;
  position: relative;
}

.overlay {
  z-index: 666;
}

.wrap-block {
  position: relative;
  padding-top: 54px;
}
</style>