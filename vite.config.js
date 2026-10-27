import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          const name = assetInfo.names?.[0] || "";
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(name)) {
            return "images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  css: {
    modules: {
      generateScopedName(name, filename) {
        if (name !== "root") return name;
        const folder = filename.split(/[/\\]/).at(-2) || "component";
        return `${folder}-root`;
      },
    },
  },
});
