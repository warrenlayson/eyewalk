import _axios from 'axios'

const axios = _axios.create({
  baseURL: 'https://tough-mole-46.loca.lt',
  withCredentials: true,
})

export default axios
