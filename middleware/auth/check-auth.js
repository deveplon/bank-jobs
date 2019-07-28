import { getCookie } from '~/utils/cookies'
import { decode } from '~/utils/token'

export default ({ store, req }) => {
  if (process.server && !req && !req.headers && !req.headers.cookie) return

  const token = process.server
    ? getCookie(req.headers.cookie, 'auth')
    : getCookie(document.cookie, 'auth')

  if (!token) return

  decode(token, (err, { user }) => {
    if (err) return
    store.commit('auth/setUser', user)
  })
}
