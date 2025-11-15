import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const currentFolder = dirname(fileURLToPath(import.meta.url));
  const fileToRead = join(currentFolder, "files", "fileToRead.txt");

  try {
    const text = await fs.readFile(fileToRead, { encoding: "utf-8" });
    console.log(text);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await read();
