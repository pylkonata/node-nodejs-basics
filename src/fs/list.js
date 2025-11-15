import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const list = async () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const filesFolderPath = join(currentDir, "files");

  try {
    const files = await fs.readdir(filesFolderPath);
    console.log(files);
  } catch (err) {
    if ((err.code = "ENOENT")) {
      throw new Error("FS operation failed");
    } else {
      throw Error(err.message);
    }
  }
};

await list();
