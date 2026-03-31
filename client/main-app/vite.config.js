import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true, // So that it fails if 3000 is taken, rather than silently switching to 3001
    host: true, // This tells Vite to accept custom local domains - added as got error localhost was working but not http://app.myplatform.local:3000/
    allowedHosts: ['app.myplatform.local']
  }
})
