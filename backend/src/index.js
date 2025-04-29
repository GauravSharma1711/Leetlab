import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.routes.js'
import problemRoutes from './routes/problem.routes.js'

const app  = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("hello leetlab🔥")
})

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/problems',problemRoutes);


app.listen(PORT,()=>{
console.log(`server is listning to ${PORT}`)
})

