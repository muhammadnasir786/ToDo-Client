import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import TodoAction from '../store/actions/todoAction';
import Axios from 'axios';

import io from "socket.io-client";
let mapStateToProps = (state) => {
  // console.log(state.toDoReducer.todos)
  return {
    todos: state.toDoReducer.todos

  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (data) => { dispatch(TodoAction.addToDo(data)) },
    getToDos: () => { dispatch(TodoAction.getToDo()) },
    deleteToDo: (data) => { dispatch(TodoAction.deleteToDo(data)) },
    completedToDo: (data) => { dispatch(TodoAction.completedToDo(data)) },
    updateToDo: (data) => { dispatch(TodoAction.updateToDo(data)) } // { key , val }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      flage: true
    }
    this.props.getToDos();
    this.socket = io.connect('https://todo-server-app-fullstack.herokuapp.com/');


  }
  componentDidMount() {
    this.socket.on('connection', (sock) => {
      console.log(sock)
    })
    this.socket.on('GET_TODO_ADD', todo => {
      // console.log(todo, 'TODO')
      this.props.addToDo(todo);
    });
    // GET TODO DELETE
    this.socket.on('GET_TODO_DELETE', todoID => {
      // console.log(todoID, 'todoIDtodoIDtodoID')
      this.props.deleteToDo(todoID)
    });
    // COMPLETED TODO
    this.socket.on('GET_TODO_COMPLETED', todoId => {
      this.props.completedToDo(todoId)
    });
    // TODO UPADTE
    this.socket.on('GET_TODO_UPDATE', todo => {
      console.log(todo, 'TODOOOOOOO')
      this.props.updateToDo(todo)
    });
  }
  addToDo = (e) => {
    e.preventDefault();
    // this.props.addToDo({ text: this.state.todo, isDone: false })
    this.socket.emit('ADD_TODO', {
      text: this.state.todo,
      isDone: false
    })
    this.setState({ todo: '' })

  }
  render() {
    // console.log(this.props.d)


    return (
      <div className="App">
        <h1>ToDo App with React-Redux-Firebase </h1>
        <h2>Muhammad Nasir  <br />Roll No : 7240</h2>
        <div>
          <input type='text' value={this.state.todo} onChange={(e) => { this.setState({ todo: e.target.value }) }} />

          <button onClick={this.addToDo}>Add todo</button>
        </div>
        {/* <button onClick={() => {
          Axios.get('/todos').then((res) => {
            console.log(res,'res')
          })
        }}> get ToDos </button> */}
        <ol>
          {Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            console.log(val)
            return (
              <Item
                key={key}
                todo={val}
                deleteToDo={this.props.deleteToDo}
                completedToDo={this.props.completedToDo}
                index={key}
                updateToDo={this.props.updateToDo}
                socket={this.socket}
              />
            )
          })}
        </ol>
      </div>
    );
  }
}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flage: true,
      todo: this.props.todo.text
    }

  }
  toggleState = () => {
    this.setState({ flage: !this.state.flage, todo: this.props.todo.text })
  }
  completeToDo = (id) => {
    this.props.socket.emit('COMPLETED_TODO', id)
  }
  deleteToDo = (id) => {
    console.log('ClCICK DELETE')
    this.props.socket.emit('DELETE_TODO', id)
  }
  updateToDo = () => {
    let idToDo = {
      id: this.props.todo._id,
      todo: {
        text: this.state.todo,
        isDone: this.props.todo.isDone
      }
    }
    this.props.socket.emit('UPDATE_TODO', idToDo)
  }
  render() {
    return (
      <div>
        {this.state.flage ?
          <li>
            {(this.props.todo.text)}
            <button onClick={() => this.completeToDo(this.props.todo._id)}>
              {this.props.todo.isDone ? 'Complete' : 'InCompleted'}</button>
            <button onClick={() => { this.deleteToDo(this.props.todo._id) }}>DeleteToDo</button>
            <button onClick={this.toggleState}>Edit</button>
          </li> : <li>
            <input type='text' value={this.state.todo} onChange={(e) => {
              e.preventDefault();
              this.setState({ todo: e.target.value })
            }}
            />
            <button onClick={(e) => {
              e.preventDefault();
              // this.props.updateToDo({ id: this.props.todo._id, todo: this.state.todo })
              this.updateToDo({ id: this.props.todo._id, text: this.state.todo })
              this.setState({ flage: !this.state.flage })
            }}>Update</button>
          </li>}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)






