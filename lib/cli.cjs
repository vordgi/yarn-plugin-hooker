#!/usr/bin/env node
const { execSync } = require('child_process');
const { version } = require('../package.json');

const script = `yarn plugin import https://github.com/vordgi/yarn-plugin-hooker/releases/download/${version}/index.cjs`;
execSync(script, { shell: true, stdio: 'inherit' });
