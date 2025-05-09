import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import problemRoutes from './routes/problem.routes.js'
import executionRoute from './routes/executeCode.routes.js'
import submissionRoutes from './routes/submission.routes.js'

const app  = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("hello leetlab🔥")
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/problems',problemRoutes);
app.use('/api/v1/execute',executionRoute);
app.use('/api/v1/submission',submissionRoutes);


app.listen(PORT,()=>{
console.log(`server is listning to ${PORT}`)
})

