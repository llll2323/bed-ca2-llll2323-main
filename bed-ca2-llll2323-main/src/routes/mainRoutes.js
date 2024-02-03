const express = require('express');
const router = express.Router();


const taskRoutes = require('./taskRoutes')
const userRoutes = require('./userRoutes')
const taskProgressRoutes = require('./taskProgressRoutes')
const petRoutes = require('./petRoutes')
const petTaskRoutes = require('./petTaskRoutes')
const petTaskProgressRoutes = require('./petTaskProgressRoutes')

router.use('/tasks', taskRoutes)
router.use('/users', userRoutes)
router.use('/task_progress', taskProgressRoutes)
router.use('/pets', petRoutes)

module.exports = router