import _axios from 'axios'

const axios = _axios.create({
  baseURL: 'https://red-bugs-smell-112-200-243-101.loca.lt',
  withCredentials: true,
})

export default axios
