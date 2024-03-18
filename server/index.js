require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const server = express()
const mongoose = require('mongoose')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

server.use(cors())
server.use(express.json())
//для роздачі файлів з папки static в браузер
server.use(express.static(path.resolve(__dirname, 'static')))
server.use(fileUpload({}))
server.use('/api', router)

//обробка помилок, останній middleware
server.use(errorHandler)

mongoose.connect('mongodb://127.0.0.1:27017/shop')

const start = async () => {
  try {
    // await mongoose.connect('mongodb://localhost:27017/shop')
    server.listen(PORT, () => console.log(`server started on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
