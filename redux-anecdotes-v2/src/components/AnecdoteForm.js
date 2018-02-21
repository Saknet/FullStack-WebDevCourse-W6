import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.setNotification(`you added anecdote: '${content}'`)
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit = {this.handleSubmit}>
          <div><input name = 'anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, setNotification, removeNotification }
)(AnecdoteForm)

