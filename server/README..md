

lets get started!

super easy  back end to start things off

clone this repo and then install node modules with

npm install 

i've had trouble with the express-prometheus-middleware dependency,

i made a quick fix by navigating to 

/node_modules/express-prometheus-middleware/src/index.js

and adding await the return value   

  const answer = await Prometheus.register.metrics()
    res.set('Content-Type', Prometheus.register.contentType);
    return res.send(answer);

  it's a bit hacky but it got things working  


  