/**
 * ACTION TYPES
 */
const SET_DINOSAUR = 'SET_DINOSAUR'

/**
 * INITIAL STATE
 */
const defaultDinosaur = ''

/**
 * ACTION CREATORS
 */
export const setDinosaur = (dinosaur) => ({type: SET_DINOSAUR, dinosaur})

/**
 * REDUCER
 */
export default function (state = defaultDinosaur, action) {
  switch (action.type) {
    case SET_DINOSAUR:
      return action.dinosaur
    default:
      return state
  }
}
