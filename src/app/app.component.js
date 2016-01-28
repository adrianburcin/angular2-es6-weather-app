import { Component, View } from 'angular2/core';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'my-app'
})
@View({
  template: `<div class="afkl-todo">
    <todo-list></todo-list>
  </div>`,
  directives: [TodoListComponent]
})
export class AppComponent {}
