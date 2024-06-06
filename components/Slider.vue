<script setup>
const props = defineProps(["points", "translations"],),
    swiper = ref(null),
    loading = ref(false),
    sliderIndex = ref(0),
    isMobile = ref(window.innerWidth <= 768),
    lang = inject('lang'),
    activeSlide = defineModel();

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 768;
});

const words = reactive({
  en: {
    "Read more": "Read more",
    "stops": "stops",
    "travel": "travel",
    "Start roadtrip": "Start roadtrip",
    "Re-start road trip": "Re-start road trip",
    "Download road trip": "Download road trip"
  },
  de: {
    "Read more": "Mehr lesen",
    "stops": "Stopps",
    "travel": "Reise",
    "Start roadtrip": "Roadtrip starten",
    "Re-start road trip": "Roadtrip neu starten",
    "Download road trip": "Roadtrip herunterladen"
  },
  it: {
    "Read more": "Leggi di più",
    "stops": "fermate",
    "travel": "di viaggio",
    "Start roadtrip": "Inizia il viaggio",
    "Re-start road trip": "Riavvia il viaggio",
    "Download road trip": "Scarica il viaggio"
  },
  es: {
    "Read more": "Leer más",
    "stops": "travel",
    "travel": "de viaje",
    "Start roadtrip": "niciar viaje por carretera",
    "Re-start road trip": "Reiniciar viaje por carretera",
    "Download road trip": "Descargar viaje por carretera"
  },
  fr: {
    "Read more": "Lire la suite",
    "stops": "arrêts",
    "travel": "de voyage",
    "Start roadtrip": "Commencer le road trip",
    "Re-start road trip": "Recommencer le road trip",
    "Download road trip": "Télécharger le road trip"
  },
  kr: {
    "Read more": "더 읽기",
    "stops": "번 정차",
    "travel": "여행",
    "Start roadtrip": "로드트립 시작",
    "Re-start road trip": "로드트립 다시 시작",
    "Download road trip": "로드트립 다운로드"
  }
});


defineExpose({
  goToSlide
});


onMounted(() => {
  swiper.value = new Swiper('.swiper', {
    navigation: {},
    speed: 1000,
    allowTouchMove: false,
    breakpoints: {
      300: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 10,
        autoHeight: true,
        allowTouchMove: true,
      },
      768: {
        direction: 'vertical',
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        autoHeight: false,
        allowTouchMove: false,
      }
    },
    on: {
      slideChange: function (event) {
        activeSlide.value = event.activeIndex;
        sliderIndex.value = event.activeIndex;

        // clickOutsideSlide();
      }
    }
  });

  window.addEventListener('resize', () => {
    swiper.value.update()
  });

})

function nextSlide() {
  swiper.value.slideNext();
}

function prevSlide() {
  swiper.value.slidePrev();
}

function goToSlide(index) {
  swiper.value.slideTo(index)
}


//functions ------
function readMore(event) {
  const parentEl = event.target.parentNode.parentNode;
  parentEl.classList.add("expand")
}


function sentenceToWords(str) {
  return {
    firstPart: str.slice(0, 160),
    secondPart: str.slice(160, str.length),
  };
}

function clickOutsideSlide() {
  document.querySelectorAll('.expand.location-description').forEach((el) => {
    el.classList.add("overflow-hidden")
    el.classList.remove("expand");
    el.classList.remove("overflow-auto")
  })
}

</script>

<template>
  <div class="location-slider relative md:h-full md:w-full w-auto md:max-w-full z-0">
    <!-- Slider main container -->
    <div class="swiper md:h-full">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper !items-center">
        <!-- Slides -->
        <div
            v-for="(item, index) in points"
            :key="item"
            class="swiper-slide md:block flex flex-col justify-end md:py-2"
        >

          <!--          <slider-item :item :index :translations :words :totalItems="points.length"></slider-item>-->


          <div class="relative">
            <div
                class="card-location"
                :class="{'md:w-full px-10 py-4 md:px-0 md:py-0' :  index !== 0}"
            >

              <div class="rounded-[10px] overflow-hidden "
                   :class="{'rounded-none' : (index === 0 && isMobile) }">
                <div class="md:h-56 h-32">
                  <img v-if="index !== 0"
                       class="h-full w-full object-cover object-center"
                       :src="item.image"
                       alt=""
                  >
                  <div v-else
                       class="flex flex-col relative justify-center md:px-4 pl-4 pr-16 w-full h-full bg-cover bg-center before:block before:w-full before:h-full before:bg-[#05203C] before:absolute before:left-0 before:top-0 before:opacity-70 "
                  :style="{backgroundImage: `url(${item.image})` }">
                    <h2 class="z-10 text-white font-normal text-sm md:text-md">{{ translations[0].subtitle }}</h2>
                    <h1 class="z-10 text-white font-bold text-4xl md:text-[58px] leading-1">{{ translations[0].title }}</h1>

                    <div class="md:hidden absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" @click="nextSlide">
                      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                           data-v-inspector="components/Slider.vue:402:7" data-v-b00b42e6="">
                        <rect x="1.40059" y="1.4001" width="34.4" height="34.4" rx="17.2" fill="white"
                              data-v-inspector="components/Slider.vue:403:9" data-v-b00b42e6=""></rect>
                        <rect x="1.40059" y="1.4001" width="34.4" height="34.4" rx="17.2" stroke="white"
                              stroke-width="2.4" data-v-inspector="components/Slider.vue:404:9"
                              data-v-b00b42e6=""></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M14.8673 19.1334H20.8247L18.222 21.7361C18.014 21.9441 18.014 22.2854 18.222 22.4934C18.43 22.7014 18.766 22.7014 18.974 22.4934L22.4887 18.9787C22.6967 18.7707 22.6967 18.4347 22.4887 18.2267L18.974 14.7121C18.766 14.5041 18.43 14.5041 18.222 14.7121C18.014 14.9201 18.014 15.2561 18.222 15.4641L20.8247 18.0667H14.8673C14.574 18.0667 14.334 18.3067 14.334 18.6001C14.334 18.8934 14.574 19.1334 14.8673 19.1334Z"
                              fill="#0062E3" data-v-inspector="components/Slider.vue:405:9" data-v-b00b42e6=""></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bg-white md:px-4 md:pt-4 md:pb-6 p-3"
                     :class="{'hidden md:block' : index === 0}">

                  <template v-if="index !== 0">
                    <div class="relative pr-6 md:mb-3 mb-2">
                      <div class="text-[#05203C]">
                        <div class="md:text-xs text-[10px] mb-[0.5px]">
                          {{ translations[index].subtitle }}
                        </div>
                        <div class="md:text-4xl texy-2xl font-black">
                          {{ translations[index].title }}
                        </div>
                      </div>
                    </div>

                    <div
                        class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] custom-scrollbar md:mb-3 relative">
                      {{ translations[index].description }}

                      <span
                          class="read-more hidden absolute right-0 top-24 md:inline-block  whitespace-nowrap bg-white">
                          &nbsp;... &nbsp;
                          <span @click="readMore($event)" class="underline  text-[#0062E3] cursor-pointer">
                          {{ words[lang]["Read more"] }} </span>&nbsp;&nbsp;
                    </span>
                    </div>

                    <div class="flex gap-2 justify-between text-xs">
                      <div class="flex items-center gap-1 truncate">
                        <template v-if="item.restaurant.name">
                          <svg class="md:h-4 h-3 shrink-0" viewBox="0 0 12 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.5 0.5C10.8846 0.5 11.2016 0.78953 11.245 1.16253L11.25 1.25V14.75C11.25 15.1642 10.9142 15.5 10.5 15.5C10.1154 15.5 9.79837 15.2105 9.75504 14.8375L9.75 14.75V11H9C8.61537 11 8.29837 10.7105 8.25505 10.3375L8.25 10.25V4.25C8.25 2.59315 9.375 0.5 10.5 0.5ZM6 0.5C6.38463 0.5 6.70163 0.78953 6.74495 1.16253L6.75 1.25V5C6.75 6.39767 5.7942 7.57211 4.50057 7.90534L4.5 14.75C4.5 15.1642 4.16421 15.5 3.75 15.5C3.36537 15.5 3.04837 15.2105 3.00505 14.8375L3 14.75L3.00018 7.90553C1.7541 7.5849 0.821291 6.4838 0.753904 5.15438L0.75 5V1.25C0.75 0.835786 1.08579 0.5 1.5 0.5C1.88463 0.5 2.20163 0.78953 2.24495 1.16253L2.25 1.25V5C2.25 5.55519 2.55162 6.03993 2.99995 6.29929L3 1.25C3 0.835786 3.33579 0.5 3.75 0.5C4.13463 0.5 4.45163 0.78953 4.49495 1.16253L4.5 1.25L4.50081 6.29886C4.91426 6.05935 5.20278 5.62809 5.24472 5.12673L5.25 5V1.25C5.25 0.835786 5.58579 0.5 6 0.5Z"
                                fill="#05203C"/>
                          </svg>
                          <span class="text-[#05203C] ml-1">
                      {{ item.restaurant.name }}
                    </span>
                        </template>
                      </div>
                      <div class="flex gap-1 items-center shrink-0" v-if="item.stats.distance">
                    <span>
                      {{ item.stats.distance }}
                    </span>
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#05203C"/>
                        </svg>
                        <span>
                      {{ item.stats.duration }}
                    </span>
                      </div>
                    </div>
                  </template>


                  <template v-else>
                    <div
                        class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] custom-scrollbar md:mb-3 relative">
                      {{ translations[index].description }}

                      <span
                          class="read-more hidden absolute right-0 top-24 md:inline-block  whitespace-nowrap bg-white">
                          &nbsp;... &nbsp;
                          <span @click="readMore($event)" class="underline  text-[#0062E3] cursor-pointer">
                          {{ words[lang]["Read more"] }} </span>&nbsp;&nbsp;
                    </span>
                    </div>

                    <div class="md:block hidden text-xs">
                      <div class="mb-6 font-bold">
                      <span>{{ item.steps }} {{ words[lang]["stops"] }} . {{ item.duration }}
                        {{ words[lang]["travel"] }}</span>
                      </div>

                      <div class="md:flex gap-2 justify-center">
                        <button @click="nextSlide()" class="text-[#0062E3] font-bold">
                          {{ words[lang]["Start roadtrip"] }}
                        </button>
                      </div>

                    </div>
                  </template>


                </div>
              </div>
            </div>

            <!--top arrow-->
            <button
                v-if="index !== 0"
                @click="prevSlide()"
                class="absolute left-[50%] -ml-[23px] -top-[34px] z-[99] md:block hidden rotate-180"
            >
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" fill="#05203C"/>
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#05203C" stroke-width="3"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.3335 18.3334V25.7801L19.0801 22.5267C18.8201 22.2667 18.3935 22.2667 18.1335 22.5267C17.8735 22.7867 17.8735 23.2067 18.1335 23.4667L22.5268 27.8601C22.7868 28.1201 23.2068 28.1201 23.4668 27.8601L27.8601 23.4667C28.1201 23.2067 28.1201 22.7867 27.8601 22.5267C27.6001 22.2667 27.1801 22.2667 26.9201 22.5267L23.6668 25.7801V18.3334C23.6668 17.9667 23.3668 17.6667 23.0001 17.6667C22.6335 17.6667 22.3335 17.9667 22.3335 18.3334Z"
                      fill="white"/>
              </svg>
            </button>

            <!--bottom arrow-->
            <button
                @click="nextSlide()"
                class="absolute left-[50%] -ml-[23px] -bottom-[28px] z-[99] md:block hidden"
            >
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" fill="#05203C"/>
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#05203C" stroke-width="3"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.3335 18.3334V25.7801L19.0801 22.5267C18.8201 22.2667 18.3935 22.2667 18.1335 22.5267C17.8735 22.7867 17.8735 23.2067 18.1335 23.4667L22.5268 27.8601C22.7868 28.1201 23.2068 28.1201 23.4668 27.8601L27.8601 23.4667C28.1201 23.2067 28.1201 22.7867 27.8601 22.5267C27.6001 22.2667 27.1801 22.2667 26.9201 22.5267L23.6668 25.7801V18.3334C23.6668 17.9667 23.3668 17.6667 23.0001 17.6667C22.6335 17.6667 22.3335 17.9667 22.3335 18.3334Z"
                      fill="white"/>
              </svg>
            </button>

            <!--left arrow-->
            <button
                v-if="index !== 0 "
                class="btn-prev absolute left-2 bottom-16 z-10 md:hidden disabled:opacity-0"
                @click="prevSlide"
            >
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2"
                      transform="rotate(-180 35.8006 35.8001)"
                      fill="#05203C"/>
                <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2"
                      transform="rotate(-180 35.8006 35.8001)"
                      stroke="#05203C" stroke-width="2.4"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.3339 18.0668L16.3765 18.0668L18.9792 15.4641C19.1872 15.2561 19.1872 14.9148 18.9792 14.7068C18.7712 14.4988 18.4352 14.4988 18.2272 14.7068L14.7125 18.2214C14.5045 18.4294 14.5045 18.7654 14.7125 18.9734L18.2272 22.4881C18.4352 22.6961 18.7712 22.6961 18.9792 22.4881C19.1872 22.2801 19.1872 21.9441 18.9792 21.7361L16.3765 19.1334L22.3339 19.1334C22.6272 19.1334 22.8672 18.8934 22.8672 18.6001C22.8672 18.3068 22.6272 18.0668 22.3339 18.0668Z"
                      fill="white"/>
              </svg>
            </button>

            <!--right arrow-->
            <button
                v-if="index !== 0 "
                class="btn-next absolute right-2 bottom-16 z-10 md:hidden  disabled:opacity-0"
                @click="nextSlide"
            >
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.40059" y="1.4001" width="34.4" height="34.4" rx="17.2" fill="#05203C"/>
                <rect x="1.40059" y="1.4001" width="34.4" height="34.4" rx="17.2" stroke="#05203C" stroke-width="2.4"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.8673 19.1334H20.8247L18.222 21.7361C18.014 21.9441 18.014 22.2854 18.222 22.4934C18.43 22.7014 18.766 22.7014 18.974 22.4934L22.4887 18.9787C22.6967 18.7707 22.6967 18.4347 22.4887 18.2267L18.974 14.7121C18.766 14.5041 18.43 14.5041 18.222 14.7121C18.014 14.9201 18.014 15.2561 18.222 15.4641L20.8247 18.0667H14.8673C14.574 18.0667 14.334 18.3067 14.334 18.6001C14.334 18.8934 14.574 19.1334 14.8673 19.1334Z"
                      fill="white"/>
              </svg>
            </button>

          </div>

        </div>


        <!--    Last slide    -->
        <div class="swiper-slide md:block flex flex-col justify-end md:py-2">

          <div class="relative">
            <div
                class="card-location md:w-full px-10 py-4 md:px-0 md:py-0"
            >

              <div class="rounded-[10px] overflow-hidden ">
                <div class="md:h-56 h-32">

                  <div
                       class="flex flex-col relative justify-center md:px-4 pl-4 pr-16 w-full h-full bg-cover bg-center before:block before:w-full before:h-full before:bg-[#05203C] before:absolute before:left-0 before:top-0 before:opacity-70 "
                       :style="{backgroundImage: `url(${points[0].image})` }">
                    <h2 class="z-10 text-white font-normal text-sm md:text-md">{{ translations[0].subtitle }}</h2>
                    <h1 class="z-10 text-white font-bold text-4xl md:text-[58px] leading-1">{{ translations[0].title }}</h1>
                  </div>
                </div>
                <div class="bg-white md:px-4 md:pt-4 md:pb-6 p-3">

                  <div
                      class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] custom-scrollbar md:mb-3 relative">
                    {{ translations[0].description }}

                    <span
                        class="read-more hidden absolute right-0 top-24 md:inline-block whitespace-nowrap bg-white">
                          &nbsp;... &nbsp;
                          <span @click="readMore($event)" class="underline  text-[#0062E3] cursor-pointer">
                          {{ words[lang]["Read more"] }} </span>&nbsp;&nbsp;
                    </span>
                  </div>

                  <div class="flex justify-between items-center text-[#0062E3] font-bold text-xs">
                    <div class="flex items-center cursor-pointer mr-2">
                      <svg class="mr-1" width="14" viewBox="0 0 12 11" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V4.43934L4.28033 3.46967C3.98744 3.17678 3.51256 3.17678 3.21967 3.46967C2.92678 3.76256 2.92678 4.23744 3.21967 4.53033L5.46967 6.78033C5.76256 7.07322 6.23744 7.07322 6.53033 6.78033L8.78033 4.53033C9.07322 4.23744 9.07322 3.76256 8.78033 3.46967C8.48744 3.17678 8.01256 3.17678 7.71967 3.46967L6.75 4.43934V1Z"
                            fill="#0062E3"/>
                        <path
                            d="M2.25 6.625C2.25 6.21079 1.91421 5.875 1.5 5.875C1.08579 5.875 0.75 6.21079 0.75 6.625V8.5C0.75 9.74264 1.75736 10.75 3 10.75H9C10.2426 10.75 11.25 9.74264 11.25 8.5V6.625C11.25 6.21079 10.9142 5.875 10.5 5.875C10.0858 5.875 9.75 6.21079 9.75 6.625V8.5C9.75 8.91421 9.41421 9.25 9 9.25H3C2.58579 9.25 2.25 8.91421 2.25 8.5V6.625Z"
                            fill="#0062E3"/>
                      </svg>

                      {{ words[lang]["Download road trip"] }}
                    </div>

                    <div
                        class="md:absolute md:-bottom-12 md:left-0 md:text-white md:w-full md:text-center cursor-pointer"
                        @click="goToSlide(0)">
                      {{ words[lang]["Re-start road trip"] }}
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <!--top arrow-->
            <button
                @click="prevSlide()"
                class="absolute left-[50%] -ml-[23px] -top-[34px] z-[99] md:block hidden rotate-180"
            >
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" fill="#05203C"/>
                <rect x="1.5" y="1.5" width="43" height="43" rx="21.5" stroke="#05203C" stroke-width="3"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.3335 18.3334V25.7801L19.0801 22.5267C18.8201 22.2667 18.3935 22.2667 18.1335 22.5267C17.8735 22.7867 17.8735 23.2067 18.1335 23.4667L22.5268 27.8601C22.7868 28.1201 23.2068 28.1201 23.4668 27.8601L27.8601 23.4667C28.1201 23.2067 28.1201 22.7867 27.8601 22.5267C27.6001 22.2667 27.1801 22.2667 26.9201 22.5267L23.6668 25.7801V18.3334C23.6668 17.9667 23.3668 17.6667 23.0001 17.6667C22.6335 17.6667 22.3335 17.9667 22.3335 18.3334Z"
                      fill="white"/>
              </svg>
            </button>


            <!--left arrow-->
            <button
                class="btn-prev absolute left-2 bottom-16 z-10 md:hidden disabled:opacity-0"
                @click="prevSlide"
            >
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2"
                      transform="rotate(-180 35.8006 35.8001)"
                      fill="#05203C"/>
                <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2"
                      transform="rotate(-180 35.8006 35.8001)"
                      stroke="#05203C" stroke-width="2.4"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M22.3339 18.0668L16.3765 18.0668L18.9792 15.4641C19.1872 15.2561 19.1872 14.9148 18.9792 14.7068C18.7712 14.4988 18.4352 14.4988 18.2272 14.7068L14.7125 18.2214C14.5045 18.4294 14.5045 18.7654 14.7125 18.9734L18.2272 22.4881C18.4352 22.6961 18.7712 22.6961 18.9792 22.4881C19.1872 22.2801 19.1872 21.9441 18.9792 21.7361L16.3765 19.1334L22.3339 19.1334C22.6272 19.1334 22.8672 18.8934 22.8672 18.6001C22.8672 18.3068 22.6272 18.0668 22.3339 18.0668Z"
                      fill="white"/>
              </svg>
            </button>


          </div>

        </div>

      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
.swiper-slide {
  height: auto;
  z-index: 5;

  &.swiper-slide-active {
    @apply z-10;
  }
}


.card-location {

  .location-description {
    @apply md:h-[125px] md:max-h-[125px] h-[70px] md:overflow-hidden overflow-auto mb-3 duration-300;

    &.expand {
      @apply overflow-auto;

      .read-more {
        display: none;
      }
    }

  }


}
</style>