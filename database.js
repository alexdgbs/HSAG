import mongoose from 'mongoose';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

console.log('URI de MongoDB:', process.env.MONGO_URI);

async function connectDB() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
}

// Exportar la función connectDB
export { connectDB };

// Escuchar eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose está conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose error de conexión:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose se ha desconectado');
});

export default mongoose; // Exportar mongoose para uso en otros archivos
