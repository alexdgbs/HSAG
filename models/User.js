import mongoose from 'mongoose';

// Cambia el nombre de 'UserSchema' a 'userSchema' para que coincida
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Por favor, ingresa un correo electrónico válido.'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Usa el nombre 'userSchema' para definir el modelo
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

