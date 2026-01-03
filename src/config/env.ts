import * as dotenv from 'dotenv';

dotenv.config();

export interface EnvConfig {
  port: number;
  mongoUri: string;
}

const validateEnvConfig = (): EnvConfig => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fridge-buddy';

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('Invalid PORT environment variable. Must be a number between 1 and 65535.');
  }

  if (!mongoUri || mongoUri.trim() === '') {
    throw new Error('MONGODB_URI environment variable is required.');
  }

  return {
    port,
    mongoUri,
  };
};

export const loadEnvConfig = (): EnvConfig => validateEnvConfig();

