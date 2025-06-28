import express from 'express'
// import userRoutes from './routes/userRoutes.routes.js'
import routes from './routes/index.js'
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './db.js';
const app = express();
const port = process.env.PORT || 4000 

config();
connectDB();
app.use(cors({
    origin: [ "https://fraudify-tau.vercel.app"] //"http://localhost:3000","http://localhost:5173",
}))

app.use(express.json())

app.use("/api/v1", routes);

app.listen(port , ()=>{
    console.log(`backend running on port ${port}`)
})