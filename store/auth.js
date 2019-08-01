import { encode } from '../utils/token'
import { setCookie } from '../utils/cookies'

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
    const { id } = await this.$axios.$post('/auth/login', data)
    const token = await encode({ id })
    setCookie('auth', token)
    commit('setUser', id)
  },
  async register({ commit }, data) {
    await this.$axios.$post('/auth/register', data)
    return true
  },
  async changePass({ state, commit }, data) {
    const id = state.user
    await this.$axios.$post('/auth/change-pass', { ...data, id })
    return true
  },
  logout({ commit }) {
    setCookie('auth', 'end', -1)
    commit('setUser', null)
  }
}
