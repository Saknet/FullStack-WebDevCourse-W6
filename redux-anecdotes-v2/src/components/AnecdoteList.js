import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  voteForAnecdote = (anecdote)  => async () => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
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
  { voteAnecdote, notify }
)(AnecdoteList)

