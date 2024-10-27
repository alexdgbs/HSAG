<template>
  <div>
    <Navbar />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  }
};
</script>

<style scoped>

</style>
