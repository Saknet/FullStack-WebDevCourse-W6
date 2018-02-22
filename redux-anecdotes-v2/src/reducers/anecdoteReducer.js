const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    return [...state, action.content]
  }

  if (action.type === 'INIT_ANECDOTES') {

    return action.data
  }

  return state
}

const generateId = () => Number((Math.random() * 100000).toFixed(0))

export const anecdoteCreation = (content) => {
  console.log(content)
  return {
    type: 'CREATE',
    content
  }
}
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const  anecdoteInitialization = (data) => {
  console.log(data)
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer