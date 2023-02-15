function blocking() {
  for (let i = 0; i < 5e8; i++) {}
  console.log("Finish blocking calculation");
}

console.log("Start");
blocking();
console.log("Done");
