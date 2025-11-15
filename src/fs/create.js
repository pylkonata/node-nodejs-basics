import { access, constants, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fresh.txt"
  );

  try {
    await access(filePath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(filePath, "I am fresh and young");
    } else {
      throw error;
    }
  }
};

await create();
