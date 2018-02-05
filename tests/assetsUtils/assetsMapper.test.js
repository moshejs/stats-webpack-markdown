const assetsMapper = require('../../src/assetsUtils/assetsMapper')

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
});