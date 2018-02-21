import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notifications = this.props.notifications
    const notification = [...notifications].pop()

    return (
      <div style = {style}>
        {notification.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps
)(Notification)
