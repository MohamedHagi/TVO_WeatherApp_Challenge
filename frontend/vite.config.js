import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

//adding deployed link to server, it can be replaced with localhost3000 for testing
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://tvo-weatherapp-challenge.onrender.com",
    },
  },
});
