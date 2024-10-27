<template>
  <div class="bg-white py-12 sm:py-6">
    <div class="mx-auto max-w-4xl px-4 lg:px-6">
      <div class="mx-auto max-w-xl sm:text-center">
        <h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">Precios</h2>
        <p class="mt-4 text-sm leading-6 text-gray-600">Cada semana nos encargamos de añadir juegos nuevos de todas las consolas</p>
      </div>
      <div class="mx-auto mt-8 max-w-lg rounded-2xl ring-1 ring-gray-200 sm:mt-12 lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-4 sm:p-6 lg:flex-auto">
          <h3 class="text-xl font-bold tracking-tight text-gray-900">HSA Games</h3>
          <p class="mt-4 text-sm leading-6 text-gray-600">Nostalgia</p>
          <div class="mt-6 flex items-center gap-x-2">
            <h4 class="flex-none text-xs font-semibold leading-5 text-sky-800">¡No tienes límites de descarga!</h4>
            <div class="h-px flex-auto bg-gray-100"></div>
          </div>
          <ul role="list" class="mt-6 grid grid-cols-1 gap-3 text-xs leading-5 text-gray-600 sm:grid-cols-2 sm:gap-4">
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Play Station Portable (PSP)
            </li>
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Nintendo Gamecube
            </li>
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Nintendo 64
            </li>
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Gameboy Advance
            </li>
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              PlayStation 2
            </li>
            <li class="flex gap-x-2">
              <svg class="h-5 w-4 flex-none text-sky-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              Super Nintendo
            </li>
          </ul>
        </div>
        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0">
          <div class="rounded-xl bg-gray-50 py-8 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-12">
            <div class="mx-auto max-w-xs px-6">
              <p class="text-sm font-semibold text-gray-600">Pago Mensual</p>
              <p class="mt-4 flex items-baseline justify-center gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-gray-900">$49</span>
                <span class="text-xs font-semibold leading-5 tracking-wide text-gray-600">MX</span>
              </p>
              
              <button @click="handleSubscription" class="mt-8 block w-full rounded-md bg-sky-400 px-3 py-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Suscribirme</button>
              <p class="mt-4 text-xs leading-4 text-gray-600">Retro-Arcade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
  methods: {
    handleSubscription() {
      
      const emailExists = document.cookie.split(';').some((item) => item.trim().startsWith('email='));
      if (emailExists) {
        
        window.location.href = '/checkout';
      } else {
        
        window.location.href = '/login';
      }
    }
  }
};
</script>

<style scoped>

</style>
