const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');


const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            inlcude: [
                {
                    model: User,
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('home', {
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;