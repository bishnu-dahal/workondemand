import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  //     baseURL: 'http://192.168.100.6:4000',
  baseURL: 'http://www.rizorsiumani.com.mt:4000',
  headers: { 'Access-Control-Allow-Origin': 'http://www.rizorsiumani.com.mt:4000' },
})

Vue.prototype.$http = axiosIns

export default axiosIns
