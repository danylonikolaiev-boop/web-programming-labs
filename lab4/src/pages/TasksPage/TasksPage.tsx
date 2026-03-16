import TaskCard from "../../components/TaskCard/TaskCard";
import type { Task } from "../../types/task";

interface TasksPageProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

export default function TasksPage({ tasks, onDelete }: TasksPageProps) {
  return (
    <div>
      <h2>📋 Задачі ({tasks.length})</h2>

      {tasks.length === 0 && (
        <p>Задач поки немає. Створіть першу!</p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginTop: "1rem",
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}