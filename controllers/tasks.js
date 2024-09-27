const Task = require('../models/Task.js')

// { /api/v1/tasks }
//GET
const getAllTasks = async (req, res) => {
    try {
        var tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(err)
    }
}
//POST
const createTask = async (req, res) => {
    //try Handle error for incorrect post
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

//URL parameter name: id
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        //Find one entry with the same _id 
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: 'Task not exist' })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: 'Task not exist' })
        }
        res.status(200).json({ msg: `deleted ${task}` })
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' })
    }
}

const updateTask = async (req, res) => {
    try {
        const taskID = req.params.id
        const task = await Task.findOneAndUpdate(
            { _id: taskID },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!task) {
            return res.status(404).json({ msg: 'Task not exist' })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}