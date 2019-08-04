export const state = () => ({
  companyLogo: {},
  job: {}
})

export const getters = {
  companyLogo({ companyLogo }) {
    return companyLogo
  },
  job({ job }) {
    return job
  }
}

export const actions = {
  sendFile({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    return this.$axios.$post('/job/save-image', formData)
  },
  async createWithFile({ dispatch }, { file, job }) {
    const { id } = await dispatch('sendFile', file)
    await this.$axios.$post('/job/update', { job, id })
  },
  async create({ commit }, { job }) {
    await this.$axios.$post('/job/create', job)
  }
}
