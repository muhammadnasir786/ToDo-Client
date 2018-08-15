
import { Observable } from 'rxjs'
import ToDoAction from "../actions/todoAction";
import { api } from "../../services/api";
import io from "socket.io-client";
let socket = io('/');
export default class ToDoEpic {
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


   


}



