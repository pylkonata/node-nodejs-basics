import { join, dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import zlib from "zlib";
import { finished } from "stream/promises";

const decompress = async () => {
  const folderPath = dirname(fileURLToPath(import.meta.url));
  const targetFile = join(folderPath, "files", "archive.gz");
  const destinationFile = join(folderPath, "files", "fileToCompress.txt");

  const readableStream = fs.createReadStream(targetFile);
  const writableStream = fs.createWriteStream(destinationFile);

  const decompressStream = zlib.createGunzip();

  readableStream.pipe(decompressStream).pipe(writableStream);
  await finished(writableStream);
};

await decompress();
