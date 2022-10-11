const state = () => ({
  errorMessage: "",
});

const getters = {};
const actions = {};
const mutations = {
    setErrorMsg(state, message){
        state.errorMessage = message
    },
    addErrorMsg(state, message){
        state.errorMessage += message
    },
    delErrorMsg(state){
        state.errorMessage = ""
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
