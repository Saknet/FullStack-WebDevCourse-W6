import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Container, Table, Message, Menu, Form, Button } from 'semantic-ui-react'
import Image from './KenSchwaber.jpg'

const NavBar = () => (
  <Menu inverted>
    <Menu.Item link>   
      <NavLink exact to = "/" activeStyle = {activeStyle} >anecdotes</NavLink>&nbsp;
    </Menu.Item>
    <Menu.Item link>
      <NavLink exact to = "/create" activeStyle = {activeStyle}>create new</NavLink>&nbsp;
    </Menu.Item>
    <Menu.Item link>
      <NavLink exact to = "/about" activeStyle = {activeStyle}>about</NavLink>&nbsp;
    </Menu.Item>
</Menu>
)

const activeStyle = {
  fontWeight: 'bold',
  backgroundColor: 'grey',
  color: 'black'
 }

const menuStyle = {
  color: 'green',
  fontWeight: 'bold',
  backgroundColor: 'lightblue',
  border: '1px solid green',
  borderRadius: '2px',
  margin: '15px',
  padding: '15px',
  fontSize: 20
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div className = "ui sizer vertical segment">
        <div className = "ui large header">{anecdote.content} {anecdote.author}</div>
      </div>
      <div className = "ui inverted segment">
        <div className = "item">
          <div className = "content">has {anecdote.votes} votes</div>
        </div>
        <div className = "item">
          <div className = "content">for more info see {anecdote.info}</div>
        </div>
      </div>
    </div>
)}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <div className = "ui sizer vertical segment">
      <div className = "ui large header">Anecdotes</div>
    </div>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => 
        <Table.Row key = {anecdote.id}>
          <Table.Cell>
          <Link to = {`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table> 
  </div>
)

const About = () => (
  <div className = "ui page grid">
    <div className = "eight wide column">
      <div className = "ui sizer vertical segment">
        <div className = "ui large header">About anecdote app</div>
      </div>

      <p>According to Wikipedia:</p>
    
      <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className = "eight wide column">
      <img src = {Image} className = "KenSchwaber" alt = "KenSchwaber"/>
    </div>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const notificationStyle = {
  color: 'green',
  fontWeight: 'bold',
  fontStyle: 'italic',
  border: '1px solid green',
  borderRadius: '8px',
  margin: '15px',
  padding: '15px',
  fontSize: 20
}

const Notification = ({ message }) => {
  if (message !== '') {
    return (
      <Message success>
        {message}
      </Message>
    )
  } else {
    return (
      <div>
        {message}
      </div>
    )   
  }
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit = {this.handleSubmit}>
          <Form.Field>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field> 
          <Button>create</Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote), 
      notification: `new anecdotes ${anecdote.content} created`
    })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
      <div>
        <Router>
          <div>
          <div className = "ui sizer vertical segment">
              <div className = "ui large header">Software anecdotes</div>
            </div>
            <NavBar />
            
            <Notification message = {this.state.notification}/>

            <Route exact path = "/" render = {() => <AnecdoteList anecdotes = {this.state.anecdotes} /> }/>
            <Route exact path = "/create" render = {() => <CreateNew addNew = {this.addNew} /> }  />
            <Route exact path = "/about" render = {() => <About />} />

            <Route exact path = "/anecdotes/:id" render = {({match}) =>
              <Anecdote anecdote = {this.anecdoteById(match.params.id)} />} 
            />

            <Route path = "/create" render = {() =>
              this.state.notification !== ''
                ? <Redirect to = "/" />
                : ""
              }/>

          </div>
        </Router>
        <Footer />
      </div>
      </Container>
    );
  }
}

export default App;
