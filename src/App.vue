<template>
  <Header></Header>
  <div class="container mx-auto text-white mt-10">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
