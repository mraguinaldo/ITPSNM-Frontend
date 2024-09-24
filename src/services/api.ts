import axios from 'axios'
// import env from 'react-dotenv'

const DEV = true

const baseURL = DEV ? 'https://itpsnm.onrender.com/api/v1' : 'PROD'

const API = axios.create({ baseURL })

export { API }
