<template>
  <section class="text-center py-6 bg-white">
    <h2 class="text-xl font-bold mb-12 text-gray-900">Team</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
      <div class="bg-white rounded-lg p-3 transition-transform transform hover:scale-105">
        <img src="/img/Samuel.png" alt="Miembro del equipo" class="mb-2 w-20 h-auto mx-auto rounded-full border-4 border-gray-200" />
        <h3 class="text-sm font-semibold text-gray-800">Alejandro Delgadillo</h3>
        <p class="text-sm text-gray-600 mt-1">Desarrollador/Backend</p>
        <p class="text-sm mt-1 text-gray-400">006210025</p>
      </div>
      <div class="bg-white rounded-lg p-3 transition-transform transform hover:scale-105">
        <img src="/img/Hector.png" alt="Miembro del equipo" class="mb-2 w-20 h-auto mx-auto rounded-full border-4 border-gray-200" />
        <h3 class="text-sm font-semibold text-gray-800">Héctor Chacón </h3>
        <p class="text-sm text-gray-600 mt-1">Documentación/Estructuración</p>
        <p class="text-sm mt-1 text-gray-400">9120170033</p>
      </div>
      <div class="bg-white rounded-lg p-3 transition-transform transform hover:scale-105">
        <img src="/img/Alexis.png" alt="Miembro del equipo" class="mb-2 w-20 h-auto mx-auto rounded-full border-4 border-gray-200" />
        <h3 class="text-sm font-semibold text-gray-800">Alexis Zavala</h3>
        <p class="text-sm text-gray-600 mt-1">Documentación</p>
        <p class="text-sm mt-1 text-gray-400">091170038</p>
      </div>
    </div>
    <footer class="mt-8 text-center text-gray-500 text-xs">
      <h1 class="text-base font-semibold text-gray-800">Contacto</h1>
      <p class="text-gray-600 text-sm mt-1">8hsabitgames@gmail.com</p>
      <p>&copy; 2024 HSA Games. Todos los derechos reservados.</p>
    </footer>
  </section>
</template>

<script>
export default {
  name: "TeamSection",
};
</script>

<style scoped>
.shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

footer p {
  font-size: 0.75rem;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb; 
}

.bg-gray-100 {
  background-color: #f3f4f6; 
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>
