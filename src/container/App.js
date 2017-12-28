import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import TodoAction from '../store/actions/todoAction';

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
    completedToDo : (data)=>{ dispatch(TodoAction.completedToDo(data))}
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ''
    }
    this.props.getToDos();

  }

  addToDo = (e) => {
    e.preventDefault();
    this.props.addToDo({ todo: this.state.todo, isCompleted: false })
    this.setState({ todo: '' })

  }
  render() {
    // console.log(this.props.d)


    return (
      <div className="App">
      <h1>ToDo App with React-Redux-Firebase </h1>
      <h2>Muhammad Nasir  <br/>Roll No : 7240</h2>
        <div>
          <input type='text' value={this.state.todo} onChange={(e) => { this.setState({ todo: e.target.value }) }} />
          <button onClick={this.addToDo}>Add todo</button>
        </div>
        <ol>
          {Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            console.log(val)
            return (
              <li key={index} >
                {val.todo}
                <button onClick={() => { this.props.deleteToDo({ key: key }) }}>DeleteToDo</button>
                <button  onClick={()=>{ this.props.completedToDo(key)}}>{val.isCompleted ? 'Complete' : 'InCompleted' }</button>
              </li>
            )
          })}
        </ol>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
