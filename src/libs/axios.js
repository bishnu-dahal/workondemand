import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://rizorsiumani.com.mt:4000',
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "*",
    'Access-Control-Allow-Headers': "*"
    }
  
})

Vue.prototype.$http = axiosIns

export default axiosIns
