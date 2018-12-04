var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {//根路由
  console.log("Hello World");
  res.render('index', { title: 'index' });//index.html页面
});

//参数测试
router.get('/params', function(req, res, next) {
  res.render('simpleParams',
      { title: 'users-title',
         list:['aaa','bbb','ccc']});//simpleParams.html页面
});

module.exports = router;
