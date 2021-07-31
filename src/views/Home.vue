<template>
  <div class="home flex flex-col">
    <h1 class="text-4xl font-semibold">Foto</h1>
    <div class="mt-5 flex">
      <p v-show="!movePhotoMode"><input type="text" @input="handleSearch($event, this)" class="border-2 border-gray-400 text-black rounded-xl" placeholder="Cari/filter berdasarkan nama"  style="text-indent: 10px"></p>
      <div class="flex" v-if="haveToken">
        <div v-show="!movePhotoMode" class="ml-2 bg-white text-black rounded-lg p-1"><a @click="handleMovePhoto" href="javascript:void(0)">Pindahkan foto ke album lain</a></div>
        <div v-show="movePhotoMode" class="ml-2 bg-red-500 text-white rounded-lg p-1"><a @click="handleCancelMovePhoto" href="javascript:void(0)">Batalkan pindah foto</a></div>
      </div>
    </div>
    <div class="mt-5">
      <Photo
        :lastPage="lastPageCounter"
        :search="search"
        :movePhotoMode="movePhotoMode"
        v-on:selectPhoto="handleSelectPhoto($event)"
        v-on:unselectPhoto="handleUnselectPhoto($event)"
      ></Photo>
    </div>
    <div class="m-0 mx-auto p-2 bg-white text-black my-10 rounded-full" v-show="search === ''">
      <a href="javascript:void(0)" @click="showMore">Tampilkan Lebih Banyak</a>
    </div>
  </div>
</template>

<script>
import Photo from '@/components/Photo.vue';
import {debounce} from "lodash/function";

export default {
  name: 'Home',
  data() {
    return {
      lastPageCounter: 1,
      search: "",
      movePhotoMode: false,
      haveToken: false,
      user: null,
      movePhotoPayload: {
        selectedPhoto: []
      }
    }
  },
  components: {
    Photo,
  },
  methods: {
    showMore() {
      this.lastPageCounter += 1
    },
    handleSearch: debounce((e, data) => {
      data.search = e.target.value
      data.lastPageCounter = 1
    }, 800),
    handleMovePhoto() {
      this.movePhotoMode = true
    },
    handleCancelMovePhoto() {
      this.movePhotoMode = false
    },
    handleSelectPhoto(value) {
      this.movePhotoPayload.selectedPhoto.push(value)
    },
    handleUnselectPhoto(value) {
      const newObj = this.movePhotoPayload.selectedPhoto.filter((obj) => {
        return obj !== value
      })
      this.movePhotoPayload.selectedPhoto = newObj
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return !!userToken;
    },
  },
  mounted() {
    if(this.isHaveToken()) {
      this.user = JSON.parse(localStorage.getItem("tokenUser"))
      this.haveToken = true
    } else {
      this.haveToken = false
    }
  }
};
</script>
