/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
    },
  },
  plugins: [react()],
  server: {
    port: 4036,
  },
  preview: {
    port: 4036
  }
})