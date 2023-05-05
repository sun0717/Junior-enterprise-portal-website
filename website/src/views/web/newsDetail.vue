<template>
    <div class="news-detail">
        <!-- <AwHeader class="news_header" ref="news_header"></AwHeader> -->
        <div class="container">
            <div class="left">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ news_detail.type }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ news_detail.title }}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="content">
                    <h1>{{ news_detail.title }}</h1>
                    <span>{{ news_detail.publish_time }}</span>
                    <el-divider><i class="el-icon-view"></i></el-divider>
                    <article class="article" v-html="news_detail.content"></article>
                </div>
            </div>
            <hot-news class="right"></hot-news>
        </div>
        <!-- <AwFooter></AwFooter> -->
    </div>
</template>
<script lang="ts" setup>
import { reqGetNewsDetails } from '@/api/new';
import HotNews from '@/components/web/hotNews.vue';
import { useHeaderStore } from '@/stores/handleHead';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

const store = useHeaderStore();
const route = useRoute();
let news_detail = ref({
    title: '',
    publish_time: '',
    content: '',
    type: ''
});

let news_path: any = computed(() => {
    return route.params.id;
});

onMounted(() => {
    store.setShadowActive(true);
    store.setNavDarkActive(true);
    store.setHeaderShow(false);
});

onBeforeRouteLeave((to, from, next) => {
    if (to.name == 'index') {
        store.setShadowActive(false);
        store.setNavDarkActive(false);
        store.setHeaderShow(false);
        next();
    } else { 
        next();
    }
});
// 侦听响应路由参数的变化
watchEffect(() => {
    getNewsDetail();
});

async function getNewsDetail() {
    const { data: res } = await reqGetNewsDetails(news_path.value);
    if (res.status !== 200) {
        console.log(res);
    } else {
        news_detail.value = {
            title: res.data.news_detail.news_title,
            publish_time: res.data.news_detail.publish_time,
            content: res.data.news_detail.news_content,
            type: res.data.news_detail.aw_news_type.type_name
        }
    }
};

getNewsDetail();
</script>
<style lang = "less" scoped>
.news_header {
    background-color: rgba(255, 255, 255, .5);
    backdrop-filter: blur(10px);
    //border-bottom: 1px solid #eff0f1;
}

.container {
    padding-top: 60px;
    position: relative;
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    //background: #d3dce6;
    min-height: 580px;
    margin: 0 auto;
}

.el-breadcrumb {
    height: 40px;
    font-size: 13px;
    padding-top: 40px;
}

::v-deep .el-breadcrumb__item:last-child span {
    color: #f84521;
}


.content {
    width: 860px;

    h1 {
        font-size: 23px;
        line-height: 30px;
        padding: 20px 0 14px;
    }

    span {
        color: #606266;
        line-height: 18px;
    }
}

.article {
    margin-top: 5px;
    overflow: hidden;
}

.right {
    margin-left: 50px;
    margin-top: 80px;
}
</style>
