export const actions = {
  sendFile({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.$axios.$post('/contact/file', formData)
  },
  async send({ dispatch }, { contact, file }) {
    const { id, path } = await dispatch('sendFile', file)
    await this.$axios.$post('/contact/send', { ...contact, path })
    await this.$axios.$post('/contact/update', { contact, id })
  }
}
