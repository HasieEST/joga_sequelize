require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const models = require('../models')

const getByAuthorId = (req, res) => {
    models.Authors.findByPk(req.params.authorId, {
        include: [{
            model: models.Article
        }]
    })
        .then(author => {
            console.log(author)
            return res.status(200).json({ author })
        })
        .catch(error => {
            return res.status(500).send(error.message)
        })
}

module.exports = {
    getByAuthorId
}