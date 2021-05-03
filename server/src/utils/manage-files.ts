import fs from 'fs';
import { join } from 'path';

export function removeOneFile(
  path: string,
): Promise<true | NodeJS.ErrnoException[]> {
  return new Promise<NodeJS.ErrnoException[] | true>((resolve, reject) => {
    fs.unlink(path, (err) => (err ? reject(err) : resolve(true)));
  });
}

export function numberOfFiles(
  path: string,
): Promise<number | NodeJS.ErrnoException> {
  return new Promise<NodeJS.ErrnoException | number>((resolve, reject) => {
    fs.readdir(path, (err, files) =>
      err !== null ? reject(err) : resolve(files.length),
    );
  });
}

export function removeAllDirectoryFiles(
  path: string,
): Promise<true | NodeJS.ErrnoException[]> {
  return new Promise<NodeJS.ErrnoException[] | true>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);

      try {
        for (const file of files) {
          removeOneFile(join(path, file));
        }
      } catch (err) {
        reject(err);
      }

      resolve(true);
    });
  });
}
