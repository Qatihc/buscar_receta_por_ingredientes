const API_URL = 'https://api.spoonacular.com'

const Axios = require("axios");

const axios = Axios.create({
  baseURL: API_URL
})

export default axios