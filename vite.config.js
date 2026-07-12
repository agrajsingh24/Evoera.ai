import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Any request starting with /api will be intercepted by Vite
      '/api': {
        target: 'https://v0-gemini-ai-integration-tau.vercel.app',
        changeOrigin: true, // This tricks Vercel into thinking the request came from its own domain!
        secure: false,
      },
    },
  },
});
