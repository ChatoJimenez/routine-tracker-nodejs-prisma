import { Router } from "express"
import {
    createUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
    updateUserRole,
} from "../controllers/userController.js"

const router = Router()

router.get("/", getUsers)

router.get("/:id", getUserById)

router.post("/", createUser)

router.put("/:id/edit", updateUserById)

router.put("/:id/role/:action", updateUserRole)

router.delete("/:id", deleteUserById)

export default router
