import {convertOrderedList} from '../../../src/ts/orderedList';
import { processMultilineFileData } from '../testUtil';

describe('Test Ordered List Markdown', () => {
    test.each(processMultilineFileData('orderedList'))(
        'data => %p',
        (data) => {
            expect(convertOrderedList(data.input)).toEqual(data.output);
        }
    );
});