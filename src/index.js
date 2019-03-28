import sha256 from 'sha256-file';
import fs from 'fs';
import pify from 'pify';
import {readdir, remove} from 'fs-extra';

const {writeFile, appendFile, statSync} = pify(fs);
const getHash = pify(sha256);
const hashesFile = 'hashes.txt';

const appendToFile = hash =>
  appendFile(hashesFile, `${hash}\n`, err => {
    if (err) {
      console.log(err);
    }
  });

const readDirectory = path =>
  readdir(path)
    .then(files => files.filter(file => file !== hashesFile))
    .then(files =>
      files.map(file => {
        const filePath = `${path}/${file}`;

        console.log(`handling path ${filePath}`);

        return statSync(filePath).isFile() ? handleFile(filePath) : readDirectory(filePath);
      }));

const handleFile = path => hashFile(path).then(appendToFile);
const hashFile = path => getHash(path).then(sum => sum);

export const hash = () =>
  remove(hashesFile)
    .then(() => writeFile(hashesFile, ''))
    .then(() => readDirectory('.'));

