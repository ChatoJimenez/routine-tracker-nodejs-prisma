import { Router } from "express"
import { prisma } from "../config/connection.js"

const router = Router()

// Get all users
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            routines: true,
            activities: true,
        },
    })
    res.json(users)
})

router.post("/", async (req, res) => {
    let user
    try {
        user = await prisma.user.create({
            data: req.body,
        })
    } catch (error) {
        console.log(error.code)
        if (error.code === "P2002")
            return res
                .status(400)
                .json({ message: "Email already used", error: "Invalid data" })
        return res.status(500).json({
            message: error.message,
            error: "Unexpected error occurred",
        })
    }
    return res.status(201).json(user)
})

export default router
