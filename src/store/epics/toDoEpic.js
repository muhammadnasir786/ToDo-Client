
import { Observable } from 'rxjs'
import  ToDoAction from "../actions/todoAction";

import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDqPpxlIGjEikoqzvZqB7_-10158KdfxOs",
    authDomain: "reactreduxtodoappfirebase.firebaseapp.com",
    databaseURL: "https://reactreduxtodoappfirebase.firebaseio.com",
    projectId: "reactreduxtodoappfirebase",
    storageBucket: "",
    messagingSenderId: "866095779438"
  };
firebase.initializeApp(config);
  
let ref = firebase.database().ref('/todo');
// ref.push({name:'yasir'});

export default class ToDoEpic {
    static addToDo = (action$)=>{
      return  action$.ofType(ToDoAction.ADD_TODO)
            .switchMap(({ payload })=>{
                return Observable.fromPromise(ref.push(payload))
                .map((x)=>{
                    return { type : ToDoAction.NULL}
                })
            })
    }

    static deleteToDo = (action$)=>{
        return action$.ofType(ToDoAction.DELETE_TODO)
            .switchMap(({ payload })=>{
                return Observable.fromPromise(ref.child(payload.key).set(null))
                .map((x)=>{
                    return { type : ToDoAction.NULL}
                })
            })

    }
    static completedToDo = (action$)=>{
        return action$.ofType(ToDoAction.COMPLETED_TODO)
        .switchMap(({payload })=>{
            console.log(payload)
            return Observable.fromPromise(ref.child(`${payload}/isCompleted`).set(true))
            .map((x)=>{
                return { type : ToDoAction.NULL}
            })
        })
    }
    static updateToDo = (action$)=>{
        return action$.ofType(ToDoAction.UPDATE_TODO)
        .switchMap(({payload })=>{
            console.log(payload)
            return Observable.fromPromise(ref.child(`${payload.key}/todo`).set(`${payload.val}`))
            .map((x)=>{
                return { type : ToDoAction.NULL}
            })
        })
    }


    static getTodos = (action$)=>{
       
        return action$.ofType(ToDoAction.GET_TODO)
            .switchMap(({ payload })=>{
                return new Observable((observer)=>{
                    ref.on('child_added',(s)=>{
                        observer.next({
                            type: ToDoAction.GET_ADD_TODO,
                            payload : {
                                key : s.key,
                                val : s.val()
                            }
                        })
                    })
                    ref.on('child_removed',(s)=>{
                        console.log(s.val(),s.key)
                        observer.next({
                            type : ToDoAction.GET_DELETE_TODO,
                            payload : s.key
                        })
                    })
                    ref.on('child_changed',(s)=>{
                        console.log(s.val(),s.key)
                        observer.next({
                            type : ToDoAction.GET_COMPLETED_TODO,
                            payload : {
                                key : s.key,
                                val : s.val()
                            }
                        })
                    })
                    
                })
            })
    }
}



