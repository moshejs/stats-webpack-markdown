'use strict';

const _ = require('lodash');
const assetMapper = require('./assetsMapper');
const assetFileLoader = require('./assetsFileLoader');

const getAssetsLists = function(oldStatFiles, newStatsFiles) {
    return {
        oldAssets: assetFileLoader.getAssets(oldStatFiles),
        newAssets: assetFileLoader.getAssets(newStatsFiles),
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
    getAssetsStats
};