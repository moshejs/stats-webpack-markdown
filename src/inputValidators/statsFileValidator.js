'use strict';

const path = require('path');
const fs = require('fs');

const isArray = function (statFiles) {
    if (!statFiles) throw new Error('Missing stat file(s) to parse!');
    if (!Array.isArray(statFiles)) throw new Error('Expected array of stat files!');
    return true;
};

const filesExist = function(workingDirectory, statFiles) {
    statFiles.forEach(file => {
        const filePath = path.resolve(workingDirectory, file);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Could not find ${filePath}`);
        }
    });
    return true;
};

const validate = function (workingDirectory, statFiles) {
    return isArray(statFiles) && filesExist(workingDirectory, statFiles);
};


module.exports = {
    isArray,
    filesExist,
    validate,
};