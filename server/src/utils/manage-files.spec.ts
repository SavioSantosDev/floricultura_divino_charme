import path from 'path';
import fs from 'fs';
import { numberOfFiles, removeOneFile } from './manage-files';

const testDirectory = path.resolve(__dirname, 'test');

let numberOfFilesCounter = 0;

function createNewDirectory() {
  return new Promise<NodeJS.ErrnoException | true>((resolve, reject) => {
    fs.mkdir(testDirectory, (err) => (err ? reject(err) : resolve(true)));
  });
}

function removeDirectory() {
  return new Promise<NodeJS.ErrnoException | true>((resolve, reject) => {
    fs.rmdir(testDirectory, (err) => (err ? reject(err) : resolve(true)));
  });
}

function createNewFile(path: string) {
  return new Promise<NodeJS.ErrnoException | true>((resolve, reject) => {
    fs.writeFile(path, 'Hello World!!', (err) =>
      err ? reject(err) : resolve(true),
    );
  });
}

// function createFiles(paths: string[]) {
//   paths.forEach(async (path) => await createNewFile(path));
// }

describe('Remove files of disk', () => {
  beforeAll(async () => {
    await createNewDirectory();
  });

  afterAll(async () => {
    await removeDirectory();
  });

  it('Should remove one file with the specified path', async () => {
    const filePath = path.resolve(__dirname, 'test', 'hello.txt');

    if ((await createNewFile(filePath)) === true) numberOfFilesCounter++;
    if ((await removeOneFile(filePath)) === true) numberOfFilesCounter--;

    const numberOfCreatedFiles = await numberOfFiles(testDirectory);
    expect(numberOfCreatedFiles).toEqual(numberOfFilesCounter);
  });

  it('Should not remove one file with the invalid path', async () => {
    const filePath = path.resolve(__dirname, 'test', 'invalid.txt');

    if ((await createNewFile(filePath)) === true) numberOfFilesCounter++;
    if ((await removeOneFile(filePath)) === true) numberOfFilesCounter--;

    const numberOfCreatedFiles = await numberOfFiles(testDirectory);
    expect(numberOfCreatedFiles).toEqual(numberOfFilesCounter);
  });
});
