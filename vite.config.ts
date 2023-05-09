import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: '/src'
      },
      {
        find: '@containers',
        replacement: '/src/containers'
      },
      {
        find: '@components',
        replacement: '/src/components'
      },
      {
        find: '@utils',
        replacement: '/src/utils'
      },
    ]
  }
})
