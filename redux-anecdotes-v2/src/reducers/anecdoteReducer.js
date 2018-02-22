import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data]
  }

  if (action.type === 'INIT_ANECDOTES') {

    return action.data
  }

  return state
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(anecdote.id, updated)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer