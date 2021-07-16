import {convertTable} from '../../../src/ts/table';
import { processMultilineFileData } from '../testUtil';

describe('Test Table Markdown', () => {
    test.each(processMultilineFileData('table'))(
        'data => %p',
        (data) => {
            expect(convertTable(data.input)).toEqual(data.output);
        }
    );
});