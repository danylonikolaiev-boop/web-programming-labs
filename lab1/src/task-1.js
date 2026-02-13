function getFullName(user) {
  const { firstName, lastName, middleName = "" } = user;

  const initial1 = firstName[0] + "."; 
  
  if (middleName) {
    const initial2 = middleName[0] + ".";
    return `${lastName} ${initial1} ${initial2}`;
  } else {
    return `${lastName} ${initial1}`;
  }
}

function mergeObjects(...objects){
  const result = {};
  for (let obj of objects) {
    Object.assign(result, obj); 
  }
  return result;
}

function removeDuplicates(...arrays) {
  let combinedArray = [];
  for (let arr of arrays) {
    combinedArray = [...combinedArray, ...arr];
  }

  const uniqueItems = new Set(combinedArray);

  return [...uniqueItems];

}

function createUpdatedUser(user, update) {
  const updated = {...user, ...update, };
  if (update.address) {
    updated.address = { ...user.address, ...update.address};
  }

  return updated;
}

const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
const updated = createUpdatedUser(user, { age: 26, address: { zip: "02002" } });

console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");
console.log(
  "1.1:",
  getFullName({
    firstName: "Петро",
    lastName: "Іванов",
    middleName: "Сергійович",
  }),
);


console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }))
console.log("1.3:",removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]))
console.log("1.4:", updated)