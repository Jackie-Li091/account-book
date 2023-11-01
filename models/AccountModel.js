/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 16:42:21
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-26 17:18:53
 * @FilePath: \i-study\accounts\models\AccountModel.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: -1
    },
    time: Date,
    account: {
        type: Number,
        required: true
    },
    remarks: String
});

let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;