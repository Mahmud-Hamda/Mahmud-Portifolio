import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
