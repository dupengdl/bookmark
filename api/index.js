'use strict';
/**
 * 路由设置
 */
var express = require('express');
var User = require('./controllers/user');
var Tag = require('./controllers/tag');
var Bookmark = require('./controllers/bookmark');
var Category = require('./controllers/category');
var handler = require('./utils/handler');
var rtn = require('./utils/rtn');
var router = express.Router();

function needLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    handler.handleError(res, '用户未登录', rtn.NO_LOGIN);
  } else {
    next();
  }
}

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/logout', User.logout);

router.get('/categoriesWithNoEmpty', Category.categories);
router.get('/tags/:categoryId', Tag.index);

router.all('*', needLogin);
router.get('/categories', Category.index);
router.get('/categoriesWithSubdoc', Category.all);
router.post('/category/add', Category.add);

router.post('/tag/add', Tag.add);

router.post('/bookmark/add', Bookmark.add);

router.get('*', function(req, res) {
  res.status(404).json({
    rtn: 404
  });
});

module.exports = router;
