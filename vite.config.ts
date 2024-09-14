import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
  plugins: [react()],
  server :{
    port :3000
  },
  define: {
    'process.env': {
      ...process.env,
  },
  base: "/CocktailSubmission",
}}})
