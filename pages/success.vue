<template>
    <div class="bg-white py-12 sm:py-6 flex flex-col items-center justify-center">
      <h1 class="text-xl font-bold text-green-700">¡Pago Completado!</h1>
      <p class="mt-4 text-sm">Gracias por tu compra.</p>
      <p class="mt-4 text-sm font-bold">Tu transacción fue exitosa.</p>
      <router-link to="/inicio" class="text-slate-500 text-sm mt-6 btn btn-primary">Volver a Inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {}
  }
  </script>
  
  <style scoped>

  body {
    margin: 0;
  }
  </style>
  
  
  