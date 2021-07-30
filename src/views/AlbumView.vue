<template>
  <div class="home flex flex-col">
    <h1 class="text-4xl font-semibold">Album</h1>
    <div class="mt-5">
      <Album :lastPage="lastPageCounter"></Album>
    </div>
    <div class="m-0 mx-auto p-2 bg-white text-black my-10 rounded-full">
      <a href="javascript:void(0)" @click="showMore">Tampilkan Lebih Banyak</a>
    </div>
  </div>
</template>

<script>
import Album from '@/components/Album.vue';

export default {
  name: 'AlbumView',
  data() {
    return {
      lastPageCounter: 1
    }
  },
  components: {
    Album,
  },
  methods: {
    showMore() {
      this.lastPageCounter += 1
    }
  }
};
</script>
