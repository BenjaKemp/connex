var express = require('express');
var router = express.Router();

router.get('/time', (req, res) => {
  const date = Date.now();
    res.send({epoch:date});
  });

module.exports = router;