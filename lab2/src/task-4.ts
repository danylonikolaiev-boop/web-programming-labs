export {};

abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  // Абстрактний метод — нащадки зобов'язані реалізувати
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод — спільна логіка для всіх нащадків
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}

class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    super("Email"); // викликає конструктор у BaseNotifier і передає йому "Email"
  }
    
  send(to: string, subject: string, body: string): void {
    const shortBody = body.substring(0, 50);//  substring обрізає рядок від 0 до 50 символу
    console.log(`📧 Email → [${to}]: "${subject}" | Тіло: ${shortBody}... через [${this.smtpServer}]`);
  }
}

class SmsNotifier extends BaseNotifier{
  constructor(private readonly phonePrefix: string = "+380"){ // задає значення за замовчуванням: "+380", якщо нічого не передадуть
    super("SMS");
  }

  send(to: string, subject: string, body: string): void {
    const shortBody = body.substring(0, 160);
    console.log(`📱 SMS → [${this.phonePrefix} ${to}]: "${shortBody}..."`);
  }
}

function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
  for (const notifier of notifiers) {
    // TypeScript сам зрозуміє, чи це Email, чи SMS, і викличе правильний send()
    notifier.notify(to, subject, body);
    console.log("---------------------------------------------------");
  }
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

// Параметр to — рядок-адресат; його формат залежить від каналу
sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);