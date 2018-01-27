'use strict';

const _ = require('lodash');

const map = function(stats) {
    const mappedAssets = {};
    stats.assets.forEach(a => {
        const chunkName = _.head(a.chunkNames);
        const extention = a.name.split('.').pop();
        const name = chunkName ? `${chunkName}.${extention}` : a.name;

        mappedAssets[name] = a.size;
    });
    return mappedAssets;
};

const mapStatsComparison = function (oldAssetSize, newAssetSize) {
    const oldSize = (oldAssetSize ? oldAssetSize : 0) / 1024;
    const newSize = (newAssetSize ? newAssetSize : 0) / 1024;
    const sizeDiff = newSize - oldSize;
    const sizePDiff = oldSize === 0 ? 100 : (1 - newSize / oldSize) * -100;
    return {
        oldSize: (oldSize),
        newSize: (newSize),
        diff: sizeDiff,
        pdiff: sizeDiff === 0 ? 0 : sizePDiff,
    };
};

module.exports = {
    map,
    mapStatsComparison
};