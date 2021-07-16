import {convertBold} from '../../../src/ts/bold';
import { processSingleLineFileData } from '../testUtil';

describe('Test Bold Markdown', () => {
    test.each(processSingleLineFileData('bold'))(
        'data => %p',
        (data) => {
            expect(convertBold(data.input)).toEqual(data.output);
        }
    );
});