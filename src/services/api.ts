import axios from 'axios'

const baseURL = 'https://itpsnm.onrender.com/api/v1'

const API = axios.create({ baseURL })

export { API }
