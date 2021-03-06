require('dotenv').config()
const db = require("../db/models");
const User = db.users;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        let emailCheck = await User.findOne({where: {email: req.body.email}})
        if (emailCheck) { res.json({msg: 'This user already exists', error: true})}
        else {
            User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            }).then(user => {
                res.send(user)
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.login = async (req, res) => {
    let getUser = await User.findOne({
        where: {email: req.body.email}
    })

    if (!getUser) { 
        return res.json({
            msg: 'The email was not found', emailError: true
        }) 
    }

    const isValid = await bcrypt.compare(req.body.password, getUser.dataValues.password)
    if (!isValid) { 
        return res.json({
            msg: 'The password did not match', passwordError: true
        }) 
    }

    const token = jwt.sign(getUser.dataValues.name, process.env.ACCESS_TOKEN_SECRET)
    res.send({token: token})
}

exports.getall = async (req, res) => {
    const sup = await User.findAll();
    try {
        res.json({sup})
    } catch{
        res.status(500).send()
    }
}