export class TodoListService {
    constructor() {
        this.list = ['FooTask', 'BarTask', 'BazTask'];
    }

    getTasks() {
        return this.list;
    }

    addTask(taskTitle) {
        if (!~this.list.indexOf(taskTitle)) {
            this.list.push(taskTitle)
        }
    }

    removeTask(taskTitle) {
        this.list.splice(this.list.indexOf(taskTitle), 1);
    }
}