<script setup>
import {Loader} from "@googlemaps/js-api-loader"
import {gsap} from "gsap";


const config = useRuntimeConfig(),
    deviceSize = ref(window.innerWidth < 768 ? "mobile" : "desktop"),
    mapData = reactive({}),
    lang = inject('lang'),
    sliderRef = ref(null),
    activeSlide = ref(0),
    isFullScreen = ref(false),
    isMobile = ref(window.innerWidth <= 768),
    loading = ref(false);

let map = null;

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 768;
});

loadMap();


async function loadMap() {
  const mapName = inject('mapName')

  const jsonData = await import(`~/data/map/${mapName}.json`);
  mapData.value = jsonData.default;


  const mapLoader = new Loader({apiKey: config.public.googleAPIKey, version: "weekly",});
  mapLoader.load().then(async () => {
    const {Map, InfoWindow} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary(
        "marker",
    );
    initMap();
  });
}

function initMap() {
  map = new google.maps.Map(
      document.getElementById("map"),
      {
        mapId: config.public.mapId,
        center: {lat: mapData.value.center[deviceSize.value].lat, lng: mapData.value.center[deviceSize.value].lng},
        zoom: mapData.value.center[deviceSize.value].zoom,
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
    console.log("\"lat\": " + lat + ", \"lng\": " + lng + ',');
  });
}

function drawPath() {
  const path = new google.maps.Polyline({
    path: mapData.value.route,
    geodesic: true,
    strokeColor: "#0062E3",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  path.setMap(map, null);
}

function drawMarkers() {
  mapData.value.points.forEach((point, index) => {
    if (index === 0 || index === mapData.value.points.length - 1)
      return;

    const parser = new DOMParser();
    const pinSvgString =
        '<svg class="marker active-marker" id="marker-' + index + '" width="35" height="35" viewBox="0 0 125 152" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M123.727 62.3636C123.727 110.091 62.3636 151 62.3636 151C62.3636 151 1 110.091 1 62.3636C1 28.4734 28.4734 1 62.3636 1C96.2538 1 123.727 28.4734 123.727 62.3636V62.3636Z" fill="#05203C" stroke="#05203C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M62 92C77.464 92 90 79.464 90 64C90 48.536 77.464 36 62 36C46.536 36 34 48.536 34 64C34 79.464 46.536 92 62 92Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<text class="font-sans font-bold" font-size="40" x="50" y="80" fill="#0062E3">' + index + '</text>\n' +
        '</svg>\n'
    const pinSvg = parser.parseFromString(
        pinSvgString,
        "image/svg+xml",
    ).documentElement;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: {lat: point.lat, lng: point.lng},
      content: pinSvg,
      gmpClickable: true,
      collisionBehavior: 'REQUIRED',
    })

    marker.addListener("click", (e) => {
      changeSlide(index);
      sliderRef.value.goToSlide(index);
    });

    map.addListener("bounds_changed", (e) => {
      const markers = document.querySelectorAll(".marker");
      let activeSlider = activeSlide.value === 10 ? 1: activeSlide.value % 11;

      markers.forEach((marker) => {
        if ( activeSlider === 0) {
          marker.classList.add('active-marker')
        } else {
          if (marker.id === 'marker-' + activeSlider)
            marker.classList.add('active-marker')
          else
            marker.classList.remove('active-marker')

        }
      })
    });

  })
}

function changeSlide(index) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false
  }, 300)

  if (index === 0) { // First slide
    changeCamera({
      center: {
        lat: mapData.value.center[deviceSize.value].lat,
        lng: mapData.value.center[deviceSize.value].lng,
      },
      zoom: mapData.value.center[deviceSize.value].zoom
    })
  } else if (index >= mapData.value.points.length) { // last Slide
    changeCamera({
      center: {
        lat: mapData.value.center[deviceSize.value].lat,
        lng: mapData.value.center[deviceSize.value].lng,
      },
      zoom: mapData.value.center[deviceSize.value].zoom
    })
  } else {
    changeCamera({
      center: {
        lat: mapData.value.points[index].lat,
        lng: mapData.value.points[index].lng + (deviceSize.value === "desktop" ? -.2 : 0),
      },
      zoom: mapData.value.points[index].zoom
    })
  }
}

function changeCamera(cameraOptions) {
  let initCameraOption = {
    center: {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    },
    zoom: map.getZoom(),
  }

  let threshold = isMobile.value ? -.1 : 0;
  gsap.to(map, {
    duration: .8,
    ease: "power2.inOut",
    onUpdate: function () {
      map.moveCamera({
        center: {
          lat: initCameraOption.center.lat + (((cameraOptions.center.lat + threshold) - initCameraOption.center.lat) * this.progress()),
          lng: initCameraOption.center.lng + ((cameraOptions.center.lng - initCameraOption.center.lng) * this.progress()),
        },
        zoom: initCameraOption.zoom + ((cameraOptions.zoom - initCameraOption.zoom) * this.progress()),
      });
    }
  })
}

function toggleFullScreen() {
  let elem = document.documentElement;

  if (!document.fullscreenElement &&    // Standard method
      !document.mozFullScreenElement && // Firefox
      !document.webkitFullscreenElement && // Chrome, Safari and Opera
      !document.msFullscreenElement) {

    if (elem.requestFullscreen)
      elem.requestFullscreen();
    else if (elem.mozRequestFullScreen)  // Firefox
      elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen)  // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen)  // IE/Edge
      elem.msRequestFullscreen();

    isFullScreen.value = true;
  } else {
    if (document.exitFullscreen)
      document.exitFullscreen();
    else if (document.mozCancelFullScreen)  // Firefox
      document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)  // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    else if (document.msExitFullscreen)  // IE/Edge
      document.msExitFullscreen();

    isFullScreen.value = false
  }

}


watch(activeSlide, () => {
  if (!loading.value) {
    changeSlide(activeSlide.value)
  }
})

</script>


<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-full"></div>

    <div class="hidden md:block absolute right-8 top-8 w-14 h-14 bg-white shadow-xl cursor-pointer rounded-2xl p-3"
         @click="toggleFullScreen">
      <svg class="w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path v-show="!isFullScreen"
              d="M7.66743 14.9229C8.05785 14.5324 8.69083 14.5324 9.08125 14.9229C9.47166 15.3134 9.47166 15.9466 9.08125 16.3371L6.41405 19.0042H7.99861C8.5113 19.0042 8.93386 19.3903 8.9916 19.8876L8.99833 20.0042C8.99833 20.5565 8.55074 21.0042 7.99861 21.0042H3.99972C3.44759 21.0042 3 20.5565 3 20.0042V16.0042C3 15.4519 3.44759 15.0042 3.99972 15.0042C4.55185 15.0042 4.99944 15.4519 4.99944 16.0042V17.5912L7.66743 14.9229ZM16.0014 21.0042C15.4493 21.0042 15.0017 20.5565 15.0017 20.0042C15.0017 19.4519 15.4493 19.0042 16.0014 19.0042H17.584L14.9193 16.3368C14.5591 15.9762 14.5316 15.409 14.8367 15.0168L14.9199 14.9226C15.3104 14.5322 15.9434 14.5325 16.3337 14.9232L19.0006 17.5932V16.0042C19.0006 15.4914 19.3865 15.0687 19.8837 15.0109L20.0003 15.0042C20.5524 15.0042 21 15.4519 21 16.0042V20.0042C21 20.5565 20.5524 21.0042 20.0003 21.0042H16.0014ZM7.99861 3C8.55074 3 8.99833 3.44772 8.99833 4C8.99833 4.55228 8.55074 5 7.99861 5H6.41605L9.08069 7.66817C9.44093 8.0288 9.46843 8.59604 9.16334 8.98821L9.08014 9.08239C8.68957 9.47276 8.05658 9.47251 7.66632 9.08183L4.99944 6.412V8C4.99944 8.51284 4.61351 8.93551 4.11631 8.99327L3.99972 9C3.44759 9 3 8.55228 3 8V4C3 3.44772 3.44759 3 3.99972 3H7.99861ZM20.0003 3C20.5524 3 21 3.44772 21 4V8C21 8.55228 20.5524 9 20.0003 9C19.4481 9 19.0005 8.55228 19.0005 8V6.412L16.3335 9.08196C15.9732 9.44252 15.4062 9.47037 15.0139 9.16542L14.9197 9.08225C14.5292 8.6918 14.5291 8.05864 14.9194 7.66804L17.5849 5H16.0014C15.4887 5 15.0661 4.61396 15.0084 4.11662L15.0017 4C15.0017 3.44772 15.4492 3 16.0014 3H20.0003Z"
              fill="#161616"/>

        <path v-show="isFullScreen" class="st0" d="M4.7,20.7c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4L6,16.6H4.4c-0.5,0-0.9-0.4-1-0.9l0-0.1c0-0.6,0.4-1,1-1h4
	c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1s-1-0.4-1-1V18L4.7,20.7z M19.6,14.6c0.6,0,1,0.4,1,1s-0.4,1-1,1H18l2.7,2.7
	c0.4,0.4,0.4,0.9,0.1,1.3l-0.1,0.1c-0.4,0.4-1,0.4-1.4,0L16.6,18v1.6c0,0.5-0.4,0.9-0.9,1l-0.1,0c-0.6,0-1-0.4-1-1v-4
	c0-0.6,0.4-1,1-1H19.6z M4.4,9.4c-0.6,0-1-0.4-1-1s0.4-1,1-1H6L3.3,4.7C2.9,4.3,2.9,3.8,3.2,3.4l0.1-0.1c0.4-0.4,1-0.4,1.4,0L7.4,6
	V4.4c0-0.5,0.4-0.9,0.9-1l0.1,0c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1H4.4z M15.6,9.4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1
	c0.6,0,1,0.4,1,1V6l2.7-2.7c0.4-0.4,0.9-0.4,1.3-0.1l0.1,0.1c0.4,0.4,0.4,1,0,1.4L18,7.4h1.6c0.5,0,0.9,0.4,1,0.9l0,0.1
	c0,0.6-0.4,1-1,1H15.6z" fill="black"/>
      </svg>
    </div>

    <div class="absolute left-0 bottom-0 md:h-full md:w-[350px] w-full md:px-4 md:py-2 duration-500"
         :class="{'bg-overlay' : !isMobile || activeSlide !== 0}"
         v-if="mapData.value">
      <Slider v-model="activeSlide" :points="mapData.value.points"
              :translations="mapData.value.pointsWithTranslate[lang]" ref="sliderRef"/>
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

.marker {
  opacity: .5;
  transition: .3s;

  &:hover {
    transform: scale(1.3);
  }

  &.active-marker {
    opacity: 1;
  }
}


.bg-overlay {
  /* background: linear-gradient(90deg, rgba(30, 30, 30, .7) 20%, rgba(7, 7, 112, 0) 100%);*/

  background: #0062E3;

  @media screen and (max-width: 768px) {
    /* background: linear-gradient(0deg, rgba(30, 30, 30, .7) 20%, rgba(7, 7, 112, 0) 100%);*/
    background: #0062E3;
  }
}
</style>