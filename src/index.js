const sha256 = require('sha256-file');
const fs = require('fs');
const fsExtra = require('fs-extra');
const pify = require('pify');

const hashesFile = 'hashes.txt';

const appendToFile = hash => {
  return fs.appendFile(hashesFile, `${hash}\n`, err => {
    if (err) {
      console.log(err);
    }

  });
};

const readDirectory = path => {
  return fsExtra.readdir(path)
    .then(files => files.filter(file => file !== hashesFile))
    .then(files => {
      return files.map(file => {
        const filePath = `${path}/${file}`;

        if (fs.statSync(filePath).isFile()) {
          return hashFile(filePath).then(appendToFile);
        }

        return readDirectory(filePath);
      });
    });
};

const hashFile = path => {
  return new Promise((resolve, reject) => sha256(path, (err, sum) => {
    if (err) {
      console.log(err);
      reject(err);
    }

    return resolve(sum);
  }));
};

export const hashme = () =>
  fsExtra.remove(hashesFile)
    .then(() => {
      return fs.writeFile(hashesFile, '', err => {
        return fs.statSync('./').isFile() ? readFile('.') : readDirectory('.');
      });
    });

