const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');


const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            inlcude: [
                {
                    model: User,
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true}));

        if (withAuth) {
            res.render('home', {
                layout: 'dashboard',
                posts,
            });
        } else {
            res.render('home', {
                posts,
            });
        }
       
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        
        if (postData) {
            const post = postData.get({ plain: true });
            if (!withAuth) {
                res.render('blogById', {
                    post,
                });
            } else {
                res.render('blogById', {
                    layout: 'dashboard', 
                    post, 
                });
            }  
        } else {
            res.status(404).end();
        }
        
    } catch (err) {
        res.status(500).json(err);
    };
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

// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// })

module.exports = router;