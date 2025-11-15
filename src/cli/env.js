const parseEnv = () => {
  const allEnvs = process.env;
  const rssEnvs = Object.entries(allEnvs)
    .filter(([name]) => name.startsWith("RSS_"))
    .reduce((acc, [name, value], index, arr) => {
      if (index === arr.length - 1) {
        acc += `${name}=${value}`;
      } else {
        acc += `${name}=${value}; `;
      }
      return acc;
    }, "");
  console.log(rssEnvs);
};

parseEnv();
