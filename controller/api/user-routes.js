const router = require('express').Router();
const { User } = require('../../models');




// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve users', error: err });
  }
});



// Create a new user and set up a session
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.status(201).json(newUser);
    });
  } catch (err) {
    res.status(400).json({ message: 'Unable to create user', error: err });
  }
});


// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const isValidPassword = await user.checkPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
      res.json({ message: 'You are now logged in!', user });
    });
  } catch (err) {
    res.status(400).json({ message: 'Unable to login', error: err });
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).json({ message: 'Unable to logout', error: err });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(404).json({ message: 'No session found' });
  }
});

module.exports = router;