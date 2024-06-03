<script setup>
import {Loader} from "@googlemaps/js-api-loader"

definePageMeta({
  layout: 'admin'
})

const countries = {
  "spain": {
    origin: "Bilbao, Biscay, Spain",
    destination: "Bilbao, Biscay, Spain",
    waypoints: [
      {
        location: 'C. de la Vega, 31, 26200 Haro, La Rioja, Spain',
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

  "morocco": {
    origin: "Tangier, Morocco",
    destination: "Tangier, Morocco",
    waypoints: [
      {
        location: 'Chefchaouen, Morocco',
        stopover: false
      },
      {
        location: 'Fes, Morocco',
        stopover: false
      }, {
        location: 'F23J+7XM, Douar Talat Ait Sedrat, Ait Sedrate Jbel El Soufla, Morocco',
        stopover: false
      }, {
        location: 'Ouarzazate, 45000, Morocco',
        stopover: false
      }, {
        location: 'Marrakesh, Morocco',
        stopover: false
      }, {
        location: 'Settat, Morocco',
        stopover: false
      },
      {
        location: 'Casablanca, Morocco',
        stopover: false
      },
      {
        location: 'Rabat, Morocco',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },

  "turkey": {
    origin: "Istanbul, Türkiye",
    destination: "Istanbul, Türkiye",
    waypoints: [
      {
        location: 'Bursa, Turkiye',
        stopover: false
      },
      {
        location: 'Izmir, Türkiye',
        stopover: false
      }, {
        location: 'Pamukkale, 20190 Pamukkale/Denizli,Türkiye',
        stopover: false
      }, {
        location: 'Fethiye, Mugla, Türkiye',
        stopover: false
      }, {
        location: 'Antalya, Türkiye',
        stopover: false
      }, {
        location: 'Konya, Türkiye',
        stopover: false
      },
      {
        location: 'Karaseki, Kapadokya Yürüyüş Yolu, 50180 Çavuşin/Avanos/Nevşehir, Türkiye',
        stopover: false
      },
      {
        location: 'Ankara, Türkiye',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },

  "portugal": {
    origin: "Lisbon, Portugal",
    destination: "Lisbon, Portugal",
    waypoints: [
      {
        location: 'N249, 2710-573 Sintra, Portugal',
        stopover: false
      },
      {
        location: 'Cascais, Portugal',
        stopover: false
      }, {
        location: 'Evora, Portugal',
        stopover: false
      }, {
        location: 'Beja, Portugal',
        stopover: false
      }, {
        location: 'Faro District, Portugal',
        stopover: false
      }, {
        location: 'Silves, Portugal',
        stopover: false
      },
      {
        location: 'Coimbra, Portugal',
        stopover: false
      },
      {
        location: 'Porto, Portugal',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },

  "thailand": {
    origin: "Bangkok, Thailand",
    destination: "Bangkok, Thailand",
    waypoints: [
      {
        location: 'Kanchanaburi, Thailand',
        stopover: false
      },
      {
        location: 'Phra Nakhon Si Ayutthaya, Phra Nakhon, Thailand',
        stopover: false
      }, {
        location: 'Phitsanulok, Mueang Phitsanulok District, Thailand',
        stopover: false
      }, {
        location: 'Sukhothai Historical Park, หมู่ที่ 3 498/12, Thailand',
        stopover: false
      }, {
        location: 'Kamphaeng Phet, Thailand',
        stopover: false
      }, {
        location: 'Nakhon Sawan, Mueang Nakhon Sawan , Thailand',
        stopover: false
      },
      {
        location: 'Lopburi, Thailand',
        stopover: false
      },
      {
        location: 'Saraburi, Thailand',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },


  "australia": {
    origin: "Melbourne, Victoria, Australia",
    destination: "Melbourne, Victoria, Australia",
    waypoints: [
      {
        location: 'Torquay, Victoria 3228, Australia',
        stopover: false
      },
      {
        location: 'Lorne, Australia',
        stopover: false
      }, {
        location: 'Apollo Bay, Victoria 3233, Australia',
        stopover: false
      }, {
        location: 'Wattle Hill, Victoria 3237, Australia',
        stopover: false
      }, {
        location: 'Warrnambool, Australia',
        stopover: false
      }, {
        location: 'Grampians National Park, Victoria, Australia',
        stopover: false
      }, {
        location: 'Halls Gap, Australia',
        stopover: false
      },{
        location: 'Ararat, Australia',
        stopover: false
      },
      {
        location: 'Ballarat, Victoria, Australia',
        stopover: false
      },
      {
        location: 'Daylesford, Victoria 3460, Australia',
        stopover: false
      },
    ],
    optimizeWaypoints: false,
    travelMode: "DRIVING",
  },


};

const activeCountry = countries.australia


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
    console.log("\"lat\": " + lat + ", \"lng\": " + lng + ',');
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