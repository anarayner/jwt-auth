const User = require('./models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require("./config")
const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res){
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: 'User with this username already exits'})
            }
            let hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username: username, password: hashPassword})
            await user.save()
            return res.json({message: 'new user created'})
        } catch (e) {
          console.log(e)
            return res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(401).json({message: `Invalid username`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(401).json({message: `Invalid password`})
            }
            const token = generateAccessToken(user._id)
            return res.json({
                id: user._id,
                token,
                username: user.username
            })

        } catch (e) {
            return res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find()
            return res.json(users)
        } catch (e) {

        }
    }

    async getUserById(req, res){
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({user: user._id, username: user.username, favorites: user.favorites});
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = new AuthController()