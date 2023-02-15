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

// console.log("Start");
// fake_fetch("R1")
//   .then((data) => {
//     console.log(data);
//     return fake_fetch("R2", false);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((data) => {
//     console.log(data);
//   });

async function call_fetch() {
  try {
    const data = await fake_fetch("R1");
    console.log(data);
    const data2 = await fake_fetch("R2", false);
    console.log(data2);
  } catch (err) {
    console.log(err);
  }
}

call_fetch();
