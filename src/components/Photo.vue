<template>
  <div class="flex flex-col" >
    <div class="flex flex-col md:flex-row" v-for="(section, indexSection) in photo.photoData._value" :key="indexSection">
      <div
        class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
      >
        <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
        <div class="m-1"><a href="">{{ photo.title }}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchPhoto} from "@/api/PhotoApi";
import {toRefs} from "vue";

export default {
  name: 'Photo',
  props: {
    lastPage: Number
  },
  setup(props, context) {
    const { lastPage } = toRefs(props)

    const photo = fetchPhoto(lastPage)

    return {
      photo
    }
  }
};
</script>

<style scoped>

</style>
