function fake_fetch(tag, isSuccess = true, wait = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`Success: ${tag}`);
      } else {
        reject(`Error: ${tag}`);
      }
    }, wait);
  });
}

console.log("Start");
fake_fetch("R1").then((tag) => {
  console.log(tag);
});

console.log("Start");
fake_fetch("R1")
  .then((tag) => {
    console.log(tag);
  })
  .then((tag) => {
    console.log(tag);
  });

console.log("Start");
fake_fetch("R1")
  .then((tag) => {
    console.log(tag);
    return fake_fetch("R2", false);
  })
  .then((tag) => {
    console.log(tag);
  })
  .catch((tag) => {
    console.log(tag);
  });

async function call_fetch() {
  const tag1 = await fake_fetch("R1");
  console.log(tag1);
  const tag2 = await fake_fetch("R2");
  console.log(tag2);
}
console.log("Start");
call_fetch();

async function call_fetch() {
  try {
    const tag1 = await fake_fetch("R1");
    console.log(tag1);
    const tag2 = await fake_fetch("R2", false);
    console.log(tag2);
  } catch (err) {
    console.log(err);
  }
}
console.log("Start");
call_fetch();
