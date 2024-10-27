<template>
  <section class="consolas-container">
    <h2 class="text-xl font-bold text-gray-900">Consolas</h2>
    <p class="text-slate-500 mb-6 text-sm py-5">Explora las consolas clásicas y revive la nostalgia de los mejores videojuegos.</p>

    <div class="emulador-grid">
      
      <nuxt-link to="/psp" class="emulador-card">
        <img src="/img/psp-consoles.png" alt="PlayStation Portable" class="emulador-imagen" />
      </nuxt-link>

   
      <nuxt-link to="/gamecube" class="emulador-card">
        <img src="/img/gamecube-consoles.png" alt="Nintendo Gamecube" class="emulador-imagen" />
      </nuxt-link>

      
      <nuxt-link to="/n64" class="emulador-card">
        <img src="/img/n64-consoles.png" alt="Nintendo 64" class="emulador-imagen" />
      </nuxt-link>

      
      <nuxt-link to="/gba" class="emulador-card">
        <img src="/img/gba-consoles.png" alt="Gameboy Advance" class="emulador-imagen" />
      </nuxt-link>

      <nuxt-link to="/snes" class="emulador-card">
        <img src="/img/snes-consoles.png" alt="Super Nintendo" class="emulador-imagen" />
      </nuxt-link>

      <nuxt-link to="/ps2" class="emulador-card">
        <img src="/img/ps2-consoles.png" alt="Playstation 2" class="emulador-imagen" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "ConsoleMenu",
};
</script>

<style scoped>
.consolas-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px; 
  text-align: center;
  animation: fadeIn 0.5s ease-in; 
}

.emulador-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
  gap: 20px; 
}

.emulador-card {
  position: relative; 
  width: 120px; 
  height: 120px; 
  background-color: #ffffff; 
  border-radius: 90px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  overflow: hidden; 
}

.emulador-card::after {
  content: '';
  position: absolute;
  bottom: -10px; 
  left: 0;
  right: 0;
  height: 100%; 
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)); 
  transform: scaleY(-1); 
  opacity: 0.3; 
  pointer-events: none; 
}



.emulador-imagen {
  width: 60%; 
  height: auto;
  transition: transform 0.3s; 
}

.emulador-card:hover .emulador-imagen {
  transform: rotate(0deg) scale(1.1); 
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 640px) {
  .emulador-card {
    width: 100px; 
    height: 100px; 
  }

  .emulador-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); 
  }
}
</style>

