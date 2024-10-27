import express from 'express';
import paypal from 'paypal-rest-sdk';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { paymentId, PayerID, email } = req.query;
  if (!paymentId || !PayerID || !email) {
    return res.status(400).json({ message: 'Payment ID, Payer ID y email son requeridos.' });
  }
  const executePaymentJson = {
    payer_id: PayerID,
  };
  paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
    if (error) {
      console.error('Error ejecutando el pago:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (payment.state !== 'approved') {
          return res.status(400).json({ message: 'El pago no fue aprobado' });
        }
        console.log('Antes de guardar el usuario:', user);
        user.isSubscribed = true;
        await user.save();
        console.log('Después de guardar el usuario:', user);
        res.json({ success: true, message: 'Pago completado y usuario actualizado a premium' });
      } catch (error) {
        console.error('Error actualizando el usuario:', error);
        return res.status(500).json({ message: 'Error actualizando el usuario' });
      }
    }
  });
});

export default router;
