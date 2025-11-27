import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const write = async () => {
  const folderPath = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderPath, "files", "fileToWrite.txt");

  const stream = fs.createWriteStream(filePath);
  process.stdin.pipe(stream);
};

await write();
