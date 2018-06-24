import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TASKS = 'GET_TASKS'
const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'

/**
 * INITIAL STATE
 */
const defaultList = []

/**
 * ACTION CREATORS
 */
const getTasks = (tasks) => ({type: GET_TASKS, tasks})
const postTask = (task) => ({type: ADD_TASK, task})
const deleteTask = (task) => ({type: REMOVE_TASK, task})


//THUNKS
export const fetchTasks = () => async (dispatch) => {
  try {
    const toDoList = await axios.get('/api/todolist')
    dispatch(getTasks(toDoList.data))
    return toDoList
  }
  catch (err) {
    console.log(err)
  }
}

export const removeTask = (removedTask) => async (dispatch) => {
  try {
    dispatch(deleteTask(removedTask))

    const toDoList = await axios.delete('/api/todolist', {data: {task: removedTask}})
    return toDoList
  }
  catch (err) {
    console.log(err)
  }
}

export const addTask = (newTask) => async (dispatch) => {
  try {
    const toDoList = await axios.post('/api/todolist', {task: newTask})
    dispatch(postTask(toDoList.data))
    return toDoList
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultList, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks
    case ADD_TASK:
      return state.concat(action.task)
    case REMOVE_TASK:
      return state.filter((task) => {
        return task.task.toLowerCase() !== action.task.toLowerCase()
      })
    default:
      return state
  }
}
