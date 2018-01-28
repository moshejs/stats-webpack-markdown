'use strict';

const _ = require('lodash');
const assetMapper = require('./assetsMapper');

const getAssetsFromFile = function (file) {
    const stats = require(file);
    return assetMapper.map(stats);
};

const getAssets = function (files) {
    const assetsArray = [];
    files.forEach(f => {
        assetsArray.push(getAssetsFromFile(f));
    });
    return _.assign.apply(Object, assetsArray);
};

const getAssetsLists = function(oldStatFiles, newStatsFiles) {
    return {
        oldAssets: getAssets(oldStatFiles),
        newAssets: getAssets(newStatsFiles),
    };
};

const getAssetsStats = function(oldStatsFiles, newStatsFiles) {
    const stats = [];

    const assets = getAssetsLists(oldStatsFiles, newStatsFiles);

    const assetsNames = _.union(Object.keys(assets.oldAssets), Object.keys(assets.newAssets));

    assetsNames.forEach(a => {
        const sizeStats = assetMapper.mapStatsComparison(assets.oldAssets[a], assets.newAssets[a]);
        const assetStats = Object.assign({}, {name: a,}, sizeStats);
        stats.push(assetStats);
    });

    return stats;
};

module.exports = {
    getAssetsFromFile,
    getAssets,
    getAssetsLists,
    getAssetsStats
};