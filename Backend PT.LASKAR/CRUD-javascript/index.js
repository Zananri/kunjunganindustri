const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const authRoute = require('./routes/auth')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth')
const cors = require('cors')

pool.on('error', (err) => {
    console.log(err);
})

app.use(cors())
const app = express()
const PORT = 1111

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// membuat parameter harus diawali : diawal
app.get('/contohparameter/:username/:jurusan/:kelas', (req, res) => {
    res.json(req.params)
})

app.get('/contohparam', (req, res) => {
    res.json(req.query)
})

app.get('/', (req, res) => {
    res.write('Hello World')
    res.end()
})

app.use('/auth', authRoute)
app.use('/book', authenticateJWT, bookRoute)
app.use('/author', authorRoute)

app.listen(PORT, () => {
    console.log(`Server Berjalan di http://localhost:${PORT}`)
})