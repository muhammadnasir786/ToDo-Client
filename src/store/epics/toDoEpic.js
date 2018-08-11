
import { Observable } from 'rxjs'
import ToDoAction from "../actions/todoAction";
import { api } from "../../services/api";
import io from "socket.io-client";
let socket = io('/');
export default class ToDoEpic {
    static addToDo = (action$) =>
        action$.ofType(ToDoAction.ADD_TODO)
            .switchMap(({ payload }) => {
                return api.addToDo(payload)
                    .switchMap(({ response }) => {
                        console.log(response, 'ADd ToDo')
                        return (
                            Observable.of({
                                type: null
                            })
                        )
                    }).catch((error) => {
                        return Observable.of({
                            type: null,
                        });
                    })
            })

    static getToDos = (action$) =>
        action$.ofType(ToDoAction.GET_TODO)
            .switchMap(({ payload }) => {
                return api.getToDos()
                    .switchMap(({ response }) => {
                        console.log(response, 'responce')
                        return (
                            Observable.of({
                                type: ToDoAction.GET_TODOS_ADD,
                                payload: response.allToDos
                            })
                        )
                    }).catch((error) => {
                        return Observable.of({
                            type: null
                        });
                    })
            })


    // static listnerGetToDos = (action$) => {
    //     return action$.ofType()
    //         .switchMap(({ payload }) => {
    //             return Observable.fromPromise(

    //             )
    //                 .map((x) => {
    //                     return { type: ToDoAction.NULL }
    //                 })
    //         })

    // }

    static deleteToDo = (action$) => {
        return action$.ofType(ToDoAction.DELETE_TODO)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(

                )
                    .map((x) => {
                        return { type: ToDoAction.NULL }
                    })
            })

    }

    // static addToDo = (action$) => {
    //     return action$.ofType(ToDoAction.ADD_TODO)
    //         .switchMap(({ payload }) => {
    //             console.log(payload)
    //             return Observable.fromPromise(
    //                 socket.emit('ADD_TODO', {
    //                     text: payload,
    //                     isDone: false
    //                 })
    //             )
    //                 .map((x) => {
    //                     return { type: ToDoAction.NULL }
    //                 })
    //         })

    // }
    static completedToDo = (action$) => {
        return action$.ofType(ToDoAction.COMPLETED_TODO)
            .switchMap(({ payload }) => {
                console.log(payload)
                return Observable.fromPromise(

                )
                    .map((x) => {
                        return { type: ToDoAction.NULL }
                    })
            })
    }
    static updateToDo = (action$) => {
        return action$.ofType(ToDoAction.UPDATE_TODO)
            .switchMap(({ payload }) => {
                console.log(payload)
                return Observable.fromPromise(

                )
                    .map((x) => {
                        return { type: ToDoAction.NULL }
                    })
            })
    }


    static getTodos = (action$) => {
        console.log(action$,'actions$$$$$')
        return action$.ofType(ToDoAction.GET_TODO)
            .switchMap(({ payload }) => {
                return new Observable((observer) => {
                    socket.on('GET_TODO_ADD', todo => {
                        console.log(todo , 'GET TODO ADD')
                        observer.next({
                            type: ToDoAction.GET_ADD_TODO,
                            payload: todo
                        })
                    });
                    // // GET TODO DELETE
                    // socket.on('GET_TODO_DELETE', todoID => {
                    //     let todos = this.state.todos;
                    //     todos = todos.filter(todo => todo._id !== todoID);
                    //     this.setState({ todos: todos })
                    // });
                    // // COMPLETED TODO
                    // socket.on('GET_TODO_COMPLETED', todoId => {
                    //     let todos = this.state.todos;
                    //     let todoObj = todos.find((todo) => todo._id === todoId).isDone = true;
                    //     this.setState({ todos: todos })
                    // });
                    // // TODO UPADTE
                    // socket.on('GET_TODO_UPDATE', todoo => {
                    //     // console.log(todo)
                    //     let todos = this.state.todos;
                    //     let todoObj = todos.find((todo) => todo._id === todoo._id);
                    //     todoObj.text = todoo.text;
                    //     todoObj.isDone = todoo.isDone;
                    //     console.log(todoObj)
                    //     this.setState({ todos: todos })
                    // });

                })
            })
    }
}



