import clsx from "clsx";
import styles from "./TaskCard.module.css";
import  {type Task, type TaskStatus } from "../../types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export default function TaskCard(props: TaskCardProps) {

  const task = props.task;
  const onDelete = props.onDelete;
  const onStatusChange = props.onStatusChange;
  const formatter = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const formattedDate = formatter.format(task.createdAt);

  let priorityClass = "";
  if (task.priority === "low") {
    priorityClass = styles.cardLow;
  } else if (task.priority === "medium") {
    priorityClass = styles.cardMedium;
  } else if (task.priority === "high") {
    priorityClass = styles.cardHigh;
  }

  return (
    <div className={clsx(styles.card, priorityClass)}>
      <h3 className={styles.title}>{task.title}</h3>

      {task.description !== "" && (
        <p>{task.description}</p>
      )}

      <div className={styles.meta}>
        Пріоритет: {task.priority} | Створено: {formattedDate}
      </div>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={function(e) {
            onStatusChange(task.id, e.target.value as TaskStatus);
          }}
        >
          <option value="todo">До виконання (Todo)</option>
          <option value="in-progress">В процесі (In Progress)</option>
          <option value="done">Виконано (Done)</option>
        </select>

        <button onClick={function() { onDelete(task.id); }}>
          Видалити
        </button>
      </div>
    </div>
  );
}