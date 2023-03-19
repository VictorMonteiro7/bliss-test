import { createStore } from 'vuex'
import api from '@/api';

export const store = createStore({
  modules: {},
  state: {
    questions: [],
  },
  getters: {
    questions: (state) => state.questions,
  },
  actions: {
    async getQuestions({ commit }) {
      try {
        const questions = await api.get('/questions');
        commit('setQuestions', questions);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
  },
});
