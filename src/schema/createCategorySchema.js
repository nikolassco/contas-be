const joi = require('joi')

const createCategorySchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "Nome é obrigatório.",
    "string.empty": "Nome é obrigatório."
  })
})

module.exports = createCategorySchema
