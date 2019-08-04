export const state = () => ({
  toggle: false
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
