import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'El correo electrónico es requerido.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (user.isSubscribed) {
      return res.status(400).json({ message: 'El usuario ya está suscrito.' });
    }
    user.isSubscribed = true;
    await user.save();
    res.status(200).json({ message: 'Usuario suscrito exitosamente' });
  } catch (error) {
    console.error('Error al suscribir al usuario:', error);
    res.status(500).json({ message: 'Error al suscribir al usuario' });
  }
});

export default router;
