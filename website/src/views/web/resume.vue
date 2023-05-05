<template>
    <div class="resume">
        <section class="resumeView">
            <div class="resumeView-banner">
                <div class="resumeView-header">
                    <div class="resumeView-header-left">
                        <div class="resumeView-myResume">我的简历</div>
                        <div class="resumeView-lastUpdate">
                            <svg width="16" height="16">
                                <path fill="#FFF" fill-rule="evenodd"
                                    d="M8.667 7.333v-2a.667.667 0 0 0-1.334 0V8A.665.665 0 0 0 8 8.667h2.667a.667.667 0 0 0 0-1.334h-2zm-.667 8A7.333 7.333 0 1 1 8 .667a7.333 7.333 0 0 1 0 14.666z">
                                </path>
                            </svg>
                            <span class="resumeView-lastUpdate-text">最近更新:</span>
                            <span class="resumeView-lastUpdate-time">2022-07-28 23:34</span>
                        </div>
                    </div>
                    <div class="resumeView-header-right">
                        <el-button class="resume_edit_btn" type="primary" size="large" color="#fffff" :icon="Edit" round>编辑
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="resumeView-form">
                <div class="resumeViewSection">
                    <div class="resumeViewSection-title">基础信息</div>
                    <div class="resumeViewSection-title-baseMessage">
                        <el-row style="margin-bottom: 16px;">
                            <el-col :span="12">
                                <div class="resumeViewSection-title-index">姓名</div>
                                <div class="resumeViewSection-title-content">孙晨瑞</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="resumeViewSection-title-index">手机号码</div>
                                <div class="resumeViewSection-title-content">+86 177-7004-8661</div>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom: 16px;">
                            <el-col :span="12">
                                <div class="resumeViewSection-title-index">邮箱</div>
                                <div class="resumeViewSection-title-content">743685264@qq.com</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="resumeViewSection-title-index">个人证件</div>
                                <div class="resumeViewSection-title-content">中国 - 居民身份证 · 222424199907170013</div>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom: 16px;">
                            <el-col :span="24">
                                <div class="resumeViewSection-title-index">意向地点</div>
                                <div class="resumeViewSection-title-content">北京</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="resumeViewSection-title" style="margin-top: 32px;">教育经历</div>
                    <div class="resumeViewSection-education">
                        <div class="resumeViewSection-title-eduMessage">
                            <el-row style="margin-bottom: 16px;">
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">学校</div>
                                    <div class="resumeViewSection-title-content">南昌航空大学</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">专业</div>
                                    <div class="resumeViewSection-title-content">物联网工程</div>
                                </el-col>
                            </el-row>
                            <el-row style="margin-bottom: 16px;">
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">起止时间</div>
                                    <div class="resumeViewSection-title-content">2017.07 ~ 至今</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">学历</div>
                                    <div class="resumeViewSection-title-content">本科</div>
                                </el-col>
                            </el-row>
                            <el-row style="margin-bottom: 16px;">
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">成绩排名</div>
                                    <div class="resumeViewSection-title-content">前 10%</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="resumeViewSection-title-index">学历类型</div>
                                    <div class="resumeViewSection-title-content">统招全日制</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="resumeViewSection-title" style="margin-top: 32px;">自我评价</div>
                    <div class="resumeViewSection-yourself">
                        <el-row style="margin-bottom: 16px;">
                            <el-col :span="24">
                                <div class="resumeViewSection-title-content">拥抱未来，敏而好学</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="resumeViewSection-title" style="margin-top: 32px;">附件简历</div>
                    <div class="resume-document"></div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
</script>
<style lang="less" scoped>
.resume_header {
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(10px);
}

.resume,
.resume * {
    box-sizing: border-box;
}

.resumeView {
    // background-color: skyblue;
    min-height: 100vh;
    position: relative;
    
    .resumeView-banner {
        display: flex;
        justify-content: center;
        height: 292px;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background-size: cover;
        background-image: url("https://lf3-cdn-tos.bytescm.com/obj/ttfe/ATSX/my_resume_banner_1577084307030.jpg");
        background-repeat: no-repeat;
        background-position: 50% 50%;

        .resumeView-header {
            width: 1016px;
            height: 146px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;

            .resumeView-header-left {
                display: flex;
                flex-direction: column;
                color: #fff;

                .resumeView-myResume {
                    height: 59px;
                    line-height: 59px;
                    font-size: 30px;
                    font-weight: 800;
                }

                .resumeView-lastUpdate {
                    display: flex;
                    align-items: center;
                    margin-top: 3px;
                    height: 28px;
                    font-size: 16px;
                    line-height: 1.75;

                    .resumeView-lastUpdate-text {
                        margin-left: 8px;
                        margin-right: 4px;
                    }
                }
            }

            .resumeView-header-right {
                .resume_edit_btn {
                    background-color: #ffffff;
                    background: transparent;
                    border-color: #fff;
                    font-size: 16px;
                }

                .resume_edit_btn:hover {
                    background-color: #ffffff;
                    color: #3370ff;
                }
            }
        }
    }

    .resumeView-form {
        position: relative;
        width: 1016px;
        margin: 0 auto 115px;
        border-radius: 4px;
        background-color: #fff;
        padding: 8px 50px 40px;
        box-shadow: 0 8px 24px 0 rgba(54, 97, 174, 0.14);
        z-index: 2;
        top: 206px;

        .resumeViewSection {
            margin-top: 32px;

            .resumeViewSection-title {
                position: relative;
                height: 32px;
                margin-bottom: 38px;
                font-size: 20px;
                font-weight: 800;
                line-height: 1.6;
                color: #1f2329;
            }

            .resumeViewSection-title::after {
                position: absolute;
                bottom: -8px;
                left: 0;
                content: '';
                width: 24px;
                height: 4px;
                background-color: #3370ff;
            }

            .resumeViewSection-title-baseMessage {}


            .resumeViewSection-title-index {
                margin-bottom: 4px;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.71;
                color: #1f2329;
                opacity: 0.45;
            }

            .resumeViewSection-title-content {
                word-wrap: break-word;
                font-size: 16px;
                line-height: 1.75;
                color: #1f2329;
            }
        }
    }
}

:deep(.menu-wrapper .menu-item-link a) {
    color: #646a73;
}

.resume_footer {
    margin-top: 317px;
}
</style>