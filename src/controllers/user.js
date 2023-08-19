const knex = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const registerUser = async (request, response) => {
  const { name, email, password } = request.body

  try {
    const userExists = await knex('users').where({ email })

    if (userExists.length > 0) {
      return response.status(400).json({ message: "Usuário já cadastrado." })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const newUser = await knex('users').insert({
      name,
      password: hashPass,
      email
    })
      .returning('*')

    const { password: _, ...registeredUser } = newUser[0]

    return response.status(201).json({ message: registeredUser })

  } catch (error) {
    response.status(500).json({ message: error })
  }
}

const loginUser = async (request, response) => {
  const { email, password } = request.body


  try {
    const user = await knex('users').where({ email })

    if (user.length < 1) {
      return response.status(400).json({ message: 'E-mail ou senha inválido(a).' })
    }

    const validPassword = await bcrypt.compare(password, user[0].password)

    if (!validPassword) {
      return response.status(400).json({ message: 'E-mail ou senha inválido.' })
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWTKEY, { expiresIn: '8h' })

    const { password: _, ...userLogged } = user[0]

    return response.status(200).json({ message: { user: userLogged, token } })
  } catch (error) {
    // response.status(500).json({ message: error })
  }
}

const getUser = (request, response) => {
  return response.status(200).json({ message: request.user })
}

module.exports = { registerUser, loginUser, getUser }
