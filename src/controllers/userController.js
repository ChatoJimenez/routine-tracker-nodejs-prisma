import { prisma } from "../config/connection.js"

// Sorting format
// orderBy: { field: 'asc' || 'desc' } ||
// for multiple fields --> orderBy: [ { field1: 'asc' || 'desc' }, { field2: 'asc' || 'desc' } ]
// for optional fields --> orderBy : { field: { sort: 'asc' || 'desc', nulls: 'last' || 'first' } }

// Filtering format
// where : { condition: value }
// Conditions
// * endsWith | startsWith
// * equals | not -> same as field: value | !equals
// * in: [] | notIn: []
// * lt | gt -> less than | greater than
// * lte | gte -> less than or equal | greater than or equal
// ** insensitive -> case insensitive
// AND | OR | NOT

// Get all users
const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        // TODO: Define filter and query params config
        // include: {
        //     routines: true,
        //     activities: true,
        // },
    })
    res.json(users)
}

// Get single user by id
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findFirst({
        where: {
            id: id,
        },
    })

    if (!user) {
        console.log("User not found")
        return res.status(404).json({
            message: `No user with id: ${id} was found`,
            error: "User not found",
        })
    }

    res.status(200).json({ message: "User found", data: user })
}

// Create user
const createUser = async (req, res) => {
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
}

// Update single user by id
const updateUserById = async (req, res) => {
    const { id } = req.params
    let updatedUser
    try {
        updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: req.body,
        })
    } catch (error) {
        // Not found
        if (error.code === "P2025") {
            console.log("User not found")
            return res.status(404).json({
                message: `No user with id: ${id} was found`,
                error: "User not found",
            })
        }
        if (error.code === "P2002")
            return res
                .status(400)
                .json({ message: "Email already used", error: "Invalid data" })
        // Unknown
        console.log(error.code)
        return res.status(500).json({
            message: error.message,
            error: "Unexpected error occurred",
        })
    }
    // Success
    res.status(200).json({ message: "User updated", data: updatedUser })
}

// Assign or remove role from user
const updateUserRole = async (req, res) => {
    const { id, action } = req.params
    const { name: roleName } = req.body
    const isAssignation = action === "assign"

    // Update user
    let updatedUser
    try {
        updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                role: isAssignation ? roleName : null,
            },
        })
    } catch (error) {
        // Role not found
        if (error.code === "P2003") {
            console.log("Role not found")
            return res.status(404).json({
                message: `No \'${roleName}\' role was found`,
                error: "Role not found",
            })
        }
        // User not found
        if (error.code === "P2025") {
            console.log("User not found")
            return res.status(404).json({
                message: `No user with id: ${id} was found`,
                error: "User not found",
            })
        }
        // Unknown
        console.log(error.code)
        return res.status(500).json({
            message: error.message,
            error: "Unexpected error occurred",
        })
    }

    res.status(200).json({
        message: `Role ${action}ed ${isAssignation ? "to" : "from"} user.`,
        action: action,
        data: {
            role: isAssignation ? roleName : null,
            user: updatedUser,
        },
    })
}

// Delete single user by id
const deleteUserById = async (req, res) => {
    const { id } = req.params
    let deletedUser
    try {
        deletedUser = await prisma.user.delete({
            where: {
                id: id,
            },
        })
    } catch (error) {
        // Not found
        if (error.code === "P2025") {
            console.log("User not found")
            return res.status(404).json({
                message: `No user with id: ${id} was found`,
                error: "User not found",
            })
        }
        // Unknown
        return res.status(500).json({
            message: error.message,
            error: "Unexpected error occurred",
        })
    }
    // Success
    res.status(200).json({ message: "User deleted", data: deletedUser })
}

export {
    getUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUserRole,
}
