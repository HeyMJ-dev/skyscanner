<script setup>
const props = defineProps(["points", "translations"],),
    swiper = ref(null),
    loading = ref(false),
    lang = inject('lang'),
    activeSlide = defineModel();

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
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
    speed: 1000,
    allowTouchMove: false,
    breakpoints: {
      300: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        direction: 'vertical',
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
      }
    },
    on: {
      slideChange: function (event) {
        activeSlide.value = event.activeIndex;
        clickOutsideSlide();
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
  parentEl.querySelector(".second-part-text")?.classList.remove("hidden")
  parentEl.querySelector(".read-more")?.classList.add("hidden")
}

function expandCard(event) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 200)

  let parentEl = event.target;

  if (window.innerWidth > 768) { //check is mobile
    return;
  }

  while (parentEl) {
    if (parentEl.classList.contains("card-location")) {
      break;
    }

    parentEl = parentEl.parentNode;
  }

  if (!parentEl) {
    return;
  }

  const childEl = parentEl.querySelector(".location-description")

  if (childEl.classList.contains("expand")) {
    return;
  }
  childEl.classList.remove("overflow-auto")
  childEl.classList.add("expand");
  setTimeout(() => {
    childEl.classList.add("overflow-auto")
  }, 300)

}

function sentenceToWords(str) {
  const array = str.trim().split(/\s+/);
  return {
    firstPart: array.slice(0, 25).join(" "),
    secondPart: array.slice(25, array.length).join(" "),
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
  <div class="location-slider relative md:h-full md:w-full w-auto md:max-w-full max-w-[300px] mx-auto z-0">
    <!-- Slider main container -->
    <div class="swiper md:h-full">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
            v-for="(item, index) in points"
            :key="item"
            class="swiper-slide md:block flex flex-col justify-end py-2"
        >

          <div class="relative">
            <div
                @click="expandCard($event)"
                class="card-location rounded-[10px] overflow-hidden"
            >
              <div class="md:h-56 h-32">
                <img
                    class="h-full w-full object-cover object-center"
                    :src="item.image"
                    alt=""
                >
              </div>
              <div class="bg-white md:px-4 md:pt-4 md:pb-6 p-3">

                <div class="relative pr-6 md:mb-3 mb-2">
                  <div class="text-[#05203C]">
                    <div class="md:text-xs text-[10px] mb-[0.5px]">
                      {{ translations[index].subtitle }}
                    </div>
                    <div class="md:text-4xl texy-2xl font-black">
                      {{ translations[index].title }}
                    </div>
                  </div>

                  <!--                  <div v-if="index !== 0" class="absolute top-0 right-0 md:flex hidden gap-1 flex-col">
                                      <button
                                          @click="prevSlide()"
                                          class="text-[#05203C] hover:text-black"
                                      >
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M8.00486 11.2187C8.2739 11.2187 8.49201 11.0006 8.49201 10.7316L8.49201 7.03619L10.0961 8.64031C10.2864 8.83055 10.5948 8.83055 10.7851 8.64031C10.9753 8.45007 10.9753 8.14163 10.7851 7.95138L8.34933 5.51566C8.15908 5.32541 7.85064 5.32541 7.6604 5.51566L5.22467 7.95138C5.03443 8.14162 5.03443 8.45007 5.22467 8.64031C5.41491 8.83055 5.72336 8.83055 5.9136 8.64031L7.51772 7.03619L7.51772 10.7316C7.51772 11.0006 7.73582 11.2187 8.00486 11.2187Z"
                                                fill="currentColor"
                                          />
                                          <rect x="0.216575" y="16.0254" width="15.5668" height="15.5668" rx="7.78342"
                                                transform="rotate(-90 0.216575 16.0254)" stroke="currentColor" stroke-width="0.43315"/>
                                        </svg>
                                      </button>
                                      <button
                                          @click="nextSlide()"
                                          class="text-[#05203C] hover:text-black disabled:opacity-50"
                                          :disabled="index === points.length - 1"
                                      >
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M8.00197 5.26579C7.73293 5.26579 7.51483 5.4839 7.51483 5.75294L7.51483 9.44832L5.91071 7.8442C5.72047 7.65396 5.41203 7.65396 5.22178 7.8442C5.03154 8.03444 5.03154 8.34289 5.22178 8.53313L7.65751 10.9689C7.84775 11.1591 8.1562 11.1591 8.34644 10.9689L10.7822 8.53313C10.9724 8.34289 10.9724 8.03444 10.7822 7.8442C10.5919 7.65396 10.2835 7.65396 10.0932 7.8442L8.48912 9.44832L8.48912 5.75294C8.48912 5.4839 8.27102 5.26579 8.00197 5.26579Z"
                                                fill="currentColor"
                                          />
                                          <rect x="15.7834" y="0.458518" width="15.5668" height="15.5668" rx="7.78342"
                                                transform="rotate(90 15.7834 0.458518)" stroke="currentColor" stroke-width="0.43315"/>
                                        </svg>
                                      </button>
                                    </div>-->
                </div>

                <div
                    class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] relative overflow-auto custom-scrollbar md:mb-3">

                  {{ sentenceToWords(translations[index].description).firstPart }}

                  <template v-if="sentenceToWords(translations[index].description).secondPart.length">
                  <span class="read-more">
                    ...
                    <span
                        @click="readMore($event)"
                        class="btn-read-more text-[#0062E3] underline cursor-pointer whitespace-nowrap"
                    >{{words[lang]["Read more"]}}</span>
                    &nbsp;
                  </span>

                    <span class="hidden second-part-text">
                    {{ sentenceToWords(translations[index].description).secondPart }}
                  </span>
                  </template>


                </div>

                <div
                    v-if="index !== 0"
                    class="flex gap-2 justify-between text-xs"
                >
                  <div class="flex items-center gap-1">
                    <template v-if="item.restaurant.name">
                      <svg class="md:h-4 h-3 shrink-0" viewBox="0 0 12 16" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.5 0.5C10.8846 0.5 11.2016 0.78953 11.245 1.16253L11.25 1.25V14.75C11.25 15.1642 10.9142 15.5 10.5 15.5C10.1154 15.5 9.79837 15.2105 9.75504 14.8375L9.75 14.75V11H9C8.61537 11 8.29837 10.7105 8.25505 10.3375L8.25 10.25V4.25C8.25 2.59315 9.375 0.5 10.5 0.5ZM6 0.5C6.38463 0.5 6.70163 0.78953 6.74495 1.16253L6.75 1.25V5C6.75 6.39767 5.7942 7.57211 4.50057 7.90534L4.5 14.75C4.5 15.1642 4.16421 15.5 3.75 15.5C3.36537 15.5 3.04837 15.2105 3.00505 14.8375L3 14.75L3.00018 7.90553C1.7541 7.5849 0.821291 6.4838 0.753904 5.15438L0.75 5V1.25C0.75 0.835786 1.08579 0.5 1.5 0.5C1.88463 0.5 2.20163 0.78953 2.24495 1.16253L2.25 1.25V5C2.25 5.55519 2.55162 6.03993 2.99995 6.29929L3 1.25C3 0.835786 3.33579 0.5 3.75 0.5C4.13463 0.5 4.45163 0.78953 4.49495 1.16253L4.5 1.25L4.50081 6.29886C4.91426 6.05935 5.20278 5.62809 5.24472 5.12673L5.25 5V1.25C5.25 0.835786 5.58579 0.5 6 0.5Z"
                            fill="#0062E3"/>
                      </svg>
                      <span class="text-[#0062E3] underline">
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

                <div v-else class="md:block hidden  text-xs">
                  <div class="mb-6 font-bold">
                    <span>{{ item.steps }} {{words[lang]["stops"]}} . {{ item.duration }} {{words[lang]["travel"]}}</span>
                  </div>
                  <div class="md:flex gap-2 justify-center">
                    <button
                        @click="nextSlide()"
                        class="text-[#0062E3] font-bold"
                    >
                      {{words[lang]["Start roadtrip"]}}

                    </button>
                  </div>

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
                v-if="index !== points.length - 1"
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

          </div>

        </div>

      </div>
    </div>

    <!--arrows-->
    <button
        class="btn-prev absolute -left-7 bottom-16 z-10 md:hidden disabled:opacity-0"
    >
      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2" transform="rotate(-180 35.8006 35.8001)"
              fill="#05203C"/>
        <rect x="35.8006" y="35.8001" width="34.4" height="34.4" rx="17.2" transform="rotate(-180 35.8006 35.8001)"
              stroke="#05203C" stroke-width="2.4"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.3339 18.0668L16.3765 18.0668L18.9792 15.4641C19.1872 15.2561 19.1872 14.9148 18.9792 14.7068C18.7712 14.4988 18.4352 14.4988 18.2272 14.7068L14.7125 18.2214C14.5045 18.4294 14.5045 18.7654 14.7125 18.9734L18.2272 22.4881C18.4352 22.6961 18.7712 22.6961 18.9792 22.4881C19.1872 22.2801 19.1872 21.9441 18.9792 21.7361L16.3765 19.1334L22.3339 19.1334C22.6272 19.1334 22.8672 18.8934 22.8672 18.6001C22.8672 18.3068 22.6272 18.0668 22.3339 18.0668Z"
              fill="white"/>
      </svg>
    </button>
    <button
        class="btn-next absolute -right-7 bottom-16 z-10 md:hidden  disabled:opacity-0"
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
</template>

<style scoped lang="scss">
.swiper-slide {
  height: auto;
  z-index: 5;

  &.swiper-slide-active {
    @apply z-10;
  }
}

.location-slider {
  @media screen and (max-width: 360px) {
    max-width: 250px !important;
  }
}

.card-location {
  box-shadow: 0px 2px 4px 0px #05203C26;

  .location-description {
    @apply md:max-h-[135px] max-h-0 duration-300;

    @media screen and (max-width: 768px) {
      &.expand {
        @apply mb-3;
        max-height: 135px !important;
      }
    }

  }

}
</style>