<template>
    <div class="footer_container" :style="footerHeight + 'px'">
        <div class="footer_content">
            <div class="footer_logo footer-content-column">
                <div class="logo-container">
                    <div class="logo-text">
                        <p class="text1">La La Land</p>
                        <p class="text2">爱乐之城</p>
                    </div>
                </div>
                <h2>© 2012-2023 La La&nbsp;科技有限公司</h2>
                <h2>X公网安备 xxxxxxxxxxxxxx号 I ICP备xxxxxxxx号-1</h2>
            </div>
            <div class="about_us footer-content-column">
                <h2>关于我们</h2>
                <ul class="about_list">
                    <li>
                        <router-link to="/job" target="_blank">企业文化</router-link>
                    </li>
                </ul>
            </div>
            <div class="contact_us footer-content-column">
                <h2>联系我们</h2>
                <ul class="contact_list">
                    <li v-for="(item, index) in contact_way" :key="index">
                        <a :href="'mailto:' + item.email">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="focus_us footer-content-column">
                <h2>实时动态与招聘信息，扫码关注我们</h2>
                <div class="media">
                    <div class="media_gap" :class="item.name" v-for="(item, index) in focus_icon" :key="index">
                        <!-- <el-popover placement="top" trigger="hover">
                            <div class="qr_popover">
                                <img :src="item.qr" alt="">
                                <h2>{{ item.info }}</h2>
                            </div>
                            <img :src="item.path" :alt="item.name" slot="reference">
                        </el-popover> -->
                        <el-popover placement="top" trigger="hover">
                            <div class="qr_popover">
                                <img :src="item.qr" alt="">
                                <h2>{{ item.info }}</h2>
                            </div>
                            <template #reference>
                                <img :src="item.path" :alt="item.name" slot="reference">
                            </template>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import bilibiliUrl from '@/assets/img/focus/bilibili.png';
import qr_bilibiliUrl from '@/assets/img/focus/qr_bilibili.png';
import qr_weiboUrl from '@/assets/img/focus/qr_weibo.png';
import qr_weixinUrl from '@/assets/img/focus/qr_weixin.png';
import weiboUrl from '@/assets/img/focus/weibo.png';
import weixinUrl from '@/assets/img/focus/weixin.svg';
import { ref } from 'vue';

let footerHeight = ref('');
let contact_way = [
    {
        name: '媒体问询',
        email: '743685264@qq.com'
    },
    {
        name: '招聘相关',
        email: '743685264@qq.com'
    },
    {
        name: '商务合作',
        email: '743685264@qq.com'
    },
    {
        name: '广告相关',
        email: '743685264@qq.com'
    }
]

let focus_icon = [
    {
        name: 'weibo',
        path: weiboUrl,
        qr: qr_weiboUrl,
        info: '我的微博'
    },
    {
        name: 'weixin',
        path: weixinUrl,
        qr: qr_weixinUrl,
        info: '我的微信'
    },
    {
        name: 'bilibili',
        path: bilibiliUrl,
        qr: qr_bilibiliUrl,
        info: '我的bilibili'
    }
]
</script>
  
<style lang = "less" scoped>
* {
    margin: 0;
    padding: 0;
}

h2 {
    font-size: 100%;
    font-weight: 400;
    font-variant: normal;
}

.footer_container {
    width: 100%;
    background: #1f2329;
    padding-bottom: 60px;
}

.footer_content {
    max-width: 1440px;
    color: #fff;
    margin: 0 auto;
    padding: 69px 0 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    h2 {
        font-size: 14px;
        line-height: 22px;
        margin: 4px 0;
        color: #7b7e81;
    }

    .footer-content-column {
        flex: 1 1;
        color: #d2d3d4;
        position: relative;
        text-align: center;

        h2 {
            margin-bottom: 18px;
            font-size: 16px;
            font-weight: bold;
        }

        .about_list,
        .contact_list {
            text-align: center;
            font-size: 14px;
            line-height: 22px;

            li {
                margin-bottom: 15px;
            }

            a {
                color: #d2d3d4;
            }
        }
    }

    .about_us,
    .contact_us {
        max-width: 202px;
    }

    .focus_us {
        text-align: left;
        padding-left: 73px;

        .media {
            margin-top: 18px;
            display: flex;
            
            .media_gap {
                margin-right: 16px;
            }
        }

        span {
            margin-right: 18px;
            flex: 0 0 auto;
        }

        img {
            width: 32px;
        }

        // .weixin img {
        //     width: 38px;
        //     position: relative;
        //     top: -2px;
        // }

        h2 {
            text-align: left;
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 4px;
        }
    }

    .footer_logo {
        margin-left: 96px;
        height: 55px;
        text-align: left;
        max-width: 382px;
        min-width: 350px;

        h2 {
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 4px;
        }

        .logo-container {
            display: flex;
            margin-bottom: 9px;

            img {
                height: 50px;
            }

            .logo-text {
                margin-left: 15px;
                position: relative;
                bottom: -6px;
            }

            .text1 {
                font-size: 21px;
                font-weight: bold;
                margin: 0;
            }

            .text2 {
                font-size: 12px;
                margin: 0;
            }
        }
    }
}

@media only screen and (max-width: 991px) {
    .footer_content {
        flex-direction: column;

        .footer-content-column {
            text-align: center;
            margin: 0 auto 0;

            h2 {
                text-align: center;
            }

            padding-left: 0;
        }

        .focus_us div:last-of-type>span {
            margin-right: 0;
        }

        .media {
            justify-content: center;
        }

        .logo-container {
            justify-content: center;
            text-align: left;
        }
    }
}

.qr_popover {
    width: 100%;
    text-align: center;

    img {
        width: 130px;
        height: 130px;
        margin-bottom: 10px;
    }
}
</style>
  