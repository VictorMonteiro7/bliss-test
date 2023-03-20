<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import QuestionItem from '@/components/QuestionItem.vue';

const store = useStore();
const questions = computed(() => store.getters.questions);
const getQuestions = () => store.dispatch('getQuestions');
onMounted(() => {
  if (!questions.length) {
    getQuestions();
  }
});
</script>

<template>
  <div
    id="questions"
    class="scrollbar w-100-percentage min-vw-40 max-vw-60"
  >
    <div
      v-for="question in questions"
      v-bind:key="question.id"
    >
      <div class="">
        <QuestionItem
          v-bind:question="question"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#questions {
  margin: 0 auto;
  overflow: scroll;
}
</style>
