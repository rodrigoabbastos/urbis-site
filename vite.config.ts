
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist", // Changed from "./" to "dist"
    assetsDir: "assets",
    emptyOutDir: true, // Changed from false to true
    sourcemap: false,
    minify: "esbuild", // Using esbuild for minification
    rollupOptions: {
      output: {
        // Ensure all chunks have .js extension
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Explicitly define extensions to resolve
  },
  // Ensure we handle .js and .tsx files properly for the build
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
