import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const folderPath = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderPath, "files", "fileToRead.txt");

  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on("error", (error) => {
    console.error("Error reading file:", error.message);
    process.exit(1);
  });
};

await read();
