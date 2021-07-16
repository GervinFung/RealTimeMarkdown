import {convertItalic} from '../../../src/ts/italic';
import { processSingleLineFileData } from '../testUtil';

describe('Test Italic Markdown', () => {
    test.each(processSingleLineFileData('italic'))(
        'data => %p',
        (data) => {
            expect(convertItalic(data.input)).toEqual(data.output);
        }
    );
});