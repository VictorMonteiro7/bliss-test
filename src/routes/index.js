import { createRouter, createWebHistory } from 'vue-router';
import Questions from '../Views/Questions.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      children:[
        {
          path: '/questions:filter?',
          name: 'questions',
          component: Questions,
          props: true,
        },
      ],
    },
  ],
});
