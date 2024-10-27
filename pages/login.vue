<template>
  <section class="bg-white py-6 flex items-center justify-center"> 
    <div class="w-full max-w-xs bg-white rounded-lg"> 
      <div class="p-4 space-y-4 sm:p-4"> 
        <h2 class="text-lg font-bold leading-tight text-gray-900 text-left">Inicia sesión</h2>
        <form @submit.prevent="handleLogin" class="space-y-2"> 
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-lg text-gray-900 bg-gray-50"
              placeholder="8hsabitgames@gmail.com"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-lg text-gray-900 bg-gray-50"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-slate-100 text-black font-medium rounded-lg text-sm px-3 py-2 hover:bg-slate-200"
          >
            Continuar
          </button>
          <p v-if="errorMessage" class="mt-2 text-red-600 text-center">{{ errorMessage }}</p>
          <p class="text-xs text-gray-500 text-center">
            ¿No tienes una cuenta? <nuxt-link to="/register" class="text-sky-800 hover:underline">Crea una cuenta</nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
        this.isSubmitting = true;
        this.errorMessage = '';

        try {
            const response = await fetch(`${process.env.BASE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            });

            const data = await response.json();
            console.log(data); // Para depurar la respuesta

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            document.cookie = `email=${data.email}; path=/;`;
            document.cookie = `isSubscribed=${data.isSubscribed}; path=/;`;

            this.$router.push('/'); // Redirigir al usuario después de iniciar sesión
            window.dispatchEvent(new Event('storage')); // Actualizar almacenamiento si es necesario

        } catch (error) {
            this.errorMessage = error.message || 'Error de red. Inténtalo de nuevo.';
        } finally {
            this.isSubmitting = false; // Restablecer el estado de envío
        }
    },
},
};
</script>

<style scoped>
input, button {
  transition: all 0.2s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}
</style>