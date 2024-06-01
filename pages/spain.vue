<script setup>
import spain from '~/data/map/Spain.json'
import {Loader} from "@googlemaps/js-api-loader"
import {gsap} from "gsap";




const config = useRuntimeConfig(),
    deviceSize = ref(window.innerWidth < 768 ? "mobile" : "desktop"),
    mapData = spain, // choose the country
    activeSlide = ref(0),
    markers = ref([]),
    loading = ref(false),
    lang = inject('lang');

let map = null;

console.log(lang)


const mapLoader = new Loader({apiKey: config.public.googleAPIKey, version: "weekly",});
mapLoader.load().then(async () => {
  const {Map, InfoWindow} = await google.maps.importLibrary("maps");
  const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary(
      "marker",
  );
  initMap();
});

const sliderRef = ref(null);


function initMap() {
  map = new google.maps.Map(
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

  drawPath();
  drawMarkers();


  // Helper
  map.addListener("click", (e) => {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    console.log("Latitude: " + lat + ", Longitude: " + lng);
  });


}

function drawPath() {
  const path = new google.maps.Polyline({
    path: mapData.route,
    geodesic: true,
    strokeColor: "#0062E3",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  path.setMap(map, null);
}

function drawMarkers() {
  mapData.points.forEach((point, index) => {
    if (index === 0)
      return;
    const pin = new google.maps.marker.PinElement({
      scale: .90,
      background: "#0062E3",
      borderColor: "#0062E3",
      glyphColor: "#fff",
    })

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: {lat: point.lat, lng: point.lng},
      content: pin.element,
      gmpClickable: true,
      collisionBehavior: 'REQUIRED',
    })

    markers.value.push(marker);

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
  loading.value = true;
  setTimeout(() => {
    loading.value = false
  }, 300)

  if (index) {
    if (sliderRef.value && markerSvg !== null) {
      sliderRef.value.goToSlide(index);
    }

    /*if (markerSvg === null) {
      markerSvg = document.querySelectorAll(".GMAMP-maps-pin-view")[index -1].querySelector("svg")
    }
    document.querySelectorAll('.active-marker').forEach((el) => {
      el.classList.remove('active-marker');
    })
    markerSvg.classList.add('active-marker');*/


    changeCamer({
      center: {
        lat: mapData.points[index].lat,
        lng: mapData.points[index].lng + (deviceSize.value === "desktop" ? -.2 : 0),
      },
      zoom: mapData.points[index].zoom
    })


  } else {
    document.querySelectorAll('.active-marker').forEach((el) => {
      el.classList.remove('active-marker');
    })

    changeCamer({
      center: {
        lat: mapData.center[deviceSize.value].lat,
        lng: mapData.center[deviceSize.value].lng,
      },
      zoom: mapData.center[deviceSize.value].zoom
    })
  }


}

function changeCamer(cameraOptions) {
  let initCameraOption = {
    center: {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    },
    zoom: map.getZoom(),
  }

  gsap.to(map, {
    duration: .5,
    ease: "ease",
    onUpdate: function () {
      map.moveCamera({
        center: {
          lat: initCameraOption.center.lat + ((cameraOptions.center.lat - initCameraOption.center.lat) * this.progress()),
          lng: initCameraOption.center.lng + ((cameraOptions.center.lng - initCameraOption.center.lng) * this.progress()),
        },
        zoom: initCameraOption.zoom + ((cameraOptions.zoom - initCameraOption.zoom) * this.progress()),
      });

    }
  })


  /* new Tween(cameraOptions)
       .to()
       .easing(Easing.Quadratic.Out)
       .onUpdate(() => {
         console.log('eee')
         map.moveCamera(cameraOptions);
       })
       .start();*/
}


watch(activeSlide, () => {
  if (!loading.value) {
    changeSlide(activeSlide.value, null)
  }

})

</script>


<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-full"></div>

    <div class="absolute bg-overlay left-0 bottom-0 md:h-full md:w-[350px] w-full md:px-6 py-4">
      <!--  Import the component here  -->
      <Slider v-model="activeSlide" :items="mapData.points" ref="sliderRef"/>
    </div>
  </div>

  <div class="test"></div>
</template>


<style lang="scss">

html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.GMAMP-maps-pin-view {
  svg {
    transition: .3s;


    &:hover {
      transform: scale(1.3);
    }
  }
}


.active-marker {
  transform: scale(1.3);
}

.bg-overlay {
  background: linear-gradient(90deg, rgba(30, 30, 30, .7) 20%, rgba(7, 7, 112, 0) 100%);

  @media screen and (max-width: 768px) {
    background: linear-gradient(0deg, rgba(30, 30, 30, .7) 20%, rgba(7, 7, 112, 0) 100%);
  }
}
</style>