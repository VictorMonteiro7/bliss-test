<script setup>
import { computed, ref } from 'vue';
import Button from './Button.vue';
const props = defineProps({
  shown: {
    type: Boolean,
    default: false,
  },
  disableHeader: {
    type: Boolean,
    default: false,
  },
  bgHeader: {
    type: String,
    default: 'bg-red-light',
  },
  textHeader: {
    type: String,
    default: 'Be careful!',
  },
  size: {
    type: String,
    default: 'sm',
  },
});
const modalContainer = ref(null);
const emit = defineEmits(['@close', '@delete']);
const variants = computed(() => {
  const variantsObj = {
    warning: {
      class: 'warning bg-yellow-light text-white-normal fs-xs',
      handleEmit() {
        emit('@close');
      },
    },
  }
});

// close when click outside
const handleClickOutside = (e) => {
  if (e.target === modalContainer.value) {
    emit('@close');
  }
};

const modalSize = computed(() => {
  const objSize = {
    sm: 'max-vw-20',
    md: 'max-vw-30',
    lg: 'max-vw-40',
  };
  return objSize[props.size] || objSize.sm;
});

</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.shown"
      class="modal-container"
      ref="modalContainer"
      v-on:click="handleClickOutside"
    >
      <div
        class="wrapper w-100-percent bg-white-normal"
        v-bind:class="modalSize"
      >
        <template v-if="!disableHeader">
          <slot name="header">
            <div
              class="d-flex flex-between p-3 header align-center"
              v-bind:class="bgHeader"
            >
              <h2 class="fs-xl text-white-light fw-bold">{{ props.textHeader }}</h2>
              <div>
                <Button
                  variant="close"
                  text="X"
                  v-on:@close="emit('@close')"
                />
              </div>
            </div>
          </slot>
        </template>
        <slot name="body">
          <div class="p-3 bg-white-normal">
            <slot name="body-text">
              <p class="text-black-normal">
                If you delete this question, you will not be able to recover it.
              </p>
              <p class="text-black-normal mt-1">
                Are you sure you want to delete it?
              </p>
            </slot>
          </div>
        </slot>
        <slot name="footer">
          <div class="footer px-5 pb-3 d-flex flex-between w-100 bg-white-normal">
            <Button
              variant="delete"
              text="Confirm"
              v-on:@delete="emit('@delete')"
            />
            <Button
              variant="close"
              text="Cancel"
              customClass="bg-transparent fw-bold text-black-normal"
              v-on:@close="emit('@close')"
            />
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.10);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.025);
    z-index: 10001;
    .header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .footer {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
