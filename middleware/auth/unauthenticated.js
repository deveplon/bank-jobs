export default ({ route, store, redirect }) => {
  if (store.getters['auth/isAuthenticated'] || route.name === 'resume') return

  redirect('/auth/sign-in')
}
