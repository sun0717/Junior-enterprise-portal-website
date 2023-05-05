<template>
    <div class="Login-formWrap">
        <el-form style="max-width: 480px;" class="form_wrap">
            <el-form-item class="email-item">
                <el-input placeholder="邮箱" v-model="inputMessage.email" type="round" @blur="explainShow"
                    @focus="explainShowHide"></el-input>
                <span class="correct_email_explain" v-show="explainView">请输入正确的邮箱</span>
            </el-form-item>
            <div class="form_wrap_bottom">
                <el-form-item class="password-item">
                    <el-input placeholder="密码" v-model="inputMessage.password" type="password" show-password></el-input>
                </el-form-item>
                <span class="forget_keyword">
                    <el-button class="forget_keyword_btn" type="primary" text>忘记密码?</el-button>
                </span>
                <el-form-item>
                    <el-button type="primary" @click="onLogin"
                        style="width: 100%; height: 40px; font-size: 16px; margin-top: 20px;" round>登录</el-button>
                </el-form-item>
                <div class="noAccount_tip">
                    没有邮箱账号?<el-button class="register_account" type="primary" text>创建账号</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import useUserStore from '@/stores/login';
import { reactive, ref, watchEffect } from 'vue';
let isCorrectEmail = ref(false);
let explainView = ref(false);
const inputMessage = reactive({
    email: '',
    password: ''
})
const userStore = useUserStore();
watchEffect(() => {
    if (validateEmail(inputMessage.email)) {
        isCorrectEmail.value = true;
    } else {
        isCorrectEmail.value = false;
    }
})

// 验证邮箱格式是否正确
function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
// 处理'请正确输入邮箱的'显示问题
function explainShow() {
    isCorrectEmail.value == true ? explainView.value = false : explainView.value = true;
    if (inputMessage.email == '') {
        explainView.value = false;
    }
}
function explainShowHide() {
    explainView.value = false;
}
// 登录逻辑重写
const onLogin = async () => {
    await userStore.login(inputMessage);
    inputMessage.email = '';
    inputMessage.password = '';
    router.push('/resume')
};
// 退出登录
// const onLogout = () => {
//     userStore.logout();
// }
</script>
<style scoped>
:deep(.el-input__wrapper) {
    border-radius: 20px;
    height: 40px;
}

:deep(.el-input__inner) {
    padding-left: 8px;
}

.form_wrap {
    position: relative;
}

.form_wrap_bottom {
    position: absolute;
    width: 100%;
    top: 42px;
}

.forget_keyword {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
}

.forget_keyword .forget_keyword_btn {
    position: absolute;
    right: 0;
}


.email-item,
.password-item {
    margin-top: 30px;
}

.correct_email_explain {
    color: #F54A45;
    margin-top: 4px;
    line-height: 22px;
    min-height: 22px;
}
</style>