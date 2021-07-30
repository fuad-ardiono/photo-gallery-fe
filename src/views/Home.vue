<template>
  <div class="home">
    <h1 class="text-4xl font-semibold">Foto</h1>
    <div class="mt-5">
      <PhotoRepository></PhotoRepository>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoRepository from '@/components/repository/PhotoRepository.vue';

export default {
  name: 'Home',
  components: {
    PhotoRepository,
  },
};
</script>
