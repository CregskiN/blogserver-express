var express = require('express');
var router = express.Router();
const {login} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

// 登录 API
router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    const result = login(username, password);
    return result.then(loginData => {
        if (loginData.username) {
            // 设置 session
            req.session.username = loginData.username;
            req.session.realname = loginData.realname;

            res.json(
                new SuccessModel('登录成功')
            );
            return; // 直接跳出
        }
        res.json(
            new ErrorModel('登陆失败！')
        )
    });
});


// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json({
//             success: 0,
//             msg: '已登录'
//         });
//         return;
//     }
//     res.json({
//         success: -1,
//         msg: '未登录'
//     })
// });

// // 测试 session
// router.get('/session-test', (req, res, next) => {
//     const session = req.session;
//     if (session.viewNum == null) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//
//     res.json({
//         viewNum: session.viewNum
//     })
// });

module.exports = router;
