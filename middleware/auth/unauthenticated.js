export default ({ route, store, redirect }) => {
  if (
    store.getters['auth/isAuthenticated'] ||
    route.name === 'auth-sign-up' ||
    route.name === 'curriculum'
  ) {
    return
  }

  redirect('/auth/sign-in')
}
