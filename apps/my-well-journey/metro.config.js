// Learn more: https://docs.expo.dev/guides/monorepo/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the whole monorepo so Metro can read workspace package source
//    (e.g. @param-nx-platform/core-ui, whose exports point at ./src).
config.watchFolders = [workspaceRoot];

// 2. Resolve modules from the app first, then the hoisted workspace root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
