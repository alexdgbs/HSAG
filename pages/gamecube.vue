<template>
  <div class="container mx-auto p-4 fadeIn">
    <transition name="fade" @before-enter="beforeEnter" @enter="enter">
      <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos GameCube</h1>
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
        <p class="text-xs">{{ game.description }}</p>
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
        { id: 1, name: 'Eternal Darkness Sanitys Requiem', cover: '/img/eternal-darkness-sanitys-requiem.webp', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Eternal%20Darkness%20-%20Sanitys%20Requiem%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZYl9Y', description: ' Acción' },
        { id: 2, name: 'Skies of Arcadia Legends', cover: '/img/skies-of-arcadia-legends.webp', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Skies%20of%20Arcadia%20Legends%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZFhT', description: 'RPG' },
        { id: 3, name: 'Billy Hatcher and the Giant Egg', cover: '/img/billy-hatcher-and-the-giant-egg.webp', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Billy%20Hatcher%20and%20the%20Giant%20Egg%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZF1W', description: 'Plataforma' },
        { id: 4, name: 'Viewtiful Joe', cover: '/img/viewtiful-joe.webp', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Viewtiful%20Joe%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZF9Z', description: ' Plataforma' },
        { id: 5, name: 'Splinter Cell', cover: '/img/splintercellnintendo.jpg', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Tom%20Clancys%20Splinter%20Cell%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZVxX', description: 'Acción/Estrategia' },
        { id: 6, name: 'Mario Party 4', cover: '/img/Mario-Party-4.jpg', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Mario%20Party%204%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZl1R', description: 'Multijugador' },
        { id: 7, name: '2002 FIFA World Cup', cover: '/img/fifa2002.jpg', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/2002%20FIFA%20World%20Cup%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZlxW', description: 'Deportes' },
        { id: 8, name: 'Super Mario Strikers', cover: '/img/Super_Mario_Strikers_cover.png', downloadLink: 'https://sto.romsfast.com/GameCube-RVZ/Super%20Mario%20Strikers%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZlFY', description: 'Deportes' },
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

