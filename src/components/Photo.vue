<template>
  <div class="flex flex-col" >
    <div class="flex flex-col md:flex-row" v-show="search === ''"
         v-for="(section, indexSection) in photo.photoData._value" :key="indexSection">
      <div
        class="w-full h-full md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
      >
        <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
        <div class="m-1"><a href="javascript:void(0)">Title: {{ photo.title }}</a></div>
        <div class="m-1"><p>Album: {{photo.album.title}}</p></div>
        <div v-if="movePhotoMode"><span>Move photo </span><input type="checkbox" @click="handleSelectPhoto(photo.id, $event)"></div>
        <div v-if="user !== null"><a href="javascript:void(0)" class="bg-red-400 text-white rounded-sm w-18" @click="handleDeletePhoto(photo.id)">Delete</a></div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row" v-show="photo.photoDataSearch._value.length > 0"
         v-for="(section, indexSection) in photo.photoDataSearch._value" :key="indexSection">
      <div
        class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
      >
        <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
        <div class="m-1"><a href="javascript:void(0)">Title: {{ photo.title }}</a></div>
        <div class="m-1"><p>Album: {{photo.album.title}}</p></div>
        <div v-if="user !== null"><a href="javascript:void(0)" class="bg-red-400 text-white rounded-sm w-18" @click="handleDeletePhoto(photo.id)">Delete</a></div>
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
  data() {
    return {
      user: null
    }
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
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return !!userToken;
    },
    async handleDeletePhoto(id) {
      try {
        const request = await fetch(`http://localhost:8000/api/picture/${id}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token
          },
        })

        await request.json()

        alert("Delete photo berhasil")

        window.location.pathname = "/"
      } catch (e) {
        alert("Delete photo gagal")
      }
    }
  },
  mounted() {
    if (this.isHaveToken()) {
      this.user = JSON.parse(localStorage.getItem("tokenUser"))
      this.haveToken = true
    } else {
      this.haveToken = false
    }
  }
};
</script>

<style scoped>

</style>
