<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import Button from './Button.vue';
import Modal from './Modal.vue';
const store = useStore();

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const $toast = useToast({ position: 'top-right'});
const questionName = ref(props.question.question);
let openDeleteModal = ref(false);

function handleEdit() {
  router.push({ name: 'question', params: { id: props.question.id } });
};

const handleDelete = () => {
  openDeleteModal.value = true;
};

const confirmDelete = () => {
  store.dispatch('deleteQuestion', props.question.id);
  openDeleteModal.value = false;
  $toast.success('Question deleted successfully');
}

</script>

<template>
  <div
    class="py-2 px-3 card"
  >
    <div class="d-flex flex-column">
      <h3 class="fs-base">{{ questionName }}</h3>
      <div class="d-flex flex-end mt-2">
        <Button
          text="Details"
          v-on:@edit="handleEdit"
          class="mr-1"
        />
        <Button
          variant="delete"
          text="Delete"
          v-on:@delete="handleDelete"
        />
      </div>
    </div>
    <div class="d-flex flex-column">
      <p class="fs-normal fs-xxs option">Choices:</p>
      <div class="d-flex w-100 mt-2">
        <div
          class="mx-3 "
          v-for="({choice, votes}) in question.choices"
          v-bind:key="choice"
        >
          <p class="fw-bold text-black-normal fs-sm">{{ choice }}</p>
          <p class="text-black-normal fs-xs">{{ votes }}</p>
        </div>
      </div>
    </div>
  </div>
  <Modal
    v-bind:shown="openDeleteModal"
    v-on:@close="openDeleteModal = false"
    v-on:@delete="confirmDelete"
  />
</template>

<style scoped>
.card {
  box-shadow: 1px -1px 5px 0px rgba(0,0,0,0.22);
}
</style>
