import axios from 'axios'
// import env from 'react-dotenv'

const DEV = true

const baseURL = DEV ? 'http://192.168.22.7:3333/api/v1' : 'PROD'

const API = axios.create({ baseURL })

export { API }
