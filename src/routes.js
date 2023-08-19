const express = require('express')
const { createCategory } = require('./controllers/category')
const { registerUser, loginUser } = require('./controllers/user')
const validateSchema = require('./middlewares/validateSchema')
const verifyJwt = require('./middlewares/validateToken')
const createCategorySchema = require('./schema/createCategorySchema')
const createUserSchema = require('./schema/createUserSchema')
const loginUserSchema = require('./schema/loginUserSchema')

const routes = express()

routes.get('/', (request, response) => {
  response.send('ok')
})

// routes.post('/register', (request, response) => response.send('resgiter route'))
routes.post('/register', validateSchema(createUserSchema), registerUser)
routes.post('/login', validateSchema(loginUserSchema), loginUser)

routes.use(verifyJwt)

routes.post('/category', validateSchema(createCategorySchema), createCategory)

module.exports = routes
