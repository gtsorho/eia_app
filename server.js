const express = require('express')
const path = require('path') 
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', serveStatic(path.join(__dirname,'/dist')))

app.get(/.*/, function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

  

const port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port:' + port)
