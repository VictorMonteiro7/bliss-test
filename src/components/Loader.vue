<script setup>
</script>

<template>
  <div id="loader"></div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_colors.scss';
  #loader {
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 25% auto 0 auto;
    border: 10px solid $primary;
    border-top-color: $white-normal;
    border-radius: 50%;
    top: 0;
    left: 50%;
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
