'use strict';

const templateFormatter = require('./templateFormatter');

const formatRow = function(value, emojiChanged, emojiSame){
    return {
        changeStatus: value.diff === 0 ? emojiSame : emojiChanged,
        name: `\`${value.name}\``,
        oldSize: `${value.oldSize.toFixed(2)} KB`,
        newSize: `${value.newSize.toFixed(2)} KB`,
        diff: `${value.diff.toFixed(2)} KB`,
        pdiff: `${value.pdiff.toFixed(2)}%`
    };
};

const format = function(stats, template, emojiChanged, emojiSame, text) {
    const mention = text ? text : '';
    const rows = stats.map(s => {
       const row = formatRow(s, emojiChanged, emojiSame);
       return `${row.changeStatus} | ${row.name} | ${row.oldSize} | ${row.newSize} | ${row.diff} | ${row.pdiff} \n`;
    });

    return templateFormatter.format(template, { assetStats: rows.join(''), mentionText: mention });
};

module.exports = {
    format,
    formatRow
};