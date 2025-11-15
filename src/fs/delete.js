import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));

  const fileToDeletePath = join(currentDir, "files", "fileToRemove.txt");

  try {
    await fs.unlink(fileToDeletePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await remove();
