import { getCookie } from '~/utils/cookies'
import { decode } from '~/utils/token'

export default async ({ store, req }) => {
  if (process.server && !req && !req.headers && !req.headers.cookie) return

  const token = process.server
    ? getCookie(req.headers.cookie, 'auth')
    : getCookie(document.cookie, 'auth')

  if (!token) return

  try {
    const {
      data: { id }
    } = await decode(token)
    store.commit('auth/setUser', id)
  } catch (err) {}
}
