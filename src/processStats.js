'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const assetMapper = require('./mappers/assetsMapper');
const assetStatsFormatter = require('./templateFormatters/assetStatsFormatter');
const templateFormatter = require('./templateFormatters/templateFormatter');

const getAssetsFromFile = function (workingDir, file) {
    const filePath = path.resolve(workingDir, file);
    const stats = require(filePath);
    return assetMapper.map(stats);
};

const getAssets = function (workingDir, files) {
    const assetsArray = [];
    files.forEach(f => {
        assetsArray.push(getAssetsFromFile(workingDir, f));
    });
    return _.assign.apply(Object, assetsArray);
};

const getAssetsStats = function(currentWorkingDirectory, oldStats, newStats) {
    const stats = [];

    const oldAssets = getAssets(currentWorkingDirectory, oldStats);
    const newAssets = getAssets(currentWorkingDirectory, newStats);

    const assetsNames = _.union(Object.keys(oldAssets), Object.keys(newAssets));

    assetsNames.forEach(a => {
        const sizeStats = assetMapper.mapStatsComparison(oldAssets[a], newAssets[a]);
        const assetStats = Object.assign({}, { name: a, }, sizeStats);
        stats.push(assetStats);
    });

    return stats;
};

const createAssetsStats = function (settings) {
    const assetStats = getAssetsStats(settings.currentWorkingDirectory, settings.oldStats, settings.newStats);

    const sortedAssets = _.sortBy(assetStats, [(o) => { return Math.abs(o.pdiff) }]).reverse();
    const majorAssets = _.sortBy(
                            assetStats.filter(o => Math.abs(o.pdiff) > settings.percentageThreshold),
                            [(o) => { return Math.abs(o.pdiff) }])
                        .reverse();

    const allAssetsTemplate = assetStatsFormatter.format(
        sortedAssets,
        settings.templates.assetsStats,
        ':mag_right:',
        ':white_check_mark:'
    );

    const majorAssetsTemplate = assetStatsFormatter.format(
        majorAssets,
        settings.templates.majorChangedAssets,
        ':exclamation:', ':exclamation:',
    );

    const headerTemplate = templateFormatter.format(settings.templates.header);

    fs.writeFileSync(
        path.resolve(settings.currentWorkingDirectory, settings.outputFile),
        `${headerTemplate}${majorAssetsTemplate}${allAssetsTemplate}`
    );
};

module.exports = {
    createAssetsStats
};