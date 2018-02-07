const assetsMapper = require('../../src/assetsUtils/assetsMapper');

describe('assetsMapper', () => {
    describe('mapStatsComparison', () => {
        it('should round up size to be in kilobytes', () => {
            const result = assetsMapper.mapStatsComparison(1024, 1536);

            expect(result.oldSize).toBe(1);
            expect(result.newSize).toBe(1.5);
            expect(result.diff).toBe(0.5);
            expect(result.pdiff).toBe(50);
        });

        it('should default mapped sizes to 0 if param is undefined', () => {
            const result = assetsMapper.mapStatsComparison(undefined, undefined);

            expect(result.oldSize).toBe(0);
            expect(result.newSize).toBe(0);
        });

        it('should handle the old size = 0', () => {
            const result = assetsMapper.mapStatsComparison(0, 512);

            expect(result.oldSize).toBe(0);
            expect(result.newSize).toBe(0.5);
            expect(result.diff).toBe(0.5);
            expect(result.pdiff).toBe(100);
        });
    });

    describe('map', () => {
        it('should return empty object if assets array is empty', () => {
            const result = assetsMapper.map({assets: []});

            expect(result).toEqual({});
        });

        it('should map based on first chunk name if chunk exists', () => {
            const input = {
                assets: [
                    {
                        chunkNames: ['testChunkName'],
                        name: 'fileName.ext',
                        size: 123
                    }
                ]
            };
            
            const result = assetsMapper.map(input);

            expect(result['testChunkName.ext']).toBe(123);
        });

        it('should map based on name if chunk doesnt exists', () => {
            const input = {
                assets: [
                    {
                        chunkNames: [],
                        name: 'fileName.ext',
                        size: 123
                    },
                ]
            };
            
            const result = assetsMapper.map(input);

            expect(result['fileName.ext']).toBe(123);
        });

        it('should map for multiple elements in assets array', () => {
            const input = {
                assets: [
                    {
                        chunkNames: ['testChunkName1'],
                        name: 'fileName1.ext1',
                        size: 123
                    },
                    {
                        chunkNames: ['testChunkName2'],
                        name: 'fileName2.ext2',
                        size: 456
                    }
                ]
            };
            
            const result = assetsMapper.map(input);

            expect(result['testChunkName1.ext1']).toBe(123);
            expect(result['testChunkName2.ext2']).toBe(456);
        });
    });
});