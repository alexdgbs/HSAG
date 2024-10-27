// store/auth.js
export const state = () => ({
    isAuthenticated: false,
    email: ''
  });
  
  export const mutations = {
    SET_AUTH(state, { email }) {
      state.isAuthenticated = true;
      state.email = email;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.email = '';
    }
  };
  
  export const actions = {
    login({ commit }, email) {
      commit('SET_AUTH', { email });
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  };
  