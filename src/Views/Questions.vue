<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'questions',
  setup() {
    const store = useStore();
    return {
      questions: computed(() => store.getters.questions),
      getQuestions: () => store.dispatch('getQuestions'),
    };
  },
  mounted() {
    if (!this.questions.length) {
      this.getQuestions();
    }
  },
};
</script>

<template>
  <div id="questions">
    <div
      v-for="question in questions"
      v-bind:key="question.id"
    >
      <div class="">
        {{ JSON.stringify(question) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
