<script async setup>

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
