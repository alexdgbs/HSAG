<template>
  <div class="emuladores-container fade-in slide-in">
    <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Emuladores</h1>
    <p class="text-slate-500 mb-6 text-sm py-5">Links de las páginas oficiales</p>

  
    <div class="tv-container">
      <div class="emulador-grid">
        <div 
          v-for="(emulador, index) in emuladores" 
          :key="index" 
          class="emulador-card"
          @mouseover="hoveredIndex = index" 
          @mouseleave="hoveredIndex = null"
        >
          <a :href="emulador.link" target="_blank" class="emulador-link">
            <img :src="emulador.imagen" :alt="'Imagen de ' + emulador.nombre" class="emulador-imagen" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emuladores: [
        { nombre: 'PSP', link: 'https://www.ppsspp.org/', imagen: '/img/psp.png' },
        { nombre: 'PS2', link: 'https://pcsx2.net/', imagen: '/img/ps2.png' },
        { nombre: 'GameCube', link: 'https://es.dolphin-emu.org/?cr=es', imagen: '/img/gamecube-consoles.png' },
        { nombre: 'GBA', link: 'https://visualboyadvance.org/', imagen: '/img/gameboyadvance.png' },
        { nombre: 'Snes', link: 'https://www.snes9x.com/', imagen: '/img/nes.png' },
        { nombre: 'Nintendo 64', link: 'https://www.pj64-emu.com/', imagen: '/img/nintendo64.png' },
      ],
      hoveredIndex: null,
    };
  },
};
</script>

<style scoped>

.fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.slide-in {
  opacity: 0;
  transform: translateY(20px); 
  animation: slideIn 1s forwards; 
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0); 
  }
}

.emuladores-container {
  max-width: 800px; 
  margin: 0 auto;
  padding: 20px; 
  text-align: center;
}

h1 {
  font-size: 1.5rem; 
  margin-bottom: 20px;
}

.tv-container {
  background: #ffffff; 
  border-radius: 15px;
  padding: 35px; 
  position: relative; 
  overflow: hidden; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.tv-container::before {
  content: "";
  position: absolute;
  top: 5px; 
  left: 5px; 
  right: 5px; 
  bottom: 5px; 
  border: 5px solid #ffffff; 
  border-radius: 10px; 
  pointer-events: none; 
}

.emulador-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); 
  gap: 15px; 
  padding: 10px 0; 
}

.emulador-card {
  width: 100px; 
  height: 100px; 
  background-color: #ffffff; 
  border-radius: 100px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

.emulador-card:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); 
} 

.emulador-imagen {
  width: 60%; 
  height: auto;
}

.emulador-link {
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center;
  align-items: center; 
}
@media (max-width: 640px) {
  h1 {
    font-size: 1.25rem; 
  }

  .emulador-card {
    width: 80px; 
    height: 80px; 
    margin: 10px; 
  }

  .emulador-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); 
  }
}
</style>
