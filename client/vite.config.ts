/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-31 21:28:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-01 00:12:53
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Unocss()]
})
