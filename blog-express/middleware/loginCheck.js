const {SuccessModel, ErrorModel} = require('../model/resModel');

module.exports = (req, res, next) => {
    if (req.session.username) { // 有这个证明已登录
        next();
        return;
    }
    res.json(
        new ErrorModel('未登录')
    )
};