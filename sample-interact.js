const { stdin, stdout } = process;

function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}


async function main() {
  try {
    const name = await prompt("What's your name? ");
    const age = await prompt("What's your age? ");
    const email = await prompt("What's your email address? ");
    const user = { name, age, email };
    console.log(user);
    stdin.pause();
  } catch(error) {
    console.log("There's an error!");
    console.log(error);
  }
  process.exit();
}

main();
