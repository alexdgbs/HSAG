import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, isSubscribed } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { isSubscribed },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Estado de suscripción actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la suscripción' });
  }
});

export default router;

