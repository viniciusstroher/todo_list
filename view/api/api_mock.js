var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var moment = require('moment');

server.get('/date', function(req, res) {
    var db = router.db;
    var date = db.get('date');
    res.jsonp(date);
});

server.use(middlewares);

server.post('/api/auth', (req, res) => {
  var header=req.headers['authorization']||'',        // get the header
      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth=new Buffer.from(token, 'base64').toString(),    // convert from base64
      parts=auth.split(/:/),                          // split on colon
      email=parts[0],
      password=parts[1];
      
     //passar -> testesaipos@saipos.com.br
    if(email == "testesaipos@saipos.com.br" && password == "testesaipos@saipos.com.br"){
      res.jsonp({auth:true,email:email,password:password})
    }else{
      res.status(401).jsonp({auth:false,message:"Invalid user."})
    }
    
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  //passa sempre o id do usuario mock
  req.body.responsibleId = 1
  if (req.method === 'POST') {
    req.body.createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
  }
  // Continue to JSON Server router
  next()
})

server.use('/api',router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
