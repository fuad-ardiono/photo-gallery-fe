<template>
  <div class="home flex flex-col">
    <h1 class="text-4xl font-semibold" v-show="isDetail === false">Album</h1>
    <div class="mt-5" v-show="isDetail === false">
      <p><input type="text" @input="handleSearch($event, this)" class="border-2 border-gray-400 text-black rounded-xl" placeholder="Cari/filter berdasarkan nama"  style="text-indent: 10px"></p>
    </div>
    <div class="mt-5">
      <Album :lastPage="lastPageCounter" :search="search" v-on:isDetail="handleIsDetail($event)"></Album>
    </div>
    <div class="m-0 mx-auto p-2 bg-white text-black my-10 rounded-full" v-show="search === '' && isDetail == false">
      <a href="javascript:void(0)" @click="showMore">Tampilkan Lebih Banyak</a>
    </div>
  </div>
</template>

<script>
import Album from '@/components/Album.vue';
import {debounce} from "lodash/function";

export default {
  name: 'AlbumView',
  data() {
    return {
      lastPageCounter: 1,
      search: "",
      isDetail: false
    }
  },
  components: {
    Album,
  },
  methods: {
    showMore() {
      this.lastPageCounter += 1
    },
    handleSearch: debounce((e, data) => {
      data.search = e.target.value
      data.lastPageCounter = 1
    }, 800),
    handleIsDetail(value) {
      console.log("handle is detail", value)
      this.isDetail = value
    }
  }
};
</script>
