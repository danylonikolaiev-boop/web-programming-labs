export function getBooksByGenre(books, genre) {
  return books.filter(book => book.genre === genre);
}

export function getAveragePages(books) {
  if (books.length === 0) return 0;
  const total = books.reduce((sum, book) => sum + book.pages, 0);
  return total / books.length;
}

export function getOldestBook(books) {
  return books.reduce((oldest, current) => (current.year < oldest.year ? current : oldest));
}

export default class BookCollection {
  constructor(books = []) {
    this.books = [...books];
  }
  
  getSortedByYear() {
    return [...this.books].sort((a, b) => a.year - b.year);
  }

  addBook(book) {
    this.books.push(book);
  }

  get count() {
    return this.books.length;
  }
}