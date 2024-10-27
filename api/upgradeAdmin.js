import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const email = '8hsabitgames@gmail.com';
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.isSubscribed = true;
    user.isAdmin = true;
    await user.save();
    res.status(200).json({ message: 'Usuario actualizado a admin con suscripción' });
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
});

export default router;

