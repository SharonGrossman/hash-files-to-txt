import program from 'caporal';
import pkg from '../package.json';
import {hash} from '.';

program.version(pkg.version)
  .description(pkg.description)
  .command('hash', 'Hash all the files in the current directory')
  .action(({}) => {
    hash();
  });

export default argv => {
  program
    .parse(argv);
};