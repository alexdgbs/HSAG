import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from './database.js';

// Importar los controladores de rutas
import loginHandler from './api/login.js';
import cancelSubscriptionHandler from './api/cancelSubscription.js';
import executePaymentHandler from './api/executePayment.js';
import registerHandler from './api/register.js';
import subscribeHandler from './api/subscribe.js';
import updateSubscriptionHandler from './api/updateSubscription.js';
import upgradeAdminHandler from './api/upgradeAdmin.js';
import userHandler from './api/user.js';


// Configuración del entorno
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

console.log("El archivo index.js se está ejecutando");


const app = express(); // Crea la instancia de Express
const PORT = process.env.PORT || 3000; // Configura el puerto

// Middleware
app.use(cors({
  origin: '*', // Cambia esto según el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json()); // Asegúrate de que esto esté habilitado

// Rutas
app.use('/api/login', loginHandler);
app.use('/api/cancel-subscription', cancelSubscriptionHandler);
app.use('/api/execute-payment', executePaymentHandler);
app.use('/api/register', registerHandler);
app.use('/api/subscribe', subscribeHandler);
app.use('/api/update-subscription', updateSubscriptionHandler);
app.use('/api/upgrade-admin', upgradeAdminHandler);
app.use('/api/user', userHandler);

app.get('*', (req, res) => {  
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Conectar a MongoDB antes de iniciar el servidor
connectDB().then(() => {
  // Iniciar el servidor solo después de que la conexión a MongoDB haya sido exitosa
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('No se pudo conectar a MongoDB:', err);
});

export default app;

