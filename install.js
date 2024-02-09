#!/usr/bin/env node
const { execSync } = require('child_process');
const { version } = require('./package.json');

const command = `yarn plugin import https://github.com/vordgi/yarn-plugin-hooker/releases/download/${version}/yarn-plugin-hooker.js`;
execSync(command, { shell: true, stdio: 'inherit' });
