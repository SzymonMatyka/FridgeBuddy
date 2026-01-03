import { loadEnvConfig } from '../config/env';
import { connectDatabase } from '../config/database';
import { createApp } from './app';
import { registerMiddlewares } from './middlewares';
import { registerRoutes } from './routes';

export const startServer = async (): Promise<void> => {
  const config = loadEnvConfig();

  const app = createApp();
  registerMiddlewares(app);
  registerRoutes(app);

  try {
    await connectDatabase(config.mongoUri);
    
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

