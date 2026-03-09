import TaskCard from "../TaskCard/TaskCard";
import type { Task, TaskStatus } from "../../types/task";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export default function TaskList(props: TaskListProps) {
  if (props.tasks.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        Задач немає
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {props.tasks.map(function(task) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={props.onDelete}
            onStatusChange={props.onStatusChange}
          />
        );
      })}
    </div>
  );
}