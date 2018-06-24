const router = require('express').Router()
const asyncHandler = require('express-async-handler'),
  { ToDo } = require('../db/models')

module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  const toDoList = await ToDo.findAll()
  res.json(toDoList)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const toDoList = await ToDo.create(req.body)
  res.json(toDoList)
}))

router.delete('/', asyncHandler(async (req, res, next) => {
  const toDoList = await ToDo.destroy({
    where: {
      task: req.body.task
    }
  })
  res.json(toDoList)
}))
