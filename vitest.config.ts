import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Конфіг Vitest. Aliasи дублюють tsconfig `paths`, бо Vitest не читає їх автоматично.
 * Тести доменного ядра не потребують ні БД, ні браузера — лише node-середовище.
 */
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": r("./src"),
      "@backend": r("./src/backend"),
      "@shared": r("./src/frontend/shared"),
      "@entities": r("./src/frontend/entities"),
      "@features": r("./src/frontend/features"),
      "@widgets": r("./src/frontend/widgets"),
      "@views": r("./src/frontend/views"),
    },
  },
});
