const express = require('express')
const { registerUser, loginUser } = require('./controllers/user')
const validateSchema = require('./middlewares/validateSchema')
const createUserSchema = require('./schema/createUserSchema')
const loginUserSchema = require('./schema/loginUserSchema')

const routes = express()

routes.get('/', (request, response) => {
  response.send('ok')
})

// routes.post('/register', (request, response) => response.send('resgiter route'))
routes.post('/register', validateSchema(createUserSchema), registerUser)
routes.post('/login', validateSchema(loginUserSchema), loginUser)

module.exports = routes
