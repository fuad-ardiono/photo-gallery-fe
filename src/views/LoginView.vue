<template>
  <div class="flex flex-col m-0 mx-auto">
    <div>
      <h1 class="text-4xl font-semibold">Login</h1>
    </div>
    <div class="flex bg-white text-black mt-2">
      <div class="flex flex-col p-5">
        <div class="m-2">Email</div>
        <div><input v-model="payload.email" class="border-2 border-gray-400 text-black rounded-xl" style="text-indent: 10px"
                    placeholder="Masukkan email" type="text"></div>
        <div class="m-2">Password</div>
        <div><input v-model="payload.password" class="border-2 border-gray-400 text-black rounded-xl" style="text-indent: 10px"
                    placeholder="Masukkan password" type="password"></div>
        <a href="javascript:void(0)" @click="handleLogin" class="m-2 text-white bg-blue-900 text-center">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        const request = await fetch("http://localhost:8000/api/auth/sign-in",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.payload)
          }
        )
        const response = await request.json()
        alert("Login berhasil")

        localStorage.setItem("tokenUser", JSON.stringify(response))
        window.location.pathname = "/"
      } catch (e) {
        alert("Login gagal")
      }
    }
  }
}
</script>

<style scoped>

</style>
