function delay(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

function simulateFetch(url) {
  return new Promise(function(resolve, reject) {
    const delayTime = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

    setTimeout(function() {
      if (!url.startsWith("https")) {
        reject(new Error(`Invalid URL: ${url}`));
        return;
      }

      const isSuccess = Math.random() < 0.7;

      if (isSuccess) {
        resolve({ url, status: 200, data: "OK" });
      } else {
        reject(new Error("Server error: 500"));
      }
    }, delayTime);
  });
}

async function fetchWithRetry(url, attempts) {
  let err;

  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`Спроба №${i}...`);
      const result = await simulateFetch(url);
      return result;
    } catch (error) {
      console.log(`Спроба №${i} не вдалася: ${error.message}`);
      err = error;
      
      if (i < attempts) {
        await delay(500);
      }
    }
  }

  throw err;
}

async function fetchMultiple(urls) {
  const results = await Promise.allSettled(urls.map(url => simulateFetch(url)));

  const successful = [];
  const failed = [];

  results.forEach(result => {
    if (result.status === "fulfilled") {
      successful.push(result.value);
    } else {
      failed.push(result.reason.message);
    }
  });

  return { successful, failed };
}

async function main() {
  console.log("=== Завдання 4: async/await ===");

  // 4.1
  console.time("delay");
  await delay(1000);
  console.timeEnd("delay"); // ~1000ms

  // 4.2
  try {
    const result = await simulateFetch(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log("Успіх:", result);
  } catch (error) {
    console.error("Помилка:", error.message);
  }

  // 4.3 — retry для нестабільного сервера
  try {
    const result = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/posts",
      5,
    );
    console.log("fetchWithRetry результат:", result);
  } catch (error) {
    console.error("Всі спроби невдалі:", error.message);
  }

  // 4.4
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);
  console.log("Результати:", results);
}

main();