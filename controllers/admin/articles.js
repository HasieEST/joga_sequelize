require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const models = require('../../models')

const createArticle = (req, res) => {
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body


    const newArticle = models.Article.create({
        name:name,
        slug:slug,
        image:image,
        body:body,
        published: new Date().toISOString().slice(0,19).replace('T', ' ')
    })
    .then(article=> {
        console.log(article)
        return res.status(200).json({message: 'New article is added'})
    })
    .catch(error =>{
        return res.status(500).send(error.message)
    })
}

const getArticle = (req, res) => {
    models.Article.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(article =>{
        console.log(article)
        return res.status(200).json({article})
    })
    .catch(error => {
        return res.status(500).send(error.message)
    })
}

const updateArticle = (req, res) =>{
    models.Article.update({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        author_id: req.body.author_id,
        body: req.body.body
    },{
        where: {
            id: req.params.id
        }
    })
    .then(article=> {
        console.log(article)
        return res.status(200).json({message: 'Article is updated'})
    })
    .catch(error =>{
        return res.status(500).send(error.message)
    })
}


module.exports = {
    createArticle,
    getArticle,
    updateArticle
}