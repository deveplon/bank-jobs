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

    return this.$axios.$post('/job/save-company-logo', formData)
  },
  async create({ dispatch }, { file, job }) {
    const { id } = await dispatch('sendFile', file)
    // eslint-disable-next-line no-console
    console.log(id)
    // await this.$axios.$post('/job/save', { ...job, id })
  }
}
