<template>
  <the-header title="RememberMe"></the-header>
  <the-resource></the-resource>
</template>

<script>
//import StoredResources from './components/learning-resources/StoredResources.vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheResource from './components/learning-resources/TheResource.vue';
//StoredResources,
export default {
  components: {
    TheHeader,
    TheResource
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>