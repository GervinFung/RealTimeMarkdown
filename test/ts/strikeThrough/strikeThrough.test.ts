import {convertStrikeThrough} from '../../../src/ts/strikeThrough';
import { processFileData } from '../testUtil';

describe('Test Strike Through Markdown', () => {
    test.each(processFileData('strikeThrough'))(
        'data => %p',
        (data) => {
            expect(convertStrikeThrough(data.input)).toEqual(data.output);
        }
    );
});