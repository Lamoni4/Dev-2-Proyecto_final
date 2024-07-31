require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Blogging Platform',
      version: '1.0.0',
      description: 'API para una plataforma de blogging interactiva'
    },
    servers: [
      { url: `http://localhost:${PORT}` }
    ]
  },
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})
