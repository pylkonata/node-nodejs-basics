import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { finished } from "stream/promises";

const calculateHash = async () => {
  const folderName = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderName, "files", "fileToCalculateHashFor.txt");

  const hash = crypto.createHash("sha256");

  const readableStream = fs.createReadStream(filePath);
  readableStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  await finished(readableStream);
  const finalHash = hash.digest("hex");
  console.log(finalHash);
};

await calculateHash();
