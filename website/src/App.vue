<template>
  <div>
    <AwHeader class="MyHeader"></AwHeader>
    <router-view></router-view>
    <el-backtop :bottom="80" :right="60" :visibility-height="280">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huojian"></use>
      </svg>
    </el-backtop>
    <AwFooter class="MyFooter" v-show="!$route.meta.isHideFooter" :class="{ ResumeFooter: $route.meta.isResumeFooter }">
    </AwFooter>
  </div>
</template>
<script setup lang="ts">
import AwFooter from '@/components/web/public/Footer.vue';
import AwHeader from '@/components/web/public/Header.vue';

</script>
<style lang="less" scoped>
// .MyHeader {
//   background-color: rgba(255, 255, 255, 1);
//   backdrop-filter: blur(10px);
// }

.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.el-backtop {
  width: 48px;
  height: 48px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .2);
}
</style>
<style lang="less">
.Login-formWrap {
  box-sizing: border-box;
}

.noAccount_tip {
  color: #8f959e;
  margin: 12px 0 64px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}

.ResumeFooter {
  margin-top: 317px;
}
</style>
<style lang="less">
</style>
