jest.mock('path');
const path = require('path');
jest.mock('fs');
const fs = require('fs');

const templateFormatter = require('../../src/templates/templateFormatter');

describe('templateFormatter', () => {
    it('format should return formatted string for given template', () => {
        fs.readFileSync.mockReturnValueOnce('some text with a <%= placeholder %>');
        const result = templateFormatter.format('templateName', { placeholder: 'value for that placeholder' });

        expect(path.resolve).toHaveBeenCalledTimes(1);
        expect(path.resolve).toHaveBeenCalledWith(expect.any(String), 'templateName');
        expect(result).toBe('some text with a value for that placeholder');
    });
});
