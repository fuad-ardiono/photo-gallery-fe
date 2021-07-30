<template>
  <div class="header bg-white flex p-1 h-16 items-center shadow-sm md:text-base xs:text-xs">
    <div class="m-0 ml-5 md:px-9">
      <p><b>Galeriku</b></p>
    </div>
    <div class="menu px-6 hidden md:flex text-left">
      <ul class="list inline-flex md:space-x-5 mt-1 sm:">
        <li class="w-96">
          <input
            type="text"
            class="border-2 border-gray-400 rounded-xl w-full"
            placeholder="Cari foto"
            style="text-indent: 10px"
          >
        </li>
        <li><a href=""><p>Foto</p></a></li>
        <li><a href="">Album</a></li>
      </ul>
    </div>
    <div class="m-0 ml-auto px-5 md:px-14">
      <a href="">Masuk</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>

</style>
