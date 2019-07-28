import AxiosError from '../errors/app/axios'

export default ({ $axios }) => {
  $axios.onError(err => {
    throw new AxiosError(
      parseInt(err.response && err.response.status),
      err.response.data.error
    )
  })
}
