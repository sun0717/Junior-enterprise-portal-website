<template>
    <div class="header" :class="{ header_show: headerShow, shadow: headerShadowActive }">
        <div class="header_container">
            <div class="header_content">
                <div class="menu-wrapper">
                    <div class="menu-item" v-for="(item, index) in navList" :key="index">
                        <h2 class="menu-item-link">
                            <router-link :to="item.path">
                                <span :class="{ a_text_dark: navDarkActive }">{{ item.title
                                }}
                                </span>
                            </router-link>
                        </h2>
                    </div>
                    <span v-show="userStore.isLogin" style="display: inline-block; margin-left: 10px;">
                        <User :username="userStore.username" @del-token="onlogout" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useHeaderStore } from '@/stores/handleHead';
import User from '@/components/web/public/User.vue';
import useUserStore from '@/stores/login';
import { computed, reactive, watchEffect } from 'vue';
import router from '@/router';
const HomePage = useHeaderStore();
const userStore = useUserStore();

let headerShow = computed(() => {
    return HomePage.headerShow;
});

let headerShadowActive = computed(() => {
    return HomePage.headerShadowActive;
});

let navDarkActive = computed(() => {
    return HomePage.navDarkActive;
});

let navList = reactive([
    {
        title: '首页',
        path: '/'
    },
    {
        title: '新闻中心',
        path: '/news'
    },
    {
        title: '产品与服务',
        path: '/product'
    },
    {
        title: '人才招聘',
        path: '/job'
    },
    {
        title: '登录',
        path: '/login'
    }
]);
watchEffect(() => {
    let listener_login_token = userStore.isLogin;
    if (listener_login_token) {
        navList[4].title = '';
    } else {
        navList[4].title = '登录';
    }
})

const onlogout = () => {
    userStore.username = '';
    userStore.token = '';
    userStore.isLogin = false;
    userStore.logout();
    router.push('/login/email_login')
}
</script>
<style lang="less" scoped>
@nav_active_color: #3370ff;

h2 {
    margin: 0;
}

.header_show {
    transform: translateY(-62px);
}

.a_text_dark {
    color: rgba(0, 0, 0, .8);
}

.header {
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0);
    //backdrop-filter: blur(0);
    box-shadow: none;

    position: fixed;
    z-index: 999;
    transition: transform .2s ease;

    //color: rgba(255, 255, 255, 1) !important;
    //transition: all 0.3s ease;
    .header_container {
        height: 100%;
    }
}

.shadow {
    background-color: rgba(255, 255, 255, .7);
    backdrop-filter: blur(8px);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
}

.header_content {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    height: 100%;
    align-items: center;
    padding: 0 96px;
    margin: 0 auto;
}

.menu-wrapper {
    display: flex;
    flex-direction: row;
    list-style: none;
    -ms-flex-align: center;
    align-items: center;
    padding: 0;
    margin: 0 0 0 20px;
    position: relative;

    .menu-item {
        flex-shrink: 0;
    }

    .menu-item:last-child:before {
        content: "";
        display: block;
        height: 12px;
        border-right: 1px solid #bbbfc4;
        //border-right: 1px solid #fff;
        position: absolute;
        bottom: 24px;
        right: 48px;
    }

    >.menu-item+.menu-item {
        margin-left: 40px;
    }

    .menu-item-link {
        //color: #646a73;
        font-weight: 400;
        font-size: 14px;
        line-height: 60px;
        cursor: pointer;
        position: relative;

        a {
            display: inline-block;
            // color: rgba(255, 255, 255, 1);
            color: rgba(0, 0, 0, 1);
            transition: color .3s;

            :hover {
                color: @nav_active_color;
            }
        }

        .router-link-exact-active {
            color: @nav_active_color;
            font-weight: 600;

            span:after {
                content: "";
                display: block;
                height: 2px;
                position: absolute;
                width: 26px;
                left: calc(50% - 13px);
                bottom: 14px;
                background-color: @nav_active_color;
            }
        }
    }
}

.nav_text_white {
    color: rgba(255, 255, 255, 1);
}

.nav_text_dark {
    color: rgba(0, 0, 0, .8);
}

@media only screen and (max-width: 991px) {
    .header_content {
        padding: 0 32px;
    }
}
</style>