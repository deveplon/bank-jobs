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
