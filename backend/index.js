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
    origin: ["http://localhost:5173"]
}))

app.use(express.json())

app.use("/api/v1", routes);

app.listen(3000 , ()=>{
    console.log("listening on 3000")
})