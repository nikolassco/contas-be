const express = require('express')
const { createAccount } = require('./controllers/account')
const { createCategory, getCategories } = require('./controllers/category')
const { registerUser, loginUser, getUser } = require('./controllers/user')
const validateSchema = require('./middlewares/validateSchema')
const verifyJwt = require('./middlewares/validateToken')
const createAccountSchema = require('./schema/createAccountSchema')
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

routes.get('/user', getUser)

routes.post('/category', validateSchema(createCategorySchema), createCategory)
routes.get('/categories', getCategories)

routes.post('/account', validateSchema(createAccountSchema), createAccount)

module.exports = routes
