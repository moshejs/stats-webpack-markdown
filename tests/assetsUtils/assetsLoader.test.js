jest.mock('../../src/assetsUtils/assetsMapper');
jest.mock('../../src/assetsUtils/assetsFileLoader');

const assetsMapperMock = require('../../src/assetsUtils/assetsMapper');
const assetsFileLoaderMock = require('../../src/assetsUtils/assetsFileLoader');

const assetsLoader = require('../../src/assetsUtils/assetsLoader');

describe('assetsLoader', () => {
    afterEach(() => {
        jest.resetAllMocks();
     });

     it('should return empty array if no stats are passed', () => {
        assetsFileLoaderMock.getAssets.mockReturnValueOnce({}).mockReturnValueOnce({});

        const result = assetsLoader.getAssetsStats('oldFile.json', 'newFile.json');

        expect(result).toHaveLength(0);
        expect(assetsFileLoaderMock.getAssets).toHaveBeenCalledTimes(2);
        expect(assetsFileLoaderMock.getAssets).toHaveBeenCalledWith('oldFile.json');
        expect(assetsFileLoaderMock.getAssets).toHaveBeenCalledWith('newFile.json');
     });

     it('should return union of old and new stats key value pairs', () => {
        assetsFileLoaderMock.getAssets.mockReturnValueOnce({key1: 1}).mockReturnValueOnce({key2: 2});
        assetsMapperMock.mapStatsComparison.mockReturnValueOnce({size: 1}).mockReturnValueOnce({size: 2})

        const result = assetsLoader.getAssetsStats('oldFile.json', 'newFile.json');
        
        expect(assetsMapperMock.mapStatsComparison).toHaveBeenCalledTimes(2);
        expect(assetsMapperMock.mapStatsComparison).toHaveBeenCalledWith(1, undefined);
        expect(assetsMapperMock.mapStatsComparison).toHaveBeenCalledWith(undefined, 2);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({name: 'key1', size: 1});
        expect(result[1]).toEqual({name: 'key2', size: 2});
     });
});