import express from 'express'
import userRouter from './userRoutes.routes.js'
const router = express();

router.use('/user' , userRouter)

export default router;