export const state = () => ({
  show: false,
  variant: '',
  message: ''
})

export const getters = {
  params(state) {
    return state
  }
}

export const mutations = {
  setState(state, { show, variant, message }) {
    state.show = show || false
    state.variant = variant || ''
    state.message = message || ''
  }
}

export const actions = {
  showToast({ commit }, { variant, message }) {
    commit('setState', {})
    commit('setState', {
      show: true,
      variant: variant || 'danger',
      message: message || 'something goes wrong!'
    })

    setTimeout(() => {
      commit('setState', {})
    }, 3500)
  }
}
