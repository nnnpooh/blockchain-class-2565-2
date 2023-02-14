function calc() {
  for (let i = 0; i < 5e9; i++) {}
  console.log("Calc");
}

// console.log("Start");
// const result = calc();
// console.log("Done");

function calc_async() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 5e9; i++) {}
    resolve("Calc");
  });
}

console.log("Start");
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("calc");
  }, 3000);
}).then(console.log);
console.log("Done");
