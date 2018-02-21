import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  voteForAnecdote = (anecdote) => () => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }

  filterList = () => {
    const filter = this.props.filter
    const anecdotes = this.props.anecdotes

    if (filter === '') {
      return anecdotes
    }

    let filteredAnecdotes = []
    for (let i = 0; i < anecdotes.length; i++) {
      if (anecdotes[i].content.toLowerCase().includes(filter.toLowerCase())) {
        filteredAnecdotes.push(anecdotes[i])
      }
    }

    return filteredAnecdotes
  }

  render() {
    const anecdotes = this.filterList()

    return (
      <div>
        <h2>Anecdotes</h2>
        <div>
          <Filter store = {this.props.store}/>
        </div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, setNotification, removeNotification }
)(AnecdoteList)

