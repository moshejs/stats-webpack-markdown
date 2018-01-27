#!/usr/bin/env node
'use strict';

const program = require('commander');
const statsFileValidator = require('./inputValidators/statsFileValidator');
const processStats = require('./processStats');
const defaultSettings = require('./settings');

function list(val) {
    return val.split(',');
}

program
    .version('0.1.0')
    .description('CLI utility that compares two bundle contents and represents the diff results as a Markdown document')
    .option('--outputFile [path]', 'Filename for the generated report', 'stats.MD')
    .option('--oldStats <items>', 'Path to stats.json files containing base stats to compare with (comma separated)', list)
    .option('--newStats <items>', 'Path to stats.json files containing new stats that are being compared with old ones (comma separated)', list)
    .option('--percentageThreshold <n>', 'Value indicating %diff above which asset chance is considered significant', parseFloat, 5)
    .option('--majorChangesText [value]', 'Text to be appended to report when major bundle changes are detected', '')
    .parse(process.argv);

try {
    statsFileValidator.validate(process.cwd(), program.oldStats);
    statsFileValidator.validate(process.cwd(), program.newStats);

    const settings = Object.assign({},
        defaultSettings,
        {
            outputFile: program.outputFile,
            oldStats: program.oldStats,
            newStats: program.newStats,
            percentageThreshold: program.percentageThreshold,
            majorChangesText: program.majorChangesText,
            currentWorkingDirectory: process.cwd(),
        },
    );
    processStats.createAssetsStats(settings);

} catch (err) {
    console.log(err.message);
    process.exit(1);
}
