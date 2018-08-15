
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
        case ToDoAction.ADD_TODO:
            let Alltodos = [].concat(state.todos);
            Alltodos.push(action.payload);
            return ({ ...state, todos: Alltodos })
            break;
        case ToDoAction.DELETE_TODO:
            console.log(action.payload, '')
            let Alltodoss = [].concat(state.todos);
            Alltodoss = Alltodoss.filter((todo) => todo._id !== action.payload);
            return { ...state, todos: Alltodoss }
        case ToDoAction.COMPLETED_TODO:
            console.log(action.payload, 'ACTION')
            let todos = [].concat(state.todos);
            todos.find((todo) => todo._id == action.payload).isDone = true;
            console.log(todos, '----------')
            return { ...state, todos: todos }
        case ToDoAction.UPDATE_TODO:
            console.log(action.payload, 'ACTION')
            let todoss = [].concat(state.todos);
            let obj = todoss.find((todo) => todo._id == action.payload._id);
            console.log(obj, 'FIND OBj')
            obj.text = action.payload.text;
            obj.isDone = action.payload.isDone;
            return { ...state, todos: todoss }
        default:
            return state;
            break;
    }

}

export default toDoReducer;