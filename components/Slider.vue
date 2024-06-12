<script setup>
const props = defineProps(["points", "translations", "gpx",]),
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
    "hours": "hrs",
    "Start roadtrip": "Start roadtrip",
    "Re-start road trip": "Re-start road trip",
    "Download road trip": "Download road trip GPX file"
  },
  de: {
    "Read more": "Mehr lesen",
    "stops": "Stopps",
    "travel": "Reise",
    "hours": "Stunden",
    "Start roadtrip": "Roadtrip starten",
    "Re-start road trip": "Roadtrip neu starten",
    "Download road trip": "Laden Sie die GPX-Datei für die Reise herunter"
  },
  nl: {
    "Read more": "Lees meer",
    "stops": "stops",
    "travel": "reizen",
    "hours": "uur",
    "Start roadtrip": "Begin de roadtrip",
    "Re-start road trip": "Herstart de roadtrip",
    "Download road trip": "Download het GPX-bestand van de roadtrip"
  },
  it: {
    "Read more": "Leggi di più",
    "stops": "fermate",
    "travel": "di viaggio",
    "hours": "ore",
    "Start roadtrip": "Inizia il viaggio",
    "Re-start road trip": "Riavvia il viaggio",
    "Download road trip": "Scarica il file GPX del viaggio"
  },
  es: {
    "Read more": "Leer más",
    "stops": "travel",
    "travel": "de viaje",
    "hours": "horas",
    "Start roadtrip": "niciar viaje por carretera",
    "Re-start road trip": "Reiniciar viaje por carretera",
    "Download road trip": "Descarga el archivo GPX del viaje por carretera"
  },
  fr: {
    "Read more": "Lire la suite",
    "stops": "arrêts",
    "travel": "de voyage",
    "hours": "heures",
    "Start roadtrip": "Commencer le road trip",
    "Re-start road trip": "Recommencer le road trip",
    "Download road trip": "Téléchargez le fichier GPX du voyage"
  },
  kr: {
    "Read more": "더 읽기",
    "stops": "번 정차",
    "travel": "여행",
    "hours": "시간",
    "Start roadtrip": "로드트립 시작",
    "Re-start road trip": "로드트립 다시 시작",
    "Download road trip": "로드 트립 GPX 파일 다운로드"
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

function readMore(event) {
  const parentEl = event.target.parentNode.parentNode;
  parentEl.classList.add("expand")
  //parentEl.parentNode.classList.remove('white-overlay-2')
}


</script>

<template>
  <div class="location-slider relative md:h-full md:w-full w-auto md:max-w-full z-0">
    <div class="swiper md:h-full">
      <div class="swiper-wrapper !items-end duration-300">
        <!--First slide-->
        <div class="swiper-slide md:block flex flex-col justify-end md:py-2 duration-300">

          <div class="relative">
            <div @click="nextSlide"
                 class="md:h-[500px] h-[100vh] w-full flex flex-col justify-between items-start relative md:rounded-[10px] md:px-4 px-4 pt-6 md:pb-24 w-full bg-cover bg-center before:block before:w-full before:h-full before:bg-[#05203C] before:absolute before:left-0 before:top-0 before:opacity-40 before:md:rounded-[10px] "
                 :style="{backgroundImage: `url(${points[0].image})` }">

              <svg height="20" viewBox="0 0 403 67" fill="none" xmlns="http://www.w3.org/2000/svg" class="z-10">
                <path
                    d="M44.9005 56.3753C45.827 56.3753 46.7094 56.1547 47.5477 55.6693L57.2102 50.1101C59.1515 49.0071 61.4017 48.5218 63.6518 48.7865C75.3879 50.1542 83.5944 52.3603 86.021 53.0662C86.5063 53.1986 87.0799 53.0221 87.3888 52.625C87.7859 52.1397 88.2712 51.3455 88.6683 50.1984C89.0212 49.0953 89.0654 48.1688 89.0212 47.507C88.9771 46.9775 88.6241 46.4922 88.0947 46.3599C84.3003 45.2568 67.4903 40.7124 44.9005 40.7124C22.3107 40.7124 5.50066 45.2568 1.70628 46.3599C1.17683 46.4922 0.823864 46.9775 0.779743 47.507C0.735623 48.1247 0.779745 49.0512 1.13271 50.1984C1.48568 51.3455 2.01513 52.1397 2.41221 52.625C2.72106 53.0221 3.29463 53.1986 3.77996 53.0662C6.2066 52.3603 14.4572 50.1542 26.1492 48.7865C28.3993 48.5218 30.6495 49.0071 32.5908 50.1101L42.2532 55.6693C43.0915 56.1547 44.0181 56.3753 44.9005 56.3753Z"
                    fill="white"/>
                <path
                    d="M28.7939 25.0934C29.3233 26.0199 30.1616 26.6376 31.1322 26.9023C32.1029 27.167 33.1177 27.0347 34.0442 26.5052C34.9708 25.9758 35.5884 25.1375 35.8532 24.1668C36.1179 23.1962 35.9855 22.1814 35.4561 21.2548L26.7643 6.20967C26.4996 5.72434 25.926 5.54786 25.3965 5.59198C24.6906 5.6361 23.72 5.98907 22.5728 6.65088C21.4257 7.31269 20.6315 7.9745 20.2344 8.54807C19.9256 8.98928 19.8373 9.56285 20.1021 10.0482L28.7939 25.0934Z"
                    fill="white"/>
                <path
                    d="M20.852 35.8589C21.7785 36.3884 22.8374 36.4766 23.764 36.256C24.7346 35.9913 25.5729 35.3736 26.1024 34.4471C26.6318 33.5205 26.7201 32.4616 26.4995 31.5351C26.2788 30.6085 25.617 29.7261 24.6905 29.1967L9.64533 20.5049C9.16 20.2402 8.58643 20.3284 8.14523 20.6373C7.57166 21.0343 6.90984 21.8285 6.24803 22.9757C5.58622 24.1228 5.23326 25.0934 5.18913 25.7994C5.14501 26.373 5.36562 26.9024 5.80683 27.1671L20.852 35.8589Z"
                    fill="white"/>
                <path
                    d="M48.7395 19.755C48.7395 20.8139 48.2983 21.7845 47.6365 22.4905C46.9306 23.1964 46.004 23.5935 44.901 23.5935C43.8421 23.5935 42.8715 23.1523 42.1655 22.4905C41.4596 21.7845 41.0625 20.858 41.0625 19.755V2.41553C41.0625 1.84196 41.4155 1.40076 41.9449 1.18015C42.5626 0.871307 43.5774 0.694824 44.901 0.694824C46.2246 0.694824 47.2394 0.871307 47.8571 1.18015C48.3424 1.44488 48.7395 1.84196 48.7395 2.41553V19.755Z"
                    fill="white"/>
                <path
                    d="M61.0042 25.0934C60.4747 26.0199 59.6364 26.6376 58.6658 26.9023C57.6951 27.167 56.6803 27.0347 55.7538 26.5052C54.8273 25.9758 54.2096 25.1375 53.9449 24.1668C53.6801 23.1962 53.8125 22.1814 54.3419 21.2548L63.0337 6.20967C63.2985 5.72434 63.872 5.54786 64.4015 5.59198C65.1074 5.6361 66.0781 5.98907 67.2252 6.65088C68.3723 7.31269 69.1665 7.9745 69.5636 8.54807C69.8724 8.98928 69.9607 9.56285 69.696 10.0482L61.0042 25.0934Z"
                    fill="white"/>
                <path
                    d="M68.9438 35.8589C68.0173 36.3884 66.9584 36.4766 66.0318 36.256C65.0612 35.9913 64.2229 35.3736 63.6934 34.4471C63.164 33.5205 63.0757 32.4616 63.2963 31.5351C63.5611 30.5644 64.1788 29.7261 65.1053 29.1967L80.1505 20.5049C80.6358 20.2402 81.2094 20.3284 81.6506 20.6373C82.2241 21.0343 82.886 21.8285 83.5478 22.9757C84.2096 24.1228 84.5625 25.0934 84.6067 25.7994C84.6508 26.373 84.4302 26.9024 83.989 27.1671L68.9438 35.8589Z"
                    fill="white"/>
                <path
                    d="M164.908 23.9019H172.144C172.408 23.9019 172.629 24.0783 172.761 24.2989L179.953 42.7414L186.924 24.2989C187.012 24.0342 187.277 23.9019 187.542 23.9019H194.645C195.131 23.9019 195.439 24.3872 195.219 24.7843L177.571 65.2871C177.482 65.5077 177.218 65.6842 176.997 65.6842H170.732C170.291 65.6842 169.938 65.1989 170.158 64.8018L176.203 50.639L164.378 24.7843C164.114 24.3872 164.423 23.9019 164.908 23.9019Z"
                    fill="white"/>
                <path
                    d="M271.722 28.0056V24.5642C271.722 24.2112 272.031 23.9024 272.384 23.9024H278.782C279.135 23.9024 279.443 24.2112 279.443 24.5642V52.0514C279.443 52.4044 279.135 52.7132 278.782 52.7132H272.384C272.031 52.7132 271.722 52.4044 271.722 52.0514V48.4335C270.354 50.5513 267.354 53.3309 262.457 53.3309C253.103 53.3309 248.25 46.1833 248.25 38.1975C248.25 27.785 255.486 23.3288 262.236 23.3288C266.692 23.2847 269.781 25.4025 271.722 28.0056ZM255.971 38.2416C255.971 43.1831 259.015 46.9775 263.913 46.9775C268.81 46.9775 271.943 43.6685 271.943 38.5946C271.943 33.5207 268.899 29.6381 263.692 29.6381C258.795 29.6381 255.971 33.4324 255.971 38.2416Z"
                    fill="white"/>
                <path
                    d="M285.227 52.0512V24.564C285.227 24.211 285.535 23.9022 285.888 23.9022H292.286C292.639 23.9022 292.948 24.211 292.948 24.564V28.3143C294.448 25.7111 297.272 23.3286 302.081 23.3286C307.022 23.3286 312.537 25.7552 312.537 36.9178V52.0512C312.537 52.4042 312.228 52.713 311.876 52.713H305.478C305.125 52.713 304.816 52.4042 304.816 52.0512V37.0502C304.816 34.3588 304.154 29.7261 299.389 29.7261C294.624 29.7261 292.948 33.9176 292.948 37.8002V52.0512C292.948 52.4042 292.639 52.713 292.286 52.713H285.888C285.491 52.6689 285.227 52.4042 285.227 52.0512Z"
                    fill="white"/>
                <path
                    d="M318.008 52.0512V24.564C318.008 24.211 318.317 23.9022 318.67 23.9022H325.067C325.42 23.9022 325.729 24.211 325.729 24.564V28.3143C327.229 25.7111 330.053 23.3286 334.862 23.3286C339.803 23.3286 345.319 25.7552 345.319 36.9178V52.0512C345.319 52.4042 345.01 52.713 344.657 52.713H338.259C337.906 52.713 337.597 52.4042 337.597 52.0512V37.0502C337.597 34.3588 336.936 29.7261 332.171 29.7261C327.406 29.7261 325.729 33.9176 325.729 37.8002V52.0512C325.729 52.4042 325.42 52.713 325.067 52.713H318.67C318.317 52.6689 318.008 52.4042 318.008 52.0512Z"
                    fill="white"/>
                <path
                    d="M385.202 23.902H391.423C391.776 23.902 392.085 24.2108 392.085 24.5638V30.2554C393.32 24.6079 398.174 22.6666 401.703 23.5049C402.012 23.549 402.189 23.8138 402.189 24.1226V30.3877C402.189 30.7848 401.836 31.0937 401.394 31.0054C394.864 29.7259 392.217 33.2556 392.217 38.1971C392.217 41.7268 392.217 49.7126 392.217 52.051C392.217 52.404 391.908 52.7128 391.555 52.7128H385.158C384.805 52.7128 384.496 52.404 384.496 52.051V24.5638C384.54 24.2108 384.849 23.902 385.202 23.902Z"
                    fill="white"/>
                <path
                    d="M122.509 30.1672C120.523 29.5054 119.464 29.1083 117.876 28.5788C116.243 28.0052 113.464 26.4169 113.464 23.8579C113.464 21.2989 115.229 19.6664 118.802 19.6664C122.067 19.6664 123.876 21.2548 125.068 23.8138C125.244 24.1667 125.641 24.2991 125.994 24.1226L131.245 21.0783C131.509 20.9018 131.642 20.5488 131.509 20.24C129.921 16.7545 126.215 12.563 118.891 12.563C110.728 12.563 105.61 17.4163 105.61 23.8138C105.61 30.1672 109.802 33.4762 115.493 35.4175C117.567 36.1235 118.405 36.4323 120.17 37.0059C123.523 38.153 125.068 39.6531 125.068 41.7268C125.068 43.8005 123.744 46.2712 118.538 46.2712C113.773 46.2712 112.096 43.7564 111.125 41.3738C110.993 41.0209 110.552 40.8444 110.199 41.065L104.684 44.2417C104.419 44.4182 104.287 44.727 104.419 45.0359C106.537 50.2421 112.317 53.3306 118.802 53.3306C126.435 53.3306 132.877 49.4479 132.877 41.5944C132.877 33.7409 124.494 30.829 122.509 30.1672Z"
                    fill="white"/>
                <path
                    d="M164.643 45.1681C164.467 44.8593 164.025 44.7269 163.716 44.9475C161.246 46.7564 158.334 46.8006 156.128 43.4033C154.275 40.5354 152.024 37.0058 152.024 37.0058L161.731 24.9608C162.084 24.5196 161.775 23.9019 161.246 23.9019H153.657C153.436 23.9019 153.26 23.9901 153.128 24.1666L144.745 35.6821V12.5187C144.745 12.1658 144.436 11.8569 144.083 11.8569H137.685C137.332 11.8569 137.023 12.1658 137.023 12.5187V52.0509C137.023 52.4039 137.332 52.7127 137.685 52.7127H144.127C144.48 52.7127 144.789 52.4039 144.789 52.0509V39.2118C144.789 39.2118 149.068 45.9623 150.701 48.4772C152.907 51.9186 155.995 53.3304 159.349 53.3304C162.525 53.3304 164.555 52.4921 166.981 50.1096C167.202 49.889 167.246 49.5802 167.114 49.3154L164.643 45.1681Z"
                    fill="white"/>
                <path
                    d="M210.571 36.0795C208.542 35.3295 207.836 35.0647 206.292 34.4912C204.747 33.9176 203.38 33.0793 203.38 31.8439C203.38 30.6085 204.527 29.2408 206.865 29.2408C208.895 29.2408 210.13 30.035 210.836 31.4468C211.013 31.7998 211.41 31.888 211.719 31.7116L216.219 29.1084C216.528 28.9319 216.616 28.5349 216.439 28.226C215.204 26.0641 212.777 23.3286 206.909 23.3286C199.718 23.3286 196.012 27.476 196.012 32.0645C196.012 36.6531 199.762 38.815 203.203 40.1827C207.086 41.7711 207.351 41.8593 207.836 42.0358C209.027 42.5211 210.483 43.2712 210.483 44.6389C210.483 46.0067 208.895 47.2421 206.468 47.2421C204.218 47.2421 201.659 46.3155 200.6 43.7124C200.468 43.3594 200.027 43.1829 199.674 43.4036L195.129 46.0067C194.864 46.1832 194.732 46.492 194.864 46.8008C196.188 50.2423 200.115 53.2866 206.468 53.2866C213.351 53.2866 217.94 49.6246 217.94 44.4624C217.94 39.3003 214.41 37.4914 210.571 36.0795Z"
                    fill="white"/>
                <path
                    d="M236.427 30.167C239.295 30.167 241.413 31.0494 243.398 32.4613C243.707 32.6819 244.148 32.5937 244.325 32.2848L246.972 27.6963C247.148 27.3874 247.06 27.0344 246.751 26.858C244.016 25.0049 240.618 23.2842 236.03 23.2842C231.485 23.2842 227.294 24.5196 224.294 27.5639C221.294 30.5641 219.926 34.1379 219.926 38.3735C219.926 43.4915 222.044 46.7564 224.338 49.0507C226.632 51.345 230.78 53.2863 236.074 53.2863C240.839 53.2863 244.369 51.3008 246.795 49.7125C247.06 49.536 247.148 49.1389 246.972 48.8742L244.369 44.3298C244.192 44.0209 243.751 43.8886 243.442 44.1092C241.721 45.3446 239.251 46.4034 236.471 46.4034C233.338 46.4034 227.647 44.6386 227.647 38.2852C227.647 31.9318 233.294 30.167 236.427 30.167Z"
                    fill="white"/>
                <path
                    d="M366.23 46.9329C363.671 46.9329 361.244 46.3152 359.479 44.9033C357.715 43.4915 356.876 42.0355 356.876 40.3148H379.731C380.084 40.3148 380.393 40.0059 380.393 39.653C380.26 32.8584 378.054 29.6817 375.936 27.5198C373.73 25.3137 369.98 23.2842 365.039 23.2842C360.097 23.2842 356.303 25.0931 353.7 27.6521C351.141 30.2111 349.199 33.4761 349.199 38.4176C349.199 43.3591 351.185 46.6241 353.611 49.0507C356.038 51.4773 360.009 53.2863 365.7 53.2863C371.083 53.2863 375.628 51.3891 378.892 47.6388C379.157 47.33 379.069 46.8447 378.716 46.6682L374.172 44.0209C373.951 43.8886 373.642 43.8886 373.422 44.1092C371.171 46.227 368.304 46.9329 366.23 46.9329ZM364.994 29.4611C368.656 29.4611 372.01 31.6671 372.539 35.638H357.141C358.156 31.3583 361.332 29.4611 364.994 29.4611Z"
                    fill="white"/>
              </svg>

              <div
                  class="w-full z-10 text-white font-bold flex-1 flex flex-col h-full justify-center pr-14 md:pt-24 pt-8">
                <h2 class="z-10 text-white font-normal text-[30px] leading-[30px] larken">{{ translations[0].subtitle }}</h2>
                <h1 class="z-10 text-white font-bold text-[60px] leading-[60px]">{{ translations[0].title }} </h1>

                <div class="md:hidden cursor-pointer z-10 mt-4 flex justify-end translate-x-14 -translate-y-3 ">
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

          </div>

        </div>
        <!--Slides-->
        <div
            v-for="(item, index) in points"
            :key="item"
            class="swiper-slide md:block flex flex-col justify-end md:py-2"
        >

          <div class="relative">
            <div class="card-location md:w-full px-10 py-4 md:px-0 md:py-0">

              <div class="rounded-[10px] overflow-hidden relative ">

                <div class="md:h-56 h-32 relative">
                  <img class="h-full w-full object-cover object-center"
                       :src="item.image" alt="">

                  <template v-if="translations[index].bubble">
                    <div
                        class="bubble absolute text-[#0062E3] bg-white p-3 rounded-lg z-10 text-xs -translate-y-1/2 -translate-x-1/2 text-nowrap larken"
                        :style="{left:  translations[index].bubble.left,  top: translations[index].bubble.top }">
                      {{ translations[index].bubble.text }}
                    </div>
                  </template>

                </div>

                <div class="bg-white md:px-4 md:pt-4 md:pb-6 p-3">

                  <template v-if="index !== 0">
                    <div class="white-overlay">
                      <div class="relative md:mb-3 mb-2">
                        <div class="text-[#05203C]">
                          <div class="md:text-xs text-[10px] mb-[0.5px]">
                            {{ translations[index].subtitle }}
                          </div>
                          <div class="flex justify-between items-center w-full">
                            <div class="md:text-3xl text-2xl font-black mr-4">
                              {{ translations[index].title }}
                            </div>

                            <span
                                class="rounded-full border-2 text-[#0062E3] border-[#0062E3] w-7 h-7 text-xs shrink-0 flex justify-center items-center">
                            {{ index }}
                          </span>
                          </div>

                        </div>
                      </div>

                      <div
                          class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] custom-scrollbar md:mb-3 relative">
                        {{ translations[index].description }}

                        <span
                            class="read-more hidden absolute right-0 top-24 md:inline-block  whitespace-nowrap bg-white z-10">
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
                    </div>

                  </template>


                  <template v-else>

                    <div class="relative md:mb-3 mb-2">
                      <div class="text-[#05203C]">
<!--                        <div class="md:text-xs text-[10px] mb-[0.5px]">
                          {{ translations[index].subtitle }}
                        </div>-->
                        <div class="flex justify-between items-center w-full">
                          <div class="md:text-3xl text-2xl font-black mr-4">
                            {{ translations[index].title }}
                          </div>

                        </div>

                      </div>
                    </div>

                    <div class="white-overlay-2">
                      <div
                          class="location-description md:text-sm text-xs md:leading-6 leading-5 text-[#545860] custom-scrollbar md:mb-3 relative">
                        {{ translations[index].description }}

                      <span
                          class="read-more hidden absolute right-0 top-24 md:inline-block  whitespace-nowrap bg-white z-10">
                          &nbsp;... &nbsp;
                            <span @click="readMore($event)" class="underline  text-[#0062E3] cursor-pointer">
                            {{ words[lang]["Read more"] }}
                            </span>&nbsp;&nbsp;
                        </span>
                      </div>
                      <div class="text-xs">
                        <div class="md:mb-6 font-bold">
                      <span>{{ item.steps }} {{ words[lang]["stops"] }} . {{ item.duration }}
                        {{ words[lang]["hours"] }}</span>
                        </div>

                        <div class="hidden md:flex gap-2 justify-center ">
                          <button @click="nextSlide()" class="text-[#0062E3] font-bold">
                            {{ words[lang]["Start roadtrip"] }}
                          </button>
                        </div>

                      </div>
                    </div>

                  </template>


                </div>
              </div>
            </div>

            <!--top arrow-->
            <button
                @click="prevSlide()"
                class="absolute left-[50%] -ml-[23px] -top-[34px] z-[99] md:block hidden rotate-180"
            >
              <svg width="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <!--Last slide-->
        <div class="swiper-slide md:block flex flex-col justify-end md:py-2">

          <div class="relative">
            <div class="card-location md:w-full px-10 py-4 md:px-0 md:py-0">

              <div
                  class="rounded-[10px] relative overflow-hidden bg-cover bg-center before:block before:w-full before:h-full before:bg-[#05203C] before:absolute before:left-0 before:top-0 before:opacity-70 before:rounded-[10px]"
                  :style="{backgroundImage: `url(${points[0].image})` }">

                <div class="md:h-56 h-32">
                  <div class="flex flex-col relative justify-center md:px-4 pl-4 pr-16  w-full h-full">
                    <h2 class="z-10 text-white font-normal text-sm md:text-md larken">
                      {{ translations[0].subtitle }}
                    </h2>
                    <h1 class="z-10 text-white font-bold text-4xl md:text-[58px] leading-1">
                      {{ translations[0].title }}
                    </h1>
                  </div>
                </div>

                <div class="md:px-4 md:pt-4 md:pb-6 p-3">
                  <div class="flex justify-between items-center text-white font-bold md:text-sm text-xs">
                    <a :href="gpx" target="_blank" class="flex items-center cursor-pointer mr-2 z-10">
                      <svg class="mr-1" width="14" viewBox="0 0 12 11" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V4.43934L4.28033 3.46967C3.98744 3.17678 3.51256 3.17678 3.21967 3.46967C2.92678 3.76256 2.92678 4.23744 3.21967 4.53033L5.46967 6.78033C5.76256 7.07322 6.23744 7.07322 6.53033 6.78033L8.78033 4.53033C9.07322 4.23744 9.07322 3.76256 8.78033 3.46967C8.48744 3.17678 8.01256 3.17678 7.71967 3.46967L6.75 4.43934V1Z"
                            fill="white"/>
                        <path
                            d="M2.25 6.625C2.25 6.21079 1.91421 5.875 1.5 5.875C1.08579 5.875 0.75 6.21079 0.75 6.625V8.5C0.75 9.74264 1.75736 10.75 3 10.75H9C10.2426 10.75 11.25 9.74264 11.25 8.5V6.625C11.25 6.21079 10.9142 5.875 10.5 5.875C10.0858 5.875 9.75 6.21079 9.75 6.625V8.5C9.75 8.91421 9.41421 9.25 9 9.25H3C2.58579 9.25 2.25 8.91421 2.25 8.5V6.625Z"
                            fill="white"/>
                      </svg>

                      {{ words[lang]["Download road trip"] }}
                    </a>

                    <div
                        class="md:hidden cursor-pointer shrink-0 z-10"
                        @click="goToSlide(1)">
                      {{ words[lang]["Re-start road trip"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
                class="hidden md:block md:absolute md:-bottom-12 md:left-0 md:text-white md:w-full md:text-center cursor-pointer shrink-0 z-10"
                @click="goToSlide(1)">
              {{ words[lang]["Re-start road trip"] }}
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
  opacity: .6;
  transition: .5s;

  &.swiper-slide-active {
    @apply z-10;
    opacity: 1;
  }
}


.card-location {

  .location-description {
    @apply md:h-[125px] md:max-h-[125px] h-[80px] md:overflow-hidden overflow-auto mb-3 duration-300 relative pb-7;

    &.expand {
      @apply overflow-auto;

      .read-more {
        display: none;
      }
    }

  }

  .white-overlay::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 38px;
    width: 100%;
    height: 50px;
    background: linear-gradient(180deg, transparent -20%, white 80%);
    z-index: 0;
    pointer-events: none;
  }

  .white-overlay-2::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 80px;
    width: 100%;
    height: 40px;
    background: linear-gradient(180deg, transparent -20%, white 80%);
    z-index: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    .white-overlay::after {
      height: 30px;
    }

    .white-overlay-2::after {
      bottom: 30px;
    }
  }
}

.bubble {
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 95%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 10px solid white;
    clear: both;
  }
}
</style>