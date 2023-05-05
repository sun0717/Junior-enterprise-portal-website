import { ElMessage } from 'element-plus';
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import router from "./router";
import { getToken, removeToken } from "./utils/auth";
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();
  // 确定用户是否已登录
  const hasToken = getToken();
  if (hasToken) {
    if (to.name === 'email_login' || to.name === 'phone_login') {
        // 如果已登录，重定向到主页
        next({ path: '/'});
        NProgress.done();
    } else {
        try {
            next();
        } catch (error) {
            // 删除 token 并进入登录页面重新登录
            removeToken();
            ElMessage.error('出现了未知错误'+error);
            next({ path: 'index'});
            NProgress.done();
        }
        
    }
  } else {
    // 没有 token
    if (to.path === '/resume') {
        next({ name: 'email_login'});
        NProgress.done();
    } else {
        next();
    }
  }
});
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
