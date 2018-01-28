'use strict';

const path = require('path');

const mapPaths = function(workingDirectory, statFiles) {
    return statFiles.map(file => path.resolve(workingDirectory, file))
};

const mapOutputPath = function (workingDirectory, outputFile) {
    return path.resolve(workingDirectory, outputFile);
};

module.exports = {
    mapPaths,
    mapOutputPath
};