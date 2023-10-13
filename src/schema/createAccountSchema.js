const joi = require('joi')

// const { description, value, due_date, installment, status } = request.body


const createAccountSchema = joi.object({
  description: joi.string().required().messages({
    "any.required": "Descrição é obrigatória.",
    "string.empty": "Descrição é obrigatória."
  }),
  value: joi.number().required().messages({
    "any.required": "Valor é obrigatório.",
    "string.empty": "Valor é obrigatório."
  }),
  due_date: joi.string().required().messages({
    "any.required": "Data é obrigatória.",
    "string.empty": "Data é obrigatória.",
  }),
  installment: joi.number().required().messages({
    "any.required": "Quantidade de parcelas é obrigatória.",
    "string.empty": "Quantidade de parcelas é obrigatória.",
  }),
  status: joi.string().required().messages({
    "any.required": "Status é obrigatório.",
    "string.empty": "Status é obrigatório.",
  })
})

module.exports = createAccountSchema
