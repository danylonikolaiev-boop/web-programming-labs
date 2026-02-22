import { VARIANT } from "./config";

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

interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

function createSuccessResponse<T>(data: T): ApiResponse<T>{
    return {
    data: data,
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };
}

function createErrorResponse<T>(message: string): ApiResponse<T | null> {
    return {
    data: null,
    status: 500,
    message: message,
    timestamp: new Date(),
  };
}

// DTO для створення задачі без id та createdAt
type CreateTaskDto = Omit<Task, "id" | "createdAt">;
// DTO для оновлення задачі (всі поля необовʼязкові)
type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;

// приймає масив, назву властивості, за якою виконується фільтрація та значення за яким фільтруєця масив
function filterTasks<K extends keyof Task>(tasks: Task[], key: K, value: Task[K]): Task[]{
    let filteredList: Task[] = [];
  
    for (let task of tasks) {
        if (task[key] === value) {
            filteredList.push(task);
        }
    }
  
  return filteredList;
}

console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);


const success = createSuccessResponse(tasks[0]); 
console.log(success);

const error = createErrorResponse<Task>("Не вдалося знайти задачу"); 
console.log(error);

const newTask: CreateTaskDto = {
  title: "Вивчити Generics",
  description: "Розібратися з літерою T",
  status: "todo",
  priority: "high",
  assignee: "Я",
  dueDate: null
};
console.log(newTask);

const updateData: UpdateTaskDto = {
  status: "done"
};
console.log(updateData);


const doneTasks = filterTasks(tasks, "status", "done"); 
console.log(doneTasks.map(t => t.title));

const mediumPriorityTasks = filterTasks(tasks, "priority", "medium");
console.log(mediumPriorityTasks.map(t => t.title));