import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://mern-store-9oc8.onrender.com",
      "/uploads/": "https://mern-store-9oc8.onrender.com",
    },
  },
});
