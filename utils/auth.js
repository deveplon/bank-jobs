/**
 * On submit method
 *
 * @param {String} url
 * @param {Object} data
 * @returns
 */
export const onSubmit = async function onSubmit(url, data) {
  this.loading = true
  try {
    await this.$store.dispatch(url, data)
    this.$router.push('/')
    this.loading = false
  } catch (err) {
    this.$store.dispatch('toast/showToast', { message: err.message })
    this.loading = false
  }
}
