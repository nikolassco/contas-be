require('dotenv').config()

const app = require('./server')

app.listen(process.env.PORT, () => {
  console.log(`Api em desenvolvimento rodando na porta ${process.env.PORT}`)
})
