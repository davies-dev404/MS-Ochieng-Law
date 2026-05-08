import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(), 
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: __dirname,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/gemini/, '')
      },
      '/api/serper': {
        target: 'https://google.serper.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/serper/, '')
      },
      '/api/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/openai/, '')
      },
      '/api/groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/groq/, '')
      }
    }
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

