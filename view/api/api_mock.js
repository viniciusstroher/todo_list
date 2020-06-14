const path = require('path');
const rootPath = path.dirname(__filename);

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(rootPath+'db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// fake auth
server.post('/api/auth', (req, res) => {
	var header=req.headers['authorization']||'',        // get the header
      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth=new Buffer.from(token, 'base64').toString(),    // convert from base64
      parts=auth.split(/:/),                          // split on colon
      email=parts[0],
      password=parts[1];
      
     //passar -> testesaipos@saipos.com.br
    if(email == "testesaipos@saipos.com.br"){
    	res.jsonp({auth:true,email:email,password:password})
    }else{
    	res.status(401).jsonp({auth:false,message:"Invalid user."})
    }
  	
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('Mock api is running')
})