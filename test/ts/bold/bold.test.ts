import {convertBold} from '../../../src/ts/bold';
import { processFileData } from '../testUtil';

describe('Test Bold Markdown', () => {
    test.each(processFileData('bold'))(
        'data => %p',
        (data) => {
            expect(convertBold(data.input)).toEqual(data.output);
        }
    );
});