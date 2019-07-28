export default ({ route, store, redirect }) => {
  if (store.getters['auth/isAuthenticated'] || route.name === 'auth-sign-up') { return }

  redirect('/auth/sign-in')
}
