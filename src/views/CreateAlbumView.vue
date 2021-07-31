<template>
  <div class="flex flex-col m-0 mx-auto">
    <div>
      <h1 class="text-4xl font-semibold">Bikin Album</h1>
    </div>
    <div class="flex bg-white text-black mt-2">
      <div class="flex flex-col p-5">
        <div class="m-2">Nama album</div>
        <div><input class="border-2 border-gray-400 text-black rounded-xl" style="text-indent: 10px"
                    placeholder="Masukkan nama album" v-model="payload.title" type="text"></div>
        <a href="javascript:void(0)" @click="handleCreateAlbum" class="m-2 text-white bg-blue-900 text-center">Bikin Album</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateAlbumView",
  data() {
    return {
      payload: {
        title: ""
      },
      haveToken: false,
      user: null
    }
  },
  methods: {
    async handleCreateAlbum() {
      try {
        const request = await fetch("http://localhost:8000/api/album", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token
          },
          body: JSON.stringify(this.payload)
        })
        await request.json()

        alert("Berhasil bikin album")
        window.location.pathname = "/"
      } catch (e) {
        alert("Gagal bikin album")
      }
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return userToken !== null;
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
}
</script>

<style scoped>

</style>
