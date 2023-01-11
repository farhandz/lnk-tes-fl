require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 7000
const morgan = require('morgan')
const mongoose = require('mongoose');
const routes = require('./src/route/index')
const { getDataAudit } = require('./src/controllers/userController')

app.use(cors())
mongoose.connect(`${process.env.DATABASE_URL}`, {useNewUrlParser: true, dbName: process.env.DATABASE_NAME})
const db = mongoose.connection

db.on('error', (error)=> {
    console.log(error)
})

db.once('open', ()=> {
    console.log('database has been conected')
})

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
);

app.use(bodyParser.json());
app.use(morgan('dev'))



app.use('/api/v1', routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status_code: 404,
    message: 'Page not found',
  })
})




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
