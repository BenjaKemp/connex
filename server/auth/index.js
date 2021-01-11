const authenticationMiddleware = (req,res,next) => {
  if(req.headers.authorization !== 'mysecrettoken'){
    return res.send(403,"You do not have rights to visit this page");
  } 
  next()
}

module.exports = authenticationMiddleware