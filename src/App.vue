<script>
import { ref } from 'vue'
import api from '@/api';
import Loader from '@/components/Loader.vue';
export default {
  name: 'home',
  setup() {
    const isOnline = ref(navigator.onLine)
    const isHealthy = ref(true);
    const loading = ref(false);
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
          if (this.$route.name === 'questions' || this.$route.name === undefined) {
            this.$router.push({ name: 'questions', query: { ...this.$route.query } });
          }
        }
      } catch (err) {
        isHealthy.value = false;
      } finally {
        loading.value = false;
      }
    };
    return {
      isOnline,
      isHealthy,
      getHealthStats,
      loading,
    };
  },
  components: { Loader },
  mounted() {
    this.getHealthStats();
  },
};
</script>

<template>
  <div class="app">
    <template v-if="loading">
      <Loader />
    </template>
    <template v-if="!isOnline">
      <div class="offline">
        <h1>Offline</h1>
        <button>It looks like you're offline. Please check your connection and try again.</button>
      </div>
    </template>
    <template v-else-if="isOnline && !isHealthy">
      <div class="offline">
        <button>It looks like you're offline. Please check your connection and try again.</button>
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
