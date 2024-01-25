const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  })

sequelize.authenticate().then(()=>{console.log('Connected to the database')}).catch(err =>{
    console.error('Unable to connect to the database: ', err)
})



app.get('/',(req,res)=> {
    res.json({message: 'Welcome to sequelize application.'})
})

app.listen(port, ()=>{
    console.log('Server is running on localhost:'+ port)
})