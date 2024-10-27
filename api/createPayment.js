import express from 'express';
import paypal from 'paypal-rest-sdk';

const router = express.Router();

router.post('/', (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: 'El monto es requerido.' });
  }
  const paymentJson = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [{
      amount: { total: amount, currency: 'MXN' },
      description: 'Suscripción Retro-Arcade'
    }],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    }
  };
  paypal.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error('Error creando el pago:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: payment.id });
    }
  });
});

export default router;
