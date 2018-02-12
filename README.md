[![npm](https://img.shields.io/npm/v/stats-webpack-markdown.svg)](https://www.npmjs.com/package/stats-webpack-markdown)
[![npm](https://img.shields.io/npm/dm/stats-webpack-markdown.svg)](https://www.npmjs.com/package/stats-webpack-markdown)
[![Build Status](https://travis-ci.org/monkey3310/stats-webpack-markdown.svg?branch=master)](https://travis-ci.org/monkey3310/stats-webpack-markdown)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b62d23681dd237efc935/test_coverage)](https://codeclimate.com/github/monkey3310/stats-webpack-markdown/test_coverage)
# stats-webpack-markdown
This CLI tool will take input of 2 [webpack stats](https://github.com/webpack/docs/wiki/node.js-api#stats) files and present difference between them as a markdown document, that could be used as part of your continuous integration process - for example by including it as a comment to the pull request in github.

## Installation

Package can be installed as part of your project with [npm](https://www.npmjs.com/package/stats-webpack-markdown):

```
npm i -D stats-webpack-markdown
```

## Usage

Tool can be used as any other node CLI executable, running it with node from its installation directory:
```
node node_modules/stats-webpack-markdown --oldStats <items> --newStats <items>
```
Where `<items>` are paths to `*.json` stats files that are output of [webpack stats](https://github.com/webpack/docs/wiki/node.js-api#stats). List of all available parameters can be found [here](#parameters) or by using `--help` parameter

CI integration usage scenarion that includes comparing stats of bundles between pull request changes and master/baseline branch require storing stats file from master branch builds and fetching them as part of the pull request task. Once obtained, and paired with similar stats files from the pull request build, list of files can be passed to the tool, and after parsing it into markdown document, picked up and appended to the github pull requests as a comment using Github API.

## Parameters

##### `--oldStats <items>` _required_
Specify path(s) to stats.json files containing base stats to run comparison against. `<items>` is a comma separated list.
##### `--newStats <items>` _required_
Specify path(s) to stats.json files containing new stats that are being compared against the old ones. `<items>` is a comma separated list.
##### `--outputFile [path]` _optional [default: stats.MD]_
Specify `[path]` to output markdown file.
##### `--percentageThreshold <n>` _optional [default: 5]_
Value indicating %diff above which asset chance is considered significant
##### `--filterOnlyChanged'` _optional [default: false]_
When passed, output file will contain only report on files that are different from the baseline stats.
##### `--majorChangesText [value]` _optional [default:'']_
Text to be appended to report when major bundle changes are detected. Please see [usage](#usage) section for details.
