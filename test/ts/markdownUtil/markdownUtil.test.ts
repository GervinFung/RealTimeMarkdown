import {withoutLeadingTrailingWhitespace} from '../../../src/ts/markdownUtil';
import { processFileData } from '../testUtil';

describe('Test MarkdownUtil Markdown', () => {
    test.each(processFileData('markdownUtil'))(
        'data => %p',
        (data) => {
            expect(withoutLeadingTrailingWhitespace(data.input)).toEqual(JSON.parse(data.output));
        }
    );
});