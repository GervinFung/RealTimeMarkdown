import {convertStrikeThrough} from '../../../src/ts/strikeThrough';
import { processSingleLineFileData } from '../testUtil';

describe('Test Strike Through Markdown', () => {
    test.each(processSingleLineFileData('strikeThrough'))(
        'data => %p',
        (data) => {
            expect(convertStrikeThrough(data.input)).toEqual(data.output);
        }
    );
});