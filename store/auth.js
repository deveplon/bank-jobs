export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user || null
  }
}

export const actions = {
  async login({ commit }, data) {
    const { user } = await this.$axios.$post('/auth/login', data)
    commit('setUser', user)
  }
}
