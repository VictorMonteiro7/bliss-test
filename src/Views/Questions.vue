<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import QuestionItem from '@/components/QuestionItem.vue';
import SearchInput from '@/components/SearchInput.vue';
import Loader from '@/components/Loader.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
let timeout = ref(null);
const loading = computed(() => store.getters.loading);
const questions = computed(() => store.getters.questions);
const getQuestions = () => store.dispatch('getQuestions');
onMounted(async () => {
  if (!questions.length) {
    if (route.query.filter) {
      store.dispatch('getQuestions', route.query.filter);
    } else {
      await getQuestions();
    }
  }
});

watch(
  () => store.getters.filter,
  (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch('getQuestions', value);
      router.push({ name: 'questions', query: { filter: store.getters.filter } });
    }, 500);
  },
);
</script>

<template>
  <div
    class="min-vw-40 max-vw-40 d-flex flex-column align-center h-100-percent"
  >
    <div>
      <h1 class="fs-xxxl text-primary">Make Your Question</h1>
    </div>
    <div class="w-75-percent d-flex align-center my-3">
      <SearchInput />
    </div>
    <div
      id="questions"
      class="scrollbar w-100-percent grid grid-cols-2 grid-gap-2 p-1"
    >
      <template v-if="loading">
        <Loader />
      </template>
      <div
        v-else
        v-for="question in questions"
        v-bind:key="question.id"
        class="single-card"
      >
        <QuestionItem v-bind:question="question" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#questions {
  margin: 0 auto;
  overflow: scroll;
  .single-card {
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.02);
      z-index: 999;
    }
  }
}
</style>
