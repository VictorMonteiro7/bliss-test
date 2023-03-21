<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import QuestionItem from '@/components/QuestionItem.vue';
import SearchInput from '@/components/SearchInput.vue';
import Loader from '@/components/Loader.vue';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Input.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const $toast = useToast({ position: 'top-right' });
let timeout = ref(null);
let openNewQuestionModal = ref(false);
let loadingSubmit = ref(false);
const newQuestion = ref({
  question: '',
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
});
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


const canSubmit = computed(() => {
  const values = Object.values(newQuestion.value);
  return values.every((value) => value.length > 0);
});

async function handleSubmit() {
  if (!canSubmit.value || loadingSubmit.value) return;
  loadingSubmit.value = true;
  try {
    await store.dispatch('submitQuestion', newQuestion.value);
    openNewQuestionModal.value = false;
    newQuestion.value = {
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
    };
    $toast.success('Question created successfully');
  } catch (error) {
    $toast.error('Error creating question');
  } finally {
    loadingSubmit.value = false;
  }
};
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
      <Button
        variant="edit"
        text="+"
        customClass="ml-2 p-0 w-40-px h-40-px bg-primary text-white-normal rounded-circle fw-bold"
        v-bind:disableCustomSize="true"
        v-tooltip="'Create a new question'"
        v-on:@edit="openNewQuestionModal = true"
      />
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
    <Modal
      size="md"
      bgHeader="bg-green-light"
      textHeader="Create a new question"
      v-bind:shown="openNewQuestionModal"
      v-on:@close="openNewQuestionModal = false"
    >
      <template #body>
        <div class="d-flex flex-column p-3 rounded-5">
          <div>
            <Input
              id="question"
              placeholder="Type your question title"
              text="Title"
              v-model="newQuestion.question"
            />
          </div>
          <div class="mt-2">
            <Input
              id="choice_1"
              placeholder="Type your choice 1"
              text="Choice 1"
              v-model="newQuestion.choice1"
            />
          </div>
          <div class="mt-2">
            <Input
              id="choice_2"
              placeholder="Type your choice 2"
              text="Choice 2"
              v-model="newQuestion.choice2"
            />
          </div>
          <div class="mt-2">
            <Input
              id="choice_3"
              placeholder="Type your choice 3"
              text="Choice 3"
              v-model="newQuestion.choice3"
            />
          </div>
          <div class="mt-2">
            <Input
              id="choice_4"
              placeholder="Type your choice 4"
              text="Choice 4"
              v-model="newQuestion.choice4"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="d-flex flex-between px-3 pb-2">
          <Button
            variant="edit"
            text="Create"
            v-bind:loading="loadingSubmit"
            v-bind:disabled="!canSubmit"
            customClass="share text-white-normal bg-green-light fw-bold"
            v-on:@edit="handleSubmit"
          />
          <Button
            variant="close"
            text="Cancel"
            customClass="bg-transparent text-red-normal fw-bold"
            v-on:@close="openNewQuestionModal = false"
          />
        </div>
      </template>
    </Modal>
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
