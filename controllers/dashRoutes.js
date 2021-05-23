const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

const router = require('express').Router();

// router.get('/home', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             inlcude: [
//                 {
//                     model: User,
//                 },
//             ],
//         });
//         const posts = postData.map((post) => post.get({ plain: true}));
//         res.render('home', {
//             layout: 'dashboard',
//             posts,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('home', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/userDash', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('userDash', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});
// router.get('/userDash', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             where: {
//                 user_id: req.session.user_id,
//             },
//         });
//         const posts = postData.map((post) => post.get({ plain: true }));
//         res.render('userDash', {
//             layout: 'dashboard',
//             posts,
//         });
//     } catch (err) {
//         res.redirect('login');
//     }
// });


router.get('/newblog', withAuth, (req, res) => {
    res.render('newblog', {
        layout: 'dashboard',
    });
});

module.exports = router;