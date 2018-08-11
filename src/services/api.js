import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';

export class api {
    static addToDo(todo) {
        return Observable.ajax({
            url: "/todo/add",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: todo,
            async: true,
            crossDomain: false,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }
    static getToDos() {
        return Observable.ajax({
            url: "/todos",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            async: true,
            crossDomain: false,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }
    static updateToDo(newText, todoId, isDone) {
        return Observable.ajax({
            url: `/todos/put/${todoId}`,
            method: 'PUT',
            body: { text: newText, isDone: isDone },
            async: true,
            crossDomain: false,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }
    static deleteToDo(todoId) {
        return Observable.ajax({
            url: `/todos/del/${todoId}`,
            method: 'DELETE',
            async: true,
            crossDomain: false,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }

    //we can add more apis here
}