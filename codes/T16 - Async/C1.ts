function wait() {
  return new Promise((resolve, reject) => {
    resolve("Yes");
  });
}

wait().then(console.log);
