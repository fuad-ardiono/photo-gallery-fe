<template>
  <div>
    <div class="flex flex-col" v-show="!albumDetail">
      <div class="flex flex-col md:flex-row" v-show="search === ''"
           v-for="(section, indexSection) in album.albumData._value" :key="indexSection">
        <div
          class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(album, indexAlbum) in section" :key="indexAlbum"
        >
          <div class="m-1"><a href="javascript:void(0)" @click="setAlbumDetail(album)">{{ album.title }}</a></div>
          <div class="mt-auto" v-if="user !== null"><a href="javascript:void(0)" class="bg-red-400 text-white rounded-sm w-18" @click="handleDeleteAlbum(album.id)">Delete</a></div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row" v-show="album.albumDataSearch._value.length > 0"
           v-for="(section, indexSection) in album.albumDataSearch._value" :key="indexSection">
        <div
          class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(album, indexAlbum) in section" :key="indexAlbum"
        >
          <div class="m-1"><a href="javascript:void(0)" @click="setAlbumDetail(album)">{{ album.title }}</a></div>
          <div class="mt-auto" v-if="user !== null"><a href="javascript:void(0)" class="bg-red-400 text-white rounded-sm w-18" @click="handleDeleteAlbum(album.id)">Delete</a></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col" v-if="albumDetail">
      <div><h1 class="text-4xl font-semibold">Album : {{ albumDetail.title }}</h1></div>
      <div class="flex flex-row">
        <div class="bg-white text-black rounded-lg p-1"><a href="javascript:void(0)" @click = "clearAlbumDetail">Kembali</a></div>
      </div>
      <div class="flex flex-col md:flex-row" v-show="albumDetail.photos.length === 0">Album kosong, foto tidak ada</div>
      <div class="flex flex-col md:flex-row"
           v-for="(section, indexSection) in albumDetail.photos" :key="indexSection">
        <div
          class="w-full h-72 md:w-72 bg-white rounded-lg text-black mr-5 mt-5 flex flex-col"  v-for="(photo, indexPhoto) in section" :key="indexPhoto"
        >
          <div><img class="m-0 mx-auto m-2" :src="photo.thumbnail_url" alt=""></div>
          <div class="m-1"><a href="javascript:void(0)">{{ photo.title }}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchAlbum} from "@/api/AlbumApi";
import {toRefs} from "vue";
import {chunk} from "lodash";

export default {
  name: 'Album',
  props: {
    lastPage: Number,
    search: String,
    isDetail: Boolean
  },
  data() {
    return {
      user: null,
      haveToken: false,
      albumDetail: null
    }
  },
  setup(props, context) {
    const { lastPage, search } = toRefs(props)

    const album = fetchAlbum(lastPage, search)

    return {
      album
    }
  },
  methods: {
    setAlbumDetail(album) {
      const albumData = Object.assign({}, album)
      albumData.photos = chunk(albumData.photos, 5)

      this.$emit('isDetail', true)
      this.albumDetail = albumData
    },
    clearAlbumDetail() {
      this.$emit('isDetail', false)
      this.albumDetail = null
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return !!userToken;
    },
    async handleDeleteAlbum(id) {
      try {
        const request = await fetch(`http://localhost:8000/api/album/${id}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token
          },
        })

        await request.json()
        alert("Delete album berhasil")

        window.location.pathname = "/album"
      } catch (e) {
        alert("Delete album gagal")
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
