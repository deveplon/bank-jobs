export const actions = {
  sendFile({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.$axios.$post('/contact/file', formData)
  },
  async send({ dispatch }, { contact, file }) {
    await dispatch('sendFile', file)
    await this.$axios.$post('/contact/receive', contact)
  }
}
