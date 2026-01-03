import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';

export const registerMiddlewares = (app: Express): Express => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../../public')));

  return app;
};

