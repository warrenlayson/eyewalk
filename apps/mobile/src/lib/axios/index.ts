import _axios from 'axios'

const axios = _axios.create({
  baseURL: 'https://quick-panda-55.loca.lt',
  withCredentials: true,
})

export default axios
