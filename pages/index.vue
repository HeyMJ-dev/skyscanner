<script setup>
/*import {Loader} from "@googlemaps/js-api-loader"

const config = useRuntimeConfig();
const loader = new Loader({
  apiKey: config.public.googleAPIKey,
  version: "weekly",
});


loader.load().then(async () => {
  const {Map} = await google.maps.importLibrary("maps");

  const map = new Map(document.getElementById("map"), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
  });
});*/


</script>


<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-full bg-blue-200"></div>

    <div class="absolute bg-red-400 left-0 top-0">
      <!--  Import the component here  -->
    </div>
  </div>


</template>


<style lang="scss">

html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>