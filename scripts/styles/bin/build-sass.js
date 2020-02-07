#!/usr/bin/env node

const { promisify } = require('util');
const glob = require('glob');
const renderSass = require('../render-sass');
const stylesheets = ['./src/components/**/*.scss', './src/styles/global.scss'];

const asyncGlob = promisify(glob);

stylesheets.forEach(async pattern => {
    const files = await asyncGlob(pattern, {});

    files.forEach(async file => {
        return await renderSass(file);
    });
});
