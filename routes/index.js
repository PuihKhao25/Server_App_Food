var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/home', (req,res) =>{
  console.log(req.body)
})
module.exports = router;
