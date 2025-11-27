import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const spawnChildProcess = async (args) => {
  const folderPath = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderPath, "files", "script.js");

  const child = spawn("node", [filePath, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);
