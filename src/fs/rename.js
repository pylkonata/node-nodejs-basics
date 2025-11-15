import fs, { access, constants } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const rename = async () => {
  const currentFolderPath = dirname(fileURLToPath(import.meta.url));

  const wrongFilePath = join(currentFolderPath, "files", "wrongFilename.txt");
  const properFilePath = join(currentFolderPath, "files", "properFilename.md");

  try {
    await access(wrongFilePath, constants.F_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }

  try {
    await access(properFilePath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.rename(wrongFilePath, properFilePath);
    } else {
      throw error;
    }
  }
};
await rename();
