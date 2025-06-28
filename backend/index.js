import express from 'express'
// import userRoutes from './routes/userRoutes.routes.js'
import routes from './routes/index.js'
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './db.js';
const app = express();

config();
connectDB();
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5173", "https://fraudify.onrender.com"]
}))

app.use(express.json())

app.use("/api/v1", routes);

app.listen(3001 , ()=>{
    console.log("backend running on port 3001")
})