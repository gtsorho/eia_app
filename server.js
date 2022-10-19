const express = require('express')
const path = require('path')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



const port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port:' + port)
