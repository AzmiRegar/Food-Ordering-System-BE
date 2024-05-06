const express = require(`express`)
const app = express()
const PORT = 5000

const cors = require(`cors`)
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//auth admin
const authRoute = require("./routes/auth.route")
app.use('/admin', authRoute)

//food
const foodRoute = require("./routes/food.route")
app.use('/food', foodRoute)

//order
const orderRoute = require("./routes/order.route")
app.use('/order', orderRoute)

//port
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales run on port ${PORT}`)
})