import express from 'express'
import userRouter from './userRoutes.routes.js'
import accountRouter from './accountRoutes.routes.js'
const router = express();

router.use('/user' , userRouter)
router.use('/account' , accountRouter)
export default router;