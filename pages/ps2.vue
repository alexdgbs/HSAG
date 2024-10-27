<template>
    <div class="container mx-auto p-4 fadeIn">
      <transition name="fade" @before-enter="beforeEnter" @enter="enter">
        <h1 v-if="isVisible" class="text-xl font-bold mb-6">Catálogo de Juegos PS2</h1>
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
{ id: 1, name: 'True Crime Streets of LA', cover: '/img/true-crime-streets-of-la.jpg', downloadLink: 'https://sto.romsfast.com/PS2-Redump/True%20Crime%20-%20Streets%20of%20LA%20(USA).zip?token=c3xZcltjWVFOEHJxU3dYYQtbFkJ5IlN8UmYKWxUWc3ZTcFRgWx1FFnN9UXZZZ19T', description: 'Acción' },
{ id: 2, name: 'Gun', cover: '/img/Gun.jpg', downloadLink: 'https://sto.romsfast.com/PS2-Redump/Gun%20(USA).zip?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfFF0Vg%3D%3D', description: 'Acción' },
{ id: 3, name: 'Black', cover: '/img/Black.jpg', downloadLink: 'https://sto.romsfast.com/PS2-Redump/Black%20(USA).zip?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfFFxVQ%3D%3D', description: 'Shooter' },
{ id: 4, name: 'The Warriors', cover: '/img/Warriors,+The+(USA)+(En,Fr,De,Es,It)-image.jpg', downloadLink: 'https://sto.romsfast.com/PS2-CHD/Warriors%20The%20(USA)%20(EnFrDeEsIt).chd?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfFFzUg%3D%3D', description: 'Acción' },
{ id: 5, name: 'OutRun 2006: Coast 2 Coast', cover: '/img/outrun-2006-coast-2-coast.jpg', downloadLink: 'https://sto.romsfast.com/PS2-Redump/OutRun%202006%20-%20Coast%202%20Coast%20(USA)%20(EnFrEs).zip?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfFBxUA%3D%3D', description: 'Carreras' },
{ id: 6, name: 'Burnout 3: Takedown', cover: '/img/burnout-3-takedown.jpg', downloadLink: 'https://sto.romsfast.com/PS2-Redump/Burnout%203%20-%20Takedown%20(USA).zip?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfFB8UQ%3D%3D', description: 'Carreras' },
{ id: 7, name: 'Mark of Kri', cover: '/img/the-mark-of-kri.jpg', downloadLink: 'https://sto.romsfast.com/PS2-CHD/Mark%20of%20Kri%20The%20(USA).chd?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfVlwWQ%3D%3D', description: 'Acción' },
{ id: 8, name: 'Urban Reign', cover: '/img/urban-reign.jpg', downloadLink: 'https://sto.romsfast.com/PS2-CHD/Urban%20Reign%20(USA).chd?token=cHNealNkUU9FF3lqXH0dYV9TTRlzfVlwVA%3D%3D', description: 'Lucha' },
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
  