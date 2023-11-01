/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:34:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-27 19:31:00
 * @FilePath: \i-study\accounts\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/account');
});

/* GET account page. */
router.get('/account', checkLoginMiddleware, function (req, res, next) {
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('read failed');
    }
    res.render('account/list', { accounts: data, moment: moment });
  })
});

/* GET account create page. */
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('account/create');
});

router.post('/account', (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }, (err, data) => {
    if (err) {
      res.status(500).send('add failed');
    }
  });
  res.send('Added');
})

router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send('delete failed');
      return;
    }
    res.send('Deleted');
  })
});
module.exports = router;
