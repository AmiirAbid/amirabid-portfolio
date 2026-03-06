import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api/github': {
        target: 'https://github-contributions.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/github', '/api/v1/AmiirAbid'),
      },
    },
  },
})
