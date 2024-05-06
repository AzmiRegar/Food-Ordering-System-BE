const express = require(`express`)
const app = express()
app.use(express.json()) 
const orderController = require(`../controllers/order.controller`)
const {authorize} = require('../controllers/auth.controllers')

app.post('/', orderController.order )
app.get('/', orderController.getAllHistory)

module.exports=app