import { setupApp } from './app';
import { ENV } from './config/env';
import { AppDataSource } from './config/db';

async function bootstrap() {
  try {
    // 1. Init DB connection
    await AppDataSource.initialize();
    console.log("📦 Database connected");

    // 2. Run migrations (optional, for production instead of sync)
    await AppDataSource.runMigrations();
    console.log("🛠️ Migrations executed");

    // 3. Init Fastify
    const app = await setupApp();

    app.listen(
      { port: Number(ENV.PORT), host: ENV.HOST },
      (err: Error | null, address: string) => {
        if (err) {
          app.log.error(err);
          process.exit(1);
        }
        app.log.info(`🚀 Server listening at ${address}`);
      }
    );

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

bootstrap();
