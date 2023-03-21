<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import api from '@/api';
import Loader from '@/components/Loader.vue';
import Offline from '@/components/Offline.vue';
let isOnline = ref(navigator.onLine);
let isHealthy = ref(true);
let loading = ref(false);
const router = useRouter();
const route = useRoute();
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
};
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
async function getHealthStats() {
  loading.value = true;
  try {
    const health = await api.get('/health');
    if (health.status !== 'OK') {
      isHealthy.value = false;
    } else {
      isHealthy.value = true;
      if (route.name === 'questions' || route.name === undefined) {
        router.push({ name: 'questions', query: { ...route.query } });
      }
    }
  } catch (err) {
    isHealthy.value = false;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getHealthStats();
});

watch(isOnline, (value) => {
  if (value) {
    getHealthStats();
  } else {
    isHealthy.value = false;
  }
});
</script>

<template>
  <div class="app">
    <template v-if="loading">
      <Loader />
    </template>
    <template v-if="!isOnline">
      <Offline
        v-on:@retry="getHealthStats"
      />
    </template>
    <template v-else-if="isOnline && !isHealthy">
      <div class="offline">
        <Offline
          v-on:@retry="getHealthStats"
        />
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 5rem 5rem;
}
</style>
