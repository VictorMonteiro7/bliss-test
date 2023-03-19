<script>
import { ref } from 'vue';

export default {
  name: 'loader',
  setup() {
    const loading = ref(false);
    return { loading };
  },
};
</script>

<template>
  <div id="loader"></div>
</template>

<style>
  #loader {
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 25% auto 0 auto;
    border: 10px solid var(--purple);
    border-top-color: var(--white);
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
