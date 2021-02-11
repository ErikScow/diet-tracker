const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/usersRouter')
const authRouter = require('./routers/authRouter')

const app = express()

app.use(cors)
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('api up')
})

app.listen(5005, () => {
    console.log('listening on port 5005')
})