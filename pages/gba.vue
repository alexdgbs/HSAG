<template>
  <div class="container mx-auto p-4 fadeIn">
    <transition name="fade" @before-enter="beforeEnter" @enter="enter">
      <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos Gameboy</h1>
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
      { id: 1, name: 'Mother 3 (Fan Translation)', cover: '/img/mother-3-eng-translation-1-1.webp', downloadLink: 'http://example.com/download/zelda', description: 'Aventura/RPG' },
      { id: 2, name: 'Golden Sun - The Lost Age', cover: '/img/golden-sun-the-lost-age.webp', downloadLink: 'https://drive.google.com/file/d/1D0z1EjAm9XbAe6VwUIgQh2oIyYUm9zwD/view?usp=sharing', description: 'Plataformas' },
      { id: 3, name: 'Street Fighter Alpha 3 (Fan Translation)', cover: '/img/streetfalpha.jpeg', downloadLink: 'https://drive.google.com/file/d/1hqOXqM-vbp4s-yUzHgEwwqAvTH0Gay9k/view?usp=sharing', description: 'Lucha' },
      { id: 4, name: 'Dragon Ball Z: Taiketsu', cover: '/img/gba-dbztaiketsu.jpg', downloadLink: 'https://drive.google.com/file/d/1r1Mip0I7Zg2NKmxbV5FJ8PsQL-jgB5dk/view?usp=sharing', description: 'Lucha' },
      { id: 5, name: 'Doom', cover: '/img/gba-doom.jpg', downloadLink: 'https://drive.google.com/file/d/16Q6utfA6-MkTvNzdqbYZq_V03k3HZEm9/view?usp=sharing', description: 'Shooter' },
      { id: 6, name: 'Super Mario Advance 2', cover: '/img/gba-supermario2.jpg', downloadLink: 'https://drive.google.com/file/d/1oMW_NEO5VFrzzmAeXYMHUvNEa88t5qeU/view?usp=sharing', description: 'Plataformas' },
      { id: 7, name: 'Mario Kart: Super Circuit', cover: '/img/gba-mariokart.jpg', downloadLink: 'https://drive.google.com/file/d/1fkdwL4IDXI0rExHTWCrTmMS_ZJdlm3vm/view?usp=sharing', description: 'Carreras' },
      { id: 8, name: 'Metroid: Fusion', cover: '/img/gba-metroidfusion.jpg', downloadLink: 'https://drive.google.com/file/d/1sIxtP5RiYtFDsZUeEaitz1SJY5rh0HHs/view?usp=drive_link', description: 'Acción/Aventura' },
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

  