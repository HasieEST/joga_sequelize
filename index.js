const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

sequelize.authenticate().then(() => { console.log('Connected to the database') }).catch(err => {
    console.error('Unable to connect to the database: ', err)
})



const articleRouter = require('./routes/article')
const authorRouter = require('./routes/author')



app.use('/', articleRouter)
app.use('/author', authorRouter)

app.listen(port, () => {
    console.log('Server is running on localhost:' + port)
})