let apiUrl

const apiUrls = {
  production: process.env.REACT_APP_API_URL,
  development: 'http://localhost:5000'
}

if (window.location.host === 'localhost:3000') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl