const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const weather = require('./routes/weather')
const broadcast = require('./routes/broadcast')
const cors = require('cors');

const mongoose =  require('mongoose')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors({
    origin: '*'
}));

app.use('/api/weather', weather)
app.use('/api/broadcast', broadcast)

app.use('/', serveStatic(path.join(__dirname,'/dist')))

app.get(/.*/, function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

  

const port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port:' + port)
