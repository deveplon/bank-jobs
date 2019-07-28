export const state = () => ({
  toggle: true
})

export const getters = {
  toggle: state => state.toggle
}

export const mutations = {
  toggle(state) {
    state.toggle = !state.toggle
  }
}

export const actions = {
  toggle({ commit }) {
    commit('toggle')
  }
}
