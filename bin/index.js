#! /usr/bin/env node

const CP = require('child_process');

function runCommand(command) {
    try {
        CP.execSync (command, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Failed to execute '${command}'`, error);
        return false;       
    }
    return true;
}
const repoName = process.argv[2] || 'js-app';
const gitCheckoutCommand = `git clone --depth 1 https://github.com/bobanum/create-js-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning '${repoName}'`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for '${repoName}'`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Félicitations');