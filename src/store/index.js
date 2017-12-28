import { createStore , combineReducers , applyMiddleware } from 'redux'
import { combineEpics , createEpicMiddleware } from 'redux-observable'

import toDoReducer from './reducers/todoReducer'
import ToDoEpic from './epics/toDoEpic';

    const rootEpic = combineEpics(
        ToDoEpic.addToDo,
        ToDoEpic.getTodos,
        ToDoEpic.deleteToDo,
        ToDoEpic.completedToDo
    )
    const rootReducer = combineReducers({
        toDoReducer
    })
    const epicMiddleware  = createEpicMiddleware(rootEpic);
    const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
    let store = createStoreWithMiddleware(rootReducer);
    store.subscribe(()=>{
       console.log(store.getState());
    });
    export default store;