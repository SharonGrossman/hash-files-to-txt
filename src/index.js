import sha256 from 'sha256-file';
import {statSync} from 'fs';
import pify from 'pify';
import {writeFile, readFile} from 'jsonfile';
import {readdir, remove} from 'fs-extra';

const getHash = pify(sha256);
const hashesFile = 'hashes.json';
const hashes = [];

const writeHashes = () => remove(hashesFile).then(() => writeFile(hashesFile, hashes)).catch(err => console.log(err));

const readDirectory = path =>
  readdir(path)
    .then(files => files.filter(file => file !== hashesFile))
    .then(files =>
      files.map(file => {
        const filePath = `${path}/${file}`;

        console.log(`handling path ${filePath}`);

        return statSync(filePath).isFile() ? addFile(filePath) : readDirectory(filePath);
      }))
    .then(writeHashes)
    .catch(err => console.log(err));

const addFile = path => hashFile(path).then(hash => hashes.push({path, hash}));
const hashFile = path => getHash(path).then(sum => sum);
const readHashFile = path => readFile(path).then(data => data);

export const hash = () => remove(hashesFile).then(() => readDirectory('.'));

export const checkForErrors = ({original, current}) =>
  Promise.all([readHashFile(original), readHashFile(current)])
    .then(([originalData, currentData]) => {
      const wrongHashes = originalData.filter(({path, hash}) =>
        currentData.find(({hash: currHash, path: currPath}) => path === currPath && currHash !== hash));

      if (!wrongHashes.length) {
        console.log('Everything matches!');

        return;
      }

      wrongHashes.forEach(({path}) => console.log(`Wrong hash for ${path}`));
    });

