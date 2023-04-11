<script setup>

</script>

<template>

    <p>
      <router-link to="/">主页</router-link>
      <router-link to="/about">副页</router-link>
    </p>
    <router-view></router-view>



</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
