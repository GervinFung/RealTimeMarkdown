import {convertItalic} from '../../../src/ts/italic';
import { processFileData } from '../testUtil';

describe('Test Italic Markdown', () => {
    test.each(processFileData('italic'))(
        'data => %p',
        (data) => {
            expect(convertItalic(data.input)).toEqual(data.output);
        }
    );
});