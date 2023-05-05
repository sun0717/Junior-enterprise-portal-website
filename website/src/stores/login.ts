import { removeToken } from '@/utils/auth';
import axios from 'axios';
import { defineStore } from 'pinia';
// 创建store
const useUserStore = defineStore('user', {
    persist: true,
    // 定义状态：一个函数，返回一个对象
    state: () => ({
        username: '',
        token: '',
        isLogin: false
    }),

    // 定义 getters ,等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
        hello: state => 'Hello!' + state.username
    },

    // 定义 actions, 有同步和异步两种类型
    actions: {
        // 异步action, 一般用来处理异步逻辑
        async login(userData: any) {
            const result = await axios.post('/api/user/login', userData)
            const { data, code } = result.data;
            if (code === 20000) {
                // action中修改状态
                this.username = data.username;
                this.token = data.token;
                this.isLogin = true;
            }
        },

        // 同步 action
        async logout() {
            // this.isLogin = false;
            try {
                const result = await axios.post('/api/user/logout')
                const { code } = result.data;
                if (code === 20000) {
                    removeToken();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
})

export default useUserStore;