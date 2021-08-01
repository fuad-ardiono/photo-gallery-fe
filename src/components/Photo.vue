<template>
  <div>
    <div class="flex flex-col" >
      <div class="flex flex-col md:flex-row" v-show="search === ''"
           v-for="(section, indexSection) in photo.photoData._value" :key="indexSection">
        <div
          class="w-full h-full md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
        >
          <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
          <div class="m-1">
            <a href="javascript:void(0)" v-if="!isEditPhoto(photo.id)">Title: {{ photo.title }}</a>
            <input v-if="isEditPhoto(photo.id)" style="text-indent: 10px" class="border-2 border-gray-400 text-black rounded-xl" type="text" :value="photo.title" @input="handleRenameInputText($event, photo.id)">
            <div class="flex">
              <a class="ml-5" v-show="user != null" href="javascript:void(0)" @click="handleEditPhoto(photo)"><i class="fas fa-pencil-alt"></i></a>
              <div v-if="isEditPhoto(photo.id)"><a @click="handleRenamePhoto(photo)" class="bg-blue-400 text-white rounded-sm w-18 ml-2" href="javascript:void(0)">Simpan</a></div>
            </div>
          </div>
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

    <div class="flex flex-col">

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
      user: null,
      photoEdit: []
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
    },
    isEditPhoto(id) {
      return this.photoEdit.some(data => data.id === id)
    },
    handleEditPhoto(photo) {
      console.log(photo)
      if(this.isEditPhoto(photo.id)) {
        const filter = this.photoEdit.filter(data => data.id !== photo.id)
        console.log(filter)
        this.photoEdit = filter
      } else {
        this.photoEdit.push(photo)
      }
    },
    async handleRenamePhoto(photo) {
      console.log(photo)
      try {
        const request = await fetch(`http://localhost:8000/api/picture/${photo.id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token
          },
          body: JSON.stringify(photo)
        })
        await request.json()
        alert("Ubah nama foto berhasil")
        window.location.pathname = "/"
      } catch (e) {
        alert("Ubah nama foto gagal")
      }
    },
    handleRenameInputText(event, id) {
      const newObj = this.photoEdit.find(item => item.id === id)
      newObj.title = event.target.value

      const indexPhotoEdit = this.photoEdit.findIndex(item => item.id === id)
      this.photoEdit[indexPhotoEdit] = newObj
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
