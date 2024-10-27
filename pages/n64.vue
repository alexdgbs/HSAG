<template>
    <div class="container mx-auto p-4 fadeIn">
      <transition name="fade" @before-enter="beforeEnter" @enter="enter">
        <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos N64</h1>
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
  { id: 1, name: 'Jet Force Gemini', cover: '/img/jet-force-gemini.webp', description: 'Aventuras', downloadLink: 'https://drive.google.com/file/d/1Tzl8CtlaN00RJ_SRKsfIour88DM3gtqA/view?usp=sharing' },
  { id: 2, name: 'Body Harvest', cover: '/img/body-harvest.webp', description: 'Acción', downloadLink: 'https://drive.google.com/file/d/1ePA3XfwGu41INWgrOG1wUQSKJJ5tQbtF/view?usp=sharing' },
  { id: 3, name: 'Space Station Silicon Valley', cover: '/img/space-station-silicon-valley.webp', description: 'Plataformas', downloadLink: 'https://drive.google.com/file/d/1jLjMFyazzmieXVCCNl53TZ7IdkR_OWlp/view?usp=sharing' },
  { id: 4, name: 'Blast Corps', cover: '/img/blast-corps-v1-1.webp', description: ' Estrategia', downloadLink: 'https://drive.google.com/file/d/1Dp5jxtrT10vN9Ia84To5mC3cf5dPn8gp/view?usp=sharing' },
  { id: 5, name: 'Forsaken 64', cover: '/img/forsaken-64.webp', description: 'Shooter', downloadLink: 'https://drive.google.com/file/d/17-GmMV5qQWnjlRSjJHytUgjXjPifh_X2/view?usp=sharing' },
  { id: 6, name: 'Turok: Dinosaur Hunter', cover: '/img/turok-dinosaur-hunter-v1-2.webp', description: 'Shooter', downloadLink: 'https://drive.google.com/file/d/1qUJMbZLSb52f66r-5R4MuN1FF25HOAfu/view?usp=sharing' },
  { id: 7, name: 'Shadow Man', cover: '/img/shadow-man.webp', description: 'Acción', downloadLink: 'https://drive.google.com/file/d/1Z54qeeLentle9rYi6QitUqa_5JGOuBXu/view?usp=sharing' },
  { id: 8, name: 'Extreme-G', cover: '/img/extreme-g.webp', description: 'Carreras', downloadLink: 'https://drive.google.com/file/d/1H_db9KDB3QT6Y4quUOwuErcwPhOsRPjV/view?usp=sharing' },
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
  