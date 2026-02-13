import { VARIANT } from "./config.js";

const products = [
  {
    id: 1,
    name: "Ноутбук",
    price: 25000 + VARIANT * 100,
    category: "electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Навушники",
    price: 2500 + VARIANT * 10,
    category: "electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Футболка",
    price: 800 + VARIANT * 5,
    category: "clothing",
    inStock: false,
  },
  {
    id: 4,
    name: "Книга 'JavaScript'",
    price: 450 + VARIANT * 3,
    category: "books",
    inStock: true,
  },
  {
    id: 5,
    name: "Рюкзак",
    price: 1500 + VARIANT * 8,
    category: "accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "Клавіатура",
    price: 3200 + VARIANT * 15,
    category: "electronics",
    inStock: false,
  },
  {
    id: 7,
    name: "Кросівки",
    price: 4200 + VARIANT * 20,
    category: "clothing",
    inStock: true,
  },
  {
    id: 8,
    name: "Книга 'TypeScript'",
    price: 520 + VARIANT * 4,
    category: "books",
    inStock: true,
  },
  {
    id: 9,
    name: "Чохол для телефону",
    price: 350 + VARIANT * 2,
    category: "accessories",
    inStock: true,
  },
  {
    id: 10,
    name: "Монітор",
    price: 12000 + VARIANT * 50,
    category: "electronics",
    inStock: true,
  },
];
function getAvailableProducts(products){
    let available = products.filter(products => products.inStock === true);
    let avb = available.map(available => available.name)
    return avb;
}
function getProductsByCategory(products, category){
    const filtered = products.filter(products => products.category === category);
    const sorted = filtered.sort((a, b) =>  a.price - b.price);
    return sorted;
}
function getTotalPrice(products){
    const available = products.filter(products => products.inStock === true);
    const sum = available.reduce((total, product) => total + product.price , 0);
    return sum;
}
function getProductsSummary(products) {

  return products.reduce(function(acc, product) {

    const categorys = product.category;
    acc[categorys] = { count: 0, totalPrice: 0 };
    
    acc[categorys].count = acc[categorys].count + 1;

    acc[categorys].totalPrice = acc[categorys].totalPrice + product.price; return acc;}, {});
}

console.log("=== Завдання 2: Методи масивів ===");
console.log("Варіант:", VARIANT);
console.log("2.1:", getAvailableProducts(products));
console.log("2.2:", getProductsByCategory(products, "electronics"));
console.log("2.3:", getTotalPrice(products));
console.log("2.4:", getProductsSummary(products));

