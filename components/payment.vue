<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6">Suscribirse</h2>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AXQeb763-UfMzlLsheOGAQdXyM-xzZ4MPxXXZAaZ44MQT-7bWdbDuiRxl6-gwxuCgXf6Jnc0LKSdL1vk&currency=MXN";
    script.onload = () => {
      this.initializePayPalButton();
    };
    document.body.appendChild(script);
  },
  methods: {
    initializePayPalButton() {
      if (!window.paypal) {
        console.error('PayPal SDK no está cargado.');
        return;
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '49.00' 
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transacción completada por ' + details.payer.name.given_name);
            
          });
        },
        onError: (err) => {
          console.error('Error en el proceso de pago:', err);
          alert('Hubo un problema procesando tu pago. Por favor, inténtalo de nuevo más tarde.');
        }
      }).render('#paypal-button-container');
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px; 
}
</style>
