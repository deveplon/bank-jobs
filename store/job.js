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
    await this.$axios.$post('/job/update', { ...job, id })
  },
  async updateWithFile({ dispatch }, { file, job, id: oldId }) {
    await dispatch('delete', oldId)
    const { id } = await dispatch('sendFile', file)
    await this.$axios.$post('/job/update', { ...job, id })
    return id
  },
  async update({ dispatch }, { job, id }) {
    await this.$axios.$post('/job/update', { ...job, id })
    return id
  },
  async create({ commit }, { job }) {
    await this.$axios.$post('/job/create', job)
  },
  async delete({ commit }, id) {
    await this.$axios.$delete(`/job/${id}`)
  }
}
