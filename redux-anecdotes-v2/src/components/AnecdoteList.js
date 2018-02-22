import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  voteForAnecdote = (anecdote)  => async () => {
    console.log(anecdote)
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(anecdote.id, updated)
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        <div>
          <Filter />
        </div>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key = {anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick = {this.voteForAnecdote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  let filteredAnecdotes = []
  for (let i = 0; i < anecdotes.length; i++) {
    if (anecdotes[i].content.toLowerCase().includes(filter.toLowerCase())) {
      filteredAnecdotes.push(anecdotes[i])
    }
  }

  return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, setNotification, removeNotification }
)(AnecdoteList)

