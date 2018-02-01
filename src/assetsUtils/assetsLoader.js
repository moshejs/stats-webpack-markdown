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

const getAssetsLists = function(oldStatFiles, newStatsFiles) {
    return {
        oldAssets: getAssets(oldStatFiles),
        newAssets: getAssets(newStatsFiles),
    };
};

const getAssetsStats = function(oldStatsFiles, newStatsFiles) {
    const assets = getAssetsLists(oldStatsFiles, newStatsFiles);

    const assetsNames = _.union(Object.keys(assets.oldAssets), Object.keys(assets.newAssets));

    return assetsNames.map(name => {
        const sizeStats = assetMapper.mapStatsComparison(assets.oldAssets[name], assets.newAssets[name]);
        return Object.assign({}, {name: (name),}, sizeStats);
    });
};

module.exports = {
    getAssetsFromFile,
    getAssets,
    getAssetsLists,
    getAssetsStats
};