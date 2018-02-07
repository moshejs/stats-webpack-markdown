jest.mock('../../src/assetsUtils/assetsMapper');
const assetsMapperMock = require('../../src/assetsUtils/assetsMapper');

const fileLoader = require('../../src/assetsUtils/assetsFileLoader');

describe('assetsFileLoader', () => {
    afterEach(() => {
       jest.resetAllMocks();
    });

    it('should load assets from single file', () => {
        assetsMapperMock.map.mockReturnValueOnce({ 'key1': 1 });
        jest.mock('testFilePath1', () => ({ 'something': 123 }), { virtual: true });

        const result = fileLoader.getAssets(['testFilePath1']);

        expect(assetsMapperMock.map).toHaveBeenCalledTimes(1);
        expect(assetsMapperMock.map).toHaveBeenCalledWith({ 'something': 123 });
        expect(result).toEqual({ 'key1': 1 });
    });

    it('should load assets from multiple files', () => {
        assetsMapperMock.map.mockReturnValueOnce({ 'key1': 1 }).mockReturnValueOnce({ 'key2': 2 });
        jest.mock('testFilePath1', () => ({ 'something': 123 }), { virtual: true });
        jest.mock('testFilePath2', () => ({ "someOtherThing": 456 }), { virtual: true });

        const result = fileLoader.getAssets(['testFilePath1', 'testFilePath2']);

        expect(assetsMapperMock.map).toHaveBeenCalledTimes(2);
        expect(assetsMapperMock.map).toHaveBeenCalledWith({ 'something': 123 });
        expect(assetsMapperMock.map).toHaveBeenCalledWith({ "someOtherThing": 456 });
        expect(result).toEqual({ 'key1': 1, 'key2': 2 });
    });
});