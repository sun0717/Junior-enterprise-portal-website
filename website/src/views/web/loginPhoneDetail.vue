<template>
    <div class="Login-formWrap">
        <el-form style="max-width: 480px;">
            <el-form-item class="phone-item">
                <el-input placeholder="手机号码" v-model="phoneNumber" type="round" class="input-with-select">
                    <template #prepend>
                        <el-select v-model="select" placeholder="+86" style="width: 115px">
                            <el-option-group label="选择国家/地区">
                                <el-option label="中国大陆 +86" value="1" />
                                <el-option label="中国澳门 +853" value="2" />
                                <el-option label="中国台湾 +886" value="3" />
                            </el-option-group>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="verification-item">
                <el-input class="input-with-select" placeholder="验证码">
                    <template #append>
                        <el-button class="button-getVeri" :disabled="phoneNumberIsntFit" :style="button_getVeri_color">获取验证码</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%; height: 40px; font-size: 16px; margin-top: 56px;"
                    round>登录</el-button>
            </el-form-item>
        </el-form>
        <p class="noAccount_tip">未注册的手机号码验证后将自动创建账号</p>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
const select = ref('');
const phoneNumberIsntFit = ref(true); // true不可用 false可用 
const phoneNumber = ref('');
const button_getVeri_color = reactive({
    backgroundColor: ''
})
// 验证是否为电话号
function isPhoneNumber(phone: string): boolean {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
}

watch(phoneNumber, (newValue, oldValue) => {
    if (isPhoneNumber(newValue)) {
        phoneNumberIsntFit.value = false;
        button_getVeri_color.backgroundColor = '#409eff';
    } else {
        phoneNumberIsntFit.value = true;
        button_getVeri_color.backgroundColor = '';
    }
});
</script>
<style scoped>
/* element-plus修改 */
:deep(.input-with-select .el-input-group__prepend) {
    background-color: var(--el-fill-color-blank);
}

:deep(.input-with-select .el-input-group__append) {
    background-color: #bacefd;
    color: #ffffff;
}

:deep(.el-form-item__content .el-input__wrapper) {
    height: 40px;
}

/* 手机号码 */
:deep(.el-input-group__prepend) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

:deep(.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

:deep(.el-input-group--prepend>.el-input__wrapper) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

:deep(.el-input__inner) {
    padding-left: 8px;
}

:deep(.el-button) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

/* 密码框 */
:deep(.el-input-group--append>.el-input__wrapper) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

:deep(.el-input-group__append) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.phone-item,
.verification-item {
    margin-top: 30px;
}

.button-getVeri {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 42px;
}

/* .correctButton {
    background-color: #409eff;
} */
</style>