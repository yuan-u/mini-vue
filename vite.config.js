import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test:{
    globals:true,//jest grammer
    environment:'happy-dom' //模拟dom环境
  }
})
