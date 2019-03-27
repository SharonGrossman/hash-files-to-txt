import program from 'caporal';
import pkg from '../package.json';
import {hashme} from '.';

program.version(pkg.version)
  .description(pkg.description)
  .command('hash', 'Hash all the files in the current directory')
  .action(({}, options, logger) => {
    hashme();
  });

export default argv => {
  program
    .parse(argv);
};