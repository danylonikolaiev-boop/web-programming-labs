
import { LIBRARY_NAME, books } from "./data.js";

import BookCollection from "./utils.js";

import { getBooksByGenre, getAveragePages as calcAvg, getOldestBook } from "./utils.js";

console.log("=== Завдання 5: Модулі ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг у базі:", books.length);

const dystopianBooks = getBooksByGenre(books, "Dystopian");
console.log("Антиутопії:", dystopianBooks.map(b => b.title));

console.log("Середня кількість сторінок:", calcAvg(books).toFixed(0));

const oldest = getOldestBook(books);
console.log(`Найстаріша книга: "${oldest.title}" (${oldest.year} р.)`);

const myCollection = new BookCollection(books);
myCollection.addBook({ title: "The Witcher", author: "A. Sapkowski", year: 1993, pages: 300, genre: "Fantasy" });

console.log("Кількість книг у колекції після додавання:", myCollection.count);

const sorted = myCollection.getSortedByYear();
console.log("Сортування за роком видання:", sorted.map(b => `${b.title} - ${b.year}`));