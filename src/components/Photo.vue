<template>
  <div class="flex flex-col" >
    <div class="flex flex-col md:flex-row" v-show="search === ''"
         v-for="(section, indexSection) in photo.photoData._value" :key="indexSection">
      <div
        class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
      >
        <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
        <div class="m-1"><a href="javascript:void(0)">{{ photo.title }}</a></div>
        <div v-if="movePhotoMode"><span>Move photo </span><input type="checkbox" @click="handleSelectPhoto(photo.id, $event)"></div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row" v-show="photo.photoDataSearch._value.length > 0"
         v-for="(section, indexSection) in photo.photoDataSearch._value" :key="indexSection">
      <div
        class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
      >
        <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
        <div class="m-1"><a href="javascript:void(0)">{{ photo.title }}</a></div>
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
    lastPage: Number,
    search: String,
    movePhotoMode: Boolean
  },
  setup(props, context) {
    const { lastPage, search } = toRefs(props)

    const photo = fetchPhoto(lastPage, search)

    return {
      photo
    }
  },
  methods: {
    handleSelectPhoto(idPhoto, event) {
      if(event.target.checked) {
        this.$emit("selectPhoto", idPhoto)
      } else {
        this.$emit("unselectPhoto", idPhoto)
      }
    }
  }
};
</script>

<style scoped>

</style>
