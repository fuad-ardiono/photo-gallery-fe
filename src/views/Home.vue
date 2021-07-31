<template>
  <div class="home flex flex-col">
    <h1 class="text-4xl font-semibold">Foto</h1>
    <div class="mt-5 flex">
      <p v-show="!movePhotoMode"><input type="text" @input="handleSearch($event, this)"
                                        class="border-2 border-gray-400 text-black rounded-xl"
                                        placeholder="Cari/filter berdasarkan nama"
                                        style="text-indent: 10px"></p>
      <div class="flex" v-if="haveToken">
        <div v-show="!movePhotoMode" class="ml-2 bg-white text-black rounded-lg p-1"><a
          @click="handleMovePhoto" href="javascript:void(0)">Pindahkan foto ke album lain</a></div>
        <div v-show="movePhotoMode" class="ml-2 bg-red-500 text-white rounded-lg p-1"><a
          @click="handleCancelMovePhoto" href="javascript:void(0)">Batalkan pindah foto</a></div>
        <div v-show="movePhotoMode && movePhotoPayload.selectedPhoto.length > 0"
             class="ml-2 bg-white text-black rounded-lg p-1 px-5">Pilih album
          <select name="" v-model="movePhotoPayload.albumId" id="">
            <option value="0">---Pilih album---</option>
            <option :value="album.id" v-for="(album, indexAlbum) in album.albumData._value"
                    :key="indexAlbum">{{ album.title }}
            </option>
          </select>
        </div>
        <div class="ml-2 bg-white text-black rounded-lg p-1"
             v-show="movePhotoPayload.albumId !== '0'"><a @click="handleProcessMovePhoto"
                                                          href="javascript:void(0)">Pindahkan
          Foto Sekarang</a></div>
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
import {fetchAlbum} from "../api/AlbumApi";
import {toRefs} from "vue";

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
        selectedPhoto: [],
        albumId: "0"
      }
    }
  },
  components: {
    Photo,
  },
  setup() {
    const searchValue = toRefs({search: ""})
    const album = fetchAlbum(1, searchValue.search, true, false)

    console.log('fetched album', album)

    return {
      album
    }
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
      this.movePhotoPayload = {
        selectedPhoto: [],
        albumId: "0"
      }
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
    async handleProcessMovePhoto() {
      try {
        const request = await fetch(`http://localhost:8000/api/picture/move/${this.movePhotoPayload.albumId}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token,
          },
          body: JSON.stringify({picture_ids: this.movePhotoPayload.selectedPhoto})
        })

        await request.json()

        alert("Proses pemindahan foto ke album baru berhasil")
        window.location.pathname = "/"
      } catch (e) {
        alert("Proses pemindahan foto ke album baru gagal")
      }
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return !!userToken;
    },
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
