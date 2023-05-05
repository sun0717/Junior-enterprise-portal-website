<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ props.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="myresume">我的简历</el-dropdown-item>
        <el-dropdown-item>我的投递</el-dropdown-item>
        <el-dropdown-item command="onlogout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
  
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import router from '@/router';

const emit = defineEmits(['delToken'])
const handleCommand = (command: string | number | object) => {
  if (command == 'myresume') {
    router.push('/resume');
  } else if (command == 'onlogout') {
    emit('delToken', 'out');
    ElMessage.error(`退出登录`)
  }
}
const props = defineProps(['username']);

</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>