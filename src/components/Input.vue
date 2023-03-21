<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: 'Question',
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: 'Question 1',
  },
  disableLabel: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mt-2">
    <label v-if="!disableLabel" v-bind:for="props.id">
      <p class="fs-sm fw-bold">{{ props.text }}</p>
    </label>
    <input
      type="text"
      v-bind:placeholder="placeholder"
      class="w-100-percent p-2 rounded-5 border-1"
      v-bind:id="props.id"
      v-bind:value="props.modelValue"
      v-on:input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
input {
  box-shadow: 1px -1px 5px 0px rgba(0, 0, 0, 0.22);
}
</style>
