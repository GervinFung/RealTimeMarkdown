import {convertLeadingAndTrailingUnderscore} from '../../../src/ts/underline';
import { processSingleLineFileData } from '../testUtil';

describe('Test Underscore Markdown', () => {
    test.each(processSingleLineFileData('underline'))(
        'data => %p',
        (data) => {
            expect(convertLeadingAndTrailingUnderscore(data.input)).toEqual(data.output);
        }
    );
});