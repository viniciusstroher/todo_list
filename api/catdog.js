var axios = require('axios')
axios.get('https://cat-fact.herokuapp.com/facts/random', {})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data)
})
.catch((error) => {
  console.log(error)
})