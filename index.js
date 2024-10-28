import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { loadNuxt, build } from 'nuxt';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from './database.js';

import loginHandler from './api/login.js';
import cancelSubscriptionHandler from './api/cancelSubscription.js';
import executePaymentHandler from './api/executePayment.js';
import registerHandler from './api/register.js';
import subscribeHandler from './api/subscribe.js';
import updateSubscriptionHandler from './api/updateSubscription.js';
import upgradeAdminHandler from './api/upgradeAdmin.js';
import userHandler from './api/user.js';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Rutas de API
app.use('/api/login', loginHandler);
app.use('/api/cancel-subscription', cancelSubscriptionHandler);
app.use('/api/execute-payment', executePaymentHandler);
app.use('/api/register', registerHandler);
app.use('/api/subscribe', subscribeHandler);
app.use('/api/update-subscription', updateSubscriptionHandler);
app.use('/api/upgrade-admin', upgradeAdminHandler);
app.use('/api/user', userHandler);

// Configuración de Nuxt
async function start() {
  const isDev = process.env.NODE_ENV !== 'production';
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start');

  if (isDev) {
    build(nuxt);
  }

  app.use(nuxt.render);

  // Conectar a MongoDB antes de iniciar el servidor
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  }).catch(err => {
    console.error('No se pudo conectar a MongoDB:', err);
  });
}

start();

export default app;
