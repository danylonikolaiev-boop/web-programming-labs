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

interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

function getTaskStats(tasks: Task[]){
  let stats = {
    total: tasks.length, // загальна кількість дорівнює довжині масиву
    byStatus: {
      todo: 0,
      in_progress: 0,
      done: 0,
      cancelled: 0,
    },
    overdue: 0,
  };

  let now = new Date(); // сьогодняшня дата
  // перебирає завдання з масиву
  for (let task of tasks) {
    // додає до 1 до статусу який вказано у завданні
    stats.byStatus[task.status]++;

    // рахуємо протерміновані задачі
    let isFinished = task.status === "done" || task.status === "cancelled";
    
    // якщо дедлайн є, і він менший за сьогодняшню дату, і задача не завершена/скасована
    if (task.dueDate !== null && task.dueDate < now && isFinished === false) {
      stats.overdue += 1;
    }
  }
  return stats;
}

function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

// масив завдань
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Налаштувати CI/CD",
    description: "Налаштувати пайплайни для GitHub Actions",
    status: "in_progress",
    priority: "high",
    assignee: "Олексій",
    createdAt: new Date("2024-01-01"),
    dueDate: new Date("2024-02-15"),
  },
  {
    id: 2,
    title: "Розробити дизайн",
    description: "Створити макети в Figma",
    status: "done",
    priority: "medium",
    assignee: "Марія",
    createdAt: new Date("2024-01-05"),
    dueDate: new Date("2024-01-20"),
  },
  {
    id: 3,
    title: "Виправити баг авторизації",
    description: "Користувачі не можуть увійти через Google",
    status: "todo",
    priority: "critical",
    assignee: null,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 86400000),
  },
  {
    id: 4,
    title: "Написати документацію",
    description: "Описати API для фронтенду",
    status: "cancelled",
    priority: "low",
    assignee: "Іван",
    createdAt: new Date("2024-02-01"),
    dueDate: new Date("2024-02-10"),
  },
  {
    id: 5,
    title: "Провести рев'ю коду",
    description: "Перевірити ПР №42",
    status: "todo",
    priority: "medium",
    assignee: "Дмитро",
    createdAt: new Date(),
    dueDate: new Date("2024-01-10"),
  },
];

console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");

console.log("\nСтатистика:");
let statsResult = getTaskStats(mockTasks);
console.log(statsResult);

console.log("\nСписок задач:");
for (let task of mockTasks) {
  console.log(formatTask(task));
}