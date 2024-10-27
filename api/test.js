import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Se ha recibido una solicitud en /api/test');
  res.json({ message: 'API funcionando' });
});

export default router;
