
const axios = require('axios')
const token = 'f20f7ae318c34b92ee6a685fac758feb'
// const email = 'viniciusferreirawk@gma2il.com'
const email = 'eu@me.com'
//     http://apilayer.net/api/check?access_key=f20f7ae318c34b92ee6a685fac758feb&email=eu@me.com
axios.get('http://apilayer.net/api/check?access_key='+token+'&email='+email, {})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})