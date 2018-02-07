jest.mock('path');
const path = require('path');

const pathMapper = require('../../src/fileHelpers/pathMapper');

describe('pathMapper', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('mapPaths should map multiple paths', () =>{
        path.resolve.mockReturnValueOnce('some/working/dir/file1.json').mockReturnValueOnce('some/working/dir/file2.json');

        const results = pathMapper.mapPaths('some/working/dir', ['file1.json', 'file2.json']);

        expect(path.resolve).toHaveBeenCalledTimes(2);
        expect(path.resolve).toHaveBeenCalledWith('some/working/dir', 'file1.json');
        expect(path.resolve).toHaveBeenCalledWith('some/working/dir', 'file2.json');

        expect(results).toHaveLength(2);
        expect(results[0]).toBe('some/working/dir/file1.json');
        expect(results[1]).toBe('some/working/dir/file2.json');
    });

    it('mapOutputPath should map path', () => {
        path.resolve.mockReturnValueOnce('some/working/dir/file1.json');

        const result = pathMapper.mapOutputPath('some/working/dir', 'file1.json');

        expect(path.resolve).toHaveBeenCalledTimes(1);
        expect(path.resolve).toHaveBeenCalledWith('some/working/dir', 'file1.json');

        expect(result).toBe('some/working/dir/file1.json');
    });
});