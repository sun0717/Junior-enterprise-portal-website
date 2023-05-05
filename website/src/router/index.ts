import index from '@/views/web/index.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes:Array<RouteRecordRaw> = [
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/web/news.vue')
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: () => import('@/views/web/newsDetail.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/web/product.vue'),
    meta: { // 隐藏footer
      isHideFooter: true
    }
  },
  {
    path: '/job',
    name: 'job',
    component: () => import('@/views/web/job.vue')
  },
  {
    path: '/job/:id',
    name: 'jobDetail',
    component: () => import('@/views/web/jobDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/web/login.vue'),
    redirect: '/login/email_login',
    children: [
      {
        path: 'phone_login',
        name: 'phone_login',
        component: () => import('@/views/web/loginPhoneDetail.vue'),
      },
      {
        path: 'email_login',
        name: 'email_login',
        component: () => import('@/views/web/loginEmailDetail.vue'),
      }
    ]
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/views/web/resume.vue'),
    meta: {
      isResumeFooter: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 1 }
  },
});
// 全局路由：拦住未登录就访问简历
// router.beforeEach(async (to, from) => {
//   if (!getToken() && to.name == 'resume' && from.name !== 'email_login') {
//     return { name: 'index'};
//   }
// })
// const getToken = () => {
//   return localStorage.getItem('user')
// }
export default router;