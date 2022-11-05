import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://34.203.72.68:4000'
  // baseURL: 'http://localhost:4000',
})

Vue.prototype.$http = axiosIns

export default axiosIns
