import express from 'express';
import fetch from 'node-fetch';
import getAccessToken from './getAccessToken.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { subscriptionId } = req.body;
  if (!subscriptionId) {
    return res.status(400).json({ message: 'El ID de la suscripción es requerido.' });
  }
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ reason: 'Cancelación de la suscripción' })
    });
    if (!response.ok) {
      throw new Error('Error al cancelar la suscripción');
    }
    res.status(200).json({ message: 'Suscripción cancelada con éxito' });
  } catch (error) {
    console.error('Error cancelando la suscripción:', error);
    res.status(500).json({ message: 'Error al cancelar la suscripción' });
  }
});

export default router;

