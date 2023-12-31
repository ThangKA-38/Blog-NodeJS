const User = require('../../Models/auth/user.model');
const bcrypt = require('bcrypt');
require('dotenv/config');
// const mailer = require('../../util/mailer')


exports.create = (req, res) => {
    res.render('auth/register');
}

exports.register = (req, res) => {
    const { email, password, name } = req.body;

    if (email && password && name) {

        User.findByEmail(email, (err, user) => {
            if (err || user) {
                // A user with that email address does not exists
                const conflictError = 'User credentials are exist.';
                res.render('auth/register', { conflictError });
            }
        })

        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            // Create a User
            const user = new User({
                name: name,
                email: email,
                password: hashed
            });
            User.create(user, (err, user) => {
                if (!err) {

                    return res.redirect('/login');

                }
            })
        });

    }

}