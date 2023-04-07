import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://apiserver.rizorsiumani.com.mt',
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "*",
    'Access-Control-Allow-Headers': "*",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    }
  
})

Vue.prototype.$http = axiosIns

export default axiosIns
