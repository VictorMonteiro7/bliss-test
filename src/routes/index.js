import { createRouter, createWebHistory } from 'vue-router';
import Questions from '../Views/Questions.vue';
import Question from '../Views/Question.vue';

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
        {
          path: '/questions/:id',
          name: 'question',
          component: Question,
          props: true,
        },
      ],
    },
  ],
});
