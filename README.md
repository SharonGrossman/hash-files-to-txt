# hash-me 
hash-me cli

## Installation
As cli tool
```bash
$ [sudo] npm install hash-me -g
```

Programmatically
```bash
$ [sudo] npm install hash-me
```

## Usage
### CLI
```bash
$ hash-me 0.0.0 - hash-me cli

  USAGE

    hash-me add <a> <b>

  ARGUMENTS

    <a>      The first number       required
    <b>      The second number      required

  GLOBAL OPTIONS

    -h, --help         Display help
    -V, --version      Display version
    --no-color         Disable colors
    --quiet            Quiet mode - only displays warn and error messages
    -v, --verbose      Verbose mode - will also output debug messages
```

### Programmatically
```js
import {add} from 'hash-me';

add(1, 2); // 3
```

## License

[ISC](LICENSE)