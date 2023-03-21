<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useStore();
const searchInput = ref(null);
const filter = computed({
  get() {
    return store.getters.filter;
  },
  set(value) {
    store.commit('setFilter', value);
  },
});

onMounted(() => {
  const filterQuery = Object.keys(route.query).includes('filter');
  if (filter|| filterQuery) {
    searchInput.value.focus();
  }
})
</script>

<template>
  <div class="search-input d-flex flex-center flex-1">
    <input
      type="text"
      class="p-2 border-1"
      v-model="filter"
      placeholder="Search"
      ref="searchInput"
    />
    <div
      class="close d-flex flex-center align-center bg-transparent border-0 pointer text-red-light fw-bold"
      v-if="filter"
      v-tooltip="'Clear search'"
      v-on:click="store.commit('setFilter', '')"
    >
      x
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-input {
  position: relative;
  .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 35px;
    box-shadow: 1px -1px 5px 0px rgba(0,0,0,0.22);
  }
}
</style>
