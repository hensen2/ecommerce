import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4242,
    proxy: {
      "/api": "http://localhost:5252",
    },
  },
  preview: {
    port: 4242,
    proxy: {
      "/api": "http://localhost:5252",
    },
  },
  plugins: [react()],
});
