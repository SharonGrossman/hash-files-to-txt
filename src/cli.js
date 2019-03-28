import program from 'caporal';
import pkg from '../package.json';
import {hash} from '.';

program.version(pkg.version)
  .description(pkg.description)
  .action(({}) => {
    hash();
  });

export default argv => {
  program
    .parse(argv);
};