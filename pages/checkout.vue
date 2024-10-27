<template>
  <div class="relative z-0 bg-white max-w-sm mx-auto py-6 px-2 sm:px-4 lg:px-6">
    <div class="space-y-6">
      <div>
        <h2 class="text-center text-2xl font-semibold text-gray-900">Suscríbete por solo $49</h2>
        <p class="mt-1 text-center text-xs text-gray-600">
          Elige el método de pago y accede a contenido exclusivo.
        </p>
      </div>
      <div class="bg-gray-100 py-4 px-2 shadow sm:rounded-lg sm:px-6">
        <h3 class="text-lg font-medium text-gray-700 text-center mb-4">Métodos de Pago</h3>
        <div id="paypal-button-container" class="mt-2 relative"></div>

        <button v-if="isSubscribed" @click="cancelSubscription" class="mt-4 w-full rounded-md bg-red-400 px-3 py-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-red-500">
          Cancelar Suscripción
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubscribed: false, 
    };
  },
  mounted() {
    this.checkSubscription();
    
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AXQeb763-UfMzlLsheOGAQdXyM-xzZ4MPxXXZAaZ44MQT-7bWdbDuiRxl6-gwxuCgXf6Jnc0LKSdL1vk&currency=MXN";
    script.addEventListener('load', this.renderPayPalButton);
    document.body.appendChild(script);
  },
  methods: {
    async checkSubscription() {
  const emailCookie = document.cookie.split(';').find(item => item.trim().startsWith('email='));
  if (emailCookie) {
    const emailValue = emailCookie.split('=')[1]; // Obtener el valor del email
    try {
      const response = await fetch(`${process.env.BASE_API_URL}/user?email=${emailValue}`); // Cambiar 'email' por 'emailValue'

      if (response.ok) {
        const userData = await response.json();
        this.isSubscribed = userData.isSubscribed; 
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  }
},
    renderPayPalButton() {
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
        onApprove: async (data, actions) => {
          try {
            const orderDetails = await actions.order.capture();
            const emailCookie = document.cookie.split(';').find(item => item.trim().startsWith('email='));
            const emailValue = emailCookie ? emailCookie.split('=')[1] : null;

            if (emailValue) {
              const response = await fetch(`${process.env.BASE_API_URL}/update-subscription`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailValue, isSubscribed: true }),
              });

              if (!response.ok) {
                throw new Error('Error al actualizar la suscripción');
              }
            }

            alert('Transacción completada por ' + orderDetails.payer.name.given_name);
            this.$router.push('/success');
          } catch (err) {
            console.error('Error en el proceso de pago:', err);
          }
        },
        onError: (err) => {
          console.error('Error en el proceso de pago:', err);
        }
      }).render('#paypal-button-container');
    },
    async cancelSubscription() {
      try {
        const emailCookie = document.cookie.split(';').find(item => item.trim().startsWith('email='));
        const emailValue = emailCookie ? emailCookie.split('=')[1] : null;

        if (emailValue) {
          const response = await fetch(`${process.env.BASE_API_URL}/update-subscription`,{

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValue, isSubscribed: false }),
          });

          if (!response.ok) {
            throw new Error('Error al cancelar la suscripción');
          }
          alert('Suscripción cancelada con éxito');
          this.$router.push('/cancel');
        } else {
          alert('No se encontró un correo electrónico en las cookies');
        }
      } catch (err) {
        console.error('Error en el proceso de cancelación:', err);
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

h2 {
  color: #1F2937;
  font-size: 1.25rem; 
}

h3 {
  color: #374151;
  font-size: 1rem; 
}

.bg-white {
  background-color: white;
}

#paypal-button-container {
  display: flex;
  justify-content: center;
  z-index: 10; 
}

.bg-gray-100 {
  padding: 0.5rem; 
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.flex {
  margin-top: 1rem; 
}

.menu {
  z-index: 50; 
}
</style>
