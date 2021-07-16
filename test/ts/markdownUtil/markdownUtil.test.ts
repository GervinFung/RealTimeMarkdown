import {withoutLeadingTrailingWhitespace} from '../../../src/ts/markdownUtil';
import { processSingleLineFileData } from '../testUtil';

describe('Test MarkdownUtil Markdown', () => {
    test.each(processSingleLineFileData('markdownUtil'))(
        'data => %p',
        (data) => {
            expect(withoutLeadingTrailingWhitespace(data.input)).toEqual(JSON.parse(data.output));
        }
    );
});