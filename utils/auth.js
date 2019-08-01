/**
 * On submit method
 *
 * @param {String} url
 * @param {Object} data
 * @returns
 */
export const onSubmit = async function onSubmit(url, data, message) {
  this.loading = true
  try {
    await this.$store.dispatch(url, data)
    window.location = '/'
    this.loading = false
    if (!message) return
    window.onload = () => {
      this.$store.dispatch('toast/showToast', { message, variant: 'success' })
    }
  } catch (err) {
    this.$store.dispatch('toast/showToast', { message: err.message })
    this.loading = false
  }
}
