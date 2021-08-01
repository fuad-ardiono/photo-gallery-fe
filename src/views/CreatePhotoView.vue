<template>
  <div class="flex flex-col m-0 mx-auto">
    <div>
      <h1 class="text-4xl font-semibold">Upload Foto</h1>
    </div>
    <div class="flex bg-white text-black mt-2">
      <div class="flex flex-col p-5">
        <div class="flex flex-col">
          <div class="m-2">Nama foto</div>
          <div><input class="border-2 border-gray-400 text-black rounded-xl" style="text-indent: 10px"
                      placeholder="Masukkan nama foto" v-model="payload.title" type="text"></div>
        </div>
        <div class="flex flex-col">
          <div class="m-2">Pilih album</div>
          <select v-model="payload.album_id" id="">
            <option value="0">---Pilih album---</option>
            <option :value="album.id" v-for="(album, indexAlbum) in data.album"
                    :key="indexAlbum">{{ album.title }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <div class="m-2">Pilih file</div>
          <input type="file" @change="handleFileChange($event)">
        </div>
        <a href="javascript:void(0)" @click="handleCreatePhoto" class="m-2 text-white bg-blue-900 text-center">Upload Foto</a>
      </div>
    </div>
  </div>
</template>

<script>
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});


export default {
  name: "CreatePhotoView",
  data() {
    return {
      payload: {
        title: "",
        album_id: "0",
        url: "",
        thumbnail_url: ""
      },
      fileBase64: "",
      fileName: "",
      data: {
        album: {}
      },
      haveToken: false,
      user: null
    }
  },
  methods: {
    async handleCreatePhoto() {
      const fileLink = await this.uploadFile()
      this.payload.url = fileLink
      this.payload.thumbnail_url = fileLink

      try {
        const request = await fetch("http://localhost:8000/api/picture", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.user.auth.token
          },
          body: JSON.stringify(this.payload)
        })
        const response = await request.json()

        console.log(response.data)

        alert("Berhasil bikin foto")
      } catch (e) {
        alert("Gagal bikin foto")
      }
    },
    async handleFileChange(event) {
      console.log(event.target.files[0])

      const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type })
      const generatedBase64 = await toBase64(blob)
      const stripedBase64 = generatedBase64.split(',')[1]
      this.fileBase64 = stripedBase64

      console.log(this.fileBase64)
      this.fileName = event.target.files[0].name.replace(/\s/g, "_")
    },
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return userToken !== null;
    },
    async fetchAlbumData() {
      const request = await fetch("http://localhost:8000/api/album?perPage=999999&page=1",{
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const response = await request.json()
      this.data.album = response.data
    },
    async uploadFile() {
      const request = await fetch("http://localhost:8000/api/storage/upload", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.user.auth.token
        },
        body: JSON.stringify({
          base64: this.fileBase64,
          file_name: this.fileName
        })
      })

      console.log("request upload file", JSON.stringify({
        base64: this.fileBase64,
        file_name: this.fileName
      }))

      const response = await request.json()
      console.log(response)

      return response.link
    }
  },
  created() {
    this.fetchAlbumData()
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
