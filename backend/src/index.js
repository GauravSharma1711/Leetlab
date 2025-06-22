import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()
import cookieParser from 'cookie-parser'

import path from "path";

import authRoutes from './routes/auth.routes.js'
import problemRoutes from './routes/problem.routes.js'
import executionRoute from './routes/executeCode.routes.js'
import submissionRoutes from './routes/submission.routes.js'
import playlistRoutes from './routes/playlist.routes.js'


const app  = express();

const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true 
}));



app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/problems',problemRoutes);
app.use('/api/v1/execute',executionRoute);
app.use('/api/v1/submission',submissionRoutes);
app.use('/api/v1/playlist',playlistRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT,()=>{
console.log(`server is listning to ${PORT}`)
})

