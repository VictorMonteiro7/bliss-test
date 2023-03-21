<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import Button from '@/components/Button.vue';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';

const URL_APP = import.meta.env.VITE_URL_APP;

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});
const store = useStore();
const router = useRouter();
const loadingInfo = computed(() => store.getters.loading);
let loading = ref(false);
let disableVote = ref(false);
let openShareModal = ref(false);
let timeout = ref(null);
let email = ref('');
let disableSubmit = ref(true);
const $toast = useToast({ position: 'top-right' });
onMounted(() => {
  store.dispatch('getQuestion', props.id);
})

function handleChangeEmail(e) {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    // regex to validate email
    const regexToValidateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexToValidateEmail.test(String(e.target.value).toLowerCase())) {
      email.value = e.target.value;
      disableSubmit.value = false;
    } else {
      disableSubmit.value = true;
      $toast.error('Invalid email');
    }
  }, 500);
}

const question = computed(() => store.getters.questionSelected);

function handleBack() {
  router.back();
};

async function handleVote(index) {
  if (disableVote.value || loading.value) return;
  loading.value = true;
  const res = await store.dispatch('setVote', { index });
  if (res) {
    $toast.success('Vote added successfully');
    disableVote.value = true;
  } else {
    $toast.error('An error occurred');
  }
  loading.value = false;
};

function handleOpenModal() {
  openShareModal.value = true;
};

const contentUrl = computed(() => `${URL_APP}/questions/${props.id}`);

async function handleShare() {
  if (disableSubmit.value || loading.value) return;
  loading.value = true;
  const res = await store.dispatch('shareQuestion', { destinationEmail: email.value, contentUrl: contentUrl.value });
  if (res) {
    $toast.success('Email sent successfully');
    openShareModal.value = false;
  } else {
    $toast.error('An error occurred');
  }
  loading.value = false;
};

</script>

<template>
<Loader
  v-if="loadingInfo"
/>
<div
  class="w-100-percentage min-vw-10 max-vw-30 min-vh-60"
  v-else
>
  <Button
    variant="back"
    text="↩ Back"
    v-on:@back="handleBack"
  />
  <div
    v-if="question"
    class="d-flex flex-center flex-column text-center"
  >
    <h1 class="fs-xxxl text-primary">{{ question.question }}</h1>
    <div class="d-flex flex-column">
      <div
        v-for="(option, index) in question.choices"
        v-bind:key="option.choice"
      >
        <div class="d-flex flex-between align-center my-2">
          <Button
            size="md"
            fontSize="fs-sm"
            v-bind:loading="loading"
            v-bind:disabled="disableVote"
            v-bind:text="option.choice"
            v-on:@edit="handleVote(index)"
          />
          <div>
            <p class="p-2 fs-md">{{ option.votes }} votes</p>
          </div>
        </div>
      </div>
      <div>
        <Button
          text="Share this poll"
          customClass="share bg-green-light text-white-normal fw-bold"
          v-on:@edit="openShareModal = true"
        />
      </div>
    </div>
  </div>
  <Modal
    textHeader="Share this poll"
    bgHeader="bg-green-light"
    v-bind:shown="openShareModal"
    v-on:@close="openShareModal = false"
  >
    <template #body>
      <div class="p-3 d-flex flex-column">
        <div class="d-flex">
          <span class="fw-bold">Link:</span>
          <p class="ml-2">{{ contentUrl }}</p>
        </div>
        <div class="mt-2">
          <input
            type="text"
            placeholder="Put a valid email here"
            v-model="email"
            v-on:input="handleChangeEmail"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="px-3 pb-3 d-flex flex-between">
        <Button
          variant="share"
          text="Share"
          v-bind:loading="loading"
          v-bind:disabled="disableSubmit"
          v-on:@share="handleShare"
        />
        <Button
          text="Cancel"
          variant="close"
          customClass="bg-transparent text-black-normal fw-bold"
          v-on:@close="openShareModal = false"
        />
      </div>
    </template>
  </Modal>
</div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px -1px 5px 0px rgba(0,0,0,0.22);
}
</style>
