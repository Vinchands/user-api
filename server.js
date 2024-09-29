const express = require('express')
const cors = require('cors')

const app = express()
const port = 8080

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).render('index')
})

const userRouter = require('./routes/users')

app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Running server on: http://localhost:${port}`)
})
