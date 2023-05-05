import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { command } = config;
  return {
    plugins: [
      vue(),
      viteMockServe({
        // 只在开发阶段开启 mock 服务
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "@/assets/style/variable.less";`
          },
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 9000,
      proxy: {
        '/api' : {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
 
})
