<template>
  <div class="banner">
    <div class="Limit">
      <el-carousel :interval="5000" arrow="hover" :height="HomePage.getBannerHeight + 'px'" :autoplay="true" ref="carousel"
        trigger="click" indicator-position="none">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <div class="img_con">
            <div class="img_cover"></div>
            <img class="element-img" alt="" :src="item.imgUrl">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHeaderStore } from '@/stores/handleHead';
import { onBeforeMount, reactive } from 'vue';
type ImgItem = {
  id: number;
  imgUrl: string;
}

const HomePage = useHeaderStore();
let imgList = reactive<ImgItem[]>([])

onBeforeMount(() => {
  imgList = [
    {
      id: 0,
      imgUrl: 'https://s1.ax1x.com/2023/04/28/p9l3MT0.jpg'
    },
    {
      id: 1,
      imgUrl: 'https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/1-b4afd269ffb0ba19bd1dd33e3ed5cec3.png'
    },
    {
      id: 2,
      imgUrl: 'https://lf1-cdn-tos.bytescm.com/obj/static/ies/bytedance_official/_next/static/images/2-468bb0555d827d48bce4e178f085bf90.png'
    },
    {
      id: 3,
      imgUrl: 'https://s1.ax1x.com/2023/04/28/p9l1RiT.png'
    }, 
    {
      id: 4,
      imgUrl: 'https://s1.ax1x.com/2023/04/28/p9l16Zq.jpg'
    }
  ]
})
</script>
<style lang="less" scoped>

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.img_con {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(51, 112, 255, .2);
    height: 100%;
    z-index: 666;
  }

  .element-img {
    width: 100%;
    height: 100%;
    object-fit: cover;

  }
}

:deep(.el-carousel__arrow) {
  display: block !important;
  width: 70px;
  height: 70px;
  font-size: 40px;
  background-color: rgba(90, 88, 88, 0.1);
}
:deep(.el-carousel__arrow:hover) {
  background-color: rgba(16, 15, 15, 0.3);
}
</style>