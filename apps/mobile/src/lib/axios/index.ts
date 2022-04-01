import _axios from 'axios'

const axios = _axios.create({
  baseURL: 'https://blue-sheep-61.loca.lt',
  withCredentials: true,
})

export default axios
