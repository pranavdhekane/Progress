import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodeResolve } from '@rollup/plugin-node-resolve';
 
export default defineConfig({
  plugins: [react(), nodeResolve()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      path: 'path-browserify',
      process: 'process/browser',
      events: 'events-browserify',
    },
  },
})