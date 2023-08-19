const knex = require("../connection")

const createCategory = async (request, response) => {
  const { name } = request.body

  try {
    const category = await knex('categories').where({ name })

    if (category.length > 0) {
      return response.status(400).json({ message: 'Categoria já existe.' })
    }

    const newCategory = await knex('categories').insert({ name }).returning('*')

    return response.status(200).json({ message: newCategory })
  } catch (error) {
    response.status(500).json({ message: error })
  }
}

const getCategories = async (request, response) => {
  const categories = await knex('categories')
  return response.status(200).json({ message: categories })
}

module.exports = { createCategory, getCategories }
