<script async setup>
const route = useRoute();

const validMaps = ['spain', 'morocco', 'turkey', 'thailand', 'australia', 'portugal']
const inputMapName = route.query.map ? route.query.map.toLowerCase() : '';
if (validMaps.includes(inputMapName)) {
  provide('mapName', inputMapName)
} else {
  navigateTo('/404');
}


const validLangs = {
  spain: ['en'],
  morocco: ['en', 'fr', 'nl'],
  turkey: ['en', 'es', 'it', 'de'],
  thailand: ['en', 'kr'],
  australia: ['en'],
  portugal: ['en'],
}

const inputLangName = route.query.lang ? route.query.lang.toLowerCase() : 'en';
const lang = validLangs[inputMapName].includes(inputLangName) ? inputLangName : 'en';
provide('lang', lang)


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
