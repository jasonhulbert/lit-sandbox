const { promisify } = require('util');
const { resolve, dirname, basename } = require('path');
const { readFile, writeFile } = require('fs');
const sass = require('sass');
const cssTmpl = resolve(__dirname, './css.tmpl');
const cssTmplContentPattern = /<%\s*content\s*%>/;

const asyncSassRender = promisify(sass.render);
const asyncReadFile = promisify(readFile);
const asyncWriteFile = promisify(writeFile);

module.exports = async file => {
    const result = await asyncSassRender({ file, outputStyle: 'compressed' });
    const outFile = `${dirname(file)}/${basename(file, '.scss')}.css.ts`;
    const template = await asyncReadFile(cssTmpl, 'utf-8');
    const match = cssTmplContentPattern.exec(template);

    if (!match) {
        throw new Error(`Template file ${cssTmpl} did not contain template delimiters`);
    }

    const newContent = template.replace(cssTmplContentPattern, result.css.toString());

    asyncWriteFile(outFile, newContent, 'utf-8');

    return result;
};
