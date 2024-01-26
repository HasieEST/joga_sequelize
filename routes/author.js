const express = require('express')
const router = express.Router()
const authorController = require('../controllers/author')

router.get('/:authorId', authorController.getByAuthorId)

module.exports = router