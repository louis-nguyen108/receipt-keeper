const express = require('express')
const path = require('path')

const receiptRoutes = require('./routes/receipts')
const usersRoutes = require('./routes/users')
const imagesRoutes = require('./routes/images')
// const homeRoutes = require('./routes/home')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// server.use('/api/v1/', homeRoutes)
server.use('/api/v1/receipts', receiptRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/images', imagesRoutes)

server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
