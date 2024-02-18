import express from "express"
import "dotenv/config"
// import routes
import userRoutes from "./routes/users.routes.js"
// import activityRoutes from "./routes/activities.routes.js"

const app = express()

// Middleware
app.use(express.json())
// Route mapping
app.use("/api/users", userRoutes)
app.use("/api/activities", activityRoutes)

app.listen(process.env.PORT)
console.log("Running on port", process.env.PORT)
