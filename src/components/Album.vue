<template>
  <div class="flex flex-col" >
    <div class="flex flex-col md:flex-row" v-for="(section, indexSection) in album.albumData._value" :key="indexSection">
      <div
        class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(album, indexAlbum) in section" :key="indexAlbum"
      >
        <div class="m-1"><a href="">{{ album.title }}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchAlbum} from "@/api/AlbumApi";
import {toRefs} from "vue";

export default {
  name: 'Album',
  props: {
    lastPage: Number
  },
  setup(props, context) {
    const { lastPage } = toRefs(props)

    const album = fetchAlbum(lastPage)

    return {
      album
    }
  }
};
</script>

<style scoped>

</style>
