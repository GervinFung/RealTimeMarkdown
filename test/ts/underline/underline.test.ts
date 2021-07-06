import {convertLeadingAndTrailingUnderscore} from '../../../src/ts/underline';
import { processFileData } from '../testUtil';

describe('Test Underscore Markdown', () => {
    test.each(processFileData('underline'))(
        'data => %p',
        (data) => {
            expect(convertLeadingAndTrailingUnderscore(data.input)).toEqual(data.output);
        }
    );
});