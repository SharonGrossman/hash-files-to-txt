import program from 'caporal';
import pkg from '../package.json';
import {hash, checkForErrors} from '.';

program.version(pkg.version)
  .description(pkg.description)
  .command('check', 'Check for hashes comparison')
  .argument('<original>', 'name of original json file')
  .argument('<current>', 'name of current json file')
  .action(({original, current}) => {
    checkForErrors({original, current});
  })
  .command('hash', 'perform hashing')
  .action(() => {
    hash();
  });

export default argv => {
  program
    .parse(argv);
};