import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Створити wireframes для головної сторінки",
    description: "Розробити чорнові ескізи структури головної сторінки нового інтернет-магазину в Figma для узгодження з клієнтом.",
    status: "done",
    priority: "high",
    createdAt: new Date("2025-02-25")
  },
  {
    id: "2",
    title: "Розробка UI-кіта (UI Kit)",
    description: "Підібрати кольорову палітру, типографіку та створити базові компоненти (кнопки, інпути, картки товарів).",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2025-03-01")
  },
  {
    id: "3",
    title: "А/В тестування кнопок CTA",
    description: "Підготувати два варіанти дизайну кнопок Call-to-Action (різні кольори та розміщення) для перевірки конверсії.",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2025-03-10")
  },
  {
    id: "4",
    title: "Аудит доступності (Accessibility)",
    description: "Перевірити контрастність кольорів у макетах відповідно до стандартів WCAG та підготувати рекомендації для розробників.",
    status: "todo",
    priority: "low",
    createdAt: new Date("2025-03-12")
  },
  {
    id: "5",
    title: "Прототипування мікроінтеракцій",
    description: "Створити інтерактивний прототип ховер-ефектів та анімацій завантаження для покращення користувацького досвіду (UX).",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-03-14")
  }
];