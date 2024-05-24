<script setup>
import {Loader} from "@googlemaps/js-api-loader"

const countries = {
  "spain": {
    origin: "Bilbao, Biscay, Spain",
    destination: "Bilbao, Biscay, Spain",
    waypoints: [
      {
        location: 'Haro, 26200, La Rioja, Spain',
        stopover: false
      },
      {
        location: 'Santo Domingo de la Calzada, La Rioja, Spain',
        stopover: false
      }, {
        location: 'Burgos, Spain',
        stopover: false
      }, {
        location: 'Segovia, Spain',
        stopover: false
      }, {
        location: 'Ávila, Ávila, Spain',
        stopover: false
      }, {
        location: 'Salamanca, Spain',
        stopover: false
      },

      {
        location: '47014 Valladolid, Spain',
        stopover: false
      }

      , {
        location: 'Aguilar de Campoo, 34800, Palencia, Spain',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },


};

const activeCountry = countries.spain


const config = useRuntimeConfig();
const loader = new Loader({
  apiKey: config.public.googleAPIKey,
  version: "weekly",
});
loader.load().then(async () => {
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

  initMap();
});

function initMap() {
  const map = new google.maps.Map(
      document.getElementById("map"),
      {
        mapId: config.public.mapId,
        center: {lat: 35.5820850931988, lng: 53.38484329894057},
        zoom: 10,

        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }
  );

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsRenderer);

  map.addListener("click", (e) => {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    console.log("Latitude: " + lat + ", Longitude: " + lng);
  });

}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
      .route(activeCountry)
      .then((response) => {
        console.log(response)
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
}


</script>


<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-full bg-blue-200"></div>
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