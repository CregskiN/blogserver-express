var express = require('express');
var router = express.Router();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 获取博客列表
router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
        console.log('is admin!');
        if (req.session.username == null) {
            console.log('is admin, but no login!');
            // 未登录
            res.json(
                new ErrorModel('未登录')
            );
            return;
        }
        author = req.session.username
    }

    const result = getList(author, keyword);
    result.then(listData => {
        res.json(
            new SuccessModel(listData)
        );
    })
});

// 点击进入详情
router.get('/detail', (req, res, next) => {
    const id = req.query.id;
    const result = getDetail(id);

    result.then(data => {
        res.json(
            new SuccessModel(data)
        );
        return;
    })
});

// 新增博客
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    result.then(data => {
        res.json(
            new SuccessModel(data)
        );
        return;
    })
});

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id;
    const newContent = req.body;
    const result = updateBlog(id, newContent);

    result.then(isUpdate => {
        if (isUpdate) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败！')
            )
        }
        return;
    })
});

// 删除博客
router.post('del', loginCheck, (req, res, next) => {
    const id = req.query.id;
    const author = req.session.username; // 假数据，开发登录后改成真实数据
    const result = delBlog(id, author);
    result.then(isDel => {
        if (isDel) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败!')
            )
        }
        return;
    })
});


module.exports = router;