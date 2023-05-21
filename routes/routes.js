import { Router } from "express"
const router = Router()
import { getAll, getOne, createOne, updateOne, deleteOne} from "../controllers/controller.js"
import { login, me } from "../controllers/login.js"
import { auth } from "../controllers/authentication.js"

// routes
router.get('/users', getAll)
router.get('/users/:id', getOne)
router.post('/users', createOne)
router.put('/users/:id', updateOne)
router.delete('/users/:id', deleteOne)

// login handle
router.post('/login', login)

router.get('/me', auth , me)

export default router 

