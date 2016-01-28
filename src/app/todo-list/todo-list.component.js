import { Component, View, OnInit } from 'angular2/core';
import { NgModel } from 'angular2/common'
import { TodoListService } from './todo-list.service';

@Component({
    selector: 'todo-list',
    providers: [TodoListService]
})
@View({
    template: `<form (submit)="addTask(taskTitle)">
     <input
        type="text"
        placeholder="Todo title"
        class="afkl-todo__search-box"
        (input)="setTaskTitle($event)" />
     <button type="submit" class="afkl-todo__search-button">Add todo</button>
    </form>
    <ul class="afkl-todo__list">
      <li class="afkl-todo__list__item" *ngFor="#task of tasksList" (click)="removeTask(task)">{{ task }}</li>
    </ul>
  `,
    directives: [NgModel]
})
export class TodoListComponent implements OnInit {
    tasksList = [];
    taskTitle = '';

    constructor(todoListService:TodoListService) {
        this.todoListService = todoListService;
    }

    // Workaround for https://github.com/angular/angular/issues/6413
    setTaskTitle(event) {
        this.taskTitle = event.target.value;
    }

    addTask(taskTitle) {
        this.todoListService.addTask(taskTitle);
    }

    removeTask(taskTitle) {
        this.todoListService.removeTask(taskTitle);
    }

    ngOnInit() {
        this.tasksList = this.todoListService.getTasks();
    }
}