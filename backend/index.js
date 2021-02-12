const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/usersRouter')
const authRouter = require('./routers/authRouter')

const { authenticate } = require('./middleware/authMiddleware')
const { validateUserId } = require('./middleware/usersMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users/:id', authenticate, validateUserId, userRouter)

app.get('/', (req, res) => {
    res.send('api up')
})

app.listen(5005, (err) => {
    if (err) {console.err(err)}
    console.log('listening on port 5005')
})