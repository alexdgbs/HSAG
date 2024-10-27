<template>
  <section class="bg-white py-6 flex items-center justify-center">
    <div class="w-full max-w-xs bg-white rounded-lg"> 
      <div class="p-4 space-y-4 sm:p-6">
        <h1 class="text-lg font-bold leading-tight text-gray-900">Crear cuenta</h1>
        <form class="space-y-3" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input 
              type="email" 
              v-model="email" 
              name="email" 
              id="email" 
              class="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded-lg text-gray-900 bg-gray-50" 
              placeholder="8hsabitgames@gmail.com" 
              required
            >
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              v-model="password" 
              name="password" 
              id="password" 
              placeholder="••••••••" 
              class="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded-lg text-gray-900 bg-gray-50" 
              required
            >
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input 
              type="password" 
              v-model="confirmPassword" 
              name="confirm-password" 
              id="confirm-password" 
              placeholder="••••••••" 
              class="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded-lg text-gray-900 bg-gray-50" 
              required
            >
          </div>
          <div class="flex items-center">
            <input 
              id="terms" 
              type="checkbox" 
              v-model="acceptTerms" 
              class="w-4 h-4 border-gray-300 rounded" 
              required
            >
            <label for="terms" class="ml-2 text-sm text-gray-600">Acepto los <a href="#" class="text-sky-800 hover:underline">términos</a></label>
          </div>
          <button 
            type="submit" 
            class="w-full bg-slate-100 text-black font-medium rounded-lg text-sm px-3 py-2 hover:bg-slate-200"
          >
            Crear cuenta
          </button>
          <p class="text-xs text-gray-500">
            ¿Ya tienes una cuenta? <a href="/login" class="text-sky-800 hover:underline">Inicia sesión</a>
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
      confirmPassword: '',
      acceptTerms: false
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      try {
        const response = await fetch(`${process.env.BASE_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            acceptTerms: this.acceptTerms,
          }),
        });

        if (response.ok) {
          this.$router.push('/login');
        } else {
          const data = await response.json();
          alert(data.message || 'Error en el registro');
        }
      } catch (error) {
        alert('Error de red. Inténtalo de nuevo.');
      }
    }
  }
}
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