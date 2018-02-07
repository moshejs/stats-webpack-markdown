'use strict';

const _ = require('lodash');
const assetMapper = require('./assetsMapper');

const getAssetsFromFile = function (file) {
    const stats = require(file);
    return assetMapper.map(stats);
};

const getAssets = function (files) {
    return _.assign.apply(Object, files.map(file => getAssetsFromFile(file)));
};

module.exports = {
    getAssets,
};
