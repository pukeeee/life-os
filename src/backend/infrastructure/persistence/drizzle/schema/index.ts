/**
 * Єдина точка збору Drizzle-схеми (її читає drizzle-kit та клієнт БД).
 * Таблиці згруповані за bounded context-ами, але фізично в одній БД (модульний моноліт).
 */
export * from "./identity";
export * from "./tracking";
export * from "./tasks";
export * from "./journal";
export * from "./goals";
