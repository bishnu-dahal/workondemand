import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // baseURL: 'http://192.168.100.6:4000',
  baseURL: 'http://34.203.72.68:4000',
})

Vue.prototype.$http = axiosIns

export default axiosIns
