const getNewTaskInfo = (transcriptArr, index) => {

  let modifierIndex,
    endingIndex

  modifierIndex = transcriptArr.indexOf('add')
  endingIndex = transcriptArr[index - 1] === 'to-do' ? index - 3 : index - 4

  let newTask = transcriptArr.slice(modifierIndex + 1, endingIndex).join(' ')

  return {
    response: `You have just added ${newTask} to your to-do list`,
    action: 'add',
    task: newTask
  }
}

const getRemovedTaskInfo = (transcriptArr, index) => {

  let modifierIndex,
    endingIndex

  modifierIndex = transcriptArr.indexOf('remove')

  if (modifierIndex === -1) {
    modifierIndex = transcriptArr.includes('delete')
  }

  endingIndex = transcriptArr[index - 1] === 'to-do' ? index - 3 : index - 4

  let removedTask = transcriptArr.slice(modifierIndex + 1, endingIndex).join(' ')

  return {
    response: `You have just removed ${removedTask} from your to-do list`,
    action: 'remove',
    task: removedTask
  }
}

const getListInfo = (toDoList) => {

  let list = toDoList.map((task) => task.task)
  list = list.join(', ')

  if (toDoList.length > 1) {
    let lastIndex = list.lastIndexOf(',')
    list = list.substring(0, lastIndex) + ' and ' + list.substring(lastIndex + 1)
  }

  return {
    response: `There are ${toDoList.length} things on your to do list. You should ${list}`,
    action: 'list',
    task: null
  }
}

const determineListAction = (transcriptArr, index, toDoList) => {
  let actionObj

  if (transcriptArr.includes('add')){
    actionObj = getNewTaskInfo(transcriptArr, index)
  } else if (transcriptArr.includes('remove') || transcriptArr.includes('delete')) {
    actionObj = getRemovedTaskInfo(transcriptArr, index)
  } else {
    actionObj = getListInfo(toDoList)
  }

  return actionObj
}


const checkForList = (transcriptArr, toDoList) => {

  if (transcriptArr.includes('list')) {
    let index = transcriptArr.indexOf('list')
    if ((transcriptArr[index - 2] === 'to' && transcriptArr[index - 1] === 'do') || transcriptArr[index - 1] === 'to-do') {
      return determineListAction(transcriptArr, index, toDoList)
    }
  }

  return null
}

export default checkForList
