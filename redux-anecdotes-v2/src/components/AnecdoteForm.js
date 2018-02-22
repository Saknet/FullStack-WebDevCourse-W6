import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    if (content !== '') {
      this.props.anecdoteCreation(content)
      this.props.notify(`you added anecdote: '${content}'`, 5)
    } else {
      this.props.notify('Did you forget to type the anecdote?', 5)
    }
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit = {this.addAnecdote}>
          <div><input name = 'anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, notify }
)(AnecdoteForm)

