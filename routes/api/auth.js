/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 19:46:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-27 20:21:48
 * @FilePath: \i-study\accounts\routes\api\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 19:46:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-27 19:53:58
 * @FilePath: \i-study\accounts\routes\api\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const md5 = require('md5');

const { SECRET_KEY } = require('../../config/config');
const UserModel = require('../../models/UserModel');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            return res.json({
                code: '2001',
                msg: 'Invalid',
                data: null
            })
        }
        if (!data)
            return res.json({
                code: '2002',
                msg: 'Username or Password is incorrect',
                data: null
            })
        const token = jwt.sign({
            username: data.username,
            _id: data._id,
        }, SECRET_KEY, {
            expiresIn: 60*60*24*7
        });
        res.json({
            code: '0000',
            msg: 'access granted',
            data: token
        });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});

module.exports = router;
