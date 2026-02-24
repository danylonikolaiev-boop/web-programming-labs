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

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}

function renderState<T>(state: FetchState<T>, renderData: (data: T) => string): string {
  if (isLoadingState(state)) {
    return "⏳ Завантаження...";
  } 
  
  if (isSuccessState(state)) {
    const time = state.loadedAt.toLocaleTimeString();
    return `✅ Завантажено о ${time}: ${renderData(state.data)}`;
  } 
  
  if (isErrorState(state)) {
    return `❌ Помилка ${state.code}: ${state.message}`;
  }

  return "Невідомий стан";
}
// функція перевірки на тип даних
function processValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "(порожнє значення)";
  }

  if (typeof value === "string") {
    return `Рядок: '${value}' (${value.length} символів)`;
  }

  if (typeof value === "number") {
    const isEven = value % 2 === 0;
    return `Число: ${value} (${isEven ? "парне" : "непарне"})`;
  }

  if (typeof value === "boolean") {
    return `Булеве: ${value ? "так" : "ні"}`;
  }

  return "Невідомий тип";
}
// функція перевірки статусу
function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo":
      return "До виконання";
    case "in_progress":
      return "В процесі";
    case "done":
      return "Виконано";
    case "cancelled":
      return "Скасовано";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}

console.log("=== Завдання 5: Type Guards та звуження типів ===");

const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { status: "success", data: [], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];

states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач`));
});

// Демонстрація processValue
const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript",
  42,
  true,
  null,
  undefined,
  0,
  "",
];
values.forEach((v) => console.log(processValue(v)));
const statuses: Status[] = ["todo", "in_progress", "done", "cancelled"];
statuses.forEach((v) => console.log(getStatusLabel(v)));