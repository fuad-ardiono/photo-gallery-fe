<template>
  <div class="header bg-white flex p-1 h-16 items-center shadow-sm md:text-base xs:text-xs">
    <div class="m-0 ml-5 md:px-9 text-lg">
      <p><b>Galeriku</b></p>
    </div>
    <div class="menu px-6 hidden md:flex text-left">
      <ul class="list inline-flex md:space-x-5 mt-1 sm:">
        <li><a href="/"><p>Foto</p></a></li>
        <li><a href="/album">Album</a></li>
      </ul>
    </div>
    <div class="m-0 ml-auto px-10 lg:px-14 hidden md:flex" v-show="!haveToken">
      <a href="/login">Masuk</a>
    </div>
    <div class="m-0 ml-auto px-10 lg:px-14 hidden md:flex" v-show="haveToken">
      <p class="border-r-2 pr-2">{{ user.user.name }}</p>
      <a href="" class="mx-2">Upload Foto</a>
      <a href="" class="mx-2">Bikin Album</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      haveToken: false,
      user: {
        user: {
          name: ""
        }
      }
    }
  },
  methods: {
    isHaveToken() {
      const userToken = localStorage.getItem("tokenUser")
      console.log(userToken)
      return userToken !== null;
    },
    logout() {
      localStorage.removeItem("tokenUser")

      this.$router.push("/")
    }
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

<style scoped>

</style>
