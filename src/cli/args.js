const parseArgs = () => {
  const lineArg = process.argv.reduce((acc, name, index, arr) => {
    if (name.startsWith("--") && index < arr.length - 1) {
      const modifiedName = name.slice(2);
      if (index === arr.length - 2) {
        acc += `${modifiedName} is ${arr[index + 1]}`;
      } else {
        acc += `${modifiedName} is ${arr[index + 1]}, `;
      }
    }
    return acc;
  }, "");
  console.log(lineArg);
};

parseArgs();
