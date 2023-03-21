<script setup>
import Button from './Button.vue';
const emit = defineEmits(['@retry']);
</script>

<template>
  <div class="d-flex align-center">
    <h1 class="xxxl">😞</h1>
    <div class="d-flex flex-column justify-center ml-2">
      <h1 class="fs-xxxl text-primary">You are offline</h1>
      <h1 class="fs-xxl text-primary">Please check your internet connection</h1>
      <Button
        text="Retry Connection"
        v-on:@edit="emit('@retry')"
      />
    </div>
  </div>
</template>
