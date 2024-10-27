<template>
  <div class="container mx-auto p-4 fadeIn">
    <transition name="fade" @before-enter="beforeEnter" @enter="enter">
      <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos SNES</h1>
    </transition>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div 
        v-for="game in games" 
        :key="game.id" 
        class="bg-white rounded-lg p-1 shadow hover:shadow-lg transition transform game-card"
      >
        <img 
          :src="game.cover" 
          alt="Carátula del juego" 
          class="game-image w-full h-24 object-contain rounded-lg mb-1" 
        />
        <h2 class="text-xs font-bold">{{ game.name }}</h2>
        <p class="text-xs text-gray-600">{{ game.description }}</p>
        <button
          v-if="isSubscribed || isAdmin"
          class="mt-1 bg-slate-50 text-sky-800 text-xs"
          @click="downloadGame(game)"
        >
          Descargar
        </button>
        <p v-else class="mt-1 text-red-500 text-xs">Suscríbete para descargar</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    isVisible: false,
    isAdmin: false,
    isSubscribed: false,
    games: [
    { id: 1, name: 'Street Fighter II Turbo', cover: '/img/street-fighter-ii-turbo.webp', downloadLink: 'https://drive.google.com/file/d/1QL_R5yv_hTQpXt57TW1a0IVLCHrW0aB_/view?usp=sharing', description: 'Lucha' },
    { id: 2, name: 'Chrono Trigger', cover: '/img/Chrono+Trigger.jpg', downloadLink: 'https://drive.google.com/file/d/1sei4p0EfzSwTLtRtRdQXIYfwXJCMf639/view?usp=drive_link', description: 'RPG' },
    { id: 3, name: 'EarthBound', cover: '/img/EarthBound.jpg', downloadLink: 'https://drive.google.com/file/d/17lmqCPu9cTj5x_AUHHwKjz4vrivx6GfB/view?usp=sharing', description: 'RPG' },
    { id: 4, name: 'Final Fantasy III', cover: '/img/Final+Fantasy+III.jpg', downloadLink: 'https://drive.google.com/file/d/1YueokRaXH-mzwBaL2Hyksrv5NVFSmyAj/view?usp=sharing', description: 'RPG' },
    { id: 5, name: 'Super Mario All-Stars', cover: '/img/super-mario-all-stars.webp', downloadLink: 'https://drive.google.com/file/d/1_FwJAurQP7_GjGeB0RxjnuHz2ywEzw0q/view?usp=sharing', description: 'Plataformas' },
    { id: 6, name: 'The Legend of Zelda: A Link to the Past', cover: '/img/legend-of-zelda-the-a-link-to-the-past.webp', downloadLink: 'https://drive.google.com/file/d/1qf6gao1MPlozBbcX-p4SY5Dtt-bESoko/view?usp=drive_link', description: 'Acción/Aventura' },
    { id: 7, name: 'Super Metroid', cover: '/img/super-metroid.webp', downloadLink: 'https://drive.google.com/file/d/1wpzYXkOEoRJLrVorr06a71g30yMDkFog/view?usp=sharing', description: 'Acción/Aventura' },
    { id: 8, name: 'Contra III: The Alien Wars', cover: '/img/contra-iii-the-alien-wars.webp', downloadLink: 'https://drive.google.com/file/d/1-tBZehpH5YfcFrPFvFODlRUgM4QK6aGv/view?usp=sharing', description: 'Acción' },
],
  };
},
mounted() {
  this.isVisible = true;
  const emailCookie = document.cookie.split(';').find(item => item.trim().startsWith('email='));
  if (emailCookie) {
    const emailValue = emailCookie.split('=')[1];
    this.isAdmin = emailValue === '8hsabitgames@gmail.com';
    this.getUserInfo(emailValue);
  }
},
methods: {
  async getUserInfo(email) {
    try {
      const response = await fetch(`${process.env.BASE_API_URL}/user?email=${email}`);

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      const userData = await response.json();
      this.isSubscribed = userData.isSubscribed;
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  },
  downloadGame(game) {
    window.location.href = game.downloadLink;
  },
  beforeEnter(el) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(-20px)';
  },
  enter(el, done) {
    el.offsetHeight;
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    done();
  },
},
};
</script>

<style scoped>
.container {
max-width: 1200px;
animation: fadeIn 0.5s ease-in;
}

.game-card {
transition: background-color 0.3s, box-shadow 0.3s;
padding: 0.5rem;
}

.game-card:hover {
background-color: #ffffff;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.game-image {
transition: transform 0.3s;
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

.fade-enter-active, .fade-leave-active {
transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to {
opacity: 0;
transform: translateY(-20px);
}
</style>

  