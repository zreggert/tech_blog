const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            req.session.username = newUser.username;
            res.json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Username or password cannot be found.'});
            return;
        }
        const passValid = userData.checkPassword(req.body.password);
        if (!passValid) {
            res
                .status(400)
                .json({ message: "Username or password cannot be found."});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.session = userData.session;
            
            res.json({ 
                userData,
                message: "Login successful!"
             });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


module.exports = router;