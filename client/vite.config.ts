import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  define: {
    'process.env.VITE_DEV_MODE': process.env.NODE_ENV !== 'production',
    'process.env.VITE_API_BASE_URL': process.env.VITE_API_BASE_URL,
  },
});
