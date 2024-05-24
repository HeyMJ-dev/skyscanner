<script setup>
import {Loader} from "@googlemaps/js-api-loader"
import spain from '~/data/map/Spain.json'


const config = useRuntimeConfig(),
    deviceSize = ref(window.innerWidth < 768 ? "mobile" : "desktop"),
    mapData = spain, // choose the country
    points = ref([]);


const mapLoader = new Loader({apiKey: config.public.googleAPIKey, version: "weekly",});
mapLoader.load().then(async () => {
  const {Map, InfoWindow} = await google.maps.importLibrary("maps");
  const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary(
      "marker",
  );
  initMap();
});


function initMap() {
  const map = new google.maps.Map(
      document.getElementById("map"),
      {
        mapId: config.public.mapId,
        center: {lat: mapData.center[deviceSize.value].lat, lng: mapData.center[deviceSize.value].lng},
        zoom: mapData.center[deviceSize.value].zoom,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      }
  );

  drawPath(map);
  drawMarkers(map);


  // Helper
  map.addListener("click", (e) => {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    console.log("Latitude: " + lat + ", Longitude: " + lng);
  });


}

function drawPath(map) {
  const path = new google.maps.Polyline({
    path: mapData.route,
    geodesic: true,
    strokeColor: "#0062E3",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  path.setMap(map, null);
}

function drawMarkers(map) {


  mapData.points.forEach((point, index) => {
    const pin = new google.maps.marker.PinElement({
      scale: .90,
      background: "#0062E3",
      borderColor: "#0062E3",
      glyphColor: "#fff",
    });


    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: {lat: point.lat, lng: point.lng},
      content: pin.element,
      gmpClickable: true,
    })

    marker.addListener("click", (e) => {
      let parent = e.domEvent.target;
      while (parent.tagName !== "svg") {
        parent = parent.parentNode;
      }
      changeSlide(index, parent);
    });

  })
}

function changeSlide(index, markerSvg = null) {
  if (markerSvg === null) {
    markerSvg = document.querySelectorAll(".GMAMP-maps-pin-view")[index].querySelector("svg")
  }
  document.querySelectorAll('.active-marker').forEach((el) => {
    el.classList.remove('active-marker');
  })
  markerSvg.style.transition = '.3s';
  markerSvg.classList.add('active-marker')
}

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

.GMAMP-maps-pin-view {
  transition: .3s;
}

.active-marker {
  transform: scale(1.3);
}
</style>