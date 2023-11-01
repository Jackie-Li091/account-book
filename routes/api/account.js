/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:34:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-27 20:24:39
 * @FilePath: \i-study\accounts\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

/* GET account list. */
router.get('/account', checkTokenMiddleware, function(req, res, next) {
    AccountModel.find().sort({time: -1}).exec((err, data) => {
      if(err) {
        res.json({
          code: '1001',
          msg: 'read failed',
          data: null
        });
      }
      res.json({
          code: '0000',
          msg: 'success',
          data: data
      });
    });
});

/* ADD new account. */
router.post('/account', checkTokenMiddleware, (req,res)=>{
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  },(err,data)=>{
    if(err) {
      res.json({
        code: '1002',
        msg: 'create failed',
        data: null
      })
      return;
    }
    res.json({
        code: '0000',
        msg: 'create success',
        data: data
    })
  });
})

/* GET account. */
router.get('/account/:id', checkTokenMiddleware, (req,res)=>{
    const {id} = req.params;
    AccountModel.findById(id, (err,data)=>{
        if(err){
            return res.json({
                code: 1004,
                msg: "read fail",
                data: null
            });
        }
        res.json({
            code: '0000',
            msg: 'success',
            data: data
        })
    })
})

/* UPDATE account. */
router.patch('/account/:id', checkTokenMiddleware, (req,res)=>{
    const {id} = req.params;
    AccountModel.updateOne({_id: id}, req.body, (err, data)=> {
        if(err) {
            res.json({
              code: '1005',
              msg: 'update failed',
              data: null
            });
            return;
          }

          AccountModel.findById(id, (err,data)=>{
            if(err){
                return res.json({
                    code: 1004,
                    msg: "read fail",
                    data: null
                });
            }
            res.json({
                code: '0000',
                msg: 'update success',
                data: data
            });
          });
          
    })
})

/* DELETE account. */
router.delete('/account/:id', checkTokenMiddleware, (req, res)=>{
  let id = req.params.id;
  AccountModel.deleteOne({_id: id}, (err,data)=>{
    if(err) {
      res.json({
        code: '1003',
        msg: 'delete failed',
        data: null
      })
      return;
    }
    res.json({
        code: '0000',
        msg: 'delete success',
        data: {}
    })
  })
});
module.exports = router;
