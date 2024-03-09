import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: "https://mern-store-9oc8.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/uploads/": {
        target: "https://mern-store-9oc8.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
