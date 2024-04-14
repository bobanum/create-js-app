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
const userName = "bobanum";
const repoName = process.env.npm_package_name.split(/\//).slice(-1)[0].replace(/^create-/, "");
const projectName = process.argv[2] || repoName;

const gitCheckoutCommand = `git clone --depth 1 https://github.com/${userName}/${repoName} ${projectName}`;
const installDepsCommand = `cd ${projectName} && npm install`;

console.log(`Cloning '${projectName}'`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for '${projectName}'`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Félicitations');