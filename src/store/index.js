import { createStore } from 'vuex'
import api from '@/api';

const url = new URL(window.location.href);

export const store = createStore({
  state: {
    questions: [],
    questionSelected: null,
    filter: url.searchParams.get('filter') || null,
    loading: false,
  },
  getters: {
    questions: (state) => state.questions,
    questionSelected: (state) => state.questionSelected,
    filter: (state) => state.filter,
    loading: (state) => state.loading,
  },
  actions: {
    async getQuestions({ commit, getters }) {
      try {
        commit('setLoading', true);
        const queries = {
          limit: 10,
          offset: 0,
        };
        if (getters.filter) {
          queries.filter = getters.filter;
        }

        const questions = await api.get('/questions', queries);
        commit('setQuestions', questions);
      } catch (err) {
        console.log(err);
      } finally {
        commit('setLoading', false);
      }
    },

    async getQuestion({ commit }, questionId) {
      try {
        commit('setLoading', true);
        const question = await api.get(`/questions/${questionId}`);
        commit('setQuestionSelected', question);
      } catch (err) {
        console.log(err);
      } finally {
        commit('setLoading', false);
      }
    },

    async setVote({ commit, state}, { index }) {
      try {
        const question = state.questionSelected;
        await api.put(`/questions/${question.id}`);
        question.choices[index].votes += 1;
        commit('setQuestionSelected', question);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    async deleteQuestion({ commit, state }, questionId) {
      try {
        const questions = state.questions.filter((question) => question.id !== questionId);
        commit('setQuestions', questions);
      } catch (err) {
        console.log(err);
      }
    },

    async shareQuestion(store, { contentUrl, destinationEmail }) {
      try {
        await api.post(`/share?content_url=${contentUrl}&destination_email=${destinationEmail}`);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    async submitQuestion(store, question) {
      try {
        const newQuestion = {
          question: question.question,
          choices: [
            question.choice1,
            question.choice2,
            question.choice3,
            question.choice4,
          ],
          image_url: "https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)",
          thumb_url: "https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)",
        };

        await api.post('/questions', newQuestion);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setQuestionSelected(state, question) {
      state.questionSelected = question;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
});
