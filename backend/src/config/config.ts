// src/config/config.ts
export const configuration = () => ({
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecret',
});

export type AppConfig = ReturnType<typeof configuration>;
