<template>
  <div class="container mx-auto p-4 fadeIn">
    <transition name="fade" @before-enter="beforeEnter" @enter="enter">
      <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos PSP</h1>
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
        { id: 1, name: 'Gran Turismo', cover: '/img/psp-granturismo.jpg', downloadLink: 'https://drive.google.com/file/d/1tXIe_NEj682QdCLAg1SMDbw_fxhXx_OR/view?usp=sharing', description: 'Carreras' },
        { id: 2, name: 'G.I. Joe: The Rise of Cobra', cover: '/img/psp-joe.jpg', downloadLink: 'https://drive.google.com/file/d/16J8J9mlBUnfhjguRRhz7vHmAsS0LTGPH/view?usp=sharing', description: 'Acción' },
        { id: 3, name: 'Duke Nukem: Critical Mass (Jul 30, 2010 prototype)', cover: '/img/psp-dukenukemcriticalmass.jpg', downloadLink: 'https://drive.google.com/file/d/1tiR3azYz9U7ByhWQ4J6Nckeg9M0oD5zl/view?usp=sharing', description: 'Acción' },
        { id: 4, name: 'Def Jam Fight for NY: The Takeover', cover: '/img/psp-defjam.png', downloadLink: 'https://drive.google.com/file/d/1WKE5Lr1S3MI6hUaLvZXQVk1kM6C9kreL/view?usp=sharing', description: 'Lucha' },
        { id: 5, name: 'Midnight Club: Los Angeles', cover: '/img/psp-mcremix.jpg', downloadLink: 'https://drive.google.com/file/d/15j7y2E77oltV37cqRijRmmhauVB_XRDm/view?usp=sharing', description: 'Carreras' },
        { id: 6, name: 'Little Big Planet', cover: '/img/psp-LittleBigPlanet.jpg', downloadLink: 'https://drive.google.com/file/d/1RZz4f0OZ_ChYixw3hWKOGulIEUstB5mF/view?usp=sharing', description: 'Plataformas' },
        { id: 7, name: 'Silent Hill: Origins', cover: '/img/psp-silenthill.origins.png', downloadLink: 'https://drive.google.com/file/d/1mcLI4ruO9glsd_P3L-by527kNTDGVzLR/view?usp=sharing', description: 'Survival Horror / Aventura' },
        { id: 8, name: 'Peggle', cover: '/img/Peggle.png', downloadLink: 'https://drive.google.com/file/d/14xeCREAbUCguZ28H5xlz3ilEKZRAIIbG/view?usp=sharing', description: 'Puzzle' },
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
.fade-enter, .fade-leave-to  {
  opacity: 0;
  transform: translateY(-20px); 
}
</style>
