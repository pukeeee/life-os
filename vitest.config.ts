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
      "@": r("./"),
      "@server": r("./src/server"),
      "@shared": r("./src/shared"),
      "@entities": r("./src/entities"),
      "@features": r("./src/features"),
      "@widgets": r("./src/widgets"),
      "@views": r("./src/views"),
      "@fsd-app": r("./src/app"),
    },
  },
});
