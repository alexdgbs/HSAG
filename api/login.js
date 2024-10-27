import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos de inicio de sesión:', { email, password });
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, proporciona un correo electrónico y una contraseña.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    res.cookie('user', {
      email: user.email,
      isSubscribed: user.isSubscribed
    }, {
      httpOnly: true,
      secure: false,
      sameSite: 'None'
    });
    res.status(200).json({ message: 'Inicio de sesión exitoso', email: user.email, isSubscribed: user.isSubscribed });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;

