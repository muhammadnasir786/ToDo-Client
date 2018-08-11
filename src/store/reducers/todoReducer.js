
import ToDoAction from "../actions/todoAction";

let INITIAL_STATE = {
    todos: {}
}
function toDoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ToDoAction.GET_TODOS_ADD:
            console.log(action.payload)
            // let newToDo = Object.assign({}, state.todos);
            // newToDo[action.payload.key] = action.payload.val;

            return ({ ...state, todos: action.payload })
        case ToDoAction.GET_ADD_TODO:
            console.log(action.payload,"action")
            let newToDo = Object.assign({}, state.todos);
            newToDo[action.payload.key] = action.payload.val;
            return ({ ...state, todos: newToDo })
            break;
        case ToDoAction.DELETE_TODO:
            let newToDos = Object.assign({}, state.todos);
            // console.log(action.payload.key)
            delete newToDos[action.payload.key];
            return { ...state, todos: newToDos }
        case ToDoAction.GET_COMPLETED_TODO:
            let newToDoss = Object.assign({}, state.todos);
            // console.log(action)
            newToDoss[action.payload.key] = action.payload.val;
            return { ...state, todos: newToDoss }
        default:
            return state;
            break;
    }

}

export default toDoReducer;