import { defineConfig, splitVendorChunkPlugin } from 'vite'
import viteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), splitVendorChunkPlugin(), viteCompression({algorithm: 'brotliCompress', deleteOriginFile: true})],
    base: '/',
    build: {
/*       rollupOptions: {
        output: {
          manualChunks: {
            react: ['react'],
            reactDom: ['react-dom'],
          }
        }
      }, */
    },
  }

  if (command !== 'serve') {
    config.base = '/shri2023-performance-task/'
  }

  return config
})