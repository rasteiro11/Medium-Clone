const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const users = require('./routes/api/users')
const articles = require('./routes/api/articles')
const files = require('./routes/api/files')
const { checkToken } = require('./middleware/auth');

const mongoUri = `mongodb://localhost/`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(bodyParser.json())
app.use(checkToken)
app.use("/api/users", users)
app.use("/api/articles", articles)
app.use("/api/files", files)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server rinning on port ${port}`)
})