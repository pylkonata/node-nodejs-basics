import { access, constants, cp } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const currentFolderPath = dirname(fileURLToPath(import.meta.url));

  const originalFolderPath = join(currentFolderPath, "files");
  const copyFolderPath = join(currentFolderPath, "files_copy");

  try {
    await access(originalFolderPath, constants.F_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }

  try {
    await access(copyFolderPath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await cp(originalFolderPath, copyFolderPath, { recursive: true });
      return;
    } else {
      throw error;
    }
  }
};

await copy();
