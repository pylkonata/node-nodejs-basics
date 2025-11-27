import { join, dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import zlib from "zlib";
import { finished } from "stream/promises";

const compress = async () => {
  const folderPath = dirname(fileURLToPath(import.meta.url));
  const filePath = join(folderPath, "files", "fileToCompress.txt");
  const newFilePath = join(folderPath, "files", "archive.gz");

  const readableStream = fs.createReadStream(filePath);
  const writableStream = fs.createWriteStream(newFilePath);

  const gzipStream = zlib.createGzip();

  readableStream.pipe(gzipStream).pipe(writableStream);
  await finished(writableStream);
};

await compress();
