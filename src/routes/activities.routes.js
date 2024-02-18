import { Router } from "express"
import { prisma } from "../config/connection.js"

const router = Router()

// Get all activities
router.get("/", async (req, res) => {
    const users = await prisma.activity.findMany({
        include: {
            routines: true,
            user: true,
        },
    })
    return res.json(users)
})

// Connect an activity with a routine
router.put("/:activityId/routine/:routineId", async (req, res) => {
    // Get params
    const { activityId, routineId } = req.params
    console.log("Activity id: ", activityId)
    console.log("Routine id: ", routineId)
    const activity = await prisma.activity.findFirst({
        where: { id: activityId },
    })
    // Early return if no activity
    if (!activity)
        return res
            .status(404)
            .json({ message: "Activity ID not found", error: "Not found" })
    // Look for routine
    const routine = await prisma.routine.update({
        where: {
            id: routineId,
        },
        data: {
            // Add activity to the routine activities array
            activities: {
                connect: { id: activityId },
            },
        },
    })
    if (!routine)
        return res
            .status(404)
            .json({ message: "Routine ID not found", error: "Not found" })
    return res.status(200).json({
        acivityId: activityId,
        routineId: routineId,
        activity: activity,
        routine: routine,
    })
})

export default router
