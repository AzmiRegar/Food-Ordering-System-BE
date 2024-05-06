const express = require(`express`)
const app = express()
app.use(express.json()) 
const {authenticate} = require(`../controllers/auth.controllers`)

app.post(`/auth`, authenticate)

module.exports = app