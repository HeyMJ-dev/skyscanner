<script async setup>
const route = useRoute();

const validLangs = ['en', 'fr', 'de', 'pt', 'sp']
const lang = validLangs.includes(route.query.lang) ? route.query.lang : 'en';
provide('lang', lang)

const validMaps = ['spain', 'morocco', 'turkey', 'thailand', 'australia', 'portugal']
if (validMaps.includes(route.query.map)) {
  provide('mapName', route.query.map)
} else {
  navigateTo('/404');
}

</script>

<template>
  <slot></slot>
</template>


<style lang="scss">
@import "~/assets/css/style.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.basket-details {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}
</style>
