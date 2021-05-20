const { Post, User } = require('../models');
const withAuth = require('../utils/auth')

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('home', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;