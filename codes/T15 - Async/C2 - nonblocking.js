function notblocking() {
  setTimeout(() => {
    console.log("Finish non-blocking calculation");
  }, 3000);
}

console.log("Start");
notblocking();
console.log("Done");
