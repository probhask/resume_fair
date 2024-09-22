// import { defineConfig } from "vitest/config";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    coverage: {
      exclude: [
        "dist/*",
        "src/types/",
        "src/router",
        "src/pages/Modal.tsx",
        "**/*vite*",
        "**/*tailwind*",
        "**/*postcss*",
        "**/*eslint*",
        "**/__test__/**",
        "^(?!.*\\.test\\.tsx$).*",
        "**/main.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@container": path.resolve(__dirname, "./src/container"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hook": path.resolve(__dirname, "./src/hook"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
