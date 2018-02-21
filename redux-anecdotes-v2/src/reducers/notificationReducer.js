const notificationsAtStart = [
  ''
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (notification) => {
  return {
    notification: notification,
    id: getId()
  }
}

const initialState = notificationsAtStart.map(asObject)

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return [...state, { notification: action.notification, id: getId() }]
  case 'REMOVE_NOTIFICATION':
    return state = initialState
  default:
    return state
  }
}

const generateId = () => Number((Math.random() * 100000).toFixed(0))

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
    id: generateId()
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer