import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://18.212.61.242:4000',
})

Vue.prototype.$http = axiosIns

export default axiosIns
