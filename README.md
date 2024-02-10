# yarn-plugin-hooker

The plugin adds support for pre- and post-hooks for scripts in your package.json

## Installation
```bash
yarn dlx yarn-plugin-hooker
```

## Usage

If you want to add a command that runs automatically before, for example, the `test` command, create a command with the `pre` prefix (`pretest`)

You can do the same for the post-execution action by adding a `post` prefix to the beginning (`posttest`)

```json
{
    "name": "example",
    "scripts": {
        "pretest": "node -e \"console.log('pretest command')\"",
        "test": "jest",
        "posttest": "node -e \"console.log('posttest command')\""
    }
}
```
