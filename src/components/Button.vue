<script setup>
import { computed } from 'vue';
const emit = defineEmits(['@submit', '@delete', '@edit', '@back', '@close', '@share']);
const props = defineProps({
  variant: {
    type: String,
    default: 'edit',
  },
  text: {
    type: [String, Number],
    default: 'Edit',
  },
  customClass: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: String,
    default: 'fs-xs',
  },
  disableCustomSize: {
    type: Boolean,
    default: false,
  },
});
const variantChoosed = computed(() => {
  const objActions = {
    edit: {
      class: 'edit bg-primary text-white-normal fs-xs',
      handleEmit() {
        emit('@edit');
      },
    },
    delete: {
      class: 'delete bg-red-light text-white-normal fs-xs',
      handleEmit() {
        emit('@delete');
      },
    },
    back: {
      class: 'back bg-transparent text-primary fs-lg fw-bold',
      handleEmit() {
        emit('@back');
      },
    },
    close: {
      class: 'close bg-transparent text-white-normal fs-xs',
      handleEmit() {
        emit('@close');
      },
    },
    share: {
      class: 'share bg-green-light text-white-normal fs-xs',
      handleEmit() {
        emit('@share');
      },
    },
  };
  return objActions[props.variant] || objActions.edit;
});

const loadingClass = computed(() => {
  return props.loading ? 'waiting' : '';
});

const customSize = computed(() => {
  if (props.disableCustomSize) {
    return '';
  }
  const objSizes = {
    sm: 'px-2 py-1',
    smE: 'p-2',
    md: 'px-4 py-2',
    mdE: 'p-4',
    lg: 'px-6 py-3',
    lgE: 'p-6',
  };
  return objSizes[props.size] || objSizes.md;
});

const customButtonClass = computed(() => {
  return props.customClass ? props.customClass : variantChoosed.value.class;
});
</script>

<template>
  <button
    class="pointer"
    v-bind:class="[customSize, loadingClass, props.fontSize, customButtonClass]"
    v-on:click="variantChoosed.handleEmit"
    v-bind:disabled="props.disabled"
  >
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
button {
  border: none;
  border-radius: 5px;
  &:focus, &:active, &:hover {
    outline: none;
    &.edit {
      background-color: $primary-light !important;
    }
    &.delete {
      background-color: $red-normal !important;
    }
    &.share {
      background-color: $green-normal !important;
    }
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.waiting {
    user-select: none;
    opacity: 0.5;
  }
}
</style>
