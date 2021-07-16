import {convertCode} from '../../../src/ts/code';
import { processSingleLineFileData } from '../testUtil';

describe('Test Code Markdown', () => {
    test.each(processSingleLineFileData('code'))(
        'data => %p',
        (data) => {
            expect(convertCode(data.input)).toEqual(data.output);
        }
    );
});