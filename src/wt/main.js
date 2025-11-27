import os from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

const performCalculations = async () => {
  const workers = [];
  const results = [];

  const folderName = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderName, "worker.js");

  const cpuCores = os.availableParallelism();
  let startNumber = 10;

  for (let i = 0; i < cpuCores; i++) {
    const worker = new Worker(filePath, {
      workerData: { number: startNumber },
    });

    startNumber += 1;

    const workerPromise = new Promise((resolve) => {
      let resolved = false;

      worker.on("message", (result) => {
        if (!resolved) {
          results[i] = { status: "resolved", data: result };
          resolved = true;
          resolve();
        }
      });

      worker.on("error", (error) => {
        if (!resolved) {
          results[i] = { status: "error", data: null };
          resolved = true;
          resolve();
        }
      });

      worker.on("exit", (code) => {
        if (!resolved) {
          results[i] = { status: "error", data: null };
          resolved = true;
          resolve();
        }
      });
    });
    workers.push(workerPromise);
  }
  await Promise.all(workers);
  console.log(results);
};

await performCalculations();
