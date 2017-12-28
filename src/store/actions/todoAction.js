import { startWith } from "rxjs/operators/startWith";





class ToDoAction {
    //--------------- For Epics ---------------
    static GET_TODO = 'GET_TODO'               // For Subscribe all Listiner
    
    static ADD_TODO = 'ADD_TODO'              // on firebase
    static DELETE_TODO = 'DELETE_TODO';      // //
    static COMPLETED_TODO = 'COMPLETED_TODO'// //
    static UPDATE_TODO = 'UPDATE_TODO'
    //--------------- For Reducer ---------------
    static GET_ADD_TODO = 'GET_ADD_TODO';                 // For Client REdux state
    static GET_DELETE_TODO = 'GET_DELETE_TODO'            // For Client REdux state
    static GET_COMPLETED_TODO = 'GET_COMPLETED_TODO'      // For Client REdux state
    static GET_UPDATE_TODO = 'GET_UPDATE_TODO'
    static NULL = "NULL"
    static getToDo(){
        return {
            type : ToDoAction.GET_TODO
        }
    }
    static addToDo(data){
        return {
            type : ToDoAction.ADD_TODO,
            payload : data
        }
    }
    static completedToDo(data){
        return {
            type : ToDoAction.COMPLETED_TODO,
            payload : data
        }
    }
    static deleteToDo(data){
        return {
            type : ToDoAction.DELETE_TODO,
            payload : data
        }
    }
    static updateToDo(data){
        return {
            type : ToDoAction.UPDATE_TODO,
            payload : data
        }
    } 
}
export default ToDoAction;