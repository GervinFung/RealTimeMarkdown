import {convertCode} from '../../../src/ts/code';
import { processFileData } from '../testUtil';

describe('Test Code Markdown', () => {
    test.each(processFileData('code'))(
        'data => %p',
        (data) => {
            expect(convertCode(data.input)).toEqual(data.output);
        }
    );
});