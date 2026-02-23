export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null; // null, якщо задача не призначена
  createdAt: Date;
  dueDate: Date | null;
}

class TaskManager{
    #tasks: Task[];
    #nextId: number = 1;

    constructor(initialTasks: Task[] = []) { // конструктор для ініціалізації
        this.#tasks = [...initialTasks]; 
    
        for (let task of initialTasks) { // визначення id 
            if (task.id >= this.#nextId) {
                this.#nextId = task.id + 1;
            }
        }
    }
    addTask(dto: Omit<Task, "id" | "createdAt">): Task {
        const newTask: Task = {
        ...dto, // усі значення task окрім id та createdAt
        id: this.#nextId,  // присвоює id
        createdAt: new Date() // сьогоднішня дата
        };
    
        this.#tasks.push(newTask); 
        this.#nextId++; 
    
        return newTask; // повертає нову задачу
    }

    updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {

        const taskIndex = this.#tasks.findIndex(task => task.id === id);
    
        if (taskIndex === -1) {
        return null; 
        }

        this.#tasks[taskIndex] = { ...this.#tasks[taskIndex], ...updates };
        return this.#tasks[taskIndex];
    }

    deleteTask(id: number): boolean {
        const initialCount = this.#tasks.length;

        this.#tasks = this.#tasks.filter(task => task.id !== id); // фільтрує всі задачі, крім тієї, яку треба видалити
    

        return this.#tasks.length < initialCount; // повертає true, якщо задача була видалена
    }


    get tasks(): Task[] {
        return [...this.#tasks];
    }

    get count(): number {
        return this.#tasks.length;
    }

    getById(id: number): Task | undefined { // Пошук задачі за ID
        return this.#tasks.find(task => task.id === id);
    }

}
class FilteredTaskManager extends TaskManager {
    
    getByStatus(status: Status): Task[] { // повертає задачі за статусом
        return this.tasks.filter(task => task.status === status);
    }

    getByPriority(priority: Priority): Task[] { // повертає задачі за пріоритетом
        return this.tasks.filter(task => task.priority === priority);
    }

    getByAssignee(assignee: string): Task[] { // повертає задачі за виконавцем
        return this.tasks.filter(task => task.assignee === assignee);
    }

    getOverdue(): Task[] { // повертає всі прострочені задачі
        const now = new Date();
        return this.tasks.filter(task => {
        const isFinished = task.status === "done" || task.status === "cancelled";
        return task.dueDate !== null && task.dueDate < now && !isFinished;
        });
    } 
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"), 
});
console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

const task2 = manager.addTask({
  title: "Написати тести",
  description: "Покрити код тестами",
  status: "todo",
  priority: "medium",
  assignee: "Анна",
  dueDate: new Date(Date.now() + 86400000), 
});
console.log("Додано:", task2);
console.log("Кількість задач:", manager.count);

const task3 = manager.addTask({
  title: "Оновити дизайн",
  description: "Змінити кольори кнопок",
  status: "todo",
  priority: "low",
  assignee: null,
  dueDate: null, 
});
console.log("Додано:", task3);
console.log("Кількість задач:", manager.count);

const task4 = manager.addTask({
  title: "Полагодити баг",
  description: "Не працює кнопка виходу",
  status: "done",
  priority: "critical",
  assignee: "Іван",
  dueDate: new Date("2024-01-01"), 
});
console.log("Додано:", task4);
console.log("Кількість задач:", manager.count);

manager.updateTask(task2.id, { status: "in_progress", priority: "high" });
console.log("Оновлена задача #2:", manager.getById(task2.id));

const ivanTasks = manager.getByAssignee("Іван");
console.log("Задачі Івана:", ivanTasks.map(t => t.title));

const inProgressTasks = manager.getByStatus("in_progress");
console.log("Задачі в процесі:", inProgressTasks.map(t => t.title));

const overdueTasks = manager.getOverdue();
console.log("Протерміновані задачі:", overdueTasks.map(t => t.title));

const isDeleted = manager.deleteTask(task3.id);
console.log(`Задачу #3 видалено успішно? ${isDeleted}`);
console.log("Поточна кількість задач:", manager.count);