#!/usr/bin/env node

const watch = require('node-watch');
const { resolve } = require('path');
const renderSass = require('../render-sass');

const watchOptions = {
    recursive: true,
    filter: path => {
        if (path.indexOf('node_modules') > -1) {
            return false;
        }

        return /.(?:ts|scss)$/.test(path);
    }
};

watch(resolve('src'), watchOptions, function(_event, fileName) {
    console.log(fileName);

    if (fileName.endsWith('scss')) {
        console.log(`Compiling ${fileName}...`);
        renderSass(fileName);
    }
});
