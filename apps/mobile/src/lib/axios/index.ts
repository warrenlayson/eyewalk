import _axios from 'axios'

const axios = _axios.create({
  baseURL: 'https://black-tiger-24.loca.lt',
  withCredentials: true,
})

export default axios
