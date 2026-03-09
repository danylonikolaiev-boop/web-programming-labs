// src/App.tsx

import React from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskForm, { type TaskFormData } from "./components/TaskForm/TaskForm"; // Додали імпорт
import type { Task } from "./types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Вивчити React",
    description: "Зробити лабораторну роботу №3",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(),
  }
];

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Мої задачі</h1>
      
      {/* Додаємо форму на сторінку */}
      <TaskForm 
        onSubmit={function(data: TaskFormData) {
          console.log("Нова задача з форми:", data);
        }} 
      />

      <TaskList
        tasks={mockTasks}
        onDelete={function(id) { console.log("Видаляємо:", id); }}
        onStatusChange={function(id, status) { console.log("Змінюємо статус:", id, status); }}
      />
    </div>
  );
}