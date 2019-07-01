import axios from 'axios'

const API_ENDPOINT = 'https://private-anon-da32c88a4c-audionetworkrecruitment.apiary-mock.com/'

const instance = axios.create({
  baseURL: `${API_ENDPOINT}`,
  timeout: 10000,
  headers: makeHeaders(),
})

export default {
  tracks: {
    get: () => {
      return instance.get(`tracks`).then(response => {
        return response.data
      })
    },
  },
}

function makeHeaders() {
  return {
    Accept: '*/*',
    'Content-Type': 'application/json; charset=utf-8',
  }
}